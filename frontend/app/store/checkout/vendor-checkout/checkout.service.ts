import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Store } from '@ngrx/store';

import { HttpService } from '../../../services/http.service';
import * as fromRoot from '../../index';
import {LocalStorageConstants} from "../../../components/base/constants/LocalStorageConstants";
import {LocalStorageManagement} from "../../../components/base/LocalStorageManagement";
import * as _ from 'lodash';
import {Observable} from "rxjs/Observable";
import {vendorGetEntity} from "../../index";

@Injectable()
export class VendorCheckoutService{
    page: any;

    constructor(protected httpService: HttpService, protected http: Http,
                protected store: Store<fromRoot.AppState>) {

    }

    loadCartTotalInfo(vendorId) {
        const token = localStorage.getItem('token');
        const cartId = LocalStorageManagement.getInstance().getStorageVendorCartId(vendorId);
        if (token) {
            return this.httpService.get('vendor/mine-carts/'+ vendorId +'/items');
        } else {
            return this.httpService.getAnonymous('vendor/guest-carts/'+ vendorId +'/' + cartId + '/items');
        }
    }

    loadCartShippingRule(region, vendorId) {
        const cartId = LocalStorageManagement.getInstance().getStorageVendorCartId(vendorId);
        if (cartId) {
            return this.httpService.getAnonymous('vendor/shipping-rule?cart_id=' + cartId + '&region_id=' + region.cityId
                + '&district_id=' + region.districtId + '&ward_id=' + region.wardId);
        } else {
            return Observable.throw('Cart ID not exists');
        }
    }

    createCart(vendorId) {
        const token = localStorage.getItem('token');
        if (token) {
            return this.httpService.post('vendor/mine-carts/' + vendorId, {});
        } else {
            return this.httpService.postAnonymous('vendor/guest-carts/' + vendorId, {});
        }
    }

    mergeCart(guestCartId, vendorId) {
        return this.httpService.post('vendor/mine-carts/'+ vendorId +'/merge', { cartId: guestCartId });
    }

    addItemToCart(item: any, vendorId) {
        const token = localStorage.getItem('token');
        const cartId = LocalStorageManagement.getInstance().getStorageVendorCartId(vendorId);

        if (token) {
            return this.httpService.post('vendor/mine-carts/' + vendorId + '/items', item);
        } else {
            return this.httpService.postAnonymous('vendor/guest-carts/' + vendorId + '/' + cartId + '/items', item);
        }
    }

    // addWishlistToCart(wishlistId = null) {
    //     const token = localStorage.getItem('token');
    //     if (!wishlistId) {
    //         return this.httpService.post('ipwishlist/add-to-cart', {});
    //     } else {
    //         if (token) {
    //             return this.httpService.post('ipwishlist/add-to-cart', {
    //                 wishlistId: wishlistId
    //             });
    //         } else {
    //             const cartId = localStorage.getItem('cartId');
    //             return this.httpService.postAnonymous('ipwishlist/guest-carts/add-to-cart', {
    //                 wishlistId: wishlistId,
    //                 quoteId: cartId
    //             });
    //         }
    //
    //     }
    //
    // }

    updateCartItem(item, vendorId) {
        const token = localStorage.getItem('token');
        const cartId = LocalStorageManagement.getInstance().getStorageVendorCartId(vendorId);

        const itemToUpdate = {
            cartItem: {
                item_id: item.item_id,
                qty: item.qty,
                quote_id: cartId
            }
        };

        if (token) {
            return this.httpService.put('vendor/mine-carts/' + vendorId + '/items/' + item.item_id, itemToUpdate);
        } else {
            return this.httpService.putAnonymous('vendor/guest-carts/' + vendorId + '/' + cartId + '/items/' + item.item_id, itemToUpdate);
        }
    }

    deleteCartItem(item, vendorId) {
        const token = localStorage.getItem('token');
        const cartId = LocalStorageManagement.getInstance().getStorageVendorCartId(vendorId);

        if (token) {
            return this.httpService.delete('vendor/mine-carts/' + vendorId +'/items/' + item.item_id);
        } else {
            return this.httpService.deleteAnonymous('vendor/guest-carts/' + vendorId +'/' + cartId + '/items/' + item.item_id);
        }
    }

    deleteMultipleCartItems(items, vendorId) {
        let url = '';
        const arr = [];
        _.each(items, (item: any) => {
            url = url + 'items[]=' + item.item_id;
            arr.push('items[]=' + item.item_id);
        });

        if (arr.length > 1) {
            url = _.join(arr, '&');
        }

        const token = localStorage.getItem('token');
        const cartId = LocalStorageManagement.getInstance().getStorageVendorCartId(vendorId);
        if (token) {
            return this.httpService.delete('vendor/mine-carts/' + vendorId + '/items?' + url);
        } else {
            return this.httpService.deleteAnonymous('vendor/guest-carts/' + vendorId + '/'+ cartId + '/items?' + url);
        }

    }

    updateShippingInfo(info, vendorId) {
        const token = localStorage.getItem('token');
        const cartId = LocalStorageManagement.getInstance().getStorageVendorCartId(vendorId);
        if (token) {
            return this.httpService.post('vendor/mine-carts/' + vendorId + '/shipping-information', info);
        } else {
            return this.httpService.postAnonymous('vendor/guest-carts/'+ vendorId + '/' + cartId + '/shipping-information', info);
        }
    }

