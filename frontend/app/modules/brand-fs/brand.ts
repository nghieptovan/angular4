import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { GlobalService } from '../../services/global.service';
import * as brand from '../../store/brand/brand.actions';
import * as fromRoot from '../../store/index';
import * as products from '../../store/products/products.actions';
import {FacetsDefaultConstants} from "../../components/base/products/constants/FacetsDefaultConstants";

// Redux
@Component({
    selector: 'app-brand-fs',
    templateUrl: './brand.html',
    styleUrls: ['./brand.less']
})

export class LotteBrandFS {
    currentFilter: any;
    currentParams: any;

    brandInfoSub: any;
    brandName: string;
    staticBanner: any;

    constructor(
        private store: Store<fromRoot.AppState>,
        private activatedRoute: ActivatedRoute,
        private globalService: GlobalService) {

        this.brandInfoSub = this.store.select(fromRoot.brandGetEntity).subscribe(brandInfo => {
            if (brandInfo) {
                this.store.dispatch(new products.ResetProductState());
                this.loadProductsByBrand(brandInfo.id);
                this.store.dispatch(new products.CheckOmniBlink({
                    key: brandInfo.id, type: 'brand'
                }));

                this.brandName = brandInfo.name;
                this.staticBanner = brandInfo.static_banner;
            }
        });

        this._registerRouterChangeEvents();
    }

    ngAfterViewInit() {
        this.currentFilter = this.activatedRoute.snapshot.queryParams;
    }

    _registerRouterChangeEvents() {
        this.activatedRoute.params.subscribe((params: any) => {
            if (this.currentParams !== params.id) {
                // this.store.dispatch(new common.LoadUrlInfo({ type: 'brand', slug: params.slug, id: params.id }));
                this.store.dispatch(new brand.Load({ id: params.id }));
                this.currentParams = params.id;
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
            requestBody.params.order = requestBody.params.order?requestBody.params.order:FacetsDefaultConstants.orderDefault;
            this.store.dispatch(new products.Load(requestBody));
            this.currentFilter = null;
        } else {
            const actionPayload = {
                key: brandId,
                params: {
                    page: 1,
                    hitsPerPage: 40,
                    facets: FacetsDefaultConstants.facets,
                    order: FacetsDefaultConstants.orderDefault
                },
                type: 'brand'
            };

            if (actionPayload.key) {
                this.store.dispatch(new products.Load(actionPayload));
            }
        }
    }

    ngOnDestroy() {
        this.brandInfoSub.unsubscribe();
        this.globalService.removeTrackingCode();
    }
}
