import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../../store/index';

@Component({
    selector: 'lt-products',
    templateUrl: './products.html',
    styleUrls: ['./products.less']
})
export class LtProductsComponent {
    products$: Observable<any>;
    productsIsLoading$: Observable<any>;
    categories$: Observable<any>;
    cartGetErrorMessage$: Observable<any>;
    categoryImage: any;
    productTitle: any;
    requestBody: any;
    banner:any;

    urlInfoSub: any;
    productsStateSub: any;
    constructor(private store: Store<fromRoot.AppState>, private activatedRoute: ActivatedRoute) {
        this.products$ = this.store.select(fromRoot.productsGetEntities);
        this.productsIsLoading$ = this.store.select(fromRoot.productsGetLoadingState);
        this.categories$ = this.store.select(fromRoot.categoriesGetEntities);
        this.cartGetErrorMessage$ = this.store.select(fromRoot.checkoutGetErrorMessage);

        this.urlInfoSub = this.store.select(fromRoot.commonGetUrlInfo).subscribe((urlInfo) => {
            this.productTitle = '';
            this.categoryImage = null;
            if (urlInfo.type === 'category') {
                this.categoryImage = urlInfo.category.image_url;
                this.productTitle = urlInfo.category.name;
            }

            if (urlInfo.type === 'brand') {
                this.productTitle = urlInfo.brand.name;
            }

            if (urlInfo.type === 'vendor') {
                this.productTitle = urlInfo.vendor.vendor_name;
                this.banner = urlInfo.vendor.banner_image;
            }
        });

        this.productsStateSub = this.store.select(fromRoot.productsGetState)
            .subscribe((state) => {
                this.requestBody = state.requestBody;
            });
    }

    ngOnDestroy() {
        this.urlInfoSub.unsubscribe();
        this.productsStateSub.unsubscribe();
    }
}
