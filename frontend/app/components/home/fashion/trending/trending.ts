import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';

import * as fromRoot from '../../../../store';

declare var $;

@Component({
    selector: 'lt-home-fashion-trending',
    templateUrl: './trending.html',
    styleUrls: ['./trending.less']
})
export class LtHomeFashionTrending {
    leftContent: any;
    rightContent: any;
    trending: any = [];
    selectedTab: any = 0;

    cmsContentSub: any;
    homeCmsBlockSub: any;
    constructor(private store: Store<fromRoot.AppState>, private domSanitizer: DomSanitizer, private router: Router) {
        this.cmsContentSub = this.store.select(fromRoot.commonGetCmsContents)
            .subscribe((cmsContent) => {
                this.leftContent = _.find(cmsContent, (cms: any) => {
                    return cms.identifier === 'tpo_fashion_home_page_left_trending';
                });

                this.rightContent = _.find(cmsContent, (cms: any) => {
                    return cms.identifier === 'tpo_fashion_home_page_right_trending';
                });
            });

        this.homeCmsBlockSub = this.store.select(fromRoot.homeGetCmsBlock)
            .subscribe((cmsBlock) => {
                this.trending = cmsBlock.trending;
            });
    }

    ngOnDestroy() {
        this.cmsContentSub.unsubscribe();
    }
}
