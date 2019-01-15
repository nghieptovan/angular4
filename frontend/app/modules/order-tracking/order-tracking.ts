import { Component } from '@angular/core';
import { Dispatcher, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../store';
import * as account from '../../store/account/account.actions';
import { ActivatedRoute } from '@angular/router';

declare var $;
@Component({
    selector: 'app-account-guest-order-tracking',
    templateUrl: './order-tracking.html',
    styleUrls: ['./order-tracking.less']
})

export class LotteGuestOrderTracking {
    orderInfo: any;
    shipments: any;
    isShowOrderDetail: any = {};
    accountIsLoading$: Observable<any>;
    incrementId: any;
    email: any;

    activatedRouteSub: any;
    orderTrackingSub: any;
    constructor(private store: Store<fromRoot.AppState>, private dispatcher: Dispatcher, private activatedRoute: ActivatedRoute) {
        this.accountIsLoading$ = this.store.select(fromRoot.accountGetLoadingState);

        this.orderTrackingSub = this.store.select(fromRoot.accountGetOrderTracking)
            .subscribe((orderTracking) => {
                this.orderInfo = orderTracking.order_data;
                this.shipments = orderTracking.shipment_data;
            });

        this.activatedRouteSub = this.activatedRoute.queryParams.subscribe((queryParams) => {
            if (queryParams.increment !== this.incrementId || queryParams.email !== this.email) {
                this.incrementId = queryParams.increment;
                this.email = queryParams.email;
                this.store.dispatch(new account.LoadOrderTracking({
                    increment_id: this.incrementId,
                    email: this.email
                }));
            }
        });
    }

    ngOnInit() {
        $('body').addClass('account smcustomer-account-trackorders');
    }

    ngOnDestroy() {
        this.activatedRouteSub.unsubscribe();
        this.orderTrackingSub.unsubscribe();
        $('body').removeClass('account smcustomer-account-trackorders');
    }

    toggleViewListProduct(incrementId) {
        if (this.isShowOrderDetail[incrementId]) {
            this.isShowOrderDetail[incrementId] = false;
        } else {
            this.isShowOrderDetail[incrementId] = true;
        }
    }
}
