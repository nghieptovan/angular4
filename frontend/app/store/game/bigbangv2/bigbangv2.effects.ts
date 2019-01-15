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

import * as fromRoot from '../..';
import * as common from '../../common/common.actions';
import { GlobalService } from '../../../services/global.service';
import * as BigBangV2Actions from './bigbangv2.actions';
import { BigBangV2Service } from './bigbangv2.service';

declare var $;

@Injectable()
export class BigBangV2Effects {
    page: any;
    storeKey: any;
    constructor(
        private _actions: Actions,
        private http: Http,
        private bigbangService: BigBangV2Service,
        private globalService: GlobalService,
        private store: Store<fromRoot.AppState>
    ) {

    }

    @Effect()
    LoadLogin$ = this._actions.ofType(BigBangV2Actions.LOAD_BIGBANGV2_LOGIN)
        .switchMap((action) => {
            return this.bigbangService.loginBigbangv2(action.payload)
                .map((response) => {
                    const data = response.json();
                    return new BigBangV2Actions.LoadLoginSuccess(data);
                }).catch((error) => {
                    const data = error.json();
                    return Observable.of(new BigBangV2Actions.LoadLoginFailed(data));
                });
    });

    @Effect()
    LoadOtp$ = this._actions.ofType(BigBangV2Actions.LOAD_BIGBANGV2_OTP)
        .switchMap((action) => {
            return this.bigbangService.validateLoginBigbangv2(action.payload.id,action.payload.otp)
                .map((response) => {
                    const data = response.json();
                    return new BigBangV2Actions.LoadOtpSuccess(data);
                }).catch((error) => {
                    const data = error.json();
                    return Observable.of(new BigBangV2Actions.LoadOtpFailed(data));
                });
    });

    @Effect()
    LoadPlayerProfile$ = this._actions.ofType(BigBangV2Actions.LOAD_BIGBANGV2_PLAYER_PROFILE)
        .switchMap((action) => {
            return this.bigbangService.getPlayerProfile(action.payload)
                .map((response) => {
                    const data = response.json();
                    return new BigBangV2Actions.LoadPlayerProfileSuccess(data);
                }).catch((error) => {
                    const data = error.json();
                    return Observable.of(new BigBangV2Actions.LoadPlayerProfileFailed(data));
                });
    });

    @Effect()
    LoadSettings$ = this._actions.ofType(BigBangV2Actions.LOAD_BIGBANGV2_SETTINGS)
        .switchMap((action) => {
            return this.bigbangService.loadSettings()
                .map((response) => {
                    const data = response.json();
                    return new BigBangV2Actions.LoadSettingsSuccess(data);
                }).catch((error) => {
                    const data = error.json();
                    return Observable.of(new BigBangV2Actions.LoadSettingsFailed(data));
                });
    });

    @Effect()
    Play$ = this._actions.ofType(BigBangV2Actions.BIGBANGV2_PLAY)
        .switchMap((action) => {
            return this.bigbangService.playBigBangV2(action.payload)
                .map((response) => {
                    const data = response.json();
                    return new BigBangV2Actions.PlaySuccess(data);
                }).catch((error) => {
                    const data = error.json();
                    return Observable.of(new BigBangV2Actions.PlayFailed(data));
                });
    });

    @Effect()
    Start$ = this._actions.ofType(BigBangV2Actions.BIGBANGV2_START)
        .switchMap((action) => {
            return this.bigbangService.startBigBangV2(action.payload.token,action.payload.session)
                .map((response) => {
                    const data = response.json();
                    return new BigBangV2Actions.StartSuccess(data);
                }).catch((error) => {
                    const data = error.json();
                    return Observable.of(new BigBangV2Actions.StartFailed(data));
                });
    });

    @Effect()
    Finish$ = this._actions.ofType(BigBangV2Actions.BIGBANGV2_FINISH)
        .switchMap((action) => {
            return this.bigbangService.finishBigBangV2(action.payload.token,action.payload.data)
                .map((response) => {
                    const data = response.json();
                    return new BigBangV2Actions.FinishSuccess(data);
                }).catch((error) => {
                    const data = error.json();
                    return Observable.of(new BigBangV2Actions.FinishFailed(data));
                });
    });

    @Effect()
    LoadGifts$ = this._actions.ofType(BigBangV2Actions.LOAD_BIGBANGV2_GIFTS)
        .switchMap((action) => {
            return this.bigbangService.getGifts()
                .map((response) => {
                    const data = response.json();
                    return new BigBangV2Actions.LoadGiftsSuccess(data);
                }).catch((error) => {
                    const data = error.json();
                    return Observable.of(new BigBangV2Actions.LoadGiftsFailed(data));
                });
    });

    @Effect()
    LoadResults$ = this._actions.ofType(BigBangV2Actions.LOAD_BIGBANGV2_RESULTS)
        .switchMap((action) => {
            return this.bigbangService.getResults(action.payload.limit)
                .map((response) => {
                    const data = response.json();
                    return new BigBangV2Actions.LoadResultsSuccess(data);
                }).catch((error) => {
                    const data = error.json();
                    return Observable.of(new BigBangV2Actions.LoadResultsFailed(data));
                });
    });

    @Effect()
    LoadHistory$ = this._actions.ofType(BigBangV2Actions.LOAD_BIGBANGV2_HISTORY)
        .switchMap((action) => {
            return this.bigbangService.getHistory(action.payload)
                .map((response) => {
                    const data = response.json();
                    return new BigBangV2Actions.LoadHistorySuccess(data);
                }).catch((error) => {
                    const data = error.json();
                    return Observable.of(new BigBangV2Actions.LoadHistoryFailed(data));
                });
    });

    @Effect()
    shareFB$ = this._actions.ofType(BigBangV2Actions.BIGBANGV2_SHARE_FB)
        .switchMap((action) => {
            return this.bigbangService.shareFB(action.payload)
                .map((response) => {
                    const data = response.json();
                    return new BigBangV2Actions.LoadShareFBSuccess(data);
                }).catch((error) => {
                    const data = error.json();
                    return Observable.of(new BigBangV2Actions.LoadShareFBFailed(data));
                });
    });

}
