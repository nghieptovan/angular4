import {Component, OnInit, ElementRef} from '@angular/core';
import {CommonFSFilterCretiriaComponent} from "../cretiria";
import {GlobalConstants} from "../../../../../base/constants/GlobalConstants";
import * as _ from 'lodash';
import {FacetTypeConstants} from "../../../../../base/products/constants/FacetTypeConstants";
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { GlobalService } from '../../../../../../services/global.service';
import * as fromRoot from '../../../../../../store/index';

@Component({
    selector: 'app-common-fs-product-filter-omni',
    templateUrl: 'omni.html'
})

export class CommonFSFilterOmniComponent extends CommonFSFilterCretiriaComponent implements OnInit {
    isOmni: boolean = false;
    hasOmni: boolean = false;
    hasOmniSub: any;

    constructor(
        router: Router,
        activatedRoute: ActivatedRoute,
        store: Store<fromRoot.AppState>,
        globalService: GlobalService,
        _elementRef : ElementRef
    ) {
        super(router, activatedRoute, store, globalService, _elementRef);
        this.hasOmniSub = this.store.select(fromRoot.productsHasOmni).subscribe(hasOmni => {
            this.hasOmni = hasOmni;
        });
    }

    ngAfterViewInit(){
        setTimeout(() => {
            this.isOmni = this.activatedRoute.snapshot.queryParams.isOmni;
        },0);
    }

    ngOnDestroy(){
        super.ngOnDestroy();
        this.hasOmniSub.unsubscribe();
    }

    onChangeOmni(){
        this.requestBody.params.isOmni = this.isOmni;
        if(this.isOmni){
            if (!this.requestBody.params.facetFilters) {
                this.requestBody.params.facetFilters = [];
            }
            this.requestBody.params.facetFilters.push({vendor_id:GlobalConstants.MART_SELLER_IDS});
        } else {
            const idx = this.requestBody.params.facetFilters.findIndex(item => {
                return Object.getOwnPropertyNames(item).length > 0 && Object.getOwnPropertyNames(item)[0] === FacetTypeConstants.FACET_TYPE_VENDOR_ID;
            });
            this.requestBody.params.facetFilters.splice(idx, 1);
        }
        this.processFilter();
    }
}