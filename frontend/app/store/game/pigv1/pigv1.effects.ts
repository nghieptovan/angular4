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
import * as Pigv1Actions from './pigv1.actions';
import { Pigv1Service } from './pigv1.service';

declare var $;

@Injectable()
export class PigV1Effects {
    page: any;
    storeKey: any;
    constructor(
        private _actions: Actions,
        private http: Http,
        private pigv1Service: Pigv1Service,
        private globalService: GlobalService,
        private store: Store<fromRoot.AppState>
    ) {

    }

    @Effect()
    LoadLogin$ = this._actions.ofType(Pigv1Actions.LOAD_PIGV1_LOGIN)
        .switchMap((action) => {
            return this.pigv1Service.loginPigv1(action.payload)
                .map((response) => {
                    const data = response.json();
                    return new Pigv1Actions.LoadLoginSuccess(data);
                }).catch((error) => {
                    const data = error.json();
                    return Observable.of(new Pigv1Actions.LoadLoginFailed(data));
                });
    });

    @Effect()
    LoadOtp$ = this._actions.ofType(Pigv1Actions.LOAD_PIGV1_OTP)
        .switchMap((action) => {
            return this.pigv1Service.validateLoginPigv1(action.payload.id,action.payload.otp)
                .map((response) => {
                    const data = response.json();
                    return new Pigv1Actions.LoadOtpSuccess(data);
                }).catch((error) => {
                    const data = error.json();
                    return Observable.of(new Pigv1Actions.LoadOtpFailed(data));
                });
    });

    @Effect()
    LoadPlayerProfile$ = this._actions.ofType(Pigv1Actions.LOAD_PIGV1_PLAYER_PROFILE)
        .switchMap((action) => {
            return this.pigv1Service.getPlayerProfile(action.payload)
                .map((response) => {
                    const data = response.json();
                    return new Pigv1Actions.LoadPlayerProfileSuccess(data);
                }).catch((error) => {
                    const data = error.json();
                    return Observable.of(new Pigv1Actions.LoadPlayerProfileFailed(data));
                });
    });

    @Effect()
    LoadSettings$ = this._actions.ofType(Pigv1Actions.LOAD_PIGV1_SETTINGS)
        .switchMap((action) => {
            return this.pigv1Service.loadSettings()
                .map((response) => {
                    const data = response.json();
                    return new Pigv1Actions.LoadSettingsSuccess(data);
                }).catch((error) => {
                    const data = error.json();
                    return Observable.of(new Pigv1Actions.LoadSettingsFailed(data));
                });
    });

    @Effect()
    Play$ = this._actions.ofType(Pigv1Actions.PIGV1_PLAY)
        .switchMap((action) => {
            return this.pigv1Service.playPigv1(action.payload)
                .map((response) => {
                    const data = response.json();
                    return new Pigv1Actions.PlaySuccess(data);
                }).catch((error) => {
                    const data = error.json();
                    return Observable.of(new Pigv1Actions.PlayFailed(data));
                });
    });

    @Effect()
    Start$ = this._actions.ofType(Pigv1Actions.PIGV1_START)
        .switchMap((action) => {
            return this.pigv1Service.startPigv1(action.payload.token,action.payload.session)
                .map((response) => {
                    const data = response.json();
                    return new Pigv1Actions.StartSuccess(data);
                }).catch((error) => {
                    const data = error.json();
                    return Observable.of(new Pigv1Actions.StartFailed(data));
                });
    });

    @Effect()
    Finish$ = this._actions.ofType(Pigv1Actions.PIGV1_FINISH)
        .switchMap((action) => {
            return this.pigv1Service.finishPigv1(action.payload.token,action.payload.data)
                .map((response) => {
                    const data = response.json();
                    return new Pigv1Actions.FinishSuccess(data);
                }).catch((error) => {
                    const data = error.json();
                    return Observable.of(new Pigv1Actions.FinishFailed(data));
                });
    });

