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
            return this.patientService.getPatient((action as any).payload)
                .map((resp) => {
                    return new patient.ListPatientSuccess({data: resp.json(), id: (action as any).payload});
                }).catch((error) => {
                    return Observable.of(new patient.ListPatientFailed(error));
                });
        });
    // update patient
    @Effect()
    updatePatient$ = this._actions.ofType(patient.UPDATE_PATIENT)
        .switchMap((action) => {
            return this.patientService.updatePatient((action as any).payload)
                .map((resp) => {
                    return new patient.UpdatePatientSuccess(resp.json());
                }).catch((error) => {
                    return Observable.of(new patient.UpdatePatientFailed(error));
                });
        });
    // update patient
    @Effect()
    loadPatientById$ = this._actions.ofType(patient.LOAD_PATIENT_BY_ID)
        .switchMap( (action) => {
            if((action as any).payload == -1){
                return Observable.of(new patient.LoadPatientByIdSuccess({type: (action as any).payload, data: {}}));
            }else{
                return this.patientService.getPatient((action as any).payload)
                .map((resp) => {
                    return new patient.LoadPatientByIdSuccess({type: (action as any).payload, data: resp.json()});
                }).catch((error) => {
                    return Observable.of(new patient.LoadPatientByIdFailed(error));
                });
            }

        });
            // delete account
    @Effect()
    deleteAccount$ = this._actions.ofType(patient.DELETE_PATIENT)
        .switchMap((action) => {
            return this.patientService.deletePatient((action as any).payload)
                .map((resp) => {
                    const data = resp.json();
                    return new patient.DeletePatientSuccess(data);
                }).catch((error) => {
                    return Observable.of(new patient.DeletePatientFailed(error));
                });
        });
        
}
