import {Component, OnInit, ElementRef} from '@angular/core';
import * as _ from 'lodash';
import {CommonFSFilterCretiriaComponent} from "../cretiria";
import {GlobalService} from "../../../../../../services/global.service";
import { ActivatedRoute, Router } from '@angular/router';
import {Store} from "@ngrx/store";
import * as fromRoot from '../../../../../../store/index';

@Component({
    selector: 'app-common-fs-product-filter-price',
    templateUrl: 'price.html'
})

export class CommonFSFilterPriceComponent extends CommonFSFilterCretiriaComponent implements OnInit {
    uiSliderConfig: any;
    currencyMaskOptions: any = {};
    priceRange: Array<number> = [0, 1000];
    priceMax: any;

    constructor(
        router: Router,
        activatedRoute: ActivatedRoute,
        store: Store<fromRoot.AppState>,
        globalService: GlobalService,
        elementRef : ElementRef
    ) {
        super(router, activatedRoute, store, globalService, elementRef);

        this.productsStateSub.unsubscribe();
        this.productsStateSub = this.store.select(fromRoot.productsGetState)
            .subscribe((state) => {
                this.productState = state;
                this.facets = state.products.facets ? state.products.facets : {};
                this.requestBody = state.requestBody;
                this.sortBy = this.requestBody.params && this.requestBody.params.order ? this.requestBody.params.order : '';
                this.initUiSlider();
            });
        this.currencyMaskOptions = { suffix: '', prefix: '', thousands: '.', precision: 0, align: 'center', allowNegative: false };
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
                // tooltips: true,
                // format:{
                //     to: function ( value ) {
                //         return value + ' đ';
                //     },
                //     from: function ( value ) {
                //         return value.replace(' đ', '');
                //     }
                // },
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

    addFilter(type, value, event) {

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

        this.processFilter();
        // this.loadProductWithFilter();

        // const mainContent = document.querySelector('#maincontent');
        //
        // if (mainContent) {
        //     window.scrollTo(0, mainContent['offsetTop']);
        // }
    }
}