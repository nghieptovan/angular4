import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as account from '../../../../store/account/account.actions';
import * as fromRoot from '../../../../store/index';

@Component({
    selector: 'app-account-order-detail',
    templateUrl: './detail.html',
    styleUrls: ['./detail.less']
})

export class LotteAccountOrderDetail {

    order: any;

    orderSub: any;
    constructor(private store: Store<fromRoot.AppState>, private activatedRoute: ActivatedRoute, private router: Router) {
        this.orderSub = this.store.select(fromRoot.accountGetOrderDetail)
            .subscribe((order) => {
                this.order = order;
            });
        this.store.dispatch(new account.LoadOrderById(this.activatedRoute.params['value'].id));
    }

    ngOnDestroy() {
        this.orderSub.unsubscribe();
    }

    goToProductDetail(product) {
        this.router.navigate(['product', product.product_id, product.url_key]);
    }
}
