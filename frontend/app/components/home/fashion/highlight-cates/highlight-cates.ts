import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../../store';

declare var $;

@Component({
    selector: 'lt-home-fashion-highlight-cates',
    templateUrl: './highlight-cates.html',
    styleUrls: ['./highlight-cates.less']
})
export class LtHomeFashionHighlightCates {
    owlCarouselOptions: any = {
        items: 4,
        margin: 20,
        loop: false,
        dots: true,
        autoplay: false,
        nav: true
    };
    highlightCates: any = [];
    isImgLoaded: any = {};

    homeCmsBlockSub: any;
    constructor(private store: Store<fromRoot.AppState>, private domSanitizer: DomSanitizer, private router: Router) {
        this.homeCmsBlockSub = this.store.select(fromRoot.homeGetCmsBlock)
            .subscribe((cmsBlock) => {
                this.highlightCates = cmsBlock.highlightCates;
            });
    }

    ngOnDestroy() {
        this.homeCmsBlockSub.unsubscribe();
    }
}
