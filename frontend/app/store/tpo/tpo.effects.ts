import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';

import * as fromRoot from '..';
import { HttpService } from '../../services/http.service';
import * as tpo from './tpo.actions';
import { TpoService } from './tpo.service';

declare var $;
@Injectable()
export class TpoEffects {
    constructor(private _actions: Actions,
        private httpService: HttpService,
        private tpoService: TpoService,
        private store: Store<fromRoot.AppState>,
        private router: Router) {

    }

    @Effect()
    loadTpoGroup$ = this._actions.ofType(tpo.LOAD)
        .switchMap((action) =>
            this.tpoService.getTpoGroup()
                .map((data) => {
                    return new tpo.LoadSuccess({ tpoGroups: data.json() });
                }).catch((error) => {
                    return Observable.of(new tpo.LoadFailed(error));
                })
        );

    //[LT-646] huytt: change to use api on els
    @Effect()
    loadTpoDetail$ = this._actions.ofType(tpo.LOAD_TPO_DETAILS)
        .switchMap((action) =>
            this.tpoService.getTpoDetail(action.payload.urlKey).map((data) => {
                const detail = data.json();
                if (detail.slug === undefined || detail.slug === null) {
                    this.router.navigate(['/']);
                    return Observable.of(new tpo.LoadTpoDetailsFailed('not found!!!!!'));
                }
                return new tpo.LoadTpoDetailsSuccess({ tpoDetail: detail });
            }).catch((error) => {
                this.router.navigate(['/']);
                return Observable.of(new tpo.LoadTpoDetailsFailed(error));
            })
        );

    @Effect()
    updateTpoDetailSocial$ = this._actions.ofType(tpo.UPDATE_TPO_DETAIL_SOCIAL)
        .switchMap((action) =>
            this.tpoService.postSocialService(action.payload.urlKey, action.payload.method)
                .map((data) => {
                    return new tpo.UpdateTpoDetailsSocialSuccess({});
                }).catch((error) => {
                    return Observable.of(new tpo.UpdateTpoDetailsSocialFailed(error));
                })
        );

    //[LT-646] huytt: change to use api on els
    @Effect()
    loadTpoProducts$ = this._actions.ofType(tpo.LOAD_TPO_PRODUCTS)
        .switchMap((action) =>
            this.tpoService.getTpoProducts(action.payload.tpoId, action.payload.page).map(data => {
                return new tpo.LoadTpoProductsSuccess({ tpoProducts: data.json(), requestBody: action.payload });
            }).catch((error) => {
                return Observable.of(new tpo.LoadTpoProductsFailed(error));
            })
        ).catch((error) => {
            this.router.navigate(['/']);
            return Observable.of(new tpo.LoadTpoProductsFailed(error));
        });

    @Effect()
    loadTpoDashboardProducts$ = this._actions.ofType(tpo.LOAD_TPO_DASHBOARD_PRODUCTS)
        .switchMap((action) =>
            this.tpoService.postTpoDashboardProducts(action.payload.page)
                .map((data) => {
                    return new tpo.LoadTpoDashboardProductsSuccess({ tpoProducts: data.json(), requestBody: action.payload });
                }).catch((error) => {
                    return Observable.of(new tpo.LoadTpoDashboardProductsFailed(error));
                })
        );

    @Effect()
    loadTpoCmsBlock$ = this._actions.ofType(tpo.LOAD_BLOCK)
        .switchMap((action) =>
            this.tpoService.postTpoBlock()
                .map((data) => {
                    return new tpo.LoadBlockSuccess({ blockContent: data.json() });
                }).catch((error) => {
                    return Observable.of(new tpo.LoadBlockFailed(error));
                })
        );

    @Effect()
    getSearchTpo$ = this._actions.ofType(tpo.GET_SEARCH_TPO)
        .switchMap((action) => {
            return this.tpoService.getSearchTpo(action.payload)
                .map(search => {
                    return new tpo.GetSearchTpoSuccess(search.json());
                }).catch((error) => {
                    return Observable.of(new tpo.GetSearchTpoFailed(error));
                });
        });



    // @Effect()
    // loadTpoProductAlsoLike$ = this._actions.ofType(tpo.LOAD_TPO_PRODUCT_ALSOLIKE)
    //     .switchMap((action) =>
    //         this.tpoService.getTpoProducts(action.payload.urlKey, action.payload.page)
    //             .map((data) => {
    //                 return new tpo.LoadTpoProductsAlsoLikeSuccess({tpoProductsAlsoLike: data.json()});
    //             }).catch((error) => {
    //                 return Observable.of(new tpo.LoadTpoProductsAlsoLikeFailed(error));
    //             })
    //     );
}
