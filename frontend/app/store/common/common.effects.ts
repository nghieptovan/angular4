import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Rx';

import { GlobalService } from '../../services/global.service';
import { CommonService } from './common.service';
import * as account from '../account/account.actions';
import * as auth from '../auth/auth.actions';
import * as fromRoot from '../index';
import { environment } from './../../../environments/environment.prod';
import * as common from './common.actions';
import { Load404Page } from './common.actions';
import { AppConstants } from '../../app.constant';

@Injectable()
export class CommonEffects {
    page: any;
    constructor(
        private _actions: Actions,
        private commonService: CommonService,
        private http: Http,
        private globalService: GlobalService,
        private store: Store<fromRoot.AppState>
    ) {

    }

    @Effect() loadAppConfigs$ = this._actions.ofType(common.LOAD_APPCONFIGS)
        .switchMap((action) => {
            const currentTimestamp = new Date().getTime();
            const lastSavedTimestamp = sessionStorage.getItem('appConfigsTimestamp') ? Number.parseInt(sessionStorage.getItem('appConfigsTimestamp')) : 0;
            const secondsAfterSaved = Math.floor(((currentTimestamp - lastSavedTimestamp) / 1000));
            if (secondsAfterSaved > 300) {
                return Observable.forkJoin([this.commonService.getStoreConfigs(), this.commonService.getCmsContent()])
                    .map((result) => {
                        const res = [result[0].json(), result[1].json()];
                        sessionStorage.setItem('appConfigs', JSON.stringify(res));
                        sessionStorage.setItem('appConfigsTimestamp', new Date().getTime().toString());
                        return new common.LoadAppConfigsSuccess(res);
                    }).catch((error) => {
                        return Observable.of(new common.LoadAppConfigsFailed(error));
                    });
            } else {
                const appConfigs = sessionStorage.getItem('appConfigs');
                return Observable.of(new common.LoadAppConfigsSuccess(JSON.parse(appConfigs)));
            }
        });

    @Effect() loadUrlInfo$ = this._actions.ofType(common.LOAD_URL_INFO)
        .switchMap((action) => this.commonService.getUrlInformation(action.payload.slug, action.payload.type, action.payload.id, action.payload.pathname)
            .map(urlInfo => urlInfo.json())
            .map(urlInfo => {
                if (urlInfo && urlInfo.meta_tags) {
                    this.globalService.loadTitleAndMetaHeader(urlInfo.meta_tags);
                }
                return new common.LoadUrlInfoSuccess(urlInfo);
            })
        ).catch((error) => {
            return Observable.of(new common.LoadUrlInfoFailed(error));
        });

    @Effect() loadCountryInformation$ = this._actions.ofType(common.LOAD_COUNTRY_INFORMATION)
        .switchMap((action) => {
            const currentTimestamp = new Date().getTime();
            const lastSavedTimestamp = localStorage.getItem('regionDataTimestamp') ? Number.parseInt(localStorage.getItem('regionDataTimestamp')) : 0;
            const secondsAfterSaved = Math.floor(((currentTimestamp - lastSavedTimestamp) / 1000));
            const regionData = localStorage.getItem('regionData');
            if (!(regionData && regionData.length) || secondsAfterSaved > 7200) {
                return this.commonService.getCountryInformation()
                    .map(resp => resp.json())
                    .map(resp => {
                        const regions = this.reformatRegionData(resp);
                        localStorage.setItem('regionData', JSON.stringify(regions));
                        localStorage.setItem('regionDataTimestamp', new Date().getTime().toString());
                        return new common.LoadCountryInformationSuccess(regions);
                    });
            } else {
                const regions = localStorage.getItem('regionData');
                return Observable.of(new common.LoadCountryInformationSuccess(JSON.parse(regions)));
            }
        }).catch((error) => {
            return Observable.of(new common.LoadCountryInformationFailed(error));
        });

    @Effect() loadSharedSession$ = this._actions.ofType(common.LOAD_SHARED_SESSION)
        .switchMap((action) => this.commonService.getSharedSession()
            .map(session => session.json())
            .map((session: any) => {
                if (session.customer_token) {
                    localStorage.setItem('token', session.customer_token);

                    if (session.quote_id) {
                        localStorage.setItem('cartId', session.quote_id);
                    }
                } else {
                    if (session.cart_id) {
                        localStorage.setItem('cartId', session.cart_id);
                    }
                    localStorage.removeItem('token');
                    localStorage.removeItem('userInfo');
                }

                if (!session.quote_id && !session.cart_id && !location.href.includes('checkout/failure') && !location.href.includes('checkout/onepage')) {
                    localStorage.removeItem('cartId');
                }

               

                if (localStorage.getItem('token')) {
                    this.store.dispatch(new account.LoadInfo());
                    /*this.store.dispatch(new account.LoadWishList(0));*/
                    /*this.store.dispatch(new account.LoadOrders(null));*/
                }


                this.store.dispatch(new auth.RefreshPage());
                this.store.dispatch(new account.RefreshPage());

                return new common.LoadSharedSessionSuccess(session);
            })

        ).catch((error) => {
            return Observable.of(new common.LoadSharedSessionFailed(error));
        });

