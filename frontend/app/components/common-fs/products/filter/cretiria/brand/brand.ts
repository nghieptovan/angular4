import {Component, OnInit} from '@angular/core';
import {CommonFSFilterCretiriaComponent} from "../cretiria";
import * as _ from 'lodash';

@Component({
    selector: 'app-common-fs-product-filter-brand',
    templateUrl: 'brand.html'
})

export class CommonFSFilterBrandComponent extends CommonFSFilterCretiriaComponent implements OnInit {
    keyword: string;

    search(keyword){
        if(this.keyword === undefined || this.keyword === ''){
            this.facetsSearch.product_brand = _.clone(this.facets.product_brand);
        } else {
            this.facetsSearch.product_brand = _.filter(this.facets.product_brand, brand => {
                return brand.name.toLowerCase().indexOf(this.keyword.toLowerCase()) >= 0;
            });
        }
    }

    clearKeyword(){
        this.keyword = '';
        this.facetsSearch.product_brand = _.clone(this.facets.product_brand);
    }
}