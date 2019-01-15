import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Dispatcher, Store } from '@ngrx/store';
import * as _ from 'lodash';

import * as fromRoot from '../../store';
import * as campaign from '../../store/campaign/campaign.actions';
import { CampaignService } from '../../store/campaign/campaign.service';
import { GlobalService } from '../../services/global.service';

declare var $;
// Redux
@Component({
    selector: 'app-promotions',
    templateUrl: './promotions.html',
    styleUrls: ['./promotions.less']
})

export class LottePromotions {
    promotionHtml: any;
    catPromotions: any;

    promotionSub: any;
    dispatcherSub: any;
    activatedRouteSub: any;
    constructor(
        private store: Store<fromRoot.AppState>,
        private activatedRoute: ActivatedRoute,
        private campaignService: CampaignService,
        private dispatcher: Dispatcher,
        private globalService: GlobalService,
        private router: Router,
        private domSantinizer: DomSanitizer) {
        const promotionsUrlKey = this.activatedRoute.params['value'].id;

        this.activatedRouteSub = this.activatedRoute.params.subscribe((params) => {
            this.store.dispatch(new campaign.LoadPromotions(this.activatedRoute.params['value'].id));
        });

        this.promotionSub = this.store.select(fromRoot.campaignGetPromotions)
            .subscribe((promotion) => {
                this.promotionHtml = null;
                this.catPromotions = [];
                this.catPromotions = _.get(promotion, '[0].cats_promo', []);
                _.each(this.catPromotions, (cat: any) => {
                    this.campaignService.loadProductsByPromotion(cat.cat_id, { hitsPerPage: cat.product_qty })
                        .map(products => products.json())
                        .subscribe((products) => {
                            cat.products = products.hits;
                        });
                });
                this.promotionHtml = _.get(promotion, '[0].promo_top[0].content', null);
            });

        this.dispatcherSub = this.dispatcher.subscribe((action) => {
            switch (action.type) {
                case campaign.LOAD_PROMOTIONS_FAILED:
                    if (action.payload.status === 404) {
                        this.router.navigateByUrl('404', { skipLocationChange: true });
                    }
                    break;
                default:
                    break;
            }
        });
    }

    ngOnDestroy() {
        this.dispatcherSub.unsubscribe();
        this.promotionSub.unsubscribe();
        this.activatedRouteSub.unsubscribe();
    }

    scrollToCategory(catId) {
        const scrollHeight = $('#category-' + catId).offset().top;
        window.scroll({
            top: scrollHeight,
            left: 0,
            behavior: 'smooth'
        });
    }
}

