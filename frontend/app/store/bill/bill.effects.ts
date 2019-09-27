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
import * as bill from './bill.actions';
import { BillService } from './bill.service';

@Injectable()
export class BillEffects {
    page: any;
    currentOrder: any;

    constructor(private _actions: Actions,
        private store: Store<fromRoot.AppState>,
        private router: Router,
        private billService: BillService,
        private globalService: GlobalService) {

    }
    // getBillPatientId
    @Effect()
    getBillPatientId$ = this._actions.ofType(bill.BILL_BY_PATIENT)
    .switchMap((action) => {
        return this.billService.getBillByPatient((action as any).payload)
            .map((data) => {
                return new bill.BillByPatientSuccess(data.json());
            }).catch((error) => {
                return Observable.of(new bill.BillByPatientFailed(error));
            });
    });

    
        
}
