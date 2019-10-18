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
    // Load drug_medicine    
    // Load patent_medicine
    // Load unit_medicine
    // Load behaviour_medicine 
    // Load deleteDataMedicine
    @Effect()
    deleteDataMedicine$ = this._actions.ofType(medicine.DELETE_DATA_MEDICINE)
        .switchMap((action) => {
            return this.medicineService.deleteDataMedicine((action as any).payload)
                .map((resp) => {
                    let dataRes = resp.json();
                    return new medicine.DeleteDataMedicineSuccess({data: dataRes, payload: (action as any).payload});                  
                }).catch((error) => {
                    return Observable.of(new medicine.DeleteDataMedicineFailed({data: error, payload: (action as any).payload}));
                });   
    });

    // Load updateDataMedicine
    @Effect()
    updateDataMedicine$ = this._actions.ofType(medicine.UPDATE_DATA_MEDICINE)
        .switchMap((action) => {
            return this.medicineService.updateDataMedicine((action as any).payload)
                .map((resp) => {
                    let dataRes = resp.json();
                    return new medicine.UpdateDataMedicineSuccess({data: dataRes, payload: (action as any).payload});                  
                }).catch((error) => {
                    return Observable.of(new medicine.UpdateDataMedicineFailed({data: error, payload: (action as any).payload}));
                });   
    });

    // Load DataMedicine
    @Effect()
    loadDataMedicine$ = this._actions.ofType(medicine.LOAD_DATA_MEDICINE)
        .switchMap((action) => {
            let dataLoaded = this.globalService.getSessionDataFromType((action as any).payload.type);
            if(dataLoaded){
                return Observable.of(new medicine.LoadDataMedicineSuccess({data: dataLoaded, payload: (action as any).payload}));
            }else{
                return this.medicineService.loadDataMedicine((action as any).payload)
                .map((resp) => {
                    let dataRes = resp.json();
                    if(dataRes && dataRes.code == 200){
                        this.globalService.setSessionDataFromType((action as any).payload.type, dataRes.data);
                        return new medicine.LoadDataMedicineSuccess({data: dataRes.data, payload: (action as any).payload});
                    }else{
                        return new medicine.LoadDataMedicineFailed({data: {}, payload: (action as any).payload});
                    }   
                }).catch((error) => {
                    return Observable.of(new medicine.LoadDataMedicineFailed({data: error, payload: (action as any).payload}));
                });
            } 
    });



           
}
