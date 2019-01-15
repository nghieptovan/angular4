import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Rx';

import { HttpService } from '../../services/http.service';
import * as fromRoot from '../index';
import {VendorPickupManagement} from "../../components/base/VendorPickupManagement";
import {VendorShippingTypeManagement} from "../../components/base/VendorShippingTypeManagement";

@Injectable()
export class CheckoutService {
    page: any;

    constructor(protected httpService: HttpService, protected http: Http,
                protected store: Store<fromRoot.AppState>) {

    }

    loadCartTotalInfo() {
        const token = localStorage.getItem('token');
        const cartId = localStorage.getItem('cartId');
        if (token) {
            return this.httpService.get('carts/mine/info-totals');
        } else {
            return this.httpService.getAnonymous('guest-carts/' + cartId + '/info-totals');
        }
    }

    loadCartShippingRule(region) {
        const cartId = localStorage.getItem('cartId'); // JSON.parse(localStorage.getItem('cart')).info.id;
        if (cartId) {
            return this.httpService.getAnonymous('lotte_cart/shipping-rule?cart_id=' + cartId + '&region_id=' + region.cityId + '&district_id=' + region.districtId);
        } else {
            return Observable.throw('Cart ID not exists');
        }
    }

    loadCartShippingRuleCustom(region) {
        const cartId = localStorage.getItem('cartId'); // JSON.parse(localStorage.getItem('cart')).info.id;

        let params = {
            "cartId":cartId,
            "shippingAddress":{
                "region_id": region.cityId,
                "district_id": region.districtId?region.districtId:"",
                "ward_id":region.wardId?region.wardId:""
            }
        };

        params = this._prepareInfo(params);

        if (cartId) {
            return this.httpService.putAnonymous('lotte_cart/shipping-rule-custom', params);
        } else {
            return Observable.throw('Cart ID not exists');
        }
    }

    createCart() {
        const token = localStorage.getItem('token');
        if (token) {
            return this.httpService.post('carts/mine/custom', {});
        } else {
            return this.httpService.postAnonymous('guest-carts', {});
        }
    }

    mergeCart(guestCartId) {
        return this.httpService.post('carts/mine/merge', { cartId: guestCartId });
    }

    addItemToCart(item: any) {
        const token = localStorage.getItem('token');
        const cartId = localStorage.getItem('cartId');
        const cartLaterId = localStorage.getItem('cartLaterId');

        if (token) {
            return this.httpService.post('carts/mine/items/custom', item);
        } else {
            return this.httpService.postAnonymous('guest-carts/' + cartId + '/items/custom', item);
        }
    }

    addWishlistToCart(wishlistId = null) {
        const token = localStorage.getItem('token');
        if (!wishlistId) {
            return this.httpService.post('ipwishlist/add-to-cart', {});
        } else {
            if (token) {
                return this.httpService.post('ipwishlist/add-to-cart', {
                    wishlistId: wishlistId
                });
            } else {
                const cartId = localStorage.getItem('cartId');
                return this.httpService.postAnonymous('ipwishlist/guest-carts/add-to-cart', {
                    wishlistId: wishlistId,
                    quoteId: cartId
                });
            }

        }

    }

    updateCartItem(item) {
        const token = localStorage.getItem('token');
        const cartId = localStorage.getItem('cartId');

        const itemToUpdate = {
            cartItem: {
                item_id: item.item_id,
                qty: item.qty,
                quote_id: cartId
            }
        };

        if (token) {
            return this.httpService.put('carts/mine/items/' + item.item_id + '/custom', itemToUpdate);
        } else {
            return this.httpService.putAnonymous('guest-carts/' + cartId + '/items/' + item.item_id + '/custom', itemToUpdate);
        }
    }

    deleteCartItem(item) {
        const token = localStorage.getItem('token');
        const cartId = localStorage.getItem('cartId');

        if (token) {
            return this.httpService.delete('carts/mine/items/' + item.item_id + '/custom');
        } else {
            return this.httpService.deleteAnonymous('guest-carts/' + cartId + '/items/' + item.item_id + '/custom');
        }
    }

    deleteMultipleCartItems(items) {
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
        const cartId = localStorage.getItem('cartId');
        if (token) {
            return this.httpService.delete('lotte_carts/mine/items?' + url);
        } else {
            return this.httpService.deleteAnonymous('lotte_guest-carts/' + cartId + '/items?' + url);
        }

    }

    updateShippingInfo(info) {
        const token = localStorage.getItem('token');
        const cartId = localStorage.getItem('cartId');
        info = this._prepareInfo(info);

        if (token) {
            return this.httpService.post('carts/mine/shipping-information/custom', info);
        } else {
            return this.httpService.postAnonymous('guest-carts/' + cartId + '/shipping-information/custom', info);
        }
    }

    updatePaymentInformation(info) {
        const token = localStorage.getItem('token');
        const cartId = localStorage.getItem('cartId');

        if (token) {
            return this.httpService.post('carts/mine/payment-information/custom', info);
        } else {
            return this.httpService.postAnonymous('guest-carts/' + cartId + '/payment-information/custom', info);
        }
    }

    addCoupon(coupon) {
        const token = localStorage.getItem('token');
        const cartId = localStorage.getItem('cartId');
        if (token) {
            return this.httpService.put('carts/mine/coupons/' + coupon + '/info-totals', {});
        } else {
            return this.httpService.putAnonymous('guest-carts/' + cartId + '/coupons/' + coupon + '/info-totals', {});
        }
    }

