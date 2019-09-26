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
    constructor(private http: Http, private store: Store<fromRoot.AppState>) {
        this.baseURL = AppConstants.API_ENDPOINT;
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
        return new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        });
    }

}
