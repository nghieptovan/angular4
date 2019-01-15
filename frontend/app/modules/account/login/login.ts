import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DialogService } from 'ng2-bootstrap-modal';
import { Observable } from 'rxjs/Observable';

import { AppConstants } from '../../../app.constant';
import { ForgotPasswordModal } from '../../../modals/forgot-password/forgot-password';
import { LoginModal } from '../../../modals/login/login';
import * as fromRoot from '../../../store';
import * as auth from '../../../store/auth/auth.actions';
import { AuthService, FacebookLoginProvider } from '../../../libs/angular4-social-login';

declare var $;

@Component({
    selector: 'app-account-login',
    templateUrl: './login.html',
    styleUrls: ['./login.less']
})
export class LotteAccountLogin {
    authIsLoggedIn$: Observable<any>;
    authSub: any;
    appConstants: any;
    accountErrorMessage$: Observable<any>;
    authErrorMessage$: Observable<any>;

    constructor(private dialogService: DialogService, private store: Store<fromRoot.AppState>, private router: Router, private activatedRoute: ActivatedRoute,
        private authService: AuthService) {
        this.appConstants = AppConstants;
        this.authIsLoggedIn$ = this.store.select(fromRoot.authGetLoggedInState);
        this.authErrorMessage$ = this.store.select(fromRoot.authGetErrorMessage);
        this.accountErrorMessage$ = this.store.select(fromRoot.accountGetErrorMessage);

        const redirectTo = this.activatedRoute.queryParams['value']['redirect'];
        this.authSub = this.authIsLoggedIn$.subscribe((isLoggedIn) => {
            if (isLoggedIn) {
                if (redirectTo) {
                    this.router.navigate([redirectTo]);
                } else {
                    this.router.navigate(['account']);
                }
            }
        });
    }

    login(form) {
        if (form.valid) {
            this.store.dispatch(new auth.Login(form.value));
        }
    }

    ngOnInit() {
        $('body').addClass('customer-account-login');
    }

    ngOnDestroy() {
        this.authSub.unsubscribe();
        $('body').removeClass('customer-account-login');
    }

    showForgotPasswordModal() {
        this.dialogService.addDialog(ForgotPasswordModal);
    }

    showRegisterModal() {
        this.dialogService.addDialog(LoginModal, {
            isRegisterTab: true
        });
    }

    loginViaFacebook() {
        this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((user) => {
            const loginArgs = {
                auth: {
                    authToken: user.authToken,
                    signedRequest: user.signedRequest
                }
            };
            this.store.dispatch(new auth.LoginFacebook(loginArgs));
        });
    }
}
