import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';

import { HttpService } from '../../services/http.service';
import * as fromRoot from '../index';
import * as vendor from './vendor.actions';
import {VendorService} from "./vendor.service";

@Injectable()
export class VendorEffects {
    constructor(private _actions: Actions,
        private httpService: HttpService,
        private vendorService: VendorService,
        private store: Store<fromRoot.AppState>) {
    }

    @Effect() loadVendor$ = this._actions.ofType(vendor.LOAD)
        .switchMap((action) => {
            return this.vendorService.loadVendorById(action.payload.id)
                .map((result) => {
                    if (result.json()) {
                        return new vendor.LoadSuccess({ vendor: result.json()});
                    }
                }).catch((error) => {
                    return Observable.of(new vendor.LoadFailed(error));
                });
        });

    @Effect() loadLandingSetting$ = this._actions.ofType(vendor.LOAD_LANDING_SETTING)
        .switchMap((action) => {
            return this.vendorService.loadLandingSetting(action.payload.id)
                .map((result) => {
                    if (result.json()) {
                        return new vendor.LoadLandingSettingSuccess({ landing_setting: result.json()});
                    }
                }).catch((error) => {
                    return Observable.of(new vendor.LoadLandingSettingFailed(error));
                });
        });
}