    getCoupon() {
        const token = localStorage.getItem('token');
        const cartId = localStorage.getItem('cartId');
        if (token) {
            return this.httpService.get('carts/mine/coupons');
        } else {
            return this.httpService.getAnonymous('guest-carts/' + cartId + '/coupons');
        }
    }

    deleteCoupon() {
        const token = localStorage.getItem('token');
        const cartId = localStorage.getItem('cartId');
        if (token) {
            return this.httpService.delete('carts/mine/coupons/info-totals');
        } else {
            return this.httpService.deleteAnonymous('guest-carts/' + cartId + '/coupons/info-totals');
        }
    }

    getPaymentRules() {
        return this.httpService.getAnonymous('gateway/list-banking');
    }

    applyLPoint(lpoint) {
        const token = localStorage.getItem('token');
        const cartId = localStorage.getItem('cartId');
        const payload = {
            lpoint: parseInt(lpoint, 10),
            cartId: parseInt(cartId, 10)
        };
        return this.httpService.post('carts/mine/balance/apply-lpoint-override/custom', payload);
    }

    checkOrderStatus() {
        const cartId = localStorage.getItem('cartId');
        return this.httpService.get('local_atm/check-order/' + cartId);
    }

    recreateCart(cartId) {
        return this.httpService.post('carts/create-new-cart-fail-user?cart_id=' + cartId, {});
    }

    setPaymentMethod(payload) {
        const cartId = localStorage.getItem('cartId');
        const token = localStorage.getItem('token');
        if (token) {
            return this.httpService.put('carts/mine/selected-payment-method/custom', payload);
        } else {
            return this.httpService.postAnonymous('guest-carts/' + cartId + '/set-payment-information/custom', payload);
        }
    }

    creditCardTransactionRequest(orderId) {
        if (location.href.indexOf('') > -1) {
            return this.http.post('/paymentgateway/SilentOrder/TransactionRequest/'.toHostName(), {});
        } else {
            return this.httpService.getAnonymous('paymentgateway/silent-order/transaction-request/' + orderId);
        }
    }

    getPaymentMethods() {
        const cartId = localStorage.getItem('cartId');
        const token = localStorage.getItem('token');
        if (token) {
            return this.httpService.get('carts/mine/payment-methods-custom');
        } else {
            return this.httpService.getAnonymous('guest-carts/' + cartId + '/payment-methods-custom');
        }
    }

    // CART LATER
    loadCartLater() {
        const token = localStorage.getItem('token');
        const cartLaterId = localStorage.getItem('cartLaterId');
        if (token) {
            return this.httpService.get('cart-later/mine/info');
        } else {
            return this.httpService.getAnonymous('cart-later/guest/' + cartLaterId + '/info');
        }
    }

    // createCartLater() {
    //     const token = localStorage.getItem('token');
    //     if (token) {
    //         return this.httpService.post('cart-later/mine/custom', {});
    //     } else {
    //         return this.httpService.postAnonymous('guest-cart-later/create', {});
    //     }
    // }

    addItemToCartLater(item: any) {
        const token = localStorage.getItem('token');
        const cartLaterId = localStorage.getItem('cartLaterId');
        const cartLaterItem = {
                sku:item.sku,
                qty: item.qty,
                super_attributes:item.super_attributes,
                product_id:item.product_id,
                quote_later_id:cartLaterId
        }
        if (token) {
            return this.httpService.post('cart-later/mine/add/item', {cartLaterItem});
        } else {
            return this.httpService.postAnonymous('cart-later/guest/' + cartLaterId + '/add/item', {cartLaterItem});
        }
    }

    deleteCartLaterItem(item){
        const token = localStorage.getItem('token');
        const cartLaterId = localStorage.getItem('cartLaterId');
        if (token) {
            return this.httpService.delete('cart-later/mine/delete/item/' + item.item_id);
        } else {
            return this.httpService.deleteAnonymous('cart-later/guest/' + cartLaterId + '/delete/item/' + item.item_id);
        }
    }

    validateBank(cardInfo: any){
        return this.httpService.postAnonymous('lotte_carts/checkcard', cardInfo);
    }

    private _prepareInfo(params){
        const shippingRuleJson = localStorage.getItem('shippingRules');
        let shippingRules = null;
        if(shippingRuleJson){
            shippingRules = JSON.parse(shippingRuleJson);
        }

        if(!params.oPickupInfo){
            params.oPickupInfo = [];
        }

        if(!params.oShippingType){
            params.oShippingType = [];
        }

        if(shippingRules) {
            shippingRules.shippingVendors = VendorPickupManagement.getInstance().loadSelectedShipType(shippingRules.shippingVendors);
            shippingRules.shippingVendors = VendorShippingTypeManagement.getInstance().loadSelectedShipType(shippingRules.shippingVendors);
            _.each(shippingRules.shippingVendors.by_group, vendor => {
                params.oPickupInfo.push({
                    "is_active": vendor.pickupInfo.isActive,
                    "customer_name": vendor.pickupInfo.customer_name?vendor.pickupInfo.customer_name:"",
                    "customer_email": vendor.pickupInfo.customer_email?vendor.pickupInfo.customer_email:"",
                    "customer_phone": vendor.pickupInfo.customer_phone?vendor.pickupInfo.customer_phone:"",
                    "duration_standard": vendor.pickupInfo.duration_standard?vendor.pickupInfo.duration_standard:"",
                    "vendor_id": vendor.pickupInfo.vendorId
                });

                params.oShippingType.push({
                    "type": vendor.selected_shipping_type,
                    "seller_id": vendor.pickupInfo.vendorId
                });


            });
        }

        return params;
    }
}