    @Effect()
    LoadGifts$ = this._actions.ofType(Pigv1Actions.LOAD_PIGV1_GIFTS)
        .switchMap((action) => {
            return this.pigv1Service.getGifts()
                .map((response) => {
                    const data = response.json();
                    return new Pigv1Actions.LoadGiftsSuccess(data);
                }).catch((error) => {
                    const data = error.json();
                    return Observable.of(new Pigv1Actions.LoadGiftsFailed(data));
                });
    });

    @Effect()
    LoadResults$ = this._actions.ofType(Pigv1Actions.LOAD_PIGV1_RESULTS)
        .switchMap((action) => {
            return this.pigv1Service.getResults(action.payload)
                .map((response) => {
                    const data = response.json();
                    return new Pigv1Actions.LoadResultsSuccess(data);
                }).catch((error) => {
                    const data = error.json();
                    return Observable.of(new Pigv1Actions.LoadResultsFailed(data));
                });
    });

    @Effect()
    LoadRanking$ = this._actions.ofType(Pigv1Actions.LOAD_PIGV1_RANKING)
        .switchMap((action) => {
            return this.pigv1Service.getRanking(action.payload)
                .map((response) => {
                    const data = response.json();
                    return new Pigv1Actions.LoadRankingSuccess(data);
                }).catch((error) => {
                    const data = error.json();
                    return Observable.of(new Pigv1Actions.LoadRankingFailed(data));
                });
    });

    @Effect()
    LoadMineRanking$ = this._actions.ofType(Pigv1Actions.LOAD_PIGV1_MINE_RANKING)
        .switchMap((action) => {
            return this.pigv1Service.getMineRanking(action.payload)
                .map((response) => {
                    const data = response.json();
                    return new Pigv1Actions.LoadMineRankingSuccess(data);
                }).catch((error) => {
                    const data = error.json();
                    return Observable.of(new Pigv1Actions.LoadMineRankingFailed(data));
                });
    });

    @Effect()
    UpdateLpointInfo$ = this._actions.ofType(Pigv1Actions.PIGV1_LPOINT_INFO)
        .switchMap((action) => {
            return this.pigv1Service.updateLpointInfo(action.payload)
                .map((response) => {
                    const data = response.json();
                    return new Pigv1Actions.LoadLpointInfoSuccess(data);
                }).catch((error) => {
                    const data = error.json();
                    return Observable.of(new Pigv1Actions.LoadLpointInfoFailed(data));
                });
    });

    @Effect()
    RemindLpointReward$ = this._actions.ofType(Pigv1Actions.PIGV1_REMIND_LPOINT_REWARD)
        .switchMap((action) => {
            return this.pigv1Service.remindLpointRewards(action.payload)
                .map((response) => {
                    const data = response.json();
                    return new Pigv1Actions.RemindLpointRewardSuccess(data);
                }).catch((error) => {
                    const data = error.json();
                    return Observable.of(new Pigv1Actions.RemindLpointRewardFailed(data));
                });
    });

    @Effect()
    LoadHistory$ = this._actions.ofType(Pigv1Actions.LOAD_PIGV1_HISTORY)
        .switchMap((action) => {
            return this.pigv1Service.getHistory(action.payload)
                .map((response) => {
                    const data = response.json();
                    return new Pigv1Actions.LoadHistorySuccess(data);
                }).catch((error) => {
                    const data = error.json();
                    return Observable.of(new Pigv1Actions.LoadHistoryFailed(data));
                });
    });

    @Effect()
    shareFB$ = this._actions.ofType(Pigv1Actions.PIGV1_SHARE_FB)
        .switchMap((action) => {
            return this.pigv1Service.shareFB(action.payload)
                .map((response) => {
                    const data = response.json();
                    return new Pigv1Actions.LoadShareFBSuccess(data);
                }).catch((error) => {
                    const data = error.json();
                    return Observable.of(new Pigv1Actions.LoadShareFBFailed(data));
                });
    });

}
