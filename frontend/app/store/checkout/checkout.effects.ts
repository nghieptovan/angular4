import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';

import { GlobalService } from '../../services/global.service';
import { HttpService } from '../../services/http.service';
import * as fromRoot from '../index';
import { ProductsService } from '../products/products.service';
import { PaymentMethodTransformer } from './../../transformers/PaymentMethodTransformer';
import { ShippingAddressTransformer } from './../../transformers/ShippingAddressTransformer';
import * as checkout from './checkout.actions';
import * as account from '../account/account.actions';
import { CheckoutService } from './checkout.service';

import * as _ from 'lodash';
import {GlobalConstants} from "../../components/base/constants/GlobalConstants";

@Injectable()
export class CheckoutEffects {
    page: any;
    cartCount$: Observable<any>;
    constructor(
        protected _actions: Actions,
        protected router: Router,
        protected httpService: HttpService,
        protected checkoutService: CheckoutService,
        protected productsService: ProductsService,
        protected store: Store<fromRoot.AppState>,
        protected globalService: GlobalService) {
    }

    // LOAD CART INFO
    @Effect()
    cartLoad$ = this._actions.ofType(checkout.CART_LOAD)
        .withLatestFrom(this.store.select(fromRoot.commonGetSharedSession))
        .switchMap(([action, sharedSession]) => {
            return this.checkoutService.loadCartTotalInfo()
                .map((resp) => {
                    return resp.json();
                })
                .withLatestFrom(this.store.select(fromRoot.checkoutGetShippingVendors))
                .map(([cart, shippingVendors]) => {
                    const token = localStorage.getItem('token');
                    if (token && cart.cart_info.id) {
                        localStorage.setItem('cartId', cart.cart_info.id);
                    }
                    if (!shippingVendors.length) {
                        this.globalService.loadShippingRuleForCurrentLocation();
                    }
                    const cartTotalItems = _.get(cart, `cart_totals.items`, []);
                    const cartTotalItemsQty = _.get(cart, `cart_totals.items_qty`, 0);

                    const totalItems = _.sumBy(cartTotalItems, (item:any) => {
                        return item.qty;
                    });

                    if (totalItems !== cartTotalItemsQty) {
                        this.store.dispatch(new checkout.CartLoad());
                    }
                    return new checkout.CartLoadSuccess(cart);
                }).catch((error) => {
                    return Observable.of(new checkout.CartLoadFailed(error));
                });
        });

    // LOAD CART SHIPPING RULE
    @Effect() cartLoadShippingRule$ = this._actions.ofType(checkout.CART_LOAD_SHIPPING_RULE)
        .withLatestFrom(this.store.select(fromRoot.checkoutGetCartItemsCount))
        .switchMap(([action, cartCount]) => {
            // const cartId = localStorage.getItem('cartId');
            if (cartCount <= 0) {
                return Observable.of(new checkout.CartLoadShippingRuleFailed(null));
            }
            return this.checkoutService.loadCartShippingRuleCustom(action.payload)
                .map(resp => {
                    if (resp.json()) {
                        return new checkout.CartLoadShippingRuleSuccess(resp.json());
                    }
                    return Observable.of(new checkout.CartLoadShippingRuleFailed(resp));
                }).catch((error) => {
                    return Observable.of(new checkout.CartLoadShippingRuleFailed(error));
                });
        });

    // CREATE EMPTY CART
    @Effect() cartCreate$ = this._actions.ofType(checkout.CART_CREATE)
        .switchMap((action: any) =>
            this.checkoutService.createCart()
                .map(cart => cart.json())
                .map(cart => {
                    localStorage.setItem('cartId', cart);
                    return new checkout.CartCreateSuccess(cart);
                }).catch((error) => {
                    return Observable.of(new checkout.CartCreateFailed(error));
                })
        );

    // MERGE CART WHEN LOGGING IN
    @Effect() cartMerge$ = this._actions.ofType(checkout.CART_MERGE)
        .switchMap((action: any) =>
            this.checkoutService.mergeCart(action.payload)
                .map(count => count.json())
                .map(count => {
                    this.store.dispatch(new checkout.CartLoad());

                    this.globalService.syncCartCookies();
                    return new checkout.CartMergeSuccess(count);
                }).catch((error) => {
                    return Observable.of(new checkout.CartCreateFailed(error));
                })
        );

