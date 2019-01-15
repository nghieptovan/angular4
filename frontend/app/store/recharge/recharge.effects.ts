import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Actions} from '@ngrx/effects';
import {Effect} from '@ngrx/effects/src/effects';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import * as _ from 'lodash';

import * as fromRoot from '..';
import {GlobalService} from '../../services/global.service';
import * as RechargeAction from './recharge.actions';
import {RechargeService} from './recharge.service';

declare var $;

@Injectable()
export class RechargeEffects {
    page: any;

    constructor(private _actions: Actions,
                private http: Http,
                private rechargeService: RechargeService,
                private globalService: GlobalService,
                private store: Store<fromRoot.AppState>) {

    }

    @Effect()
    loadRechargeConfigs = this._actions.ofType(RechargeAction.LOAD_RECHARGE_CONFIG)
        .mergeMap((action) => this.rechargeService.getRechargeConfig()
            .map((data) => {
                if (typeof data[0] !== 'undefined') {
                    return new RechargeAction.LoadConfigSuccess({configs: data[0]});
                }
            }).catch((error) => {
                error = error.json();
                return Observable.of(new RechargeAction.LoadConfigFailed(error));
            })
        );


    @Effect()
    loadRechargeProvider$ = this._actions.ofType(RechargeAction.LOAD_PROVIDER_RECHARGE)
        .withLatestFrom(this.store.select(fromRoot.rechargeSelectType))
        .mergeMap(([action, rechargeType]) => this.rechargeService.getRechargeProvider(rechargeType)
            .map((data) => {
                return new RechargeAction.LoadProviderRechargeSucess({provider: data});
            }).catch((error) => {
                error = error.json();
                return Observable.of(new RechargeAction.LoadProviderRechargeFailed(error));
            })
        );

    @Effect()
    loadRechargeProduct$ = this._actions.ofType(RechargeAction.LOAD_PRODUCT_RECHARGE)
        .withLatestFrom(this.store.select(fromRoot.rechargeSelectType))
        .mergeMap(([action, rechargeType]) => this.rechargeService.getRechargeProduct(rechargeType)
            .map((data) => {
                return new RechargeAction.LoadProductRechargeSucess({products: data});
            }).catch((error) => {
                error = error.json();
                return Observable.of(new RechargeAction.LoadProductRechargeFailed(error));
            })
        );


    @Effect()
    createCart$ = this._actions.ofType(RechargeAction.CREATE_CART)
        .withLatestFrom(this.store.select(fromRoot.rechargeGetCartInfo))
        .mergeMap(([action, cartInfo]) => this.rechargeService.createCartEmpty(cartInfo)
            .map(cart => cart.json())
            .map(cart => {
                localStorage.setItem('rechargeCartId', cart);
                return new RechargeAction.CreateCartSuccess(cart);
            }).catch((error) => {
                error = error.json();
                return Observable.of(new RechargeAction.CreateCartFailed(error));
            })
        );


    @Effect()
    updateCartProduct$ = this._actions.ofType(RechargeAction.UPDATE_CART_PRODUCT)
        .withLatestFrom(this.store.select(fromRoot.rechargeGetCartRequest), this.store.select(fromRoot.rechargeGetCartInfo))
        .mergeMap(([action, cartRequest, cartInfo]) => this.rechargeService.updateCartProduct(cartRequest)
            .map(data => data.json())
            .map((data) => {
                return new RechargeAction.UpdateCartProductSuccess({cartInfo: cartRequest, cartTotal: data});
            }).catch((error) => {
                error = error.json();
                if (error && error.message.indexOf('No such entity') > -1 || error.message.indexOf('required field') > -1) {
                    localStorage.removeItem('rechargeCartId');
                } else {
                    return Observable.of(new RechargeAction.UpdateCartProductFailed({
                        error: error,
                        cartRequest: cartInfo,
                        cartInfo: cartInfo
                    }));
                }
            })
        );

    @Effect()
    getCart$ = this._actions.ofType(RechargeAction.GET_CART)
        .mergeMap((cartTotal) => this.rechargeService.getCart()
            .map(data => data.json())
            .map(data => {
                if (data.quote_id) {
                    localStorage.setItem('rechargeCartId', data.quote_id);
                }
                return new RechargeAction.GetCartSuccess({cartTotal: data});
            }).catch((error) => {
                error = error.json();
                if (error && error.message.indexOf('required field') > -1 || error.message.indexOf('Cannot load your cart') > -1) {
                    localStorage.removeItem('rechargeCartId');
                    location.href = '/mobilerecharge/phonecard';
                    return Observable.of(new RechargeAction.GetCartFailed(''));

                } else {
                    return Observable.of(new RechargeAction.GetCartFailed(error));
                }
            })
        );


    @Effect() addCoupon$ = this._actions.ofType(RechargeAction.CART_ADD_COUPON)
        .switchMap((action) => this.rechargeService.addCoupon(action.payload)
            .map(data => data.json())
            .map((data) => {
                return new RechargeAction.CartAddCouponSuccess({cartTotal: data});
            }).catch((error, response) => {
                return Observable.of(new RechargeAction.CartAddCouponFailed(error));
            })
        );

