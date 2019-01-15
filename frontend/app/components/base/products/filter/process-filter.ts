import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';

import { GlobalService } from '../../../../services/global.service';
import * as fromRoot from '../../../../store/index';
import * as products from '../../../../store/products/products.actions';
import * as common from '../../../../store/common/common.actions';
import {FacetsDefaultConstants} from "../constants/FacetsDefaultConstants";
declare var $;

@Component({
    selector: 'app-base-product-process-filter',
    template: ''
})

export class BaseProcessFilterComponent implements OnInit {
    productsStateSub: any;
    productState: any;
    facets: any;
    facetsSearch: any;
    requestBody: any;
    sortBy: any = '';

    constructor(
        protected router: Router,
        protected activatedRoute: ActivatedRoute,
        protected store: Store<fromRoot.AppState>,
        protected globalService: GlobalService
    ) {
        this.productsStateSub = this.store.select(fromRoot.productsGetState)
            .subscribe((state) => {
                this.productState = state;
                this.facets = state.products.facets ? state.products.facets : {};
                this.facetsSearch = _.clone(this.facets);
                this.requestBody = state.requestBody;
                this.sortBy = this.requestBody.params && this.requestBody.params.order ? this.requestBody.params.order : FacetsDefaultConstants.orderDefault;
                this.customFacetSearch();
            });

    }

    ngOnDestroy() {
        this.productsStateSub.unsubscribe();
    }

    ngOnInit() {
    }

    addFilter(type, value, event) {
        if (this.requestBody.params.facetFilters) {
            // Check if the facet is existed, if any, remove it
            this.addOrRemoveInFacetFilters(type, value.name);
            if (!this.requestBody.params.facetFilters.length) {
                delete this.requestBody.params.facetFilters;
            }
        } else {
            const filterValues = {};
            filterValues[type] = [value.name];
            this.requestBody.params.facetFilters = [filterValues];
        }
        this.processFilter();
    }

    processFilter(){
        this.store.dispatch(new common.PreventScrollTop(true));
        this.requestBody.params.isViewMore = false;

        this.loadProductWithFilter();
        this.scrollTopMain();
    }

    addOrRemoveInFacetFilters(type, value) {
        let typeIsExisted = false;
        _.each(this.requestBody.params.facetFilters, (facet, idx) => {
            // When type of facet is existed
            if (facet && type === Object.getOwnPropertyNames(facet)[0]) {
                // exist in current type of facet filter
                const idxChild = _.findIndex(facet[type], val => val === value);
                if (idxChild > -1) {
                    this.requestBody.params.facetFilters[idx][type].splice(idxChild, 1);
                    if (!this.requestBody.params.facetFilters[idx][type].length) {
                        this.requestBody.params.facetFilters.splice(idx, 1);
                    }
                } else { // Not exist in current type of facet filter
                    this.requestBody.params.facetFilters[idx][type].push(value);
                }

                typeIsExisted = true;
            }
        });

        if (!typeIsExisted) {
            const newFacet = {};
            newFacet[type] = [value];
            this.requestBody.params.facetFilters.push(newFacet);
        }
    }

    scrollTopMain(){
        if ($('body').hasClass('filter-scrolled')) {
            $('body').removeClass('filter-scrolled');
            const mainContent = document.querySelector('.product-filters-wrap');
            // const mainContent = document.querySelector('#test');
            window.scrollTo(0, mainContent['offsetTop'] - 120);
        }
    }

    resetTypeFilter(type){
        _.each(this.requestBody.params.facetFilters, (facet, idx) => {
            // When type of facet is existed
            if (facet && type === Object.getOwnPropertyNames(facet)[0]) {
                this.requestBody.params.facetFilters.splice(idx, 1);
                this.processFilter();
            }
        });
    }

    resetAllFilter() {
        delete this.requestBody.params.facetFilters;
        delete this.requestBody.params.numericFilters;
        this.processFilter();
    }

    loadProductWithFilter() {
        this.requestBody.params.page = 1;
        this.requestBody.params.hitsPerPage = 40;
        this.store.dispatch(new products.Load(this.requestBody));

        const path = this.router['url'];
        const currentUrl = path.indexOf('?') === -1 ? path : path.substring(0, path.indexOf('?'));

        if (this.requestBody.params.facetFilters || this.requestBody.params.numericFilters
            || this.requestBody.params.query || this.requestBody.params.order) {
            const params = this.globalService.parseRequestBodyToUrlParams(this.requestBody);
            if (params) {
                this.router.navigate([currentUrl], { queryParams: params });
            } else {
                this.router.navigate([currentUrl]);
            }
        } else {
            this.router.navigate([currentUrl]);
        }
    }

    customFacetSearch(){

    }
}