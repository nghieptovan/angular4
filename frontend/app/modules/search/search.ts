import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dispatcher, Store } from '@ngrx/store';
import * as _ from 'lodash';

import { GlobalService } from '../../services/global.service';
import * as categories from '../../store/categories/categories.actions';
import * as common from '../../store/common/common.actions';
import * as fromRoot from '../../store/index';
import * as products from '../../store/products/products.actions';

// Redux
@Component({
    selector: 'app-search',
    templateUrl: './search.html',
    styleUrls: ['./search.less']
})
export class LotteSearch {
    currentFilter: any;
    searchResults$: any;
    productIsLoading$: any;
    requestBody$: any;
    keyword: any = '';
    activatedRouteSub: any;
    constructor(
        private store: Store<fromRoot.AppState>,
        private activatedRoute: ActivatedRoute, private globalService: GlobalService, private dispatcher: Dispatcher) {
        this.searchResults$ = this.store.select(fromRoot.productsGetEntities);
        this.productIsLoading$ = this.store.select(fromRoot.productsGetLoadingState);
        this.requestBody$ = this.store.select(fromRoot.productsGetRequestBody);
        this.store.dispatch(new common.SetSearchPage());
    }

    ngAfterViewInit() {
        this.activatedRouteSub = this.activatedRoute.url.subscribe(() => {
            this.currentFilter = this.activatedRoute.snapshot.queryParams;
            this.keyword = this.currentFilter['q'];
            if (this.keyword) {
                this.loadSearchResult(this.keyword);
            }

            this.searchProduct();
        });
    }

    loadSearchResult(keyword) {
        const searchQuery = {
            keyword: keyword,
            pageSize: 4,
            page: 0
        };

        if (keyword) {
            this.keyword = _.clone(keyword);
            this.store.dispatch(new products.SearchProduct(searchQuery));
            this.store.dispatch(new products.GetSearchCampaign(keyword));
        }
    }

    searchProduct() {
        if (this.currentFilter) {
            const params = this.globalService.parseParamsToRequestBody(this.currentFilter);
            const requestBody = {
                key: params['query'],
                priceMax: 0,
                type: 'search',
                params: params
            };
            this.store.dispatch(new products.Load(requestBody));
            this.currentFilter = null;
        }
    }

    ngOnDestroy() {
        this.store.dispatch(new common.ResetUrlInfo());
        this.globalService.removeTrackingCode();
    }
}
