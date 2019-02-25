import { Component } from '@angular/core';
import { Store, Dispatcher } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';


import { GlobalService } from '../../services/global.service';
import * as fromRoot from '../../store';
import * as account from '../../store/account/account.actions';
import * as patient from '../../store/patient/patient.actions';

import * as auth from '../../store/auth/auth.actions';
import { Observable } from 'rxjs/Observable';
import {Router} from "@angular/router";
import { AppConstants } from '../../app.constant';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';
import * as moment from 'moment';
declare var $;

@Component({
    selector: 'patient',
    templateUrl: './patient.html',
    // template: '',
    styleUrls: ['./patient.less']
})

export class Patient {
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
    constructor(private store: Store<fromRoot.AppState>, private globalService: GlobalService, private router: Router, private cookieService: CookieService,
        dispatcher: Dispatcher, private toastr: ToastrService,) {
        
        this.patientGetLoadingState = this.store.select(fromRoot.patientGetLoadingState).subscribe((loading) => {
            this.patientIsLoading$ = loading;
        });
        
        this.getListPatientSub = this.store.select(fromRoot.patientGetListPatient).subscribe((patients) => {
            if(!patients){
                this.store.dispatch(new patient.ListPatient(0));
            }else{
                if(patients.code == 200){
                    this.patients = patients.data;
                }else{
                    this.errorMessage = patients.message;
                }
            }
        });
        // this.deleteAccountSub = this.store.select(fromRoot.accountGetDeleteAccount).subscribe((account) => {
        //     if(account){
        //         if(account.code == 200){
        //             this.toastr.show(account.message);
        //             this.listAccount  = _.filter(this.listAccount, (item) => { return item.id != this.selectedId; });
        //             this.selectedId = null;
        //             this.toastr.success(account.message);
        //         }else{
        //             this.toastr.error(account.message);
        //             this.errorMessage = account.message;
        //         }
        //     }
        // });
        
        
    }
    setDate(date){
        console.log(date.substring(0, 10));
        
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
        // data="/benh-nhan/toa-thuoc/{{patient.id}}"
        // data="/benh-nhan/cap-nhat/{{patient.id}}" 

        // console.log(action);
        // console.log(patient);
        
    }
    
    deleteAccount(id){
        this.selectedId = id;
        this.store.dispatch(new account.DeleteAccount(id));
    }
}
