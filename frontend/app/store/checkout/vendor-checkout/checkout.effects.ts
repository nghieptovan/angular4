import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';

import { GlobalService } from '../../../services/global.service';
import { HttpService } from '../../../services/http.service';
import * as fromRoot from '../../index';
import { ProductsService } from '../../products/products.service';
import { PaymentMethodTransformer } from '../../../transformers/PaymentMethodTransformer';
import { ShippingAddressTransformer } from '../../../transformers/ShippingAddressTransformer';
import * as checkout from './checkout.actions';
import * as account from '../../account/account.actions';
import { VendorCheckoutService } from './checkout.service';

import * as _ from 'lodash';
import {CheckoutEffects} from "../checkout.effects";
import {LocalStorageConstants} from "../../../components/base/constants/LocalStorageConstants";
import {LocalStorageManagement} from "../../../components/base/LocalStorageManagement";
import {CART_TYPE, CartManagement} from "../../../components/base/cart/CartManagement";

@Injectable()
export class VendorCheckoutEffects{
    constructor(
        protected _actions: Actions,
        protected router: Router,
        protected httpService: HttpService,
        protected checkoutService: VendorCheckoutService,
        protected productsService: ProductsService,
        protected store: Store<fromRoot.AppState>,
        protected globalService: GlobalService) {
        // super(actions, router, httpService, checkoutService, productsService, store, globalService);
    }

    storageCartId(vendorId, cartId){
        LocalStorageManagement.getInstance().storeStorageVendorCartInfo(vendorId, {cartId: cartId});
    }

    // LOAD CART INFO
    @Effect()
    cartLoad$ = this._actions.ofType(checkout.CART_LOAD)
        .withLatestFrom(this.store.select(fromRoot.commonGetSharedSession))
        .switchMap(([action, sharedSession]) => {
            return this.checkoutService.loadCartTotalInfo(action.payload.vendorId)
                .map((resp) => {
                    return resp.json();
                })
                .withLatestFrom(this.store.select(fromRoot.vendorCheckoutGetShippingVendors))
                .map(([cart, shippingVendors]) => {
                    const token = localStorage.getItem('token');
                    if (token && cart.cart_info.id) {
                        this.storageCartId(action.payload.vendorId, cart.cart_info.id)
                    }

                    if (!shippingVendors.length) {
                        this.globalService.loadShippingRuleForCurrentLocation({
                            type: CART_TYPE.VENDOR_CART,
                            id: action.payload.vendorId
                        });
                    }
                    const cartTotalItems = _.get(cart, `cart_totals.items`, []);
                    const cartTotalItemsQty = _.get(cart, `cart_totals.items_qty`, 0);

                    const totalItems = _.sumBy(cartTotalItems, (item:any) => {
                        return item.qty;
                    });

                    if (totalItems !== cartTotalItemsQty) {
                        this.store.dispatch(new checkout.CartLoad(action));
                    }
                    cart.vendorId = action.payload.vendorId;
                    return new checkout.CartLoadSuccess(cart);
                }).catch((error) => {
                    const cartId = LocalStorageManagement.getInstance().getStorageVendorCartId(action.payload.vendorId);
                    const token = localStorage.getItem('token');
                    //[LT-1008] huytt: clear and create new cart if existing customer's cartId but expired token or cartId is null.
                    if(!(cartId && cartId.length > 30) && !token){
                        LocalStorageManagement.getInstance().clearVendorCartInfo(action.payload.vendorId);
                        this.store.dispatch(new checkout.CartCreate({vendorId: action.payload.vendorId}));
                    } else {
                        CartManagement.getInstance(this.store).recreateCart(cartId, {
                            type: CART_TYPE.VENDOR_CART,
                            id: action.payload.vendorId
                        });
                    }
                    // this.store.dispatch(new checkout.CartRecreate(cartId));
                    return Observable.of(new checkout.CartLoadFailed(error));
                });
        });

