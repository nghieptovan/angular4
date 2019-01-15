import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';

import { GlobalService } from '../../../../services/global.service';
import * as fromRoot from '../../../../store/index';
import * as products from '../../../../store/products/products.actions';

@Component({
    selector: 'lt-sidebar-filter',
    templateUrl: './filter.html',
    styleUrls: ['./filter.less']
})
export class LtSidebarFilterComponent {
    uiSliderConfig: any;
    currencyMaskOptions: any = {};
    priceRange: Array<number> = [0, 1000];
    priceMax: any;
    facets: any;
    productState: any;
    requestBody: any;
    selectedFilters: any = [];
    selectedFilterPrice: any = [];
    selectedFilterValues: any = [];
    isHiddenFilter: any = {
        selectedFilter: false,
        category: false,
        price: false,
        vendor: false,
        brand: false,
        color: false,
        size: false
    };

    productsStateSub: any;
    @ViewChild('mySlider') mySlider: any;
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private store: Store<fromRoot.AppState>,
        private globalService: GlobalService
    ) {
        this.productsStateSub = this.store.select(fromRoot.productsGetState)
            .subscribe((state) => {
                this.productState = state;
                this.facets = state.products.facets ? state.products.facets : {};
                this.requestBody = state.requestBody;
                this.initUiSlider();
            });

        this.currencyMaskOptions = { suffix: '', prefix: '', thousands: '.', precision: 0, align: 'center', allowNegative: false };
    }

    ngOnDestroy() {
        this.productsStateSub.unsubscribe();
    }

    initUiSlider() {
        if (this.facets.price) {
            if (!this.requestBody.priceMax) {
                this.priceMax = _.clone(this.facets.price.max);
                this.requestBody.priceMax = _.clone(this.facets.price.max);
                this.priceRange = [0, _.clone(this.priceMax)];
            } else {
                this.priceMax = _.clone(this.requestBody.priceMax);
            }
        }

        if (this.requestBody.params) {
            if (this.requestBody.params.numericFilters && this.requestBody.params.numericFilters[0]) {
                const min = this.requestBody.params.numericFilters[0].price_default.gte;
                const max = this.requestBody.params.numericFilters[0].price_default.lte;
                this.priceRange = [min ? min : 0, max ? max : this.priceMax];
            } else {
                setTimeout(() => {
                    this.priceRange = [0, _.clone(this.requestBody.priceMax)];
                }, 200);
            }
        }

        if (!this.uiSliderConfig) {
            this.uiSliderConfig = {
                margin: 1000,
                connect: true
            };
        }
    }

    validatePrice(event, isMax) {
        if (this.priceRange[1] >= this.priceMax) {
            this.priceRange[1] = _.clone(this.priceMax);
            event.preventDefault();
        }

        if (this.priceRange[0] >= this.priceMax) {
            this.priceRange[0] = _.clone(this.priceMax);
            event.preventDefault();
        }

        if (!isMax && this.priceRange[0] >= this.priceRange[1]) {
            this.priceRange[0] = _.clone(this.priceRange[1]);
            event.preventDefault();
        }
    }

    addFilter(type, value) {
        if (type === 'price') {
            if (this.priceRange[0] >= this.priceRange[1]) {
                this.priceRange[0] = 0;
            }
            if (value.length) {
                if (this.requestBody.params) {
                    delete this.requestBody.params.numericFilters;
                    this.requestBody.params.numericFilters = [{
                        price_default: {
                            'gte': value[0],
                            'lte': value[1]
                        }
                    }];
                }
            } else {
                if (this.requestBody.params && this.requestBody.params.numericFilters && this.requestBody.params.numericFilters
                    && this.requestBody.params.numericFilters[0].price_default) {
                    if (value.isGreaterThan) {
                        delete this.requestBody.params.numericFilters[0].price_default['gte'];
                    } else {
                        delete this.requestBody.params.numericFilters[0].price_default['lte'];
                    }
                }
            }
        } else { // If type is not 'price'
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
        }

        this.loadProductWithFilter();

        const mainContent = document.querySelector('#maincontent');

        if (mainContent) {
            window.scrollTo(0, mainContent['offsetTop']);
        }
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

    resetAllFilter() {
        delete this.requestBody.params.facetFilters;
        delete this.requestBody.params.numericFilters;
        this.loadProductWithFilter();
    }

    loadProductWithFilter() {
        this.requestBody.params.page = 1;
        this.requestBody.params.hitsPerPage = 40;
        this.store.dispatch(new products.Load(this.requestBody));

        const path = this.router['url'];
        const currentUrl = path.indexOf('?') === -1 ? path : path.substring(0, path.indexOf('?'));

        if (this.requestBody.params.facetFilters || this.requestBody.params.numericFilters || this.requestBody.params.query) {
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
}
