import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Actions } from '@ngrx/effects';
import { Effect } from '@ngrx/effects/src/effects';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '..';
import * as common from '../common/common.actions';
import { GlobalService } from '../../services/global.service';
import * as home from './home.actions';
import { HomeService } from './home.service';

declare var $;

@Injectable()
export class HomeEffects {
    page: any;
    storeKey: any;
    constructor(
        private _actions: Actions,
        private http: Http,
        private homeService: HomeService,
        private globalService: GlobalService,
        private store: Store<fromRoot.AppState>
    ) {

    }

    @Effect() loadHomeCmsBlock$ = this._actions.ofType(home.LOAD_HOME_CMSBLOCK)
        .withLatestFrom(this.store.select(fromRoot.homeGetCmsBlock))
        .switchMap(([action, homeCmsBlock]) => {
            if (_.isEmpty(homeCmsBlock)) {
                return this.homeService.getHomeCmsBlocks()
                    .map(result => {
                        this.store.dispatch(new common.LoadTrackingCode({ type: 'home', id: null }));
                        this.store.dispatch(new common.LoadUrlInfo({ type: 'cms', slug: 'home', id: null }));

                        const leftBlockHashTag = _.get(result, 'left_block_hashtag[0]', {});
                        const innerHTML = `<strong>` + leftBlockHashTag['view'] + `</strong> Xem &nbsp;|&nbsp; <strong>` + leftBlockHashTag['like'] + `</strong> Thích`;
                        setTimeout(() => {
                            $('.left-content .field-img .view-info').html(innerHTML);
                        }, 1300);
                        return new home.LoadHomeCmsBlockSuccess({
                            banner: result.banner_home,
                            highlightProducts: [{
                                next_promotion: _.get(result.new_arrived, 'next_promotion', null),
                                products: _.get(result.new_arrived, 'products', []),
                                promotion: _.get(result.new_arrived, 'promotion', null),
                                total_product: _.get(result.new_arrived, 'total_product', 0),
                                image: _.get(result.new_arrived, 'promotion[0].image_thumbnail'),
                                imageUrl: _.get(result.new_arrived, 'promotion[0].url'),
                                blockIdentifier: _.get(result.new_arrived, 'promotion[0].block_identifier')
                            }],
                            highlightCates: result.promotion_from_brands,
                            dealZones: _.get(result, 'deal_exclusive.products', []),
                            trending: _.get(result, 'trending.trending')
                        });
                    }).catch((error) => {
                        return Observable.of(new home.LoadHomeCmsBlockFailed(error));
                    });
            } else {
                return Observable.of(new home.LoadHomeCmsBlockSuccess(homeCmsBlock));
            }
        });

    @Effect() loadHomeProductByPromotionId$ = this._actions.ofType(home.LOAD_MORE_PRODUCTS)
        .switchMap((action) => {
            return this.homeService.getMoreProductByProductionId(action.payload)
                .map(result => {
                    return new home.LoadMoreProductsSuccess(result);
                }).catch((error) => {
                    return Observable.of(new home.LoadMoreProductsFailed(error));
                });
        });
}
