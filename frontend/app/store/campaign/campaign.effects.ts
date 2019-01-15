import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Rx';

import * as fromRoot from '..';
import { HttpService } from '../../services/http.service';
import * as common from '../../store/common/common.actions';
import * as campaign from './campaign.actions';
import { CampaignService } from './campaign.service';

declare var $;
@Injectable()
export class CampaignEffects {
    constructor(private _actions: Actions,
        private httpService: HttpService,
        private campaignService: CampaignService,
        private store: Store<fromRoot.AppState>,
        private router: Router) {

    }

    @Effect()
    loadCampaign$ = this._actions.ofType(campaign.LOAD)
        .switchMap((action) =>
            this.campaignService.getCampaign(action.payload)
                .map((data) => {
                    this.store.dispatch(new common.LoadUrlInfo({ type: 'cms', slug: data.identifier, id: data.id }));
                    this.store.dispatch(new common.LoadTrackingCode({ type: 'campaign', id: data.id }));
                    return new campaign.LoadSuccess(data);
                }).catch((error) => {
                    return Observable.of(new campaign.LoadFailed(error));
                })
        );

    @Effect()
    loadProducts$ = this._actions.ofType(campaign.LOAD_PRODUCTS)
        .mergeMap((action) =>
            this.campaignService.loadProductsByPromotion(action.payload.promotionId, action.payload.params)
                .map((data) => {
                    return new campaign.LoadProductsSuccess(data);
                }).catch((error) => {
                    return Observable.of(new campaign.LoadProductsFailed(error));
                })
        );

    @Effect()
    loadPromotions$ = this._actions.ofType(campaign.LOAD_PROMOTIONS)
        .mergeMap((action) =>
            this.campaignService.getPromotions(action.payload)
                .map((data) => {
                    this.store.dispatch(new common.LoadUrlInfo({ type: 'promotions', slug: _.get(data, '[0].promo_top[0].url_key', null), id: _.get(data, '[0].promo_top[0].id', null) }));
                    this.store.dispatch(new common.LoadTrackingCode({ type: 'promotions', id: _.get(data, '[0].promo_top[0].id', null) }));
                    return new campaign.LoadPromotionsSuccess(data);
                }).catch((error) => {
                    return Observable.of(new campaign.LoadPromotionsFailed(error));
                })
        );
}
