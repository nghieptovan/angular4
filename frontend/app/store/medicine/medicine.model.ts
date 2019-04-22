
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { GlobalService } from '../../services/global.service';
import * as fromRoot from '..';

@Injectable()
export class MedicineModel {
    public medicineObj: {
        code: '',
        name: '',
        display_name: '',
        description: '',
        amount: 0,
        typemedicine_id: 0,
        behaviourmedicine_id: 0,
        unit_id: 0,
        drug_name: '',
        drug_code: '',
        drug_id: ''
        patent_name: '',
        patent_code: '',
        patentmedicine_id: 0,
        sellprice: 0,
        importedprice: 0

    };

    // {
    //     "id": 52,
    //     "code": "11\/10\/2017-07:09:41",
    //     "name": "",
    //     "display_name": "",
    //     "description": "u\u1ed1ng khi s\u1ed1t >= 38,5 \u0111\u1ed9 C",
    //     "amount": 0,
    //     "typemedicine_id": 2,
    //     "behaviourmedicine_id": 1,
    //     "sellprice": 1200,
    //     "importedprice": 0,
    //     "created_at": "2017-10-11 19:09:41",
    //     "updated_at": "2017-10-11 19:09:41",
    //     "drug_id": 39,
    //     "patentmedicine_id": 53,
    //     "unit_id": 2,
    //     "type_medicine": {
    //       "id": 2,
    //       "name": "Gi\u1ea3m \u0111au",
    //       "code": "gd",
    //       "created_at": null,
    //       "updated_at": "2017-09-27 21:35:45"
    //     },
    //     "behaviour_medicine": {
    //       "id": 1,
    //       "name": "U\u1ed1ng",
    //       "code": "U",
    //       "created_at": null,
    //       "updated_at": "2017-09-29 19:43:21"
    //     },
    //     "unit": {
    //       "id": 2,
    //       "name": "G\u00f3i",
    //       "code": "G",
    //       "created_at": "2017-09-26 23:05:06",
    //       "updated_at": "2017-09-29 19:51:10"
    //     },
    //     "drug": {
    //       "id": 39,
    //       "code": "aceta",
    //       "name": "Acetaminophen",
    //       "created_at": "2017-10-11 19:06:55",
    //       "updated_at": "2017-10-11 19:06:55"
    //     },
    //     "patent_medicine": {
    //       "id": 53,
    //       "name": "Hapacol 150 mg",
    //       "code": "aceta1",
    //       "created_at": "2017-10-11 19:07:25",
    //       "updated_at": "2017-10-11 19:07:25"
    //     }
    //   }
    constructor(private _actions: Actions,
        private store: Store<fromRoot.AppState>,
        private router: Router,
        private globalService: GlobalService) {

    }
    
    public setMedicineObject(){

    }
    public getMedicineObject(){
        return {
            name: '',
            age: '',
            status: ''
        }
    }
 




}

