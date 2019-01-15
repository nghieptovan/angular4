import {Component, OnInit} from '@angular/core';
import * as _ from 'lodash';
import {CategoryFSFilterCretiriaComponent} from "../cretiria";

@Component({
    selector: 'app-cfs-product-filter-price',
    templateUrl: 'price.html'
})

export class CategoryFSFilterPriceComponent extends CategoryFSFilterCretiriaComponent implements OnInit {
    uiSliderConfig: any;
    priceRange: Array<number> = [0, 1000];
    priceMax: any;


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

        this.loadProductWithFilter();
    }
}