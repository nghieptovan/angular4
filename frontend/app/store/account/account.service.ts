import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { HttpService } from '../../services/http.service';

@Injectable()
export class AccountService {
    constructor(private httpService: HttpService) {

    }

    //for pm
    listaccount() {
        return this.httpService.getAnonymous('employee');
    }


     //for end pm

    register(data) {
        return this.httpService.postAnonymous('customers/auto-login', data);
    }

    resetPassword(data) {
        return this.httpService.postAnonymous('lotte_customer/create-new-password', data);
    }

    getCustomerInfo() {
        return this.httpService.get('customers/me/custom');
    }

    getCustomerLPoint() {
        return this.httpService.get('carts/mine/balance/get-lpoint');
    }

    updateCustomerInfo(data) {
        return this.httpService.put('customers/me/custom', data);
    }

    getWishlist(id = 0) {
        const token = localStorage.getItem('token');
        if (!id && token) {
            return this.httpService.get('ipwishlist/items');
        }
        // else {
        //     return this.httpService.getAnonymous('ipwishlist/shared/' + id);
        // }
    }

    addProductToWishlist(data) {
        return this.httpService.post('ipwishlist/add/' + data, {});
    }

    updateWishlist(data) {
        const list = {};
        _.each(data, (wishlist: any) => {
            if (wishlist.description) {
                list[wishlist.wishlist_item_id] = wishlist.description;
            }
        });
        return this.httpService.put('ipwishlist/update', { list: list });
    }

    deleteProductInWishlist(id) {
        return this.httpService.delete('ipwishlist/delete/' + id);
    }

    shareWishlistViaMail(data) {
        return this.httpService.post('ipwishlist/send', data);
    }

    getCustomerOrders(filter = null) {
        const params = filter ? '?' + filter : '';
        return this.httpService.get('mine/order/history' + params);
    }

    getCustomerOrderById(id) {
        return this.httpService.get('mine/order/view/' + id);
    }

    getOrderTracking(body) {
        return this.httpService.postAnonymous('lotte_product/trackOrder', body);
    }

    cancelCustomerOrder(data) {
        data.data.cancellation_type = Number.parseInt(data.data.cancellation_type);

        return this.httpService.post('mine/order/cancel/' + data.orderId, data.data);
    }

    checkSubscriptionStatus() {
        return this.httpService.get('newsletter/is-subscribed');
    }

    subscribe() {
        return this.httpService.post('newsletter/subscribe', {});
    }

    unsubscribe() {
        return this.httpService.delete('newsletter/unsubscribe');
    }

    getRatingPending() {
        return this.httpService.get('mine/udratings/pending');
    }

    getRatedSeller() {
        return this.httpService.get('mine/udratings/rated');
    }

    getQA(email) {
        return this.httpService.getAnonymous('lotte_product/tickets?customer_email=' + email);
    }

    submitRating(data) {
        return this.httpService.post('mine/udratings/post', data);
    }

    getDetailComment(id, customerId) {
        return this.httpService.get('lotte_product/review?review_id=' + id + '&customer_id=' + customerId);
    }

    getLpointHistory(currentPage) {
        // const page = filter ? filter : 1;
        return this.httpService.get('mine/lpoint-history?c=' + currentPage);
    }

    getDetailLpointHistory(orderId) {
        return this.httpService.get('mine/lpoint-history-details/' + orderId);
    }

    updateLpoint() {
        return this.httpService.get('mine/lpoint');
    }

    getGuestTrackingOrder(data) {
        return this.httpService.postAnonymous('lotte_product/trackOrder', data);
    }

}
