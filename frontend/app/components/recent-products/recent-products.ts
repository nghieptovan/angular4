import { Component, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppConstants } from '../../app.constant';
import * as fromRoot from '../../store';
import * as categories from '../../store/categories/categories.actions';
import { Router } from '@angular/router';

declare var $;

@Component({
    selector: 'lt-recent-products',
    templateUrl: './recent-products.html',
    styleUrls: ['./recent-products.less']
})
export class LtRecentProducts {
    selectedStore$: Observable<any>;
    recentProducts: any = [];
    defaultStoreUrlKey: any = AppConstants.DEFAULT_STORE_URL_KEY;
    bxSlider: any;
    positionRight: any = 0;

    recentProductSub: any;
    constructor(private store: Store<fromRoot.AppState>, private router: Router) {
        this.selectedStore$ = this.store.select(fromRoot.categoriesGetSelectedStore);

        this.recentProductSub = this.store.select(fromRoot.commonGetRecentProducts)
            .subscribe((products) => {
                if (products.length) {
                    this.recentProducts = products;
                    this.initBxSlider();
                }
            });
    }

    ngAfterViewInit() {
        this._initBackToTop();
    }

    scrollToTop() {
        window.scrollTo(0, 0);
    }

    selectStore(storeKey) {
        this.store.dispatch(new categories.SetSelectedStore(storeKey));
        this.router.navigate(['/' + storeKey]);
        return false;
    }

    initBxSlider() {
        setTimeout(() => {
            if (this.bxSlider) {
                this.bxSlider.reloadSlider();
            } else {
                this.bxSlider = $('.float-grid').bxSlider({
                    mode: 'vertical',
                    startSlide: 0,
                    pager: false,
                    slideMargin: 0,
                    touchEnabled: false,
                    auto: false,
                    autoStart: false,
                    controls: false,
                    infiniteLoop: false,
                    minSlides: 3,
                    maxSlides: 3
                });
            }
        }, 100);
    }

    goToPrevSlide() {
        this.bxSlider.goToPrevSlide();
    }

    goToNextSlide() {
        this.bxSlider.goToNextSlide();
    }

    @HostListener('window:resize', [])
    onResize(event) {
        this._initBackToTop();
    }

    private _initBackToTop() {
        if (window.innerWidth > 1120) {
            this.positionRight = (window.innerWidth - 1270) / 2;
            $('.floated-recent-views').css('right', this.positionRight);
        }
    }
}
