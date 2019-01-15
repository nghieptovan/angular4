import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';

import * as fromRoot from '../../../../store';

declare var $;

@Component({
    selector: 'lt-home-fashion-brands',
    templateUrl: './brands.html',
    styleUrls: ['./brands.less']
})
export class LtHomeFashionBrands {
    brandListContent: any;
    cmsContentSub: any;
    constructor(private store: Store<fromRoot.AppState>, private domSanitizer: DomSanitizer, private router: Router) {
        this.cmsContentSub = this.store.select(fromRoot.commonGetCmsContents)
            .subscribe((cmsContent) => {
                this.brandListContent = _.find(cmsContent, (cms: any) => {
                    return cms.identifier === 'tpo_fashion_home_page_brand_section';
                });
            });
    }

    ngOnDestroy() {
        this.cmsContentSub.unsubscribe();
    }
}
