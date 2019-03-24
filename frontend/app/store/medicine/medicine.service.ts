import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { HttpService } from '../../services/http.service';

@Injectable()
export class MedicineService {
    constructor(private httpService: HttpService) {

    }

    loadListMedicine(data) {
        let url = data != 0 ? 'medicine/' + data : 'medicine';
        return this.httpService.getAnonymous(url);
    }

   
}
