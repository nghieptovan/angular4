import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../store';

@Component({
    selector: 'app-tpo-products',
    templateUrl: './products.html',
    styleUrls: ['./products.less']
})

export class TpoProductsComponent implements OnInit{
    tpoProducts: any;
    requestBody: any;
    count: number;
    total: number;

    @Input() tpoId:any;
    @Input() urlKey:string;

    requestBodySub: any;
    tpoProductsSub: any;
    // tpoDashboardProductsSub: any;

    constructor(protected store: Store<fromRoot.AppState>, private activatedRoute: ActivatedRoute) {
        this.requestBodySub = this.store.select(fromRoot.tpoGroupGetState).subscribe(state => {
            this.requestBody = state.requestBody;
        });
    }

    ngOnInit(): void {
        // this.loadProducts();
    }

    ngOnDestroy() {
        this.requestBodySub.unsubscribe();
        this.tpoProductsSub.unsubscribe();
    }

    viewMore() {
        this.requestBody.page = (this.requestBody.page || 0) + 1;
        this.loadProducts();
    }

    loadProducts(){
        throw new Error('This method is abstract');
    };
}
