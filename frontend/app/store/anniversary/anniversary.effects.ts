import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';

import { HttpService } from '../../services/http.service';
import * as fromRoot from '../index';
import * as anniversary from './anniversary.actions';
import {AnniversaryService} from "./anniversary.service";

@Injectable()
export class AnniversaryEffects {
    constructor(private _actions: Actions,
        private httpService: HttpService,
        private anniversaryService: AnniversaryService,
        private store: Store<fromRoot.AppState>) {
    }

    @Effect() loadAnniversary$ = this._actions.ofType(anniversary.LOAD)
        .switchMap((action) => {
            return this.anniversaryService.loadAnniversary(action.payload)
                .map((result) => {
                    if (result.json()) {
                        return new anniversary.LoadSuccess(result.json());
                    }
                }).catch((error) => {
                    return Observable.of(new anniversary.LoadFailed(error));
                });
        });
}