    // LOAD CART SHIPPING RULE
    @Effect() cartLoadShippingRule$ = this._actions.ofType(checkout.CART_LOAD_SHIPPING_RULE)
        .withLatestFrom(this.store.select(fromRoot.vendorCheckoutGetCartItemsCount))
        .switchMap(([action, cartCount]) => {
            // const cartId = localStorage.getItem('cartId');
            if (cartCount <= 0) {
                return Observable.of(new checkout.CartLoadShippingRuleFailed(null));
            }
            return this.checkoutService.loadCartShippingRule(action.payload, action.payload.vendorId)
                .map(resp => {
                    let payload = resp.json()
                    if (payload) {
                        payload.vendorId = action.payload.vendorId;
                        return new checkout.CartLoadShippingRuleSuccess(payload);
                    }
                    return Observable.of(new checkout.CartLoadShippingRuleFailed(resp));
                }).catch((error) => {
                    return Observable.of(new checkout.CartLoadShippingRuleFailed(error));
                });
        });

    // CREATE EMPTY CART
    @Effect() cartCreate$ = this._actions.ofType(checkout.CART_CREATE)
        .switchMap((action: any) =>
            this.checkoutService.createCart(action.payload.vendorId)
                .map(cart => cart.json())
                .map(cart => {
                    this.storageCartId(action.payload.vendorId, cart)
                    return new checkout.CartCreateSuccess(cart);
                }).catch((error) => {
                    return Observable.of(new checkout.CartCreateFailed(error));
                })
        );

    // MERGE CART WHEN LOGGING IN
    @Effect() cartMerge$ = this._actions.ofType(checkout.CART_MERGE)
        .switchMap((action: any) =>
            this.checkoutService.mergeCart(action.payload.guestCartId, action.payload.vendorId)
                .map(count => count.json())
                .map(count => {
                    this.store.dispatch(new checkout.CartLoad({vendorId: action.payload.vendorId}));

                    this.globalService.syncCartCookies();
                    return new checkout.CartMergeSuccess(count);
                }).catch((error) => {
                    return Observable.of(new checkout.CartCreateFailed(error));
                })
        );

