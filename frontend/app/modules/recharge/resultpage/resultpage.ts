import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Dispatcher, Store} from '@ngrx/store';
import * as fromRoot from '../../../store/index';
import * as rechargeAction from '../../../store/recharge/recharge.actions';

// Redux
@Component({
    selector: 'app-result-page',
    templateUrl: './resultpage.html'
})

export class ResultPage {
    rechargeCartId: any = true;
    dispatcher: any;
    page: String = '';

    constructor(private store: Store<fromRoot.AppState>, private activatedRoute: ActivatedRoute, dispatcher: Dispatcher, private router: Router) {

        const resultPage = this.activatedRoute.params['value'].resultPage;

        if (resultPage === 'failure') {
            this.router.navigate(['mobilerecharge/failure']);
        } else if (resultPage === 'success') {
            // Check order payment status
            const rechargePaymentMethod = localStorage.getItem('rechargePaymentMethod');
            if (rechargePaymentMethod && rechargePaymentMethod.indexOf('local_atm') > -1) {
                this.store.dispatch(new rechargeAction.CartCheckOrderStatus());
            }
        }

        this.dispatcher = dispatcher.subscribe((action) => {
            switch (action.type) {
                case rechargeAction.CART_CHECK_ORDER_STATUS_FAILED:
                    this.router.navigate(['mobilerecharge/failure']);
                    break;
                case rechargeAction.CART_CHECK_ORDER_STATUS_SUCCESS:
                    this.router.navigate(['mobilerecharge/success']);
                    break;
            }
        });
    }
}