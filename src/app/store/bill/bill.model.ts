
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
export class BillModel {
    public patient: any;

    constructor(private _actions: Actions,
        private store: Store<fromRoot.AppState>,
        private router: Router,
        private patientService: BillService,
        private globalService: GlobalService) {

    }
    public setPatientObject(){

    }
    public getPatientObject(){
        return {
            name: '',
            age: '',
            status: ''
        }
    }



}

