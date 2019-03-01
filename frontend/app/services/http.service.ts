import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';

import { AppConstants } from '../app.constant';
import * as fromRoot from '../store/index';

@Injectable()
export class HttpService {
    public header: any;
    public baseURL: string;
    private elasticBaseUrl: string;
    private elasticHeader: Headers;
    private consumerHeader: Headers;

    constructor(private http: Http, private store: Store<fromRoot.AppState>) {
        this.baseURL = AppConstants.API_ENDPOINT;
        // this.store.select(fromRoot.commonGetConfigs)
        //     .subscribe((config) => {
        //         this.baseURL = AppConstants.API_ENDPOINT;
        //         if (!_.isEmpty(config)) {
        //             setTimeout(() => {
        //                 AppConstants.CHECKOUT.INSTALLMENT_MINIMUM_PRICE = Number.parseInt(config[1].bank_installment_minimum_price);
        //                 AppConstants.CHECKOUT.PAYMENT_COD_MAX_PRICE = Number.parseInt(config[1].payment_cashondelivery_max_order_total);
        //             }, 200);

        //             this.elasticBaseUrl = config[1].elastic_server;
        //             this.elasticHeader = new Headers({
        //                 'Content-Type': 'application/json',
        //                 'Accept': 'application/json',
        //                 // 'Authorization': 'Bearer ' + config[1].elastic_access_token
        //             });



        //         }
        //     });
        //this.elasticBaseUrl = typeof this.elasticBaseUrl === 'undefined' ? 'https://els-staging.lotte.vn/api/v1/' : this.elasticBaseUrl;

    }

    getElastic(url): Observable<Response> {
        return this.http.get(this.elasticBaseUrl + url, {
            headers: this.elasticHeader
        });
    }

    postElastic(url, data, stringify = true): Observable<Response> {
        return this.http.post(this.elasticBaseUrl + url, JSON.stringify(data), {
            headers: this.elasticHeader
        });
    }

    getAnonymous(url, cache: Boolean = false): Observable<Response> {
        const header = this.appendHeaders(false);
        return this.http.get(this.baseURL + url, {
            headers: header
        });
    }

    getLocalFile(url, cache: Boolean = false): Observable<Response> {
        const header = this.appendHeaders(false);
        return this.http.get(url, {
            headers: header
        });
    }

    postAnonymous(url, data): Observable<Response> {
        const header = this.appendHeaders(false);
        return this.http.post(this.baseURL + url, JSON.stringify(data), {
            headers: header
        });
    }

    putAnonymous(url, data): Observable<Response> {
        const header = this.appendHeaders(false);
        return this.http.put(this.baseURL + url, JSON.stringify(data), {
            headers: header
        });
    }

    deleteAnonymous(url): Observable<Response> {
        const header = this.appendHeaders(false);
        return this.http.delete(this.baseURL + url, {
            headers: header
        });
    }

    get(url): Observable<Response> {
        const header = this.appendHeaders(true);
        return this.http.get(this.baseURL + url, {
            headers: header
        });
    }

    post(url, data): Observable<Response> {
        const header = this.appendHeaders(true);
        return this.http.post(this.baseURL + url, JSON.stringify(data), {
            headers: header
        });
    }

    put(url, data): Observable<Response> {
        const header = this.appendHeaders(true);
        return this.http.put(this.baseURL + url, JSON.stringify(data), {
            headers: header
        });
    }

    patch(url, data): Observable<Response> {
        const header = this.appendHeaders(true);
        return this.http.patch(this.baseURL + url, JSON.stringify(data), {
            headers: header
        });
    }

    delete(url): Observable<Response> {
        const header = this.appendHeaders(true);
        return this.http.delete(this.baseURL + url, {
            headers: header
        });
    }

    private appendHeaders(isAuthorized) {
        const userToken = localStorage.getItem('token');

        let token = AppConstants.OAUTH.TOKEN;
        if (isAuthorized) {
            token = userToken;
        }

        return new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        });
    }

    elsBaseUrl : any = AppConstants.ELASTIC_API_ENDPOINT;
    elsHeader  : any = new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // 'Authorization': 'Bearer ' + config[1].elastic_access_token
    });
    getEls(url): Observable<Response> {

        return this.http.get(this.elsBaseUrl + url, {
            headers: this.elsHeader
        });
    }

    postEls(url, data, stringify = true): Observable<Response> {
        return this.http.post(this.elsBaseUrl + url, JSON.stringify(data), {
            headers: this.elsHeader
        });
    }


    getElsCustomHeader(header = null,url): Observable<Response> {
        header = header == null ? this.elsHeader : header;
        return this.http.get(this.elsBaseUrl + url, {
            headers: header
        });
    }

    postElsCustomHeader(header = null,url, data, stringify = true): Observable<Response> {
        header = header == null ? this.elsHeader : header;
        if(stringify){
            data = JSON.stringify(data)
        }
        return this.http.post(this.elsBaseUrl + url, data, {
            headers: header
        });
    }

}
