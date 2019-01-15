import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as account from '../../../../store/account/account.actions';
import * as fromRoot from '../../../../store/index';

@Component({
    selector: 'app-account-order-tracking',
    templateUrl: './tracking.html',
    styleUrls: ['./tracking.less']
})

export class LotteAccountOrderTracking {
    accountIsLoading$: Observable<any>;
    isShowOrderDetail: any = {};
    orderInfo: any;
    shipments: any;
    orderIncrementId: any;
    orderTrackingSub: any;
    activatedRouteSub: any;
    userInfo: any = {};

    constructor(private store: Store<fromRoot.AppState>, private activatedRoute: ActivatedRoute, private router: Router) {
        this.accountIsLoading$ = this.store.select(fromRoot.accountGetLoadingState);
        this.orderTrackingSub = this.store.select(fromRoot.accountGetOrderTracking)
            .subscribe((orderTracking) => {
                this.orderInfo = orderTracking.order_data;
                this.shipments = orderTracking.shipment_data;
            });

        this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
        this.activatedRouteSub = this.activatedRoute.params.subscribe((params) => {
            if (params.id !== this.orderIncrementId) {
                this.orderIncrementId = params.id;
                this.store.dispatch(new account.LoadOrderTracking({
                    increment_id: this.orderIncrementId,
                    email: this.userInfo.email
                }));
            }
        });
    }

    ngOnDestroy() {
        this.orderTrackingSub.unsubscribe();
        this.activatedRouteSub.unsubscribe();
    }

    toggleViewListProduct(incrementId) {
        if (this.isShowOrderDetail[incrementId]) {
            this.isShowOrderDetail[incrementId] = false;
        } else {
            this.isShowOrderDetail[incrementId] = true;
        }
    }
}
