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
    @Effect() login$ = this._actions.ofType(auth.LOGIN)
        .switchMap((action) => {
            const currentTimestamp = new Date().getTime();
            const lastSavedTimestamp = localStorage.getItem('loggedTimestamp') ? Number.parseInt(localStorage.getItem('loggedTimestamp')) : 0;
            const secondsAfterSaved = Math.floor(((currentTimestamp - lastSavedTimestamp) / 1000));
            const loggedUser = localStorage.getItem('loggedUser');
            if (secondsAfterSaved > 604800 || !loggedUser) {
                return this.authService.login((action as any).payload)
                    .map((loggedUser) => {
                        if(loggedUser.code == 200){
                            let data = loggedUser.data;
                            delete data.password;
                            localStorage.setItem('loggedUser', JSON.stringify(data));
                            localStorage.setItem('loggedTimestamp', currentTimestamp.toString());
                            return new auth.LoginSuccess(data);
                        }else{
                            return new auth.LoginFailed(loggedUser);
                        }                       
                    }).catch((error) => {
                        return Observable.of(new auth.LoginFailed(error));
                    });
            } else {    
                return Observable.of(new auth.LoginSuccess(JSON.parse(loggedUser)));            
            }
        });
    // Login
    @Effect() GetCurrentUser$ = this._actions.ofType(auth.CURRENT_USER)
        .switchMap((action) => {
            const currentTimestamp = new Date().getTime();
            const lastSavedTimestamp = localStorage.getItem('loggedTimestamp') ? Number.parseInt(localStorage.getItem('loggedTimestamp')) : 0;
            const secondsAfterSaved = Math.floor(((currentTimestamp - lastSavedTimestamp) / 1000));
            const loggedUser = localStorage.getItem('loggedUser');
            if (secondsAfterSaved > 604800 || !loggedUser) {
                return Observable.of(new auth.GetCurrentUserSuccess({data: loggedUser, status: false}));
            } else {    
                return Observable.of(new auth.GetCurrentUserSuccess({data: JSON.parse(loggedUser), status: true}));            
            }
        });
    // Get account by ID
    @Effect()
    getAccountById$ = this._actions.ofType(auth.GET_ACCOUNT_BY_ID)
        .switchMap((action) => {
            return this.authService.getAccountById((action as any).payload)
                .map((token) => {
                    return new auth.LoadAccountByIdSuccess(token.json());
                }).catch((error) => {
                    return Observable.of(new auth.LoadAccountByIdFailed(error));
                });
        });

    // Logouterr
    @Effect()
    logout$ = this._actions.ofType(auth.LOGOUT)
        .switchMap((action) => {
            localStorage.removeItem('loggedUser');
            localStorage.removeItem('loggedTimestamp');
            return Observable.of(new auth.LogoutSuccess({status: false}));
        });

    // Forgot password
    @Effect()
    forgotPassword = this._actions.ofType(auth.FORGOT_PASSWORD)
        .switchMap((action) =>
            this.authService.forgotPassword((action as any).payload)
                .map((resp) => {
                    return new auth.ForgotPasswordSuccess(resp.json());
                })).catch((error) => {
            return Observable.of(new auth.ForgotPasswordFailed(error));
        });
}
