import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { GlobalService } from '../../services/global.service';
import * as fromRoot from '../../store';
import * as common from '../../store/common/common.actions';
import * as products from '../../store/products/products.actions';

declare var $;
@Component({
    selector: 'app-vendor',
    templateUrl: './seller.html',
    styleUrls: ['./seller.less']
})

export class LotteSeller {
    currentParams: any;
    currentFilter: any;

    urlInfoSub: any;
    constructor(
        private store: Store<fromRoot.AppState>,
        private activatedRoute: ActivatedRoute,
        private globalService: GlobalService) {

        this.urlInfoSub = this.store.select(fromRoot.commonGetUrlInfo).subscribe(info => {
            if (!info.vendor) {
                this.store.dispatch(new products.ResetProductState());
            }
            if (info.type === 'vendor') {
                this.loadProductsByVendor(info.vendor.id);
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
                this.store.dispatch(new common.LoadUrlInfo({ type: 'seller', slug: params.slug, id: params.id }));
                this.currentParams = params.slug;
            }
        });
    }

    loadProductsByVendor(vendorId) {
        if (this.currentFilter) {
            const requestBody = {
                key: vendorId,
                priceMax: 0,
                type: 'vendor',
                params: this.globalService.parseParamsToRequestBody(this.currentFilter)
            };
            this.store.dispatch(new products.Load(requestBody));
            this.currentFilter = null;
        } else {
            const actionPayload = {
                key: vendorId,
                params: {
                    page: 1,
                    hitsPerPage: 40,
                    facets: ['categories', 'product_brand', 'color', 'size', 'vendor', 'vendor_id']
                },
                type: 'vendor'
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
