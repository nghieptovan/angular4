import { Component, OnDestroy, OnInit } from '@angular/core';
import * as fromRoot from '../../../store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import * as account from '../../../store/account/account.actions';

declare var $;

// Redux
@Component({
    selector: 'app-account-info',
    templateUrl: './info.html',
    styleUrls: ['./info.less']
})
export class LotteAccountInfo implements OnInit, OnDestroy {
    userInfo$: Observable<any>;
    comments: any;
    Lpoint: any;
    lpointBanner: any;

    updateLpointSub: any;
    cmsContentsSub: any;
    constructor(private store: Store<fromRoot.AppState>) {
        this.userInfo$ = store.select(fromRoot.accountGetInfo);
        this.store.select(fromRoot.accountGetInfo)
            .subscribe((info) => {
                if (info && info.id) {
                    this.comments = info.comments;
                }
            });
        this.updateLpointSub = this.store.select(fromRoot.accountUpdateLpoint)
            .subscribe((results) => {
                this.Lpoint = results;
            });
        this.cmsContentsSub = this.store.select(fromRoot.commonGetCmsContents)
            .subscribe((cmsContent) => {
                this.lpointBanner = _.find(cmsContent, (cms: any) => {
                    return cms.identifier === 'tpo_account_banner';
                });
            });
    }

    ngOnInit(): void {
        $('body').addClass('customer-account-index');
    }

    ngOnDestroy() {
        this.cmsContentsSub.unsubscribe();
        $('body').removeClass('customer-account-index');
    }

    updateLPoint() {
        this.updateLpointSub = this.store.select(fromRoot.accountUpdateLpoint)
            .subscribe((results) => {
                this.Lpoint = results;
            });
        this.store.dispatch(new account.UpdateLPoint());
    }
}
