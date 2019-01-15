import {Component, OnInit} from '@angular/core';
import {TpoProductsComponent} from "../products";
import * as tpo from '../../../../store/tpo/tpo.actions';
import {Store} from "@ngrx/store";
import { ActivatedRoute } from '@angular/router';
import * as fromRoot from '../../../../store';

@Component({
    selector: 'app-tpo-detail-products',
    templateUrl: 'detail-products.html'
})

export class TpoDetailProductsComponent extends TpoProductsComponent {
    tpoDetailSub: any;
    tpoId:string;

    constructor(store: Store<fromRoot.AppState>, activatedRoute: ActivatedRoute){
        super(store, activatedRoute);
        this.tpoProductsSub = this.store.select(fromRoot.tpoGroupGetTpoProducts).subscribe(state => {
            this.tpoProducts = state.hits;
            this.count = state.hits !== undefined?state.page*state.hitsPerPage + state.hits.length:0;
            this.total = state.nbHits;
        });

        this.tpoDetailSub = this.store.select(fromRoot.tpoGroupGetTpoDetail).subscribe(state => {
            this.tpoId = state.id;
            if(this.tpoId !== undefined){
                this.loadProducts();
            }

        });
    }

    ngOnDestroy(){
        this.tpoDetailSub.unsubscribe();
        super.ngOnDestroy();
    }

    loadProducts() {
        const actionPayload = {
            // key: tpoId,
            urlKey: this.urlKey,
            tpoId: this.tpoId,
            page: this.requestBody.page || 0,
        };
        this.store.dispatch(new tpo.LoadTpoProducts(actionPayload));
    }

}