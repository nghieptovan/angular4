import {Component, OnInit, HostListener, ElementRef, Input} from '@angular/core';
import {CommonFSFilterCretiriaComponent} from "../../../../common-fs/products/filter/cretiria/cretiria";

@Component({
    selector: 'app-seller-lotteria-product-filter-cretiria',
    template: ''
})

export class SellerLotteriaFilterCretiriaComponent extends CommonFSFilterCretiriaComponent implements OnInit {
    addFilter(type, value, event) {
        delete this.requestBody.params.facetFilters;
        const filterValues = {};
        filterValues[type] = [value.name];
        this.requestBody.params.facetFilters = [filterValues];
        this.processFilter();
    }
}