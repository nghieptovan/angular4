import { Component } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { LoginModal } from '../login/login';
import { AppConstants } from '../../app.constant';
import * as auth from '../../store/auth/auth.actions';
import * as categories from '../../store/categories/categories.actions';
import * as fromRoot from '../../store';
import { Dispatcher, Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
    selector: 'lt-forgot-password',
    templateUrl: './forgot-password.html',
    styleUrls: ['./forgot-password.less']
})
export class ForgotPasswordModal extends DialogComponent<null, boolean> {
    appConstants: any;
    store: any;
    forgotPassword: any;
    isError: Boolean = false;
    isSuccess: Boolean = false;
    errorMsg: any;

    constructor(dialogService: DialogService,
                store: Store<fromRoot.AppState>,
                private dispatcher: Dispatcher, private router: Router) {
        super(dialogService);
        document.body.classList.add('body--block-scroll');
        this.appConstants = AppConstants;
        this.store = store;
    }

    ngAfterViewInit() {
        this.forgotPassword = this.dispatcher.subscribe((action) => {
            switch (action.type) {
                case auth.FORGOT_PASSWORD_SUCCESS:
                    const payload = action.payload;
                    if (payload.error === true) {
                        this.isError = true;
                        this.errorMsg = payload.message;
                    } else {
                        this.isSuccess = true;
                    }
                    break;
                default:
                    break;
            }
        });
    }

    closeModal() {
        document.body.classList.remove('body--block-scroll');
        this.close();
    }

    startShopping() {
        this.closeModal();
        this.store.dispatch(new categories.SetSelectedStore(''));
        this.router.navigate(['/']);
        return false;
    }

    showRegisterModal() {
        this.closeModal();
       
    }

    submitForgotPassword(form) {
        if (form.valid) {
            this.store.dispatch(new auth.ForgotPassword(form.value));
        }
    }

    ngOnDestroy() {
        this.forgotPassword.unsubscribe();
    }
}
