import { Component, HostListener, ElementRef } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { Dispatcher, Store } from '@ngrx/store';
import * as _ from 'lodash';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { AppConstants } from './app.constant';
import { RegisterSuccessModal } from './modals/login/success/success';
import { GlobalService } from './services/global.service';
import * as fromRoot from './store';
import * as account from './store/account/account.actions';
import * as auth from './store/auth/auth.actions';
import * as checkout from './store/checkout/checkout.actions';
import * as vendorCheckout from './store/checkout/vendor-checkout/checkout.actions';
import * as common from './store/common/common.actions';
import * as products from './store/products/products.actions';
import { PlatformLocation } from '@angular/common'
import {LocalStorageConstants} from "./components/base/constants/LocalStorageConstants";
import {LocalStorageManagement} from "./components/base/LocalStorageManagement";
import {RegionManagement} from "./components/base/RegionManagement";
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

    constructor(private router: Router, private activatedRoute: ActivatedRoute,
        private store: Store<fromRoot.AppState>,
        private dispatcher: Dispatcher,
        private toastr: ToastrService,
        private dialogService: DialogService,
        private _elementRef : ElementRef,
        private globalService: GlobalService,
        private location: PlatformLocation
    ) {
        this.store.dispatch(new account.LoadJsonConfig('../assets/config/config.json'));
        formvalidation();
        datetimePicker();
        // console.log('run');

        
    }


}
