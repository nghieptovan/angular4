import { Component, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../store';

@Component({
    selector: 'app-base-products',
    template: ''
})

export class BaseProductsComponent{
    Products: any;
    requestBody: any;
    count: number;
    total: number;

    requestBodySub: any;
    ProductsSub: any;

    constructor(protected store: Store<fromRoot.AppState>, private activatedRoute: ActivatedRoute) {

    }

    ngOnDestroy() {
        this.requestBodySub.unsubscribe();
        this.ProductsSub.unsubscribe();
    }

    viewMore() {
        this.requestBody.page = (this.requestBody.page || 0) + 1;
        this.loadProducts();
    }

    loadProducts(){
        // Products will be load in child
        throw new Error('This method is abstract');
    };
}