    // ADD ITEMS TO CART
    @Effect() cartAddItems$ = this._actions.ofType(checkout.CART_ADD_ITEMS)
        .withLatestFrom(this.store.select(fromRoot.vendorCheckoutGetCartItemsCount), this.store.select(fromRoot.vendorCheckoutGetCartItems))
        .mergeMap(([action, cartCount, cartItems]) => {
            const cartId = localStorage.getItem(LocalStorageConstants.VENDOR_CART);
            if (!cartId) {
                return Observable.of(new checkout.CartAddItemsFailed('Cart doesn\'t exist'));
            }

            const qtyToAdd = action.payload.product.cartItem.qty;
            const skuToAdd = action.payload.product.cartItem.sku;
            const maximumShopping = action.payload.maximumShopping ? action.payload.maximumShopping : 50;
            if (cartCount + qtyToAdd <= 50) {
                const product = _.find(cartItems, (item) => {
                    return item.sku === skuToAdd;
                });

                if (product && qtyToAdd + product.qty > maximumShopping) {
                    return Observable.of(new checkout.CartAddItemsFailed('Vì giá đang tốt nhất, chúng tôi xin giới hạn tối đa sản phẩm này trong một đơn hàng là ' + maximumShopping + ' sản phẩm. Mong quý khách thông cảm!'));
                } else {
                    action.payload.product.cartItem.extension_attributes = {
                        quote_later_id : localStorage.getItem('cartLaterId')
                    };
                    return this.checkoutService.addItemToCart(action.payload.product, action.payload.vendorId)
                        .map(item => item.json())
                        .map(item => {
                            this.globalService.syncCartCookies();
                            item.vendorId = action.payload.vendorId;
                            return new checkout.CartAddItemsSuccess(item);
                        }).catch((error, response) => {
                            try {
                                error = error.json();
                                this.store.dispatch(new checkout.CartLoad({vendorId: action.payload.vendorId}));
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
        .withLatestFrom(this.store.select(fromRoot.vendorCheckoutGetCartItemsCount))
        .mergeMap(([action, cartCount]) => {
            const qtyChanged = action.payload.qty - action.payload.old_qty;
            if (cartCount + qtyChanged <= 50) {
                return this.checkoutService.updateCartItem(action.payload, action.payload.vendorId)
                    .map(item => {
                        this.globalService.syncCartCookies();
                        let data = item.json();
                        data.vendorId = action.payload.vendorId;
                        return new checkout.CartUpdateItemSuccess(data);
                    }).catch((error, response) => {
                        error = error.json();
                        const token = localStorage.getItem('token');
                        if(!token && error && error.message.indexOf('No such entity') !== -1){
                            return Observable.of(new checkout.CartUpdateItemFailed('Tài khoản đã thoát không thể thực hiện thao tác. Xin vui lòng đăng nhập lại.'));
                        }
                        return Observable.of(new checkout.CartUpdateItemFailed(error));
                    });
            } else {
                return Observable.of(new checkout.CartUpdateItemFailed('Chúng tôi giới hạn tối đa 50 sản phẩm trong giỏ hàng.'));
            }
        });

    @Effect() deleteCartItem$ = this._actions.ofType(checkout.CART_DELETE_ITEM)
        .switchMap((action) =>
            this.checkoutService.deleteCartItem(action.payload, action.payload.vendorId)
                .map(resp => {
                    // Pass deleted item back to reducer
                    this.globalService.syncCartCookies();
                    let data = resp.json();
                    data.vendorId = action.payload.vendorId;
                    return new checkout.CartDeleteItemSuccess(data);
                }).catch((error, response) => {
                    error = error.json();
                    const token = localStorage.getItem('token');
                    if(!token && error && error.message.indexOf('No such entity') !== -1){
                        return Observable.of(new checkout.CartDeleteItemFailed('Tài khoản đã thoát không thể thực hiện thao tác. Xin vui lòng đăng nhập lại.'));
                    }
                    return Observable.of(new checkout.CartDeleteItemFailed(error));
                })
        );

    @Effect() deleteMultipleCartItems$ = this._actions.ofType(checkout.CART_DELETE_MULTIPLE_ITEMS)
        .switchMap((action) => {
            return this.checkoutService.deleteMultipleCartItems(action.payload.outOfStockItems, action.payload.vendorId)
                .map((results) => {
                    this.globalService.syncCartCookies();
                    let data = results.json();
                    data.vendorId = action.payload.vendorId;
                    return new checkout.CartDeleteMultipleItemsSuccess(data);
                }).catch((error) => {
                    return Observable.of(new checkout.CartDeleteMultipleItemsFailed(error));
                });
        });

    // CART UPDATE SHIPPING INFO
    @Effect() updateCartShippingInfo$ = this._actions.ofType(checkout.CART_UPDATE_SHIPPING_INFO)
        .switchMap((action) =>
            this.checkoutService.updateShippingInfo(ShippingAddressTransformer.transform(null,  action.payload.vendorId), action.payload.vendorId)
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
            // const isPaymentChanged = this.globalService.reloadCartWhenTimestampChanged();
            // if (isPaymentChanged) {
            //     this.store.dispatch(new checkout.UpdateCurrentStep(1));
            //     this.store.dispatch(new checkout.CartLoad(action));
            //     return Observable.of(new checkout.CartUpdatePaymentInformationFailed('Sản phẩm bạn mua có cập nhật mới. Xin vui lòng thanh toán lại.'));
            // } else {
                return this.checkoutService.updatePaymentInformation(PaymentMethodTransformer.transform(action.payload, action.payload.vendorId), action.payload.vendorId)
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
                            this.store.dispatch(new checkout.CartLoad(action));
                            return Observable.of(new checkout.CartUpdatePaymentInformationFailed('Sản phẩm bạn mua có cập nhật mới. Xin vui lòng thanh toán lại.'));
                        }else
                        if (error && error.message === 'LPOINT_INVALID:') {
                            this.store.dispatch(new checkout.UpdateCurrentStep(3));
                            this.store.dispatch(new checkout.CartApplyLPoint(0));
                            this.store.dispatch(new checkout.CartLoad(action));
                            return Observable.of(new checkout.CartUpdatePaymentInformationFailed(checkout.LPOINT_OUT_TIME_ERROR_MESSAGE));
                        }else
                        if (error && error.message === 'LPOINT_INVALID_CART:') {
                            this.store.dispatch(new checkout.UpdateCurrentStep(3));
                            this.store.dispatch(new checkout.CartApplyLPoint(0));
                            this.store.dispatch(new checkout.CartLoad(action));
                            return Observable.of(new checkout.CartUpdatePaymentInformationFailed(checkout.LPOINT_CART_ERROR_MESSAGE));
                        } else {
                            return Observable.of(new checkout.CartUpdatePaymentInformationFailed(error));
                        }
                    });
            // }
        });

    @Effect() addCoupon$ = this._actions.ofType(checkout.CART_ADD_COUPON)
        .switchMap((action) =>
            this.checkoutService.addCoupon(action.payload.coupon, action.payload.vendorId)
                .map((resp) => {
                    // this.globalService.syncCartCookies();
                    return new checkout.CartAddCouponSuccess(resp.json());
                }).catch((error, response) => {
                    return Observable.of(new checkout.CartAddCouponFailed(error));
                })
        );

    @Effect() getCoupon$ = this._actions.ofType(checkout.CART_GET_COUPON)
        .switchMap((action) =>
            this.checkoutService.getCoupon(action.payload.vendorId)
                .map((resp) => {
                    return new checkout.CartGetCouponSuccess(resp.text);
                }).catch((error, response) => {
                    return Observable.of(new checkout.CartGetCouponFailed(error));
                })
        );
    @Effect() deleteCoupon$ = this._actions.ofType(checkout.CART_DELETE_COUPON)
        .switchMap((action) =>
            this.checkoutService.deleteCoupon(action.payload.vendorId)
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
            // const path = this.router['url'];
            // const currentUrl = path.indexOf('?') === -1 ? path : path.substring(0, path.indexOf('?'));
            if(action.payload.step === 1){
                this.router.navigate(['seller', action.payload.vendorId, 'lotte-vn']);
                return Observable.of();
            }

            this.router.navigate(['checkout', action.payload.vendorId], { queryParams: {step:action.payload.step}});
            const mainContent = document.querySelector('#maincontent');

            if (mainContent) {
                window.scrollTo(0, mainContent['offsetTop']);
            }
            return Observable.of();
        });

    @Effect() applyLPoint$ = this._actions.ofType(checkout.CART_APPLY_LPOINT)
        .switchMap((action) =>
            this.checkoutService.applyLPoint(action.payload.vendorId, action.payload.lpoint)
                .map((resp) => {
                    return new checkout.CartApplyLPointSuccess(resp.json());
                }).catch((error) => {
                    error = error.json();
                    if (error && error.message === 'LPOINT_INVALID:') {
                        this.store.dispatch(new checkout.UpdateCurrentStep(3));
                        this.store.dispatch(new checkout.CartLoad(action));
                        return Observable.of(new checkout.CartApplyLPointFailed(checkout.LPOINT_OUT_TIME_ERROR_MESSAGE));
                    }else
                        if (error && error.message === 'LPOINT_INVALID_CART:') {
                        this.store.dispatch(new checkout.UpdateCurrentStep(3));
                        this.store.dispatch(new checkout.CartLoad(action));
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
            this.checkoutService.recreateCart(action.payload.cartId)
                .map((resp) => {
                    const data = resp.json();
                    if (data.cart_totals) {
                        if (data.guest_cart_id) {
                            this.storageCartId(action.payload.vendorId, data.guest_cart_id);
                        } else {
                            this.storageCartId(action.payload.vendorId, data.cart_info.id);
                        }
                        data.vendorId = action.payload
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
            this.checkoutService.setPaymentMethod(action.payload, action.payload.vendorId)
                .map((resp) => {
                    let data = resp.json();
                    if (data && !data.message) {
                        data.vendorId = action.payload.vendorId;
                        return new checkout.CartSetPaymentMethodSuccess(data);
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
            this.checkoutService.getPaymentMethods(action.payload)
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

    // @Effect()
    // addWishlistToCart$ = this._actions.ofType(checkout.CART_ADD_WISHLIST)
    //     .switchMap((action) => {
    //         return this.checkoutService.addWishlistToCart(action.payload)
    //             .map(resp => {
    //                 this.store.dispatch(new account.LoadWishList(0));
    //                 return new checkout.CartAddWishlistSuccess(resp.json());
    //             }).catch((error) => {
    //                 return Observable.of(new checkout.CartAddWishlistFailed(error.json()));
    //             });
    //     });


    // // LOAD CART LAter INFO
    // @Effect()
    // CartLaterLoad$ = this._actions.ofType(checkout.CART_LATER_LOAD)
    //     .switchMap((action) => {
    //         return this.checkoutService.loadCartLater()
    //             .map((resp) => {
    //                 return new checkout.CartLaterLoadSuccess(resp.json());
    //             }).catch((error) => {
    //                 return Observable.of(new checkout.CartLaterLoadFailed(error));
    //             });
    //     });
    //
    // // // CREATE CART LATER
    // // @Effect()
    // // CartLaterCreate$ = this._actions.ofType(checkout.CART_LATER_CREATE)
    // //     .switchMap((action) => {
    // //         return this.checkoutService.createCartLater()
    // //             .map((resp) => {
    // //                 localStorage.setItem('cartLaterId', resp.json());
    // //                 return new checkout.CartLaterCreateSuccess(resp.json());
    // //             }).catch((error) => {
    // //                 return Observable.of(new checkout.CartLaterCreateFailed(error));
    // //             });
    // //     });
    //
    // // ADD ITEMS TO CART
    // @Effect() cartLaterAddItems$ = this._actions.ofType(checkout.CART_LATER_ADD_ITEM)
    // .switchMap((action) => {
    //     return this.checkoutService.addItemToCartLater(action.payload)
    //     .map((resp) => {
    //             //this.globalService.syncCartCookies();
    //             if(resp.json().error){
    //                 return new checkout.CartLaterAddItemFailed(resp.json());
    //             }else{
    //                 return new checkout.CartLaterAddItemSuccess(resp.json());
    //             }
    //         }).catch((error) => {
    //             try {
    //                 error = error.json();
    //                 return Observable.of(new checkout.CartLaterAddItemFailed(error.message));
    //             } catch (e) {
    //                 return Observable.of(new checkout.CartLaterAddItemFailed(error));
    //             }
    //
    //         });
    //     });
    //
    // // DELETE CART LATER ITEM
    // @Effect() deleteCartLaterItem$ = this._actions.ofType(checkout.CART_LATER_DELETE_ITEM)
    //     .switchMap((action) =>
    //         this.checkoutService.deleteCartLaterItem(action.payload)
    //             .map(resp => {
    //                 return new checkout.CartLaterDeleteItemSuccess(resp.json());
    //             }).catch((error, response) => {
    //                 return Observable.of(new checkout.CartLaterDeleteItemFailed(error));
    //             })
    //     );
}