    // ADD ITEMS TO CART
    @Effect() cartAddItems$ = this._actions.ofType(checkout.CART_ADD_ITEMS)
        .withLatestFrom(this.store.select(fromRoot.checkoutGetCartItemsCount), this.store.select(fromRoot.checkoutGetCartItems))
        .mergeMap(([action, cartCount, cartItems]) => {
            const cartId = localStorage.getItem('cartId');
            if (!cartId) {
                return Observable.of(new checkout.CartAddItemsFailed('Cart doesn\'t exist'));
            }

            const qtyToAdd = action.payload.product.cartItem.qty;
            const skuToAdd = action.payload.product.cartItem.sku;
            const maximumShopping = action.payload.maximumShopping ? action.payload.maximumShopping : 50;
            if (cartCount + parseInt(qtyToAdd) <= 50) {
                const product = _.find(cartItems, (item) => {
                    return item.sku === skuToAdd;
                });

                if (product && qtyToAdd + product.qty > maximumShopping) {
                    return Observable.of(new checkout.CartAddItemsFailed('Vì giá đang tốt nhất, chúng tôi xin giới hạn tối đa sản phẩm này trong một đơn hàng là ' + maximumShopping + ' sản phẩm. Mong quý khách thông cảm!'));
                } else {
                    action.payload.product.cartItem.extension_attributes = {
                        quote_later_id : localStorage.getItem('cartLaterId')
                    };
                    return this.checkoutService.addItemToCart(action.payload.product)
                        .map(item => item.json())
                        .map(item => {
                            this.globalService.syncCartCookies();
                            //
                            return new checkout.CartAddItemsSuccess(item);
                        }).catch((error, response) => {
                            try {
                                error = error.json();
                                return Observable.of(new checkout.CartAddItemsFailed(error.message));
                            } catch (e) {
                                return Observable.of(new checkout.CartAddItemsFailed(error));
                            }
                        });
                }

            } else {
                if (action.payload.isCheckoutClicked) {
                    return Observable.of(new checkout.CartAddItemsFailed('Chúng tôi giới hạn tối đa 50 sản phẩm trong giỏ hàng.'));
                } else {
                    return Observable.of(new checkout.CartAddItemsFailed(`Bạn không thể thêm "` + action.payload.product.cartItem.name + `" với số lượng `
                        + action.payload.product.cartItem.qty + `, chúng tôi có giới hạn số lượng 50 trong giỏ hàng.`));
                }
            }
        });

    // UPDATE CART
    @Effect() updateCartItem$ = this._actions.ofType(checkout.CART_UPDATE_ITEM)
        .withLatestFrom(this.store.select(fromRoot.checkoutGetCartItemsCount))
        .mergeMap(([action, cartCount]) => {
            const qtyChanged = action.payload.qty - action.payload.old_qty;
            if (cartCount + qtyChanged <= 50) {
                return this.checkoutService.updateCartItem(action.payload)
                    .map(item => {
                        this.globalService.syncCartCookies();
                        return new checkout.CartUpdateItemSuccess(item.json());
                    }).catch((error, response) => {
                        return Observable.of(new checkout.CartUpdateItemFailed(error));
                    });
            } else {
                return Observable.of(new checkout.CartUpdateItemFailed('Chúng tôi giới hạn tối đa 50 sản phẩm trong giỏ hàng.'));
            }
        });

    @Effect() deleteCartItem$ = this._actions.ofType(checkout.CART_DELETE_ITEM)
        .switchMap((action) =>
            this.checkoutService.deleteCartItem(action.payload)
                .map(resp => {
                    // Pass deleted item back to reducer
                    this.globalService.syncCartCookies();
                    return new checkout.CartDeleteItemSuccess(resp.json());
                }).catch((error, response) => {
                    return Observable.of(new checkout.CartDeleteItemFailed(error));
                })
        );

    @Effect() deleteMultipleCartItems$ = this._actions.ofType(checkout.CART_DELETE_MULTIPLE_ITEMS)
        .switchMap((action) => {
            return this.checkoutService.deleteMultipleCartItems(action.payload)
                .map((results) => {
                    this.globalService.syncCartCookies();
                    return new checkout.CartDeleteMultipleItemsSuccess(results.json());
                }).catch((error) => {
                    return Observable.of(new checkout.CartDeleteMultipleItemsFailed(error));
                });
        });

