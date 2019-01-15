import { Component, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Dispatcher, Store } from '@ngrx/store';

import { GlobalService } from '../../../services/global.service';
import * as checkout from '../../../store/checkout/checkout.actions';
import * as common from '../../../store/common/common.actions';
import * as fromRoot from '../../../store/index';
import {NormalPayment} from "../../base/payment/NormalPayment";
import {IPayment} from "../../base/payment/IPayment";
import {VendorPickupManagement} from "../../base/VendorPickupManagement";
import {IPickupInfoStorage} from "../../base/pickup_in_store/IPickupInfoStorage";
import * as _ from 'lodash';

@Component({
    selector: 'lt-checkout-failure',
    templateUrl: './failure.html',
    styleUrls: ['./failure.less']
})

export class LtCheckoutFailureComponent implements OnDestroy {

    COUNTDOWN_SECONDS: Number = 30;

    cart: any;
    userInfo: any;
    shippingAddress: any;
    orderSuccess: any;
    paymentMethod: any;
    shippingFee: number;
    shippingDuration: String;
    currentDate:any;

    paymentType: String = 'Cash On Delivery';
    vendorId: number;
    paymentFunction: IPayment;
    vendorSub: any;
    vendorInfo: any;
    vendorPickupMgr: VendorPickupManagement = VendorPickupManagement.getInstance();
    shippingVendors: any;
    pickupInfo: Array<IPickupInfoStorage> = [];
    hasPickupInStore: boolean = false;


    constructor(
        protected store: Store<fromRoot.AppState>,
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        private dispatcher: Dispatcher, private globalService: GlobalService) {
        this.vendorId = this.activatedRoute.params['value'].vendorId;
        this.vendorSub = this.store.select(fromRoot.vendorGetEntity).subscribe(vendorInfo => {
            this.vendorInfo = vendorInfo;
        });
        this.loadPaymentFunction(this.vendorId);

        if (!localStorage.getItem('cartId')) {
            this.goToCheckout();
        }

        const cartId = this.paymentFunction.getStorage('cartId');
        // this.pickupInfo = this.vendorPickupMgr.getVendorPickupInfo();

        this.cart = JSON.parse(this.paymentFunction.getStorage('cart'));
        this.shippingAddress = JSON.parse(this.paymentFunction.getStorage('shippingAddress'));
        this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
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
                    this.paymentType = 'Thanh toán trả góp';
                    break;
                case 'momo':
                    this.paymentType = 'Thanh toán bằng MoMo';
                    break;
                case 'zalopay':
                    this.paymentType = 'Ví điện tử ZaloPay';
                    break;
                default:
                    if (this.paymentMethod.method.indexOf('vietin_gateway') > -1) {
                        this.paymentType = 'Thẻ tín dụng/ghi nợ';
                    }
                    break;
            }
        }
        //this.store.dispatch(new checkout.CartRecreate(cartId));

        // Load tracking code
        if (this.orderSuccess) {
            this.store.dispatch(new common.LoadTrackingCode({ type: 'checkout_failure', id: this.orderSuccess.order_id }));
        }

    }

    ngAfterViewInit() {
        const cartId = localStorage.getItem('cartId_old');

        this.store.dispatch(new checkout.CartRecreate(cartId));

        this.dispatcher.subscribe((action) => {
            switch (action.type) {
                case checkout.CART_RECREATE_FAILED:
                    localStorage.removeItem('cartId');
                    localStorage.removeItem('cartInfo');
                    localStorage.removeItem('cartTotal');
                    this._startCountdown();
                    break;
                case checkout.CART_RECREATE_SUCCESS:
                    this._startCountdown();
                    break;
                default:
                    break;
            }

        });
    }

    goToCheckout() {
        window.location.href='/checkout?step=1';
        //this.router.navigate(['checkout'], { queryParams: { step: 1 } });
    }

    _startCountdown() {
        const intervalPaymentFail = setInterval(function () {
            this.COUNTDOWN_SECONDS--;

            if (parseInt(this.COUNTDOWN_SECONDS, 10) === 0) {
                clearInterval(intervalPaymentFail);
                this.goToCheckout();
            }
        }.bind(this), 1000);
    }

    ngOnDestroy() {
        this.store.dispatch(this.paymentFunction.getCartRefreshAction());
        this.globalService.removeTrackingCode();
        if(this.vendorSub){
            this.vendorSub.unsubscribe();
        }
    }

    // must implement if extends
    loadPaymentFunction(vendorId = null){
        this.paymentFunction = new NormalPayment(this.store);
    }
}
