import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Dispatcher, Store } from '@ngrx/store';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import { AppConstants } from '../../../../app.constant';
import * as fromRoot from '../../../../store';
import * as account from '../../../../store/account/account.actions';
import * as patient from '../../../../store/patient/patient.actions';
import { DataModel } from '../../../../store/data';
import { GlobalService } from '../../../../services/global.service';
import {formvalidation } from '../../../../../assets/js/form-validation';
import * as medicine from '../../../../store/medicine/medicine.actions';
declare var $;

// Redux
@Component({
    selector: 'edit-update-medicine',
    templateUrl: './form.html',
    styleUrls: ['./form.less']
})
export class EditUpdateMedicine implements OnInit {

    @Input() isEdit: boolean;
    listTypeMedicineSub: any;
    listTypeMedicine: any = [];
    
    constructor(private store: Store<fromRoot.AppState>,
                private dispatcher: Dispatcher,
                private elementRef: ElementRef,
                private router: Router,
                private toastr: ToastrService,
                private activatedRoute: ActivatedRoute,
                private globalService: GlobalService,
                private patientModel: DataModel) {
        if(!this.globalService.getSessionData('listTypeMedicine')){
            this.store.dispatch(new medicine.LoadTypeMedicine(0));
        }else{
            this.listTypeMedicine = this.globalService.getSessionData('listTypeMedicine');
        }        

        this.listTypeMedicineSub = this.store.select(fromRoot.getListTypeMedicine).subscribe((typeMedicines) => {
            if(typeMedicines && typeMedicines.code == 200){
                this.listTypeMedicine = typeMedicines.data;
                this.globalService.setSessionData('listTypeMedicine', this.listTypeMedicine);
            }
        });
        
    }
    ngOnInit() {
        // console.log(this.isEdit);
        if(this.isEdit){
            const idMedicine = this.activatedRoute.params['value'].id;
            this.loadMedicine(idMedicine);
        }
    }
    ngOnDestroy(){
        this.listTypeMedicineSub.unsubcribe();
    }

    loadMedicine(idMedicine){
        this.store.dispatch(new medicine.LoadMedicine(idMedicine));
        
    }
    selectTypeMedicine(item){
        console.log(item);
        
    }

}


