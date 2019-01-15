import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';

import { HttpService } from '../../services/http.service';
import * as fromRoot from '../index';
import * as brand from './brand.actions';
import {BrandService} from "./brand.service";

@Injectable()
export class BrandEffects {
    constructor(private _actions: Actions,
        private httpService: HttpService,
        private brandService: BrandService,
        private store: Store<fromRoot.AppState>) {
    }

    @Effect() loadBrand$ = this._actions.ofType(brand.LOAD)
        .switchMap((action) => {
            return this.brandService.loadBrandById(action.payload.id)
                .map((result) => {
                    if (result.json()) {
                        return new brand.LoadSuccess({ brand: result.json()});
                    }
                }).catch((error) => {
                    return Observable.of(new brand.LoadFailed(error));
                });
        });
}
