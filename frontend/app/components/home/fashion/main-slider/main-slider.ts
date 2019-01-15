import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../../store';
import { Observable } from 'rxjs/Observable';

declare var $;

@Component({
    selector: 'lt-home-fashion-main-slider',
    templateUrl: './main-slider.html',
    styleUrls: ['./main-slider.less']
})
export class LtHomeFashionMainSlider {
    owlCarouselOptions: any = {
        items: 1,
        dots: true,
        loop: true,
        nav: true
    };
    mainSliderContent: any;
    isTopBanner$: Observable<any>;
    isImgLoaded: any = {};

    homeCmsBlockSub: any;
    constructor(private store: Store<fromRoot.AppState>, private domSanitizer: DomSanitizer, private router: Router) {
        this.homeCmsBlockSub = this.store.select(fromRoot.homeGetCmsBlock)
            .subscribe((cmsBlock) => {
                this.mainSliderContent = cmsBlock.banner;
            });

        this.isTopBanner$ = this.store.select(fromRoot.commonGetIsTopBanner);
    }

    ngOnDestroy() {
        this.homeCmsBlockSub.unsubscribe();
    }

    // changeSlider(event) {
    //     console.log(event);
    // }
}
