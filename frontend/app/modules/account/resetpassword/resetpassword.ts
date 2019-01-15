import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppConstants } from '../../../app.constant';
import { ToastrService } from 'ngx-toastr';
import { Store, Dispatcher } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import * as fromRoot from '../../../store/index';
import * as account from '../../../store/account/account.actions';
declare var $;
// Redux
@Component({
    selector: 'app-account-resetpassword',
    templateUrl: './resetpassword.html',
    styleUrls: ['./resetpassword.less']
})
export class LotteAccountResetPassword implements OnInit, OnDestroy {
    appConstants: any = AppConstants;
    customerId: any;
    token: any;

    dispatcherSub: any;
    constructor(private router: Router, private activatedRoute: ActivatedRoute,
        private store: Store<fromRoot.AppState>, private dispatcher: Dispatcher,
        private toastrService: ToastrService) {
        this.customerId = this.activatedRoute.queryParams['value']['id'];
        this.token = this.activatedRoute.queryParams['value']['token'];

        this.dispatcherSub = this.dispatcher.subscribe((action) => {
            switch (action.type) {
                case account.RESET_PASSWORD_FAILED:
                    if (action.payload && action.payload.message) {
                        this.toastrService.error(action.payload.message, 'Lỗi');
                    }
                    break;
                default:
                    break;
            }
        });
    }
    ngOnInit(): void {
        $('body').removeClass('account');
        $('body').addClass('customer-account-createpassword');
        $('body').addClass('page-layout-1column');
    }

    ngOnDestroy() {
        $('body').removeClass('customer-account-createpassword');
        $('body').removeClass('page-layout-1column');
        this.dispatcherSub.unsubscribe();
    }

    resetPassword(form) {
        if (form.valid) {
            this.store.dispatch(new account.ResetPassword({
                customerId: this.customerId,
                token: this.token,
                newPassword: form.value.password
            }));
        }
    }

}
