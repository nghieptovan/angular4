import {Component, OnInit} from '@angular/core';
import {Dispatcher, Store} from '@ngrx/store';
import {DialogService} from 'ng2-bootstrap-modal';

import {AppConstants} from '../../../app.constant';
import * as fromRoot from '../../../store';
import {ActivatedRoute, Router} from '@angular/router';
import * as rechargeAction from '../../../store/recharge/recharge.actions';
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'app-recharge-sidebar',
    templateUrl: './sidebar.html'
})
export class SidebarRechargeComponent {

    appConstants: any;
    currentPage: any = 'phonecard';

    cartCreateSub: any;

    userInfoSub: any;
    userInfo: any;

    constructor(private store: Store<fromRoot.AppState>, private dialogService: DialogService, dispatcher: Dispatcher, protected router: Router) {
        this.appConstants = AppConstants;
        if (this.router.url.indexOf('phonecard') > -1) {
            this.currentPage = 'phonecard';
        } else if (this.router.url.indexOf('topup') > -1) {
            this.currentPage = 'topup';
        } else if (this.router.url.indexOf('gamecard') > -1) {
            this.currentPage = 'gamecard';
            this.store.dispatch(new rechargeAction.SelectProvider({
                selectedProvider: {
                    'label': 'FPT',
                    'value': rechargeAction.DEFAULT_GAMECARD_PROVIDER
                }
            }));
        }

        // Clear cart information
        localStorage.removeItem('rechargeCart');
        /*localStorage.removeItem('rechargeOrderSuccess');
        localStorage.removeItem('rechargePaymentMethod');*/
        this.store.dispatch(new rechargeAction.SelectRechargeType({'selectedRechargeType': this.currentPage}));

        this.cartCreateSub = this.store.select(fromRoot.rechargeGetCreateCart).subscribe(cartCreate => {
            if (cartCreate.result && cartCreate.reason === 'for_update') {
                this.store.dispatch(new rechargeAction.GetCart(null));
            }
        });


        const rechargeCartId = localStorage.getItem('rechargeCartId');
        if (rechargeCartId) {
            this.store.dispatch(new rechargeAction.GetCart(null));
        } else {
            this.store.dispatch(new rechargeAction.CreateCart('for_update'));
        }


        this.userInfoSub = this.store.select(fromRoot.accountGetInfo).subscribe((info) => {
            this.userInfo = info;
            if (this.userInfo && this.userInfo.lpoint_active) {
                this.store.dispatch(new rechargeAction.CartGetLPoint());
            }

        });
    }


}
