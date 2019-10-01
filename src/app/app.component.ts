import { Component, HostListener, ElementRef } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { AppConstants } from './app.constant';
import { GlobalService } from './services/global.service';
import * as fromRoot from './store';
import * as account from './store/account/account.actions';
import * as auth from './store/auth/auth.actions';
import * as common from './store/common/common.actions';
import { PlatformLocation } from '@angular/common'
import {formvalidation } from '../assets/js/form-validation';
import {datetimePicker } from '../assets/js/pickdatetime';
declare var $;
// import { TranslateService } from 'ng2-translate';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})

export class AppComponent {
    isLoginPage: boolean = false;
    userInfoSub: any;
    user: any;
    showHeader: boolean;
    showSidebar: boolean;
    showFooter: boolean;
    constructor(private router: Router, private activatedRoute: ActivatedRoute,
        private store: Store<fromRoot.AppState>,
        private toastr: ToastrService,
        private dialogService: DialogService,
        private _elementRef : ElementRef,
        private globalService: GlobalService,
        private location: PlatformLocation
    ) {
        this.store.dispatch(new auth.GetCurrentUser());
        this.store.dispatch(new account.LoadJsonConfig('../assets/config/config.json'));
        formvalidation();
        datetimePicker();

        // this.userInfoSub = this.store.select(fromRoot.getLoginUser).subscribe( (user) => {
        //     if(user && user.id){
        //         this.user = user;
        //     }else{
        //         this.router.navigate(['login']);
        //     }  
        // });
        this.store.select(fromRoot.getLoggedIn).subscribe((getLoggedIn) => {
            if(getLoggedIn == 3){
                // this.router.navigate([{ outlets: { login: [ 'login'] }}]);
            }            
        });
    }
    
    ngOnInit() {
        this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
            this.showHeader = this.activatedRoute.firstChild.snapshot.data.showHeader !== false;
            this.showSidebar = this.activatedRoute.firstChild.snapshot.data.showSidebar !== false;
            this.showFooter = this.activatedRoute.firstChild.snapshot.data.showFooter !== false;
        }
        });
    }


}
