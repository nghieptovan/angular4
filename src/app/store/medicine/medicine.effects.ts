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
    // List medicine
    @Effect()
    listMedicine$ = this._actions.ofType(medicine.LIST_MEDICINE)
        .switchMap((action) => {
            return this.medicineService.loadListMedicine((action as any).payload)
                .map((resp) => {
                    return new medicine.ListMedicineSuccess({data: resp.json(), id: (action as any).payload});
                }).catch((error) => {
                    return Observable.of(new medicine.ListMedicineFailed(error));
                });
        });
    // Load medicine
    @Effect()
    loadMedicine$ = this._actions.ofType(medicine.LOAD_MEDICINE_BY_ID)
        .switchMap((action) => {
            return this.medicineService.loadMedicineById((action as any).payload)
                .map((resp) => {
                    return new medicine.LoadMedicineSuccess({data: resp.json(), id: (action as any).payload});
                }).catch((error) => {
                    return Observable.of(new medicine.LoadMedicineFailed(error));
                });
        });
    // Load type_medicine
    @Effect()
    loadTypeMedicine$ = this._actions.ofType(medicine.LOAD_TYPE_MEDICINE)
        .switchMap((action) => {
            return this.medicineService.loadTypeMedicine((action as any).payload)
                .map((resp) => {
                    return new medicine.LoadTypeMedicineSuccess({data: resp.json(), id: (action as any).payload});
                }).catch((error) => {
                    return Observable.of(new medicine.LoadTypeMedicineFailed(error));
                });
        });
    // Load drug_medicine
    @Effect()
    loadDrugMedicine$ = this._actions.ofType(medicine.LOAD_DRUG_MEDICINE)
        .switchMap((action) => {
        return this.medicineService.loadDrugMedicine((action as any).payload)
            .map((resp) => {
                return new medicine.LoadDrugMedicineSuccess({data: resp.json(), id: (action as any).payload});
            }).catch((error) => {
                return Observable.of(new medicine.LoadDrugMedicineFailed(error));
            });
    });  
    
    // Load patent_medicine
    @Effect()
    loadPatentMedicine$ = this._actions.ofType(medicine.LOAD_PATENT_MEDICINE)
    .switchMap((action) => {
        const listPatentMedicine = this.globalService.getSessionData('listPatentMedicine')
        if (listPatentMedicine) {
            return Observable.of(new medicine.LoadPatentMedicineSuccess({data: listPatentMedicine, id: (action as any).payload}));
        } else {    
            return this.medicineService.loadPatentMedicine((action as any).payload)
            .map((resp) => {
                return new medicine.LoadPatentMedicineSuccess({data: resp.data, id: (action as any).payload});
            }).catch((error) => {
                return Observable.of(new medicine.LoadPatentMedicineFailed(error));
            });
        }
    });

    // Load unit_medicine
    @Effect()
    loadUnitMedicine$ = this._actions.ofType(medicine.LOAD_UNIT_MEDICINE)
        .switchMap((action) => {
        return this.medicineService.loadUnitMedicine((action as any).payload)
            .map((resp) => {
                return new medicine.LoadUnitMedicineSuccess({data: resp.json(), id: (action as any).payload});
            }).catch((error) => {
                return Observable.of(new medicine.LoadUnitMedicineFailed(error));
            });
    });  

    // Load behaviour_medicine
    @Effect()
    loadBehaviourMedicine$ = this._actions.ofType(medicine.LOAD_BEHAVIOUR_MEDICINE)
        .switchMap((action) => {
        return this.medicineService.loadBehaviourMedicine((action as any).payload)
            .map((resp) => {
                return new medicine.LoadBehaviourMedicineSuccess({data: resp.json(), id: (action as any).payload});
            }).catch((error) => {
                return Observable.of(new medicine.LoadBehaviourMedicineFailed(error));
            });
    });  
           
}
