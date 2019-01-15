import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { GlobalService } from '../../services/global.service';
import * as common from '../../store/common/common.actions';
import * as fromRoot from '../../store/index';
import * as products from '../../store/products/products.actions';

// Redux
@Component({
    selector: 'app-brand',
    templateUrl: './brand.html',
    styleUrls: ['./brand.less']
})

export class LotteBrand {
    currentFilter: any;
    currentParams: any;

    seoArea:any;
    urlInfoSub: any;
    constructor(
        private store: Store<fromRoot.AppState>,
        private activatedRoute: ActivatedRoute,
        private globalService: GlobalService) {

        this.urlInfoSub = this.store.select(fromRoot.commonGetUrlInfo).subscribe(info => {
            if (!info.brand) {
                this.store.dispatch(new products.ResetProductState());
            }
            if (info.type === 'brand') {
                this.seoArea = info.brand.seo_area;
                this.loadProductsByBrand(info.brand.id);
            }
        });

        this._registerRouterChangeEvents();
    }

    ngAfterViewInit() {
        this.currentFilter = this.activatedRoute.snapshot.queryParams;
    }

    _registerRouterChangeEvents() {
        this.activatedRoute.params.subscribe((params: any) => {
            if (this.currentParams !== params.slug) {
                this.store.dispatch(new common.LoadUrlInfo({ type: 'brand', slug: params.slug, id: params.id }));
                this.currentParams = params.slug;
            }
        });
    }

    loadProductsByBrand(brandId) {
        if (this.currentFilter) {
            const requestBody = {
                key: brandId,
                priceMax: 0,
                type: 'brand',
                params: this.globalService.parseParamsToRequestBody(this.currentFilter)
            };
            this.store.dispatch(new products.Load(requestBody));
        } else {
            const actionPayload = {
                key: brandId,
                params: {
                    page: 1,
                    hitsPerPage: 40,
                    facets: ['categories', 'product_brand', 'color', 'size', 'vendor', 'product_brand_id']
                },
                type: 'brand'
            };

            if (actionPayload.key) {
                this.store.dispatch(new products.Load(actionPayload));
            }
        }
    }

    ngOnDestroy() {
        this.urlInfoSub.unsubscribe();
        this.globalService.removeTrackingCode();
    }
}
