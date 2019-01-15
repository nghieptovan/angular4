import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../store/index';
import * as categories from '../../../store/categories/categories.actions';
declare var $;

@Component({
    selector: 'app-account-logout-success',
    templateUrl: './logout-success.html',
    styleUrls: ['./logout-success.less']
})
export class LotteAccountLogoutSuccess {
    constructor(private router: Router, private store: Store<fromRoot.AppState>) {
        setTimeout(() => {
            this.router.navigate(['/']);
            this.store.dispatch(new categories.SetSelectedStore(''));
        }, 5000);
    }
}