    updatePaymentInformation(info, vendorId) {
        const token = localStorage.getItem('token');
        const cartId = LocalStorageManagement.getInstance().getStorageVendorCartId(vendorId);

        if(info.paymentMethod && info.paymentMethod.vendorId) delete info.paymentMethod.vendorId;
        if (token) {
            return this.httpService.post('vendor/mine-carts/' + vendorId + '/payment-information', info);
        } else {
            return this.httpService.postAnonymous('vendor/guest-carts/' + vendorId +'/' + cartId + '/payment-information', info);
        }
    }

    addCoupon(coupon, vendorId) {
        const token = localStorage.getItem('token');
        const cartId = LocalStorageManagement.getInstance().getStorageVendorCartId(vendorId);
        if (token) {
            return this.httpService.put( 'vendor/mine-carts/'+ vendorId + '/coupons/'+ coupon +'/info-totals', {});
        } else {
            return this.httpService.putAnonymous( 'vendor/guest-carts/'+vendorId+'/'+ cartId +'/coupons/' + coupon + '/info-totals', {});
        }
    }

    getCoupon(vendorId) {
        const token = localStorage.getItem('token');
        const cartId = LocalStorageManagement.getInstance().getStorageVendorCartId(vendorId);
        if (token) {
            return this.httpService.get('vendor/mine-carts/'+ vendorId +'/coupons');
        } else {
            return this.httpService.getAnonymous('vendor/guest-carts/' + vendorId +'/'+cartId+'/coupons');
        }
    }

    deleteCoupon(vendorId) {
        const token = localStorage.getItem('token');
        const cartId = LocalStorageManagement.getInstance().getStorageVendorCartId(vendorId);
        if (token) {
            return this.httpService.delete( 'vendor/mine-carts/'+ vendorId +'/coupons/info-totals');
        } else {
            return this.httpService.deleteAnonymous('vendor/guest-carts/'+ vendorId + '/' + cartId +'/coupons/info-totals');
        }
    }

    getPaymentRules() {
        return this.httpService.getAnonymous('gateway/list-banking');
    }

    applyLPoint(vendorId, lpoint) {
        // const token = localStorage.getItem('token');
        const cartId = LocalStorageManagement.getInstance().getStorageVendorCartId(vendorId);
        const payload = {
            lpoint: parseInt(lpoint, 10),
            cartId: parseInt(cartId, 10)
        };
        return this.httpService.post('vendor/mine-carts/'+vendorId+'/apply-lpoint', payload);
    }

    checkOrderStatus() {
        const cartId = localStorage.getItem('cartId');
        return this.httpService.get('local_atm/check-order/' + cartId);
    }

    recreateCart(cartId) {
        return this.httpService.post('vendor/create-new-cart-fail-user?cart_id=' + cartId, {});
    }

    setPaymentMethod(payload, vendorId) {
        const cartId = LocalStorageManagement.getInstance().getStorageVendorCartId(vendorId);
        const token = localStorage.getItem('token');
        if (token) {
            return this.httpService.put('vendor/mine-carts/' + vendorId + '/selected-payment-method', payload);
        } else {
            return this.httpService.putAnonymous('vendor/guest-carts/'+ vendorId +'/' + cartId + '/selected-payment-method', payload);
        }
    }

    creditCardTransactionRequest(orderId) {
        if (location.href.indexOf('') > -1) {
            return this.http.post('/paymentgateway/SilentOrder/TransactionRequest/'.toHostName(), {});
        } else {
            return this.httpService.getAnonymous('paymentgateway/silent-order/transaction-request/' + orderId);
        }
    }

    getPaymentMethods(vendorId) {
        const cartId = LocalStorageManagement.getInstance().getStorageVendorCartId(vendorId);
        const token = localStorage.getItem('token');
        if (token) {
            return this.httpService.get('vendor/mine-carts/' + vendorId + '/payment-methods');
        } else {
            return this.httpService.getAnonymous('vendor/guest-carts/'+ vendorId +'/' + cartId + '/payment-methods');
        }
    }
    //
    // // CART LATER
    // loadCartLater() {
    //     const token = localStorage.getItem('token');
    //     const cartLaterId = localStorage.getItem('cartLaterId');
    //     if (token) {
    //         return this.httpService.get('cart-later/mine/info');
    //     } else {
    //         return this.httpService.getAnonymous('cart-later/guest/' + cartLaterId + '/info');
    //     }
    // }
    //
    // // createCartLater() {
    // //     const token = localStorage.getItem('token');
    // //     if (token) {
    // //         return this.httpService.post('cart-later/mine/custom', {});
    // //     } else {
    // //         return this.httpService.postAnonymous('guest-cart-later/create', {});
    // //     }
    // // }
    //
    // addItemToCartLater(item: any) {
    //     const token = localStorage.getItem('token');
    //     const cartLaterId = localStorage.getItem('cartLaterId');
    //     const cartLaterItem = {
    //             sku:item.sku,
    //             qty: item.qty,
    //             super_attributes:item.super_attributes,
    //             product_id:item.product_id,
    //             quote_later_id:cartLaterId
    //     }
    //     if (token) {
    //         return this.httpService.post('cart-later/mine/add/item', {cartLaterItem});
    //     } else {
    //         return this.httpService.postAnonymous('cart-later/guest/' + cartLaterId + '/add/item', {cartLaterItem});
    //     }
    // }
    //
    // deleteCartLaterItem(item){
    //     const token = localStorage.getItem('token');
    //     const cartLaterId = localStorage.getItem('cartLaterId');
    //     if (token) {
    //         return this.httpService.delete('cart-later/mine/delete/item/' + item.item_id);
    //     } else {
    //         return this.httpService.deleteAnonymous('cart-later/guest/' + cartLaterId + '/delete/item/' + item.item_id);
    //     }
    // }
}
