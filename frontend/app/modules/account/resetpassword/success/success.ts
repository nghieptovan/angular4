import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import * as fromRoot from '../../../../store/index';
import * as categories from '../../../../store/categories/categories.actions';
declare var $;
@Component({
    selector: 'app-account-resetpassword-success',
    templateUrl: './success.html',
    styleUrls: ['./success.less']
})
export class LotteAccountResetPasswordSuccess implements OnInit, OnDestroy {

    constructor(private store: Store<fromRoot.AppState>, private router: Router) {

    }
    ngOnInit(): void {
        $('body').addClass('smcustomer-other-changepasswordsuccessfully');
    }

    ngOnDestroy() {
        $('body').removeClass('smcustomer-other-changepasswordsuccessfully');
    }

    backToHome() {
        this.store.dispatch(new categories.SetSelectedStore(''));
        this.router.navigate(['/']);
        return false;
    }
}
