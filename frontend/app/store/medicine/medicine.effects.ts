import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { GlobalService } from '../../services/global.service';
import * as fromRoot from '..';
import * as medicine from './medicine.actions';
import { MedicineService } from './medicine.service';

@Injectable()
export class MedicineEffects {
    page: any;
    currentOrder: any;

    constructor(private _actions: Actions,
        private store: Store<fromRoot.AppState>,
        private router: Router,
        private medicineService: MedicineService,
        private globalService: GlobalService) {

    }
    // List patient
    @Effect()
    listMedicine$ = this._actions.ofType(medicine.LIST_MEDICINE)
        .switchMap((action) => {
            return this.medicineService.loadListMedicine(action.payload)
                .map((resp) => {
                    return new medicine.ListMedicineSuccess({data: resp.json(), id: action.payload});
                }).catch((error) => {
                    return Observable.of(new medicine.ListMedicineFailed(error));
                });
        });
  
        
        
}
