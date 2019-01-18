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
import * as patient from './patient.actions';
import { PatientService } from './patient.service';

@Injectable()
export class PatientEffects {
    page: any;
    currentOrder: any;

    constructor(private _actions: Actions,
        private store: Store<fromRoot.AppState>,
        private router: Router,
        private patientService: PatientService,
        private globalService: GlobalService) {

    }


    
    // List patient
    @Effect()
    listPatient$ = this._actions.ofType(patient.LIST_PATIENT)
        .switchMap((action) => {
            return this.patientService.listPatient(action.payload)
                .map((resp) => {
                    return new patient.ListPatientSuccess(resp.json());
                }).catch((error) => {
                    return Observable.of(new patient.ListPatientFailed(error));
                });
        });
   

}
