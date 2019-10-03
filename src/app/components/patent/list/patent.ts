import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';


import { GlobalService } from '../../../services/global.service';
import * as fromRoot from '../../../store';
import * as account from '../../../store/account/account.actions';
import * as patient from '../../../store/patient/patient.actions';

import * as auth from '../../../store/auth/auth.actions';
import { Observable } from 'rxjs/Observable';
import {Router} from "@angular/router";
import { AppConstants } from '../../../app.constant';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';
import * as moment from 'moment';
import { datatablessources } from '../../../../assets/js/data-tables/datatables-sources'; 
declare var $;

@Component({
    selector: 'patent',
    templateUrl: './patent.html'
})

export class Patent {
    static isViewLoaded: any;
    patientGetLoadingState: any;
    pageLoading: boolean = false;
    getListPatientSub: any;
    deleteAccountSub: any;

    patientIsLoading$: boolean = false;
    usernameMessage: string = '';
    passwordMessage: string = '';
    dispatcherSub: any;
    authGetLoadingState: boolean = false;
    patients: any;
    errorMessage: string = '';
    selectedId: any;
    textLabel: any;
    fieldLabel: any;
    constructor(private store: Store<fromRoot.AppState>, private globalService: GlobalService, private router: Router, private cookieService: CookieService,
        private toastr: ToastrService,) {

        this.store.select(fromRoot.accountGetConfigJSON).subscribe((config) =>{
            if(config) {
                this.textLabel = config.TEXT_LABEL;
                this.fieldLabel = config.PAITENT_LABEL;
            }            
        });
        this.patientGetLoadingState = this.store.select(fromRoot.patientGetLoadingState).subscribe((loading) => {
            this.patientIsLoading$ = loading;
        });
        
        this.getListPatientSub = this.store.select(fromRoot.patientGetListPatient).subscribe((patients) => {
            if(!patients){
                this.store.dispatch(new patient.LoadPatientById(0));
            }else{
                if(patients.code == 200){
                    this.patients = patients.data;
                    datatablessources();
                }else{
                    this.errorMessage = patients.message;
                }
            }
        });
        this.deleteAccountSub = this.store.select(fromRoot.patientDeletePatient).subscribe((patient) => {
            if(patient){
                if(patient.code == 200){
                    this.toastr.show(patient.message);
                    this.patients  = _.filter(this.patients, (item) => { return item.id != this.selectedId; });
                    this.selectedId = null;
                    this.toastr.success(patient.message);
                }else{
                    this.toastr.error(patient.message);
                    this.errorMessage = patient.message;
                }
            }
        });
        
        
    }
    setDate(date){
        return date.substring(0, 10);
    }
    
    ngOnDestroy() {
        this.getListPatientSub.unsubscribe();
        // this.deleteAccountSub.unsubscribe();
        this.patientGetLoadingState.unsubscribe();
    }

    actionPatient(action, patient) {
        
        if(action != '' && patient.id){
            switch (action) {
                case 'toathuoc':
                    this.globalService.setCurrentPatient(patient);
                    this.router.navigateByUrl('/benh-nhan/toa-thuoc/'+patient.id);
                    break;
                case 'capnhat':
                    this.globalService.setCurrentPatient(patient);
                    this.router.navigateByUrl('/benh-nhan/cap-nhat/'+patient.id);
                    break;
                case 'xoa':
                    this.deleteAccount(patient.id);
                    break;            
                default:
                    break;
            }
        }        
    }
    
    deleteAccount(id){
        this.selectedId = id;
        this.store.dispatch(new patient.DeletePatient(id));
    }
}
