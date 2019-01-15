import { Component } from '@angular/core';
import {BaseProcessFilterComponent} from "../../../base/products/filter/process-filter";
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';


import { GlobalService } from '../../../../services/global.service';
import * as fromRoot from '../../../../store/index';
import {FacetsDefaultConstants} from "../../../base/products/constants/FacetsDefaultConstants";

@Component({
  selector: 'app-common-fs-product-filter',
  templateUrl: './filter.html',
  styleUrls: ['./filter.less']
})

export class CommonFSFilterComponent extends BaseProcessFilterComponent{
    facetsInfo: Array<any> = [];
    facetsSub: any;

    constructor(
        router: Router,
        activatedRoute: ActivatedRoute,
        store: Store<fromRoot.AppState>,
        globalService: GlobalService
    ) {
        super(router, activatedRoute, store, globalService);
        this.facetsSub = this.store.select(fromRoot.categoriesGetFacets).subscribe((facets) =>{
            this.facetsInfo = facets.length > 0 ? facets: FacetsDefaultConstants.facetsInfo;
        });
    }

    ngOnDestroy(){
        this.facetsSub.unsubscribe();
        super.ngOnDestroy();
    }

    removeFilter(type, facet){
        if(type !== 'price'){
            this.addOrRemoveInFacetFilters(type, facet.data.id);
        } else {
            delete this.requestBody.params.numericFilters;

        }

        this.processFilter();
    }
}
