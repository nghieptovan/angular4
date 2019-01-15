import { Component, OnInit, AfterViewInit,ViewEncapsulation } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { Dispatcher,Store } from '@ngrx/store';
import { DialogService } from 'ng2-bootstrap-modal';

import * as fromRoot from '../../store';

import * as anniversary from '../../store/anniversary/anniversary.actions';

import { LtBannerComponent } from '../../components/category/banner/banner';
import * as _ from 'lodash';
import * as moment from 'moment';
import { GlobalService } from '../../services/global.service';
import { CampaignService } from '../../store/campaign/campaign.service';
import {WishList} from "../../components/base/wishlist/wishlist";
import { DomSanitizer } from '@angular/platform-browser';

import { Observable } from 'rxjs/Observable';
import { LoginModal } from '../../modals/login/login';

declare var $;

@Component({
    selector: 'app-anniversary',
    templateUrl: 'anniversary.html',
    styleUrls: ['anniversary.css'],
    encapsulation: ViewEncapsulation.None

})
export class Anniversary extends LtBannerComponent{

    resultsSub : any;
    results : any;
    authIsLoggedIn$: Observable<any>;

    constructor(
        protected store: Store<fromRoot.AppState>,
        protected activatedRoute: ActivatedRoute,
        protected campaignService: CampaignService,
        protected globalService: GlobalService,
        protected dispatcher: Dispatcher,
        protected router: Router,
        protected wishlist: WishList,
        protected domSanitizer: DomSanitizer,
        protected dialogService: DialogService
    ) {

        super(store, activatedRoute, campaignService, globalService,dispatcher,router,wishlist,domSanitizer);
        this.resultsSub = this.store.select(fromRoot.anniversaryGetState).subscribe(state => {
            this.results = state.results;
            if(typeof this.results.email !== 'undefined'){
                this.innerHtml = this.domSanitizer.bypassSecurityTrustHtml(this.results.widget);
                setTimeout(() => {
                    const campaignDiv = $('.lt-campaign-products');
                    this.appendHtmlProductList(campaignDiv);
                    this.globalService.runScript('anniversary-products');
                }, 500);
            }


        });

        this.authIsLoggedIn$ = this.store.select(fromRoot.authGetLoggedInState);

    }

    ngOnInit() {

    }

    ngAfterViewInit(){
        this.authIsLoggedIn$.subscribe((logged) => {
            if (logged) {
                setTimeout(() => {
                    this.store.dispatch(new anniversary.Load(2018));
                }, 500);
            }
        });
    }

    ngOnDestroy(){

    }

    showLoginModal(isRegisterTab = false) {
        this.dialogService.addDialog(LoginModal, {
            isRegisterTab: isRegisterTab
        });
    }

    generateAvatarName(name){
        var initials = "";
        var names = name.split(' ');
        for (let n = 0; n < names.length; n++) {
            initials += names[n].substring(0, 1).toUpperCase();
        }
        return initials;
    }

    formatPrice(x){
        var parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    }
}



