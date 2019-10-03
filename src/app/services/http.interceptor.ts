import { Injectable } from '@angular/core';
import { ConnectionBackend, Http, Request, RequestOptions, RequestOptionsArgs, Response } from '@angular/http';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';

import { AppConstants } from '../app.constant';
import * as auth from '../store/auth/auth.actions';
import * as fromRoot from '../store/index';

declare var $;

@Injectable()
export class InterceptedHttp extends Http {
    store: any;
    public showLoading: boolean;
    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, store: Store<fromRoot.AppState>) {
        super(backend, defaultOptions);
        this.store = store;
    }

    getExceptionListUrl() {
        const listUrl = [];
        const baseUrl = AppConstants.API_ENDPOINT;
        const cartId = localStorage.getItem('cartId');
        listUrl.push('carts/mine/custom$');
        listUrl.push('lotte_product/recently_viewed');
        listUrl.push('guest-carts$');
        listUrl.push('carts/mine/items/custom$');
        listUrl.push('guest-carts/\\w+/items/custom$');
        // Get product reviews
        listUrl.push('lotte_product/product_reviews\\?product_id=\\d+$');
        const listRegex = _.map(listUrl, (url) => {
            return new RegExp('(.+?)' + url, 'i');
        });
        return listRegex;
    }

    intercept(observable: Observable<Response>): Observable<Response> {
        return observable
            .do((res: Response) => {
                
            }, (err: any) => {
            })
            .finally(() => {
            });
    }

    request(
        res: string | Request,
        options?: RequestOptionsArgs
    ): Observable<Response> {
        const listUrl = this.getExceptionListUrl();
        const isExcept = _.findIndex(listUrl, (pattern) => {
            return pattern.test(res['url'].toString());
        }) > -1;
        if (isExcept) {
            return super.request(res, options);
        } else {
            return this.intercept(super.request(res, options));
        }
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.get(url, options)
            .catch(e => {
                if (e.status === 401 && e.url && !e.url.includes('customer/token')) {
                    this.onUnauthorized();
                }

                if (e.status === 404) {
                    this.onNotFound(e);
                }

                if (e.status === 400) {
                    this.onBadRequest(e);
                }
                return Observable.throw(e);
            });
    }

    post(
        url: string,
        body: string,
        options?: RequestOptionsArgs
    ): Observable<Response> {
        return super.post(url, body, options)
            .catch(e => {
                if (e.status === 401 && e.url && !e.url.includes('customer/token')) {
                    this.onUnauthorized();
                }

                if (e.status === 404) {
                    this.onNotFound(e);
                }

                if (e.status === 400) {
                    this.onBadRequest(e);
                }
                return Observable.throw(e);
            });
    }

    put(
        url: string,
        body: string,
        options?: RequestOptionsArgs
    ): Observable<Response> {
        return super.put(url, body, options)
            .catch(e => {
                if (e.status === 401 && e.url && !e.url.includes('customer/token')) {
                    try {
                        if (!e.json().message.includes('Mật khẩu không đúng với tài khoản')) {
                            this.onUnauthorized();
                        }
                    } catch (e) {
                        this.onUnauthorized();
                    }
                }

                if (e.status === 404) {
                    this.onNotFound(e);
                }

                if (e.status === 400) {
                    this.onBadRequest(e);
                }
                return Observable.throw(e);
            });
    }

    patch(
        url: string,
        body: string,
        options?: RequestOptionsArgs
    ): Observable<Response> {
        return super.patch(url, body, options)
            .catch(e => {
                if (e.status === 401 && e.url && !e.url.includes('customer/token')) {
                    this.onUnauthorized();
                }

                if (e.status === 404) {
                    this.onNotFound(e);
                }

                if (e.status === 400) {
                    this.onBadRequest(e);
                }
                return Observable.throw(e);
            });
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.delete(url, options)
            .catch(e => {
                if (e.status === 401 && e.url && !e.url.includes('customer/token')) {
                    this.onUnauthorized();
                }

                if (e.status === 404) {
                    this.onNotFound(e);
                }

                if (e.status === 400) {
                    this.onBadRequest(e);
                }
                return Observable.throw(e);
            });
    }

    private onUnauthorized() {
        localStorage.clear();
        this.store.dispatch(new auth.RefreshPage());
    }

    private onNotFound(error) {
        if (error) {
            let response = error._body;
            if (response) {
                response = JSON.parse(response);
                if (response.parameters && response.parameters.fieldName === 'cartId') {
                    localStorage.removeItem('cartId');
                    localStorage.removeItem('cart');
                }

                if (response.parameters && response.parameters.fieldName === 'customerId') {
                    localStorage.removeItem('cartId');
                    localStorage.removeItem('cart');
                }
            }
        }
    }

    private onBadRequest(error) {
        if (error) {
            let response = error._body;
            if (response) {
                response = JSON.parse(response);
                if (response.parameters && response.parameters.fieldName === 'cartId') {
                    localStorage.removeItem('cartId');
                    localStorage.removeItem('cart');
                }
            }
        }
    }
}
