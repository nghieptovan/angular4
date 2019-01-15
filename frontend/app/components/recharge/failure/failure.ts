import {Component, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {Dispatcher, Store} from '@ngrx/store';

import {GlobalService} from '../../../services/global.service';
import * as fromRoot from '../../../store/index';
import {Observable} from 'rxjs/Observable';
import {DomSanitizer} from '@angular/platform-browser';
import * as _ from 'lodash';

@Component({
    selector: 'recharge-checkout-failure',
    templateUrl: './failure.html',
    styleUrls: ['./failure.less']
})

export class RechargeCheckoutFailureComponent {

    COUNTDOWN_SECONDS: Number = 6;

    authIsLoggedIn$: Observable<any>;

    rechargeCart: any;
    userInfo: any;
    shippingAddress: any;
    rechargeOrderSuccess: any;
    paymentMethod: any;
    commonStoreLogos$: Observable<any>;

    cmsContentSub: any;
    footerHtml: any;


    constructor(private store: Store<fromRoot.AppState>,
                private router: Router,
                private dispatcher: Dispatcher, private globalService: GlobalService, protected domSanitizer: DomSanitizer) {

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
    }

    ngAfterViewInit() {
        this._startCountdown();
    }

    goToRechargeCheckout() {
        this.router.navigate(['mobilerecharge/phonecard']);
    }

    _startCountdown() {
        const intervalPaymentFail = setInterval(function () {
            this.COUNTDOWN_SECONDS--;

            if (parseInt(this.COUNTDOWN_SECONDS, 10) === 0) {
                clearInterval(intervalPaymentFail);
                this.goToRechargeCheckout();
            }
        }.bind(this), 1000);
    }

    backToHome() {
        this.router.navigate(['/']);
        return false;
    }
}
