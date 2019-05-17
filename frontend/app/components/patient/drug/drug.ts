import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Dispatcher, Store } from '@ngrx/store';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';

import { AppConstants } from '../../../app.constant';
import * as fromRoot from '../../../store';
import * as account from '../../../store/account/account.actions';
import * as patient from '../../../store/patient/patient.actions';
import * as bill from '../../../store/bill/bill.actions';
import { DataModel } from '../../../store/data';
import { GlobalService } from '../../../services/global.service';
import {inboxGrid} from '../../../../assets/js/inbox';
declare var $;

// Redux
@Component({
    selector: 'drug-patient',
    templateUrl: './drug.html',
    styleUrls: ['./drug.less']
})
export class DrugPatient {
    patient: any;
    loadPatientSub: any;
    isSameId: boolean = true;
    loadBillSub: any;
    bills: any = [];
    billDetail: any = {

    };
    drugDetail: any = [];
    constructor(private store: Store<fromRoot.AppState>,
                private dispatcher: Dispatcher,
                private elementRef: ElementRef,
                private router: Router,
                private toastr: ToastrService,
                private activatedRoute: ActivatedRoute,
                private globalService: GlobalService,
                private patientModel: DataModel) {
        inboxGrid();
        const patientId = this.activatedRoute.params['value'].id;
        const patientLocal = this.globalService.getCurrentPatient();
        this.store.dispatch(new bill.BillByPatient(patientId));

        if(patientLocal.id == patientId){
            this.patient = patientLocal;
            
        }else{
            this.isSameId = false;
            this.store.dispatch(new patient.ListPatient(patientId));
        }

        this.loadPatientSub = this.store.select(fromRoot.patientCurrentPatient).subscribe((patient) => {
            if(!this.isSameId && patient){
                if(patient.code == 200)
                    this.patient = patient.data;
                else
                    this.router.navigateByUrl('benh-nhan');
            }
        });

        this.loadBillSub = this.store.select(fromRoot.billByPatient).subscribe((bills) =>{
            if(bills && bills.code == 200)
                this.bills = bills.data;
                this.billDetail = this.bills[0];
                if(this.billDetail && this.billDetail.details)
                    this.drugDetail = this.billDetail.details
        });
        
        
    }

    changeSelectBill(id){
        this.billDetail = this.bills.find(child =>{
            return child.id == id;
        });
        if(this.billDetail && this.billDetail.details)
            this.drugDetail = this.billDetail.details;
    }

   
    ngOnDestroy() {
      this.loadBillSub.unsubscribe();
      this.loadPatientSub.unsubscribe();
    }



}
