import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../store/index';
import * as categories from '../../../store/categories/categories.actions';
import { Router } from '@angular/router';
@Component({
    selector: 'lt-checkout-noitem',
    templateUrl: './noitem.html',
    styleUrls: ['./noitem.less']
})

export class LtCheckoutNoItemComponent {
    @Input('currentStep')
    currentStep : any;


    constructor(private store: Store<fromRoot.AppState>, private router: Router) {

    }

    backToHome() {
        this.store.dispatch(new categories.SetSelectedStore(''));
        this.router.navigate(['/']);
        return false;
    }
}
