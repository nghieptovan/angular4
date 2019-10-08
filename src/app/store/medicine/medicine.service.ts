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
        switch (type) {
            case 'patent':
                url = 'patentmedicine/delete/'+ data;
                break;        
            case 'drug':
                url = 'drug/delete/'+ data;
            case 'unit':
                url = 'unittomedicine/delete/'+ data;
                break;        
            case 'type':
                url = 'typemedicine/delete/'+ data;
                break;        
            case 'behaviour':
                url = 'behaviourmedicine/delete/'+ data;
                break;        
            default:
                break;
        }
        return this.httpService.postAnonymous(url, input);
    }

    updateDataMedicine(input){
        // data = { name, code ,id}
        let { type, data } = input;
        let url = ''; 
        switch (type) {
            case 'patent':
                url = data.id != 0 ? 'patentmedicine/' + data.id : 'patentmedicine';
                break;  
            case 'drug':
                url = data.id != 0 ? 'drug/' + data.id : 'drug';
                break;        
            case 'unit':
                url = data.id != 0 ? 'unittomedicine/' + data.id : 'unittomedicine';
                break;        
            case 'type':
                url = data.id != 0 ? 'typemedicine/' + data.id : 'typemedicine';
                break;        
            case 'behaviour':
                url = data.id != 0 ? 'behaviourmedicine/' + data.id : 'behaviourmedicine';
                break;        
            default:
                break;
        }
        return this.httpService.postAnonymous(url, {name: data.name, code: data.code});
    }
   
}
