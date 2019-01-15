import {PlatformLocation} from '@angular/common';
import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Dispatcher, Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

import {GlobalService} from '../../../services/global.service';
import * as account from '../../../store/account/account.actions';
import * as categories from '../../../store/categories/categories.actions';
import * as fromRoot from '../../../store/index';
import {DomSanitizer} from '@angular/platform-browser';
import * as _ from 'lodash';

@Component({
    selector: 'recharge-checkout-success',
    templateUrl: './success.html',
    styleUrls: ['./success.less']
})

export class RechargeCheckoutSuccessComponent {

    authIsLoggedIn$: Observable<any>;

    rechargeCart: any;
    userInfo: any;
    shippingAddress: any;
    rechargeOrderSuccess: any;
    paymentMethod: any;
    commonStoreLogos$: Observable<any>;

    cmsContentSub: any;
    footerHtml: any;

    constructor(private store: Store<fromRoot.AppState>, dispatcher: Dispatcher,
                private router: Router,
                private platformLocation: PlatformLocation,
                private globalService: GlobalService, protected domSanitizer: DomSanitizer) {

        this.commonStoreLogos$ = this.store.select(fromRoot.commonGetStoreLogos);
        this.cmsContentSub = this.store.select(fromRoot.commonGetCmsContents)
            .subscribe((cms) => {
                this.footerHtml = null;
                _.each(cms, (block: any) => {
                    if (block.identifier === 'shopping_cart_footer_checkout_method') {
                        this.footerHtml = this.domSanitizer.bypassSecurityTrustHtml(block.content);
                    }
                });
            });

        this.authIsLoggedIn$ = this.store.select(fromRoot.authGetLoggedInState);
        this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
        this.rechargeCart = JSON.parse(localStorage.getItem('rechargeCart'));
        this.rechargeOrderSuccess = JSON.parse(localStorage.getItem('rechargeOrderSuccess'));
        this.paymentMethod = localStorage.getItem('rechargePaymentMethod');

        if (!localStorage.getItem('rechargeOrderSuccess')) {
            window.location.href = '/mobilerecharge/phonecard'.toString().toHostName();
        }
        localStorage.removeItem('rechargeCartId');

        const token = localStorage.getItem('token');
        if (token) {
            this.store.dispatch(new account.LoadOrders(0));
            this.store.dispatch(new account.LoadInfo());
        }
    }


    ngAfterViewInit() {
        this.platformLocation.onPopState(() => {
            this.router.navigate(['']);
        });
    }

    backToHome() {
        this.store.dispatch(new categories.SetSelectedStore(''));
        this.router.navigate(['/']);
        return false;
    }

    goToOrders() {
        this.store.dispatch(new categories.SetSelectedStore(''));
        this.router.navigate(['account/orders']);
        return false;
    }
}
