import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';

import * as fromRoot from '../../../../store';
import * as home from '../../../../store/home/home.actions';

declare var $;

@Component({
    selector: 'lt-home-fashion-highlight-products',
    templateUrl: './highlight-products.html',
    styleUrls: ['./highlight-products.less']
})
export class LtHomeFashionHighlightProducts {
    hasBanner: any = true;
    highLightProducts: any = [];
    homeIsLoading$: any;

    homeCmsBlockSub: any;
    constructor(private store: Store<fromRoot.AppState>, private domSanitizer: DomSanitizer, private router: Router) {
        this.homeIsLoading$ = this.store.select(fromRoot.homeGetIsLoadingState);
        this.homeCmsBlockSub = this.store.select(fromRoot.homeGetCmsBlock)
            .subscribe((cmsBlock) => {
                this.highLightProducts = cmsBlock.highlightProducts;
            });
    }

    loadMoreProducts(nextPromotionId) {
        this.store.dispatch(new home.LoadMoreProducts(nextPromotionId));
    }

    getProductsCount() {
        return _.get(this.highLightProducts, '[0].total_product', 0);
    }

    getProductsViewed() {
        if (_.get(this.highLightProducts, '[0].total_product', 0)) {
            return _.get(this.highLightProducts, 'length', 0) * 4;
        }
        return 0;
    }

    ngOnDestroy() {
        this.homeCmsBlockSub.unsubscribe();
    }
}
