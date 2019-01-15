import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {Injectable} from '@angular/core';
import {HttpService} from '../../services/http.service';
import {Http} from '@angular/http';

@Injectable()
export class RechargeService {


    constructor(protected httpService: HttpService, protected  http: Http) {

    }

    protected _placeOrderEvent = new Subject<any>();
    protected _isUserValidEvent = new Subject<any>();

    listenPlaceOrderEvent(): Observable<any> {
        return this._placeOrderEvent.asObservable();
    }

    emitPlaceOrderEvent(message: boolean) {
        this._placeOrderEvent.next(message);
    }

    listenIsUserValidEvent(): Observable<any> {
        return this._isUserValidEvent.asObservable();
    }

    emitIsUserValidEvent(message: boolean) {
        this._isUserValidEvent.next(message);
    }

    getRechargeConfig() {
        return this.httpService.getAnonymous('mobilerecharge/config').map(data => data.json());
    }

    getRechargeProvider(rechargeType) {
        return this.httpService.getAnonymous('mobilerecharge/' + rechargeType + '/provider').map(data => data.json());
    }

    getRechargeProduct(rechargeType) {
        return this.httpService.getAnonymous('mobilerecharge/' + rechargeType + '/products').map(data => data.json());
    }

    createCartEmpty(cartInfo: any) {
        const token = localStorage.getItem('token');
        const rechargeCartId = localStorage.getItem('rechargeCartId');

        if (token) {
            const payLoad = {'rechargeInformation': cartInfo};
            return this.httpService.post('mobilerecharge/cart/create', {});
        } else {
            return this.httpService.postAnonymous('mobilerecharge/guest-cart/create', cartInfo);
        }
    }

    updateCartProduct(cartInfo: any) {
        const token = localStorage.getItem('token');
        const rechargeCartId = localStorage.getItem('rechargeCartId');

        if (token) {
            const payLoad = {'rechargeInformation': cartInfo, 'rechargeCartId': rechargeCartId};

            return this.httpService.post('mobilerecharge/cart/update-product', payLoad);
        } else {
            const payLoad = {'rechargeInformation': cartInfo, 'maskCartId': rechargeCartId};

            return this.httpService.postAnonymous('mobilerecharge/guest-cart/update-product', payLoad);
        }
    }


    getCart() {
        const token = localStorage.getItem('token');
        const rechargeCartId = localStorage.getItem('rechargeCartId');

        if (token) {
            return this.httpService.get('mobilerecharge/checkout-information');
        } else {

            return this.httpService.getAnonymous('mobilerecharge/guest-cart/' + rechargeCartId + '/checkout-information');
        }
    }

    addCoupon(coupon) {
        const token = localStorage.getItem('token');
        const rechargeCartId = localStorage.getItem('rechargeCartId');
        if (token) {
            return this.httpService.put('mobilerecharge/mine/coupons/' + coupon, {});
        } else {
            return this.httpService.putAnonymous('mobilerecharge/guest-cart/' + rechargeCartId + '/coupons/' + coupon, {});
        }
    }

    deleteCoupon() {
        const token = localStorage.getItem('token');
        const rechargeCartId = localStorage.getItem('rechargeCartId');
        if (token) {
            return this.httpService.delete('mobilerecharge/mine/coupons');
        } else {
            return this.httpService.deleteAnonymous('mobilerecharge/guest-cart/' + rechargeCartId + '/coupons');
        }
    }

    getLpoint() {
        return this.httpService.put('mobilerecharge/mine/lpoint', {});
    }

    applyLPoint(lpoint) {
        const token = localStorage.getItem('token');
        const payload = {
            lpoint: parseInt(lpoint, 10)
        };
        return this.httpService.post('mobilerecharge/mine/apply-lpoint', payload);
    }

    checkOrderStatus() {
        const rechargeCartId = localStorage.getItem('rechargeCartId');
        return this.httpService.getAnonymous('mobilerecharge/local_atm/' + rechargeCartId + '/check-order');
    }


    creditCardTransactionRequest(orderId) {
        if (location.href.indexOf('') > -1) {
            return this.http.post('/paymentgateway/SilentOrder/TransactionRequest/'.toHostName(), {});
        } else {
            return this.httpService.getAnonymous('paymentgateway/silent-order/transaction-request/' + orderId);
        }
    }

    placeOrder(cartInfo, paymentInfo) {
        paymentInfo.user_phone = cartInfo.user_phone_number;
        paymentInfo.user_email = cartInfo.user_email;
        const payload = {
            paymentInformation: paymentInfo
        };

        const rechargeCartId = localStorage.getItem('rechargeCartId');
        const token = localStorage.getItem('token');
        if (token) {
            return this.httpService.post('mobilerecharge/mine/place-order', payload);
        } else {
            return this.httpService.postAnonymous('mobilerecharge/guest-cart/' + rechargeCartId + '/place-order', payload);
        }
    }

    getPaymentMethods() {
        const rechargeCartId = localStorage.getItem('rechargeCartId');
        const token = localStorage.getItem('token');
        if (token) {
            return this.httpService.get('mobilerecharge/mine/payment-methods');
        } else {
            return this.httpService.getAnonymous('mobilerecharge/guest-cart/' + rechargeCartId + '/payment-methods');
        }
    }

    setPaymentMethod(payload) {
        const rechargeCartId = localStorage.getItem('rechargeCartId');
        const token = localStorage.getItem('token');
        payload = {'paymentInformation': payload}
        if (token) {
            return this.httpService.put('mobilerecharge/mine/selected-payment-method', payload);
        } else {
            return this.httpService.postAnonymous('mobilerecharge/guest-cart/' + rechargeCartId + '/selected-payment-method',payload);
        }
    }

}
