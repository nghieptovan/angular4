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
    loadMedicineById(data) {
        let url = data != 0 ? 'medicine/' + data : 'medicine';
        return this.httpService.getAnonymous(url);
    }
    loadTypeMedicine(data){
        let url = data != 0 ? 'typemedicine/' + data : 'typemedicine';
        return this.httpService.getAnonymous(url);
    }

    loadDrugMedicine(data){
        let url = data != 0 ? 'drug/' + data : 'drug';
        return this.httpService.getAnonymous(url);
    }

    loadPatentMedicine(data){
        let url = data != 0 ? 'patentmedicine/' + data : 'patentmedicine';
        return this.httpService.getAnonymous(url);
    }

    patentMedicineUpdateAndCreate(data){
        let input = {
            name: data.name,
            code: data.code
        }
        let url = data.patentId != 0 ? 'patentmedicine/' + data.patentId : 'patentmedicine';
        return this.httpService.postAnonymous(url, input);
    }

    loadUnitMedicine(data){
        let url = data != 0 ? 'unittomedicine/' + data : 'unittomedicine';
        return this.httpService.getAnonymous(url);
    }

    loadBehaviourMedicine(data){
        let url = data != 0 ? 'behaviourmedicine/' + data : 'behaviourmedicine';
        return this.httpService.getAnonymous(url);
    }

    deleteDataMedicine(input){
        let { type, data } = input;
        let url = ''; 
        console.log(type, data);
        switch (type) {
            case 'patent':
                url = 'patentmedicine/delete/'+ data;
                break;        
            default:
                break;
        }
        return this.httpService.postAnonymous(url, input);
    }

//     Route::get('/api/v1/typemedicine/{id?}', 'TypeMedicines@index');
//  Route::post('/api/v1/typemedicine', 'TypeMedicines@store');
// Route::post('/api/v1/typemedicine/{id}', 'TypeMedicines@update');
// Route::post('/api/v1/typemedicine/delete/{id}', 'TypeMedicines@destroy');
   
}
