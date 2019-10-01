import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { HttpService } from '../../services/http.service';

@Injectable()
export class BillService {
    constructor(private httpService: HttpService) {

    }

    //for pm
    getBillByPatient(data) {
        console.log(data);
        
        // Route::get('/api/v1/bill/getByPatient/{patient_id}', 'Bills@getByPatient');
        return this.httpService.getAnonymous('bill/getByPatient/'+data);
    }
    // updatePatient(data){
    //     return this.httpService.postAnonymous('patient/'+data.id, data);
    // }

   
}