    @Effect() deleteCoupon$ = this._actions.ofType(RechargeAction.CART_DELETE_COUPON)
        .switchMap((action) => this.rechargeService.deleteCoupon()
            .map(data => data.json())
            .map((data) => {
                return new RechargeAction.CartDeleteCouponSuccess({cartTotal: data});
            }).catch((error, response) => {
                return Observable.of(new RechargeAction.CartDeleteCouponFailed(error));
            })
        );

    @Effect() getLpoint$ = this._actions.ofType(RechargeAction.CART_GET_LPOINT)
        .switchMap((action) => this.rechargeService.getLpoint()
            .map(data => data.json())
            .map((data) => {
                return new RechargeAction.CartGetLPointSuccess({cartTotal: data});
            }).catch((error) => {
                error = error.json();
                if (error && error.message.indexOf('required field') > -1) {
                    return Observable.of(new RechargeAction.CartGetLPointFailed(''));
                } else {
                    return Observable.of(new RechargeAction.CartGetLPointFailed(error));
                }

            })
        );

    @Effect() applyLPoint$ = this._actions.ofType(RechargeAction.CART_APPLY_LPOINT)
        .switchMap((action) => this.rechargeService.applyLPoint(action.payload)
            .map(data => data.json())
            .map((data) => {
                return new RechargeAction.CartApplyLPointSuccess({cartTotal: data});
            }).catch((error) => {
                error = error.json();
                return Observable.of(new RechargeAction.CartApplyLPointFailed(error));

            })
        );


    @Effect() creditCardTransactionRequest$ = this._actions.ofType(RechargeAction.CART_CC_TRANSACTION_REQUEST)
        .switchMap((action) =>
            this.rechargeService.creditCardTransactionRequest(action.payload)
                .map((resp) => {
                    return new RechargeAction.CartCCTransactionRequestSuccess(resp.json());
                }).catch((error) => {
                error = error.json();
                return Observable.of(new RechargeAction.CartCCTransactionRequestFailed(error));
            })
        );

    @Effect() checkOrderStatus$ = this._actions.ofType(RechargeAction.CART_CHECK_ORDER_STATUS)
        .switchMap((action) =>
            this.rechargeService.checkOrderStatus()
                .map((resp) => {
                    if (resp && resp.json().success) {
                        return new RechargeAction.CartCheckOrderStatusSuccess();
                    } else {
                        return new RechargeAction.CartCheckOrderStatusFailed(resp.json().error_message);
                    }

                }).catch((error) => {
                return Observable.of(new RechargeAction.CartCheckOrderStatusFailed(error));
            })
        );


    @Effect() cartGetPaymentMethod$ = this._actions.ofType(RechargeAction.CART_GET_PAYMENT_METHODS)
        .switchMap((action) =>
            this.rechargeService.getPaymentMethods()
                .map((resp) => {
                    const data = resp.json();
                    if (data.length) {
                        localStorage.setItem('allowedRechargePaymentMethods', JSON.stringify(data));
                    }
                    return new RechargeAction.CartGetPaymentMethodsSuccess(data);
                }).catch((error) => {
                return Observable.of(new RechargeAction.CartGetPaymentMethodsFailed(error));
            })
        );

    @Effect() setPaymentMethod$ = this._actions.ofType(RechargeAction.CART_SET_PAYMENT_METHOD)
        .switchMap((action) =>
            this.rechargeService.setPaymentMethod(action.payload)
                .map((resp) => {
                    if (resp.json() && !resp.json().message) {
                        return new RechargeAction.CartSetPaymentMethodSuccess({
                            paymentInfo: action.payload,
                            cartTotal: resp.json()
                        });
                    }
                    return Observable.of(new RechargeAction.CartSetPaymentMethodFailed(resp));
                }).catch((error) => {
                return Observable.of(new RechargeAction.CartSetPaymentMethodFailed(error));
            })
        );

    @Effect()
    placeOrder$ = this._actions.ofType(RechargeAction.PLACE_ORDER)
        .withLatestFrom(this.store.select(fromRoot.rechargeGetCartInfo), this.store.select(fromRoot.rechargeSelectPayment))
        .mergeMap(([action, cartInfo, paymentInfo]) => this.rechargeService.placeOrder(cartInfo, paymentInfo)
            .map(resp => {
                try {
                    const data = JSON.parse(resp.text());
                    localStorage.setItem('rechargePaymentMethod', paymentInfo.payment_method);
                    if (data && data.url) {
                        return new RechargeAction.CartRedirectToPaymentGateway(data);
                    } else if (data) {
                        this.globalService.syncCartCookies();
                        return new RechargeAction.PlaceOrderSuccess(data);
                    }
                } catch (exception) {
                }
                this.globalService.syncCartCookies();
            }).catch((error, response) => {
                error = error.json();
                return Observable.of(new RechargeAction.PlaceOrderFailed(error.message));
            })
        );


}
