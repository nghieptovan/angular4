import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { HttpService } from '../../services/http.service';

@Injectable()
export class PatientService {
    constructor(private httpService: HttpService) {

    }

    //for pm
    listPatient(data) {
        let url = data != 0 ? 'patient/' + data : 'patient';
        return this.httpService.getAnonymous(url);
    }
    updatePatient(data){
        return this.httpService.postAnonymous('patient/'+data.id, data);
    }

   
}
