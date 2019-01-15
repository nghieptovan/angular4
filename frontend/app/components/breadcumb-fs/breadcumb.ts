import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../store/index';
import * as categories from '../../store/categories/categories.actions';
import { AppConstants } from '../../app.constant';
import {productsGetDetails} from "../../store/index";
@Component({
    selector: 'fs-breadcumb',
    templateUrl: './breadcumb.html'
})
export class FSBreadCumbComponent {
    breadcrumbs: any;
    urlInfo: any;
    lotteVnStoreKey: any = AppConstants.DEFAULT_STORE_URL_KEY.LOTTE_VN;
    urlInfoSub: any;
    brandInfoSub: any;
    productInfoSub: any;
    brandName: string;
    productName: string;
    vendorInfoSub: any;
    vendorName: string;
    productLink: any;
    constructor(private store: Store<fromRoot.AppState>, private router: Router) {
        this.urlInfoSub = this.store.select(fromRoot.commonGetUrlInfo)
            .subscribe((urlInfo) => {
                this.urlInfo = urlInfo;
                this.breadcrumbs = urlInfo.breadcrumbs ? urlInfo.breadcrumbs.filter(b => b.categories) : null;
                if(this.urlInfo && this.urlInfo.type !== 'brand'){
                    this.brandName = '';
                }

                if(this.urlInfo && this.urlInfo.type !== 'vendor'){
                    this.vendorName = ''
                }
            });
        this.brandInfoSub = this.store.select(fromRoot.brandGetEntity).subscribe(brandInfo => {
            if (brandInfo) {
                this.brandName = brandInfo.name;
                this.urlInfo.type = 'brand';
            }
        });

        this.productInfoSub = this.store.select(fromRoot.productsGetDetails).subscribe(detail => {
            if(detail) {
                this.productName = detail.name;
                this.productLink = detail.url;
                this.urlInfo.type = 'product'
            }
        });

        this.vendorInfoSub = this.store.select(fromRoot.vendorGetEntity).subscribe(vendorInfo => {
            if (vendorInfo && window.location.href.includes('seller')) {
                this.vendorName = vendorInfo.name;
                this.urlInfo.type = 'vendor';
            }
        });

    }

    ngOnDestroy() {
        this.urlInfoSub.unsubscribe();
        this.brandInfoSub.unsubscribe();
        this.productInfoSub.unsubscribe();
        this.vendorInfoSub.unsubscribe();
    }

    goToCategoryPage(cat) {
        this.router.navigate(['category', cat.id, cat.url_key]);
        return false;
    }

    backToHome() {
        this.store.dispatch(new categories.SetSelectedStore(''));
        this.router.navigate(['/']);
        return false;
    }

    selectStoreLotteVn() {
        this.store.dispatch(new categories.SetSelectedStore(this.lotteVnStoreKey));
        this.router.navigate(['/']);
        return false;
    }
}
