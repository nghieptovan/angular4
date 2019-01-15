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
    selector: 'app-common-fs-product-filter-blink',
    templateUrl: 'blink.html'
})

export class CommonFSFilterBlinkComponent extends CommonFSFilterCretiriaComponent implements OnInit {
    isBlink: boolean = false;
    hasBlink: boolean = false;
    hasBlinkSub: any;
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
        this.hasBlinkSub = this.store.select(fromRoot.productsHasBlink).subscribe(hasBlink => {
            this.hasBlink = hasBlink;
        });

        this.hasOmniSub = this.store.select(fromRoot.productsHasOmni).subscribe(hasOmni => {
            this.hasOmni = hasOmni;
        });
    }

    ngAfterViewInit(){
        setTimeout(() => {
            this.isBlink = this.activatedRoute.snapshot.queryParams.isBlink;
        },0);
    }

    ngOnDestroy(){
        super.ngOnDestroy();
        this.hasBlinkSub.unsubscribe();
        this.hasOmniSub.unsubscribe();
    }

    onChangeBlink(){
        this.requestBody.params.isBlink = this.isBlink;
        if(this.isBlink){
            if (!this.requestBody.params.facetFilters) {
                this.requestBody.params.facetFilters = [];
            }
            this.requestBody.params.facetFilters.push({mkt_delivery_time:GlobalConstants.SHIPPING_BLINK});
        } else {
            const idx = this.requestBody.params.facetFilters.findIndex(item => {
                return Object.getOwnPropertyNames(item).length > 0 && Object.getOwnPropertyNames(item)[0] === FacetTypeConstants.FACET_MKT_DELIVERY_TIME;
            });
            this.requestBody.params.facetFilters.splice(idx, 1);
        }
        this.processFilter();
    }
}