    // CART UPDATE SHIPPING INFO
    @Effect() updateCartShippingInfo$ = this._actions.ofType(checkout.CART_UPDATE_SHIPPING_INFO)
        .switchMap((action) =>
            this.checkoutService.updateShippingInfo(ShippingAddressTransformer.transform(null))
                .map(resp => resp.json())
                .map(results => {
                    this.globalService.syncCartCookies();
                    return new checkout.CartUpdateShippingInfoSuccess(results);
                }).catch((error, response) => {
                    return Observable.of(new checkout.CartUpdateShippingInfoFailed(error));
                })
        );


    // CART UPDATE BILLING ADDRESS
    @Effect() updateCartPaymentInformation$ = this._actions.ofType(checkout.CART_UPDATE_PAYMENT_INFORMATION)
        .switchMap((action) => {
            const isPaymentChanged = this.globalService.reloadCartWhenTimestampChanged();
            if (isPaymentChanged) {
                this.store.dispatch(new checkout.UpdateCurrentStep(1));
                this.store.dispatch(new checkout.CartLoad());
                return Observable.of(new checkout.CartUpdatePaymentInformationFailed('Sản phẩm bạn mua có cập nhật mới. Xin vui lòng thanh toán lại.'));
            } else {
                return this.checkoutService.updatePaymentInformation(PaymentMethodTransformer.transform(action.payload))
                    .map(resp => {
                        try {
                            const data = JSON.parse(resp.text());
                            if (data && data.url) {
                                return new checkout.CartRedirectToPaymentGateway(data);
                            } else if (data) {
                                this.globalService.syncCartCookies();
                                return new checkout.CartUpdatePaymentInformationSuccess(data);
                            }
                        } catch (exception) { }
                        this.globalService.syncCartCookies();
                        return new checkout.CartUpdatePaymentInformationSuccess(resp.text());
                    }).catch((error, response) => {
                        error = error.json();
                        if (error && error.message === 'CART_INVALID:') {
                            this.store.dispatch(new checkout.UpdateCurrentStep(1));
                            this.store.dispatch(new checkout.CartLoad());
                            return Observable.of(new checkout.CartUpdatePaymentInformationFailed('Sản phẩm bạn mua có cập nhật mới. Xin vui lòng thanh toán lại.'));
                        }else
                        if (error && error.message === 'LPOINT_INVALID:') {
                            this.store.dispatch(new checkout.UpdateCurrentStep(3));
                            this.store.dispatch(new checkout.CartApplyLPoint(0));
                            this.store.dispatch(new checkout.CartLoad());
                            return Observable.of(new checkout.CartUpdatePaymentInformationFailed(checkout.LPOINT_OUT_TIME_ERROR_MESSAGE));
                        }else
                        if (error && error.message === 'LPOINT_INVALID_CART:') {
                            this.store.dispatch(new checkout.UpdateCurrentStep(3));
                            this.store.dispatch(new checkout.CartApplyLPoint(0));
                            this.store.dispatch(new checkout.CartLoad());
                            return Observable.of(new checkout.CartUpdatePaymentInformationFailed(checkout.LPOINT_CART_ERROR_MESSAGE));
                        } else {
                            return Observable.of(new checkout.CartUpdatePaymentInformationFailed(error));
                        }
                    });
            }
        });

    @Effect() addCoupon$ = this._actions.ofType(checkout.CART_ADD_COUPON)
        .switchMap((action) =>
            this.checkoutService.addCoupon(action.payload)
                .map((resp) => {
                    // this.globalService.syncCartCookies();
                    return new checkout.CartAddCouponSuccess(resp.json());
                }).catch((error, response) => {
                    return Observable.of(new checkout.CartAddCouponFailed(error));
                })
        );

    @Effect() getCoupon$ = this._actions.ofType(checkout.CART_GET_COUPON)
        .switchMap((action) =>
            this.checkoutService.getCoupon()
                .map((resp) => {
                    return new checkout.CartGetCouponSuccess(resp.text);
                }).catch((error, response) => {
                    return Observable.of(new checkout.CartGetCouponFailed(error));
                })
        );
    @Effect() deleteCoupon$ = this._actions.ofType(checkout.CART_DELETE_COUPON)
        .switchMap((action) =>
            this.checkoutService.deleteCoupon()
                .map((resp) => {
                    // this.globalService.syncCartCookies();
                    return new checkout.CartDeleteCouponSuccess(resp.json());
                }).catch((error, response) => {
                    return Observable.of(new checkout.CartDeleteCouponFailed(error));
                })
        );

    @Effect() getPaymentRules$ = this._actions.ofType(checkout.CART_GET_PAYMENT_RULES)
        .withLatestFrom(this.store.select(fromRoot.checkoutGetPaymentRules))
        .switchMap(([action, paymentRules]) => {
            if (!paymentRules.banks.length) {
                return this.checkoutService.getPaymentRules()
                    .map((resp) => {
                        const result = resp.json();
                        localStorage.setItem('paymentRules', JSON.stringify(result));
                        return new checkout.CartGetPaymentRulesSuccess(result);
                    }).catch((err, resp) => {
                        return Observable.of(new checkout.CartGetPaymentRulesFailed(err));
                    });
            } else {
                return Observable.of();
            }
            /*if (localStorage.getItem('paymentRules') === null) {
            } else {
                const paymentRules = localStorage.getItem('paymentRules');
                return Observable.of(new checkout.CartGetPaymentRulesSuccess(JSON.parse(paymentRules)));
            }*/
        });

    @Effect() updateCurrentStep = this._actions.ofType(checkout.UPDATE_CURRENT_STEP)
        .switchMap((action) => {
            const path = this.router['url'];
            const currentUrl = path.indexOf('?') === -1 ? path : path.substring(0, path.indexOf('?'));
            this.router.navigate([currentUrl], { queryParams: { step: action.payload } });
            const mainContent = document.querySelector('#maincontent');

            if (mainContent) {
                window.scrollTo(0, mainContent['offsetTop']);
            }
            return Observable.of();
        });

    @Effect() applyLPoint$ = this._actions.ofType(checkout.CART_APPLY_LPOINT)
        .switchMap((action) =>
            this.checkoutService.applyLPoint(action.payload)
                .map((resp) => {
                    return new checkout.CartApplyLPointSuccess(resp.json());
                }).catch((error) => {
                    error = error.json();
                    if (error && error.message === 'LPOINT_INVALID:') {
                        this.store.dispatch(new checkout.UpdateCurrentStep(3));
                        this.store.dispatch(new checkout.CartLoad());
                        return Observable.of(new checkout.CartApplyLPointFailed(checkout.LPOINT_OUT_TIME_ERROR_MESSAGE));
                    }else
                        if (error && error.message === 'LPOINT_INVALID_CART:') {
                        this.store.dispatch(new checkout.UpdateCurrentStep(3));
                        this.store.dispatch(new checkout.CartLoad());
                        return Observable.of(new checkout.CartApplyLPointFailed(checkout.LPOINT_CART_ERROR_MESSAGE));
                    }else {
                        return Observable.of(new checkout.CartApplyLPointFailed(error));
                    }

                })
        );

    @Effect() checkOrderStatus$ = this._actions.ofType(checkout.CART_CHECK_ORDER_STATUS)
        .switchMap((action) =>
            this.checkoutService.checkOrderStatus()
                .map((resp) => {
                    if (resp && resp.json().success) {
                        return new checkout.CartCheckOrderStatusSuccess();
                    } else {
                        return new checkout.CartCheckOrderStatusFailed(resp.json().error_message);
                    }

                }).catch((error) => {
                    return Observable.of(new checkout.CartCheckOrderStatusFailed(error));
                })
        );

    @Effect() recreateCart$ = this._actions.ofType(checkout.CART_RECREATE)
        .switchMap((action) =>
            this.checkoutService.recreateCart(action.payload)
                .map((resp) => {
                    const data = resp.json();
                    if (data.cart_totals) {
                        if (data.guest_cart_id) {
                            localStorage.setItem('cartId', data.guest_cart_id);
                        } else {
                            localStorage.setItem('cartId', data.cart_info.id);
                        }
                        return new checkout.CartRecreateSuccess(data);
                    } else {
                        return Observable.of(new checkout.CartRecreateFailed(data));
                    }
                }).catch((error) => {
                    return Observable.of(new checkout.CartRecreateFailed(error));
                })
        );

    @Effect() setPaymentMethod$ = this._actions.ofType(checkout.CART_SET_PAYMENT_METHOD)
        .switchMap((action) =>
            this.checkoutService.setPaymentMethod(action.payload)
                .map((resp) => {
                    if (resp.json() && !resp.json().message) {
                        return new checkout.CartSetPaymentMethodSuccess(resp.json());
                    }
                    return Observable.of(new checkout.CartSetPaymentMethodFailed(resp));
                }).catch((error) => {
                    return Observable.of(new checkout.CartSetPaymentMethodFailed(error));
                })
        );

