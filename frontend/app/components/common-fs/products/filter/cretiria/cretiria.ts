import {Component, OnInit, HostListener, ElementRef, Input} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { GlobalService } from '../../../../../services/global.service';
import * as fromRoot from '../../../../../store/index';
import {BaseProcessFilterComponent} from "../../../../base/products/filter/process-filter";
import * as _ from 'lodash';
import slugify from 'slugify';
import {FacetTypeConstants} from "../../../../base/products/constants/FacetTypeConstants";

@Component({
    selector: 'app-common-fs-product-filter-cretiria',
    template: ''
})

export class CommonFSFilterCretiriaComponent extends BaseProcessFilterComponent implements OnInit {
    isChecked: boolean;
    keyword: string;
    _facet: any;


    @Input()
    get Facet(): any {
        return this._facet;
    }

    set Facet(value: any) {
        this._facet = value;
    }

    constructor(
        router: Router,
        activatedRoute: ActivatedRoute,
        store: Store<fromRoot.AppState>,
        globalService: GlobalService,
        protected _elementRef : ElementRef
    ) {
       super(router, activatedRoute, store, globalService);
    }

    @HostListener('document:click', ['$event.target'])
    public onClick(targetElement) {
        const clickedInside = this._elementRef.nativeElement.contains(targetElement);
        const clickedInsideRoot = targetElement.classList.contains('filter-item');
        const clickedInsideSortBy = targetElement.classList.contains('sortby-item');

        this.isChecked = !clickedInside?false:clickedInsideSortBy?!this.isChecked:clickedInsideRoot?!this.isChecked:this.isChecked;
    }

    search(keyword){
        if(this.keyword === undefined || this.keyword === ''){
            this.facetsSearch[this._facet.attribute_code] = _.clone(this.facets[this._facet.attribute_code]);
        } else {
            this.facetsSearch[this._facet.attribute_code] = _.filter(this.facets[this._facet.attribute_code], item => {
                if(this._facet.attribute_code === FacetTypeConstants.FACET_TYPE_LEAF_CATEGORY){
                    return item.name.toSlugify() && item.value.toSlugify().indexOf(this.keyword.toSlugify()) >= 0;
                }
                return item.name.toSlugify() && item.name.toSlugify().indexOf(this.keyword.toSlugify()) >= 0;
            });
        }
    }

    clearKeyword(){
        this.keyword = '';
        this.facetsSearch[this._facet.attribute_code] = _.clone(this.facets[this._facet.attribute_code]);
    }
}