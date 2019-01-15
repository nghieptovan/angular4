import {Component, OnInit} from '@angular/core';
import {TpoProductsComponent} from "../products";
import * as tpo from '../../../../store/tpo/tpo.actions';
import {Store} from "@ngrx/store";
import { ActivatedRoute } from '@angular/router';
import * as fromRoot from '../../../../store';

@Component({
    selector: 'app-tpo-dashboard-products',
    templateUrl: 'dashboard-products.html'
})

export class TpoDashboardProductsComponent extends TpoProductsComponent {
    constructor(store: Store<fromRoot.AppState>, activatedRoute: ActivatedRoute){
        super(store, activatedRoute);
        this.tpoProductsSub = this.store.select(fromRoot.tpoGroupGetTpoDashboardProducts).subscribe(state => {
            this.tpoProducts = state.products;
            this.count = state.count;
            this.total = state.total;
        });

        this.loadProducts();
    }

    loadProducts() {
        const actionPayload = {
            // key: tpoId,
            page: this.requestBody.page || 1,
        };
        this.store.dispatch(new tpo.LoadTpoDashboardProducts(actionPayload));
    }

}