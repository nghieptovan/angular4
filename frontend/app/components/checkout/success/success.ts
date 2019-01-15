import { PlatformLocation } from '@angular/common';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Dispatcher, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { GlobalService } from '../../../services/global.service';
import * as account from '../../../store/account/account.actions';
import * as checkout from '../../../store/checkout/checkout.actions';
import * as common from '../../../store/common/common.actions';
import * as categories from '../../../store/categories/categories.actions';
import * as fromRoot from '../../../store/index';
import {NormalPayment} from "../../base/payment/NormalPayment";
import {VendorPickupManagement} from "../../base/VendorPickupManagement";
import {IPickupInfoStorage} from "../../base/pickup_in_store/IPickupInfoStorage";
import * as _ from 'lodash';

declare var $;

@Component({
    selector: 'lt-checkout-success',
    templateUrl: './success.html',
    styleUrls: ['./success.less']
})

export class LtCheckoutSuccessComponent {

    authIsLoggedIn$: Observable<any>;

    cart: any;
    userInfo: any;
    shippingAddress: any;
    orderSuccess: any;
    paymentMethod: any;
    shippingDuration: String;
    shippingFee: number;
    currentDate : any;

    paymentType: String = 'Cash On Delivery';
    vendorId: number;
    paymentFunction: any;
    vendorPickupMgr: VendorPickupManagement = VendorPickupManagement.getInstance();
    shippingVendors: any;
    pickupInfo: Array<IPickupInfoStorage> = [];
    hasPickupInStore: boolean = false;


    constructor(protected store: Store<fromRoot.AppState>, dispatcher: Dispatcher,
        protected activatedRoute: ActivatedRoute,
        private router: Router,
        private platformLocation: PlatformLocation,
        private globalService: GlobalService) {

        this.vendorId = this.activatedRoute.params['value'].vendorId;
        this.loadPaymentFunction(this.vendorId);

        //if (!this.paymentFunction.getStorage('cart')) {

        //if (!this.paymentFunction.getStorage('cart')) {

        //}
        // this.pickupInfo = this.vendorPickupMgr.getVendorPickupInfo();
        this.authIsLoggedIn$ = this.store.select(fromRoot.authGetLoggedInState);

        this.shippingAddress = JSON.parse(this.paymentFunction.getStorage('shippingAddress'));
        this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
        this.cart = JSON.parse(this.paymentFunction.getStorage('cart'));
        this.orderSuccess = JSON.parse(this.paymentFunction.getStorage('orderSuccess'));
        this.paymentMethod = JSON.parse(this.paymentFunction.getStorage('paymentMethod'));
        this.shippingDuration = this.paymentFunction.getStorage('shipping_duration');

        this.currentDate = new Date().toJSON().slice(0,10).replace(/-/g,'/');

        const shippingRulesText = this.paymentFunction.getStorage('shippingRules');
        if (shippingRulesText) {
            const shippingRules = JSON.parse(shippingRulesText);
            this.shippingFee = parseInt(shippingRules.cartRules.shipping_data.total_cart + shippingRules.cartRules.shipping_data.total_sdd_fee, 10);

            this.shippingVendors = this.vendorPickupMgr.loadSelectedShipType(shippingRules.shippingVendors);
            const temp = _.find(this.shippingVendors.by_group, item => {
                return item.pickupInfo.isActive;
            });
            this.hasPickupInStore = temp?true:false;
        }

        // if (localStorage.getItem('token')) {
        //     this.store.dispatch(new account.LoadInfo());
        // }

        const token = localStorage.getItem('token');
        if (token) {
            this.store.dispatch(new account.LoadOrders(0));
            this.store.dispatch(new account.LoadInfo());
        }

        if (this.paymentMethod && this.paymentMethod.method) {
            switch (this.paymentMethod.method) {
                case 'cashondelivery':
                    this.paymentType = 'Thanh toán tiền mặt';
                    break;
                case 'local_atm':
                    this.paymentType = 'Thẻ ATM nội địa';
                    break;
                case 'vietin_gateway':
                    this.paymentType = 'Thẻ tín dụng/ghi nợ';
                    break;
                case 'installment':
                    this.paymentType = 'Thanh toán trả góp bằng thẻ tín dụng';
                    break;
                case 'momo':
                    this.paymentType = 'Thanh toán bằng MoMo';
                    break;
                case 'zalopay':
                    this.paymentType = 'Ví điện tử ZaloPay';
                    break;
                default:
                    if (this.paymentMethod.method.indexOf('vietin_gateway') > -1) {
                        this.paymentType = 'Thanh toán trả góp bằng thẻ tín dụng';
                    }
                    break;
            }
        }

        this.globalService.reloadCartWhenTimestampChanged();

        // Load tracking code
        if (this.orderSuccess) {
            this.store.dispatch(new common.LoadTrackingCode({ type: 'checkout_success', id: this.orderSuccess.order_id }));
        }

        setTimeout(() => {

            if (this.orderSuccess == null ) {
                console.log('no order');
                this.router.navigate(['checkout'], { queryParams: { step: 1 } });
            }

            // Clear cart information
            this.paymentFunction.clearCartInfo();

        }, 500);



    }

    ngAfterViewInit() {
        this.platformLocation.onPopState(() => {
            //this.router.navigate(['']);
        });
    }

    ngOnDestroy() {
        this.store.dispatch(this.paymentFunction.getCartRefreshAction());
        this.globalService.removeTrackingCode();
        //[LT-849] huytt: remove img tag of access trade tracking
        this.removeAcessTradeTracking();
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

    //[LT-849] huytt: remove img tag of access trade tracking
    removeAcessTradeTracking(){
        $('head img').remove();
    }

    // must implement if extends
    loadPaymentFunction(vendorId = null){
        this.paymentFunction = new NormalPayment(this.store);
    }
}