    @Effect() creditCardTransactionRequest$ = this._actions.ofType(checkout.CART_CC_TRANSACTION_REQUEST)
        .switchMap((action) =>
            this.checkoutService.creditCardTransactionRequest(action.payload)
                .map((resp) => {
                    return new checkout.CartCCTransactionRequestSuccess(resp.json());
                }).catch((error) => {
                    return Observable.of(new checkout.CartCCTransactionRequestFailed(error));
                })
        );

    @Effect() cartGetPaymentMethod$ = this._actions.ofType(checkout.CART_GET_PAYMENT_METHODS)
        .switchMap((action) =>
            this.checkoutService.getPaymentMethods()
                .map((resp) => {
                    const data = resp.json();
                    if (data.length) {
                        localStorage.setItem('allowedPaymentMethods', JSON.stringify(data));
                    }
                    return new checkout.CartGetPaymentMethodsSuccess(data);
                }).catch((error) => {
                    return Observable.of(new checkout.CartGetPaymentMethodsFailed(error));
                })
        );

    @Effect()
    addWishlistToCart$ = this._actions.ofType(checkout.CART_ADD_WISHLIST)
        .switchMap((action) => {
            return this.checkoutService.addWishlistToCart(action.payload)
                .map(resp => {
                    this.store.dispatch(new account.LoadWishList(0));
                    return new checkout.CartAddWishlistSuccess(resp.json());
                }).catch((error) => {
                    return Observable.of(new checkout.CartAddWishlistFailed(error.json()));
                });
        });


    // LOAD CART LAter INFO
    @Effect()
    CartLaterLoad$ = this._actions.ofType(checkout.CART_LATER_LOAD)
        .switchMap((action) => {
            return this.checkoutService.loadCartLater()
                .map((resp) => {
                    return new checkout.CartLaterLoadSuccess(resp.json());
                }).catch((error) => {
                    return Observable.of(new checkout.CartLaterLoadFailed(error));
                });
        });

    // // CREATE CART LATER
    // @Effect()
    // CartLaterCreate$ = this._actions.ofType(checkout.CART_LATER_CREATE)
    //     .switchMap((action) => {
    //         return this.checkoutService.createCartLater()
    //             .map((resp) => {
    //                 localStorage.setItem('cartLaterId', resp.json());
    //                 return new checkout.CartLaterCreateSuccess(resp.json());
    //             }).catch((error) => {
    //                 return Observable.of(new checkout.CartLaterCreateFailed(error));
    //             });
    //     });

    // ADD ITEMS TO CART
    @Effect() cartLaterAddItems$ = this._actions.ofType(checkout.CART_LATER_ADD_ITEM)
    .switchMap((action) => {
        return this.checkoutService.addItemToCartLater(action.payload)
        .map((resp) => {
                //this.globalService.syncCartCookies();
                if(resp.json().error){
                    return new checkout.CartLaterAddItemFailed(resp.json());
                }else{
                    return new checkout.CartLaterAddItemSuccess(resp.json());
                }
            }).catch((error) => {
                try {
                    error = error.json();
                    return Observable.of(new checkout.CartLaterAddItemFailed(error.message));
                } catch (e) {
                    return Observable.of(new checkout.CartLaterAddItemFailed(error));
                }

            });
        });

    // DELETE CART LATER ITEM
    @Effect() deleteCartLaterItem$ = this._actions.ofType(checkout.CART_LATER_DELETE_ITEM)
        .switchMap((action) =>
            this.checkoutService.deleteCartLaterItem(action.payload)
                .map(resp => {
                    return new checkout.CartLaterDeleteItemSuccess(resp.json());
                }).catch((error, response) => {
                    return Observable.of(new checkout.CartLaterDeleteItemFailed(error));
                })
        );

    @Effect() validateCardNo$ = this._actions.ofType(checkout.CART_VALIDATE_CARD_NO)
        .switchMap((action) =>
            this.checkoutService.validateBank(action.payload)
                .map(resp => {
                    return new checkout.cartValidateCardNoSuccess(resp.json());
                }).catch((error, response) => {
                return Observable.of(new checkout.cartValidateCardNoFailed(error));
            })
        );
}