    @Effect() detectCurrentLocation$ = this._actions.ofType(common.DETECT_CURRENT_LOCATION)
        .switchMap((action) => {
            const currentLocation = JSON.parse(sessionStorage.getItem('currentLocation'));
            if (currentLocation && currentLocation.region_id) {
                AppConstants.DEFAULT_REGION.CITY_ID = currentLocation.region_id;
                AppConstants.DEFAULT_REGION.DISTRICT_ID = currentLocation.district_id;
                return Observable.of(new common.DetectCurrentLocationSuccess(currentLocation));
            } else {
                return this.commonService.getCurrentLocation(action.payload.latitude, action.payload.longitude)
                    .map((resp) => {
                        let location = resp.json();
                        if(location && location.region_id){
                            AppConstants.DEFAULT_REGION.CITY_ID = location.region_id;
                            AppConstants.DEFAULT_REGION.DISTRICT_ID = location.district_id;
                        } else {
                            location.region_id = 1086;
                            location.district_id = 711;
                        }
                        sessionStorage.setItem('currentLocation', JSON.stringify(location));
                        return new common.DetectCurrentLocationSuccess(location);
                    }).catch(err => {
                        sessionStorage.setItem('currentLocation', JSON.stringify({'region_id':1086,'district_id':711}));
                        return Observable.of(new common.DetectCurrentLocationFailed(err));
                    });
            }

        });

    @Effect() loadTrackingCode$ = this._actions.ofType(common.LOAD_TRACKING_CODE)
        .switchMap((action) => {
            if (AppConstants.DISABLED_TRACKING_CODE) {
                return Observable.of();
            } else {
                return this.commonService.loadTrackingCode(action.payload.type, action.payload.id, action.payload.q)
                    .map((resp) => {
                        this.globalService.loadTrackingCodeScript(resp.json());
                        return new common.LoadTrackingCodeSuccess(resp.json());
                    }).catch(err => {
                        this.globalService.removeTrackingCode();
                        return Observable.of(new common.LoadTrackingCodeFailed(err));
                    });
            }
        });

    @Effect() subscribeNewsLetter$ = this._actions.ofType(common.SUBSCRIBE_NEWSLETTER)
        .switchMap((action) => {
            return this.http.post(action.payload.url, action.payload.data)
                .map((resp) => {
                    return new common.SubscribeNewsLetterSuccess(resp.json());
                }).catch((error) => {
                    return Observable.of(new common.SubscribeNewsLetterFailed(error));
                });
        });

    @Effect() loadRecentProducts$ = this._actions.ofType(common.LOAD_RECENT_PRODUCTS)
        .switchMap((action) => {
            return this.commonService.getRecentProducts()
                .map((resp) => {
                    return new common.LoadRecentProductsSuccess(resp);
                }).catch((error) => {
                    return Observable.of(new common.LoadRecentProductsFailed(error));
                });
        });

    @Effect() load404Page$ = this._actions.ofType(common.LOAD_404_PAGE)
        .withLatestFrom(this.store.select(fromRoot.commonGet404Page))
        .switchMap(([action, static404Page]) => {
            if (!static404Page || _.isEmpty(static404Page)) {
                return this.commonService.get404Page()
                    .map(html => {
                        return new common.Load404PageSuccess(html.json());
                    }).catch((error) => {
                        return Observable.of(new common.Load404PageFailed(error));
                    });
            } else {
                return Observable.of(new common.Load404PageSuccess(static404Page));
            }
        });

    reformatRegionData(data) {
        const districtContainsWards = _.map(data.districts, (district: any) => {
            district.wards = _.filter(data.wards, (ward: any) => {
                return ward.district_id === district.id;
            });
            return district;
        });
        const regionContainsDistricts = _.map(data.regions, (region: any) => {
            region.districts = _.filter(districtContainsWards, (district: any) => {
                return district.region_id === region.id;
            });
            return region;
        });
        return regionContainsDistricts;
    }

}
