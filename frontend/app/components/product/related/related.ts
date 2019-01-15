import { Component } from '@angular/core';
import { Dispatcher, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../../store/index';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'lt-product-related',
    templateUrl: './related.html',
    styleUrls: ['./related.less']
})
export class LtProductAlsoLike {
    products$: Observable<any>;
    isLoading$: Observable<any>;
    owlCarouselOptions: any;
    assetUrl: any;

    constructor(private store: Store<fromRoot.AppState>, private dispatcher: Dispatcher, private router: Router, private activatedRoute: ActivatedRoute) {
        this.isLoading$ = this.store.select(fromRoot.productsGetLoadingState);
        this.products$ = this.store.select(fromRoot.productsGetRelatedProducts);
        this.assetUrl = localStorage.getItem('productBaseUrl');
        this.initCarouselSlider();
    }

    initCarouselSlider() {
        this.owlCarouselOptions = {
            items: 6,
            dots: false,
            nav: true,
            navText: ['<span class=\'icon-wrap\'></span>', '<span class=\'icon-wrap\'></span>']
        };
    }

    goProductDetail(product) {
        this.router.navigate(['product/', product.entity_id, product.url_key]);
        return false;
    }
}
