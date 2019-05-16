import { Component, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Dispatcher, Store } from '@ngrx/store';
import * as _ from 'lodash';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { Observable } from 'rxjs/Observable';

import { AppConstants } from '../../app.constant';
import { AuthService, FacebookLoginProvider } from '../../libs/angular4-social-login';
import * as fromRoot from '../../store';
import * as account from '../../store/account/account.actions';
import * as auth from '../../store/auth/auth.actions';

export interface ILoginModal {
    isRegisterTab: Boolean;
}

declare var $: any;

@Component({
    selector: 'lt-login-modal',
    templateUrl: './login.html',
    styleUrls: ['./login.less']
})
export class LoginModal extends DialogComponent<ILoginModal, boolean> implements ILoginModal, OnDestroy {
    @ViewChild('registerForm') registerForm: NgForm;

    isRegisterTab: Boolean;
    isOtherInfoChecked: Boolean = false;
    hasRememberEmail: Boolean = false;
    rememberEmail: any;
    isSubscribe: Boolean = true;

    accountErrorMessage$: Observable<string>;
    authErrorMessage$: Observable<string>;
    appConstants: any;
    store: any;
    subscription: any;

    phonePattern = AppConstants.REGEX.TELEPHONE;

    defaultForm = {
        gender: 4,
    };

    dob: String;

    constructor(dialogService: DialogService, store: Store<fromRoot.AppState>, private dispatcher: Dispatcher,
        private router: Router,
        private authService: AuthService) {
        super(dialogService);
        this.store = store;
        this.authErrorMessage$ = this.store.select(fromRoot.authGetErrorMessage);
        this.accountErrorMessage$ = this.store.select(fromRoot.accountGetErrorMessage);
        this.store.dispatch(new account.ResetAccountMsgErrors());
        this.store.dispatch(new auth.ResetAuthMsgErrors());
        this.rememberEmail = localStorage.getItem('rememberEmail');
        if (this.rememberEmail) {
            this.hasRememberEmail = true;
        } else {
            this.rememberEmail = '';
        }
        if(this.rememberEmail === 'null'){
            this.rememberEmail = '';
        }
        this.appConstants = AppConstants;
        document.body.classList.add('body--block-scroll');
    }

    ngAfterViewInit() {
        this.subscription = this.dispatcher
            .subscribe((action) => {
                switch (action.type) {
                    case auth.LOGIN_SUCCESS:
                        if (this.hasRememberEmail) {
                            localStorage.setItem('rememberEmail', this.rememberEmail);
                        } else {
                            localStorage.removeItem('rememberEmail');
                        }

                        break;
                    case account.LOAD_INFO_SUCCESS:
                        this.result = true;
                        this.close();
                        document.body.classList.remove('body--block-scroll');
                        break;
                    default: break;
                }
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

    openDatePicker() {
        const self = this;
        const birthdatePicker = $('#birthday-input').datepicker({
            prevText: 'Previous', prevStatus: '',
            prevJumpText: 'Previous', prevJumpStatus: '',
            nextText: 'Next', nextStatus: '',
            nextJumpText: 'Next', nextJumpStatus: '',
            monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            showMonthAfterYear: true,
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true,
            showOn: 'button',
            buttonImageOnly: true,
            buttonText: '',
            showButtonPanel: true,
            yearRange: '-100:+0',
            onSelect: function (dateText, inst) {
                const formattedDate = $.datepicker.formatDate('yy-mm-dd', $(this).datepicker('getDate'));
                self.dob = formattedDate;
                self.registerForm.form.controls['dob'].setValue(dateText);
            }
        });
        birthdatePicker.datepicker('show');
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    login(form) {
        if (form.valid) {
            const data = _.cloneDeep(form.value);
            this.rememberEmail = form.value.username;
            delete data.hasRememberEmail;
            this.store.dispatch(new auth.Login(data));
        }
    }

    register(form) {
        const self = this;
        const registerModel = {
            customer: {
                firstname: 'Tên',
                lastname: 'Họ',
                email: form.value.email,
                websiteId: 1,
                extension_attributes: {}
            },
            password: form.value.password
        };
        if (this.isSubscribe) {
            registerModel.customer.extension_attributes = _.assign(registerModel.customer.extension_attributes, {
                is_subscribed: 1
            });
        }
        if (this.isOtherInfoChecked) {
            registerModel.customer = _.merge(registerModel.customer, {
                firstname: form.value.firstname,
                lastname: form.value.lastname,
                gender: form.value.gender,
                dob: self.dob,
                extension_attributes: {
                    phone_number: form.value.telephone
                }
            });
        }
        if (form.valid) {
            this.store.dispatch(new account.Register(registerModel));
        }
    }

    closeModal() {
        document.body.classList.remove('body--block-scroll');
        this.close();
    }


}
