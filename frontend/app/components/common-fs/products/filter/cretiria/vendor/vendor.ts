import {Component, OnInit, ElementRef} from '@angular/core';
import {CommonFSFilterCretiriaComponent} from "../cretiria";
import {GlobalConstants} from "../../../../../base/constants/GlobalConstants";
import * as _ from 'lodash';
import {GlobalService} from "../../../../../../services/global.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import * as fromRoot from '../../../../../../store/index';
import {FacetsDefaultConstants} from "../../../../../base/products/constants/FacetsDefaultConstants";

@Component({
    selector: 'app-common-fs-product-filter-vendor',
    templateUrl: 'vendor.html'
})

export class CommonFSFilterVendorComponent extends CommonFSFilterCretiriaComponent implements OnInit {
    omniList: Array<any> = [];
    orthersList: Array<any> = [];

    customFacetSearch(){
        this.splitFacets();
    }

    search(keyword){
        super.search(keyword);
        this.splitFacets();
    }

    splitFacets(){
        if(this._facet && this._facet.attribute_code){
            delete this.omniList;
            delete this.orthersList;
            this.omniList = [];
            this.orthersList = [];
            _.each(this.facetsSearch[this._facet.attribute_code], facet => {
                this.checkOmni(facet.name)?this.omniList.push(facet):this.orthersList.push(facet);
            });
        }
    }

    checkOmni(seller_name){
        return GlobalConstants.OMNI_SELLER_NAMES.findIndex(item => {
            return item.toLowerCase() === seller_name.toLowerCase()
        }) !== -1;
    }
}