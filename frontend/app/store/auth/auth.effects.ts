import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';

import { GlobalService } from '../../services/global.service';
import { AuthService } from './auth.service';
import * as fromRoot from '../index';
import * as auth from './auth.actions';

@Injectable()
export class AuthEffects {
    page: any;

    constructor(private _actions: Actions,
                private authService: AuthService,
                private globalService: GlobalService,
                private store: Store<fromRoot.AppState>) {

    }

    // Login
    @Effect()
    login$ = this._actions.ofType(auth.LOGIN)
        .switchMap((action) => {
            return this.authService.login(action.payload)
                .map((token) => {
                    return new auth.LoginSuccess(token.json());
                }).catch((error) => {
                    return Observable.of(new auth.LoginFailed(error));
                });
        });

    @Effect()
    loginUsingFacebook$ = this._actions.ofType(auth.LOGIN_FACEBOOK)
        .switchMap((action) => {
            return this.authService.loginFacebook(action.payload)
                .map((resp) => {
                    const data = resp.json();
                    if (data.status && data.customer_token) {
                        this.globalService.syncCustomerCookies();
                        setTimeout(() => {
                            localStorage.setItem('isFacebookLoggedIn', '1');
                        }, 1000);
                        return new auth.LoginSuccess(data.customer_token);
                    }
                    return new auth.LoginFailed(resp.json());
                }).catch((error) => {
                    return Observable.of(new auth.LoginFailed(error));
                });
        });

    // Logouterr
    @Effect()
    logout$ = this._actions.ofType(auth.LOGOUT)
        .switchMap((action) => {
            return this.authService.logout()
                .map((data) => {
                    return new auth.LogoutSuccess(data);
                }).catch((error) => {
                    return Observable.of(new auth.LogoutFailed(error));
                });
        });

    // Forgot password
    @Effect()
    forgotPassword = this._actions.ofType(auth.FORGOT_PASSWORD)
        .switchMap((action) =>
            this.authService.forgotPassword(action.payload)
                .map((resp) => {
                    return new auth.ForgotPasswordSuccess(resp.json());
                })).catch((error) => {
            return Observable.of(new auth.ForgotPasswordFailed(error));
        });
}
