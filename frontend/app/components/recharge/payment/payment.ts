import {Component, OnInit, ViewChild} from '@angular/core';
import {Dispatcher, Store} from '@ngrx/store';
import * as rechargeAction from '../../../store/recharge/recharge.actions';
import {Subscription} from 'rxjs/Subscription';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {RechargeService} from '../../../store/recharge/recharge.service';

import * as fromRoot from '../../../store';
import * as _ from 'lodash';

declare var $;

@Component({
    selector: 'app-recharge-payment',
    templateUrl: './payment.html'
})
export class PaymentRechargeComponent implements OnInit {

    @ViewChild('creditCardForm') creditCardForm: NgForm;

    @ViewChild('localAtmForm') localAtmForm: NgForm;


    selectedPaymentSub: any;
    selectedPayment: any;

    ccPromotionPaymentSub: any;
    ccPromotionPayment: Array<any>;

    cartInfoSub: any;
    cartInfo: any;

    cartTotalSub: any
    cartTotal: any

    subscriber: Subscription;
    currentPage: any;

    constructor(private store: Store<fromRoot.AppState>, private dispatcher: Dispatcher, protected router: Router, protected rechargeService: RechargeService) {
        this.selectedPaymentSub = this.store.select(fromRoot.rechargeSelectPayment).subscribe(state => {
            this.selectedPayment = state;
        });

        this.store.dispatch(new rechargeAction.CartGetPaymentMethods());

        this.ccPromotionPaymentSub = this.store.select(fromRoot.rechargeGetPaymentMethods).subscribe(paymentMethods => {
            this.ccPromotionPayment = _.filter(paymentMethods, (paymentMethod: any) => {
                return paymentMethod.code.indexOf('promotion_recharge') > -1;
            });
        });


        this.cartTotalSub = this.store.select(fromRoot.rechargeGetCartTotal).subscribe(rechargeCartTotal => {
            this.cartTotal = rechargeCartTotal;
        });

        this.currentPage = 'phonecard';
        if (this.router.url.indexOf('phonecard') > -1) {
            this.currentPage = 'phonecard';
        } else if (this.router.url.indexOf('topup') > -1) {
            this.currentPage = 'topup';
        } else if (this.router.url.indexOf('gamecard') > -1) {
            this.currentPage = 'gamecard';
        }
    }

    ngOnInit(): void {
        this.subscriber = this.dispatcher.subscribe((action) => {

            this.cartInfoSub = this.store.select(fromRoot.rechargeGetCartInfo).subscribe(cartInfo => {
                this.cartInfo = cartInfo;
            });

            switch (action.type) {
                case rechargeAction.PLACE_ORDER_SUCCESS:
                    localStorage.setItem('rechargeOrderSuccess', JSON.stringify(action.payload));

                    this.cartInfoSub = this.store.select(fromRoot.rechargeGetCartInfo).subscribe(cartInfo => {
                        this.cartInfo = cartInfo;
                    });

                    localStorage.setItem('rechargeCart', JSON.stringify(this.cartInfo));

                    if (this.selectedPayment.payment_method && this.selectedPayment.payment_method.indexOf('vietin_gateway') > -1) {
                        this.store.dispatch(new rechargeAction.CartCCTransactionRequest(action.payload));
                    }
                    break;

                case rechargeAction.CART_REDIRECT_TO_PAYMENT_GATEWAY:
                    localStorage.setItem('rechargeOrderSuccess', JSON.stringify(action.payload));
                    localStorage.setItem('rechargeCart', JSON.stringify(this.cartInfo));
                    location.href = action.payload.url;
                    break;
                case rechargeAction.UPDATE_CART_PRODUCT_SUCCESS:
                    if (this.isBankPromotion(this.cartTotal)) {
                        const selectedPaymentRequest = Object.assign({}, this.selectedPayment);
                        selectedPaymentRequest.payment_method = 'local_atm';
                        this.store.dispatch(new rechargeAction.CartSetPaymentMethod(selectedPaymentRequest));
                    }

                    if (this.isUsingLpoint(this.cartTotal)) {
                        this.store.dispatch(new rechargeAction.CartApplyLPoint(0));
                    }
                    break;
                case rechargeAction.CREATE_CART_SUCCESS:
                    this.store.dispatch(new rechargeAction.CartGetPaymentMethods());
                    break;
                default:
                    break;
            }
        });
    }

    ngOnDestroy() {
        this.selectedPaymentSub.unsubscribe();
    }

    isBankPromotion(cartTotal) {
        if (this.cartTotal && this.cartTotal.discount_amount !== 0 && this.cartTotal.coupon_code === undefined) {
            return true;
        }
        return false;
    }

    isUsingLpoint(cartTotal) {
        if (this.cartTotal && this.cartTotal.lpoint_amount !== 0 && (this.cartTotal.subtotal + this.cartTotal.lpoint_amount) < 0 ) {
            return true;
        }
        return false;
    }

    selectPaymentMethod(selectPayment) {
        if (this.selectedPayment) {
            const selectedPaymentRequest = Object.assign({}, this.selectedPayment);
            selectedPaymentRequest.payment_method = selectPayment;
            this.store.dispatch(new rechargeAction.CartSetPaymentMethod(selectedPaymentRequest));

        }
    }

    placeOrder() {
        this.rechargeService.emitPlaceOrderEvent(true);

        setTimeout(() => {
            if (this.selectedPayment) {
                if (this.selectedPayment.payment_method && this.selectedPayment.payment_method.indexOf('vietin_gateway') > -1) {
                    $('#submit_' + this.selectedPayment.payment_method).trigger('click');
                }

                if (this.selectedPayment.payment_method === 'local_atm') {
                    $('#local_atm_submit').trigger('click');
                }
            }
        }, 10);

    }

}
