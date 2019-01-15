import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import { ActivatedRoute } from '@angular/router';
import * as fromRoot from '../../../store';
import {BaseProductsComponent} from "../../base/products/products";
import * as products from '../../../store/products/products.actions';

@Component({
    selector: 'app-common-fs-products',
    templateUrl: 'products.html',
    styleUrls: ['./products.less']
})

export class CommonFSProductsComponent extends BaseProductsComponent {
    productState: any;
    isLoading: boolean;

    constructor(store: Store<fromRoot.AppState>, activatedRoute: ActivatedRoute){
        super(store, activatedRoute);
        this.requestBodySub = this.store.select(fromRoot.productsGetState).subscribe(state => {
            this.requestBody = state.requestBody;
        });

        this.ProductsSub = this.store.select(fromRoot.productsGetEntities).subscribe((state) => {
            this.productState = state;
            this.Products = state.hits;
            this.count = state.hitsPerPage * (this.requestBody.params && this.requestBody.params.page || 0);
            this.total = state.nbHits;
            this.count = this.count > this.total ? this.total : this.count;
            this.isLoading = false;
        });
    }

    loadProducts() {
        this.store.dispatch(new products.Load(this.requestBody));
    }

    viewMore() {
        this.isLoading = true;
        this.requestBody.params.isViewMore = true;
        this.requestBody.params.page = (this.requestBody.params.page || 0) + 1;
        // this.store.dispatch(new products.Load(this.requestBody));
        this.loadProducts();
    }
}