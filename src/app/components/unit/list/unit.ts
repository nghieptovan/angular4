import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';


import { GlobalService } from '../../../services/global.service';
import * as fromRoot from '../../../store';
import * as account from '../../../store/account/account.actions';
import * as patient from '../../../store/patient/patient.actions';

import * as medicine from '../../../store/medicine/medicine.actions';
import { Observable } from 'rxjs/Observable';
import {Router} from "@angular/router";
import { AppConstants } from '../../../app.constant';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';
import * as moment from 'moment';
import { datatablessources, deleteRow, destroytable } from '../../../../assets/js/data-tables/datatables-sources'; 
import { DialogService } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from '../../../modals/confirm.component';
declare var $;

@Component({
    selector: 'unit',
    templateUrl: './unit.html'
})

export class Unit {
    static isViewLoaded: any;
    patientGetLoadingState: any;
    pageLoading: boolean = false;
    listUnitMedicineSub: any;
    deleteUnitSub: any;
    listUnitMedicine: any;
    deleteAccountSub: any;
    selectedId: any;
    textLabel: any;
    fieldLabel: any;
    isDeleting: boolean = false;
    constructor(private store: Store<fromRoot.AppState>, 
        private globalService: GlobalService, 
        private router: Router, 
        private cookieService: CookieService,
        private toastr: ToastrService,
        private dialogService:DialogService) {
           
        this.store.select(fromRoot.accountGetConfigJSON).subscribe((config) =>{
            if(config) {
                this.textLabel = config.TEXT_LABEL;
                this.fieldLabel = config.UNIT_MEDICINE;
            }            
        });

        this.listUnitMedicineSub = this.store.select(fromRoot.getListUnitMedicine).subscribe((unitMedicines) => {
            if(unitMedicines){
                this.listUnitMedicine = unitMedicines;
                datatablessources(3); 
            }else{
                this.store.dispatch(new medicine.LoadUnitMedicine(0));
            }  
        });

        this.deleteUnitSub = this.store.select(fromRoot.typeMedDelete).subscribe((type) => {
            if(type == 'unit_success' && this.isDeleting){
                deleteRow(this.selectedId);
                this.toastr.success(this.fieldLabel.lbl_unit_delete_success);
                this.isDeleting = false;
            }
            if(type == 'unit_failed' && this.isDeleting){
                this.toastr.error(this.fieldLabel.lbl_unit_failed);
                this.isDeleting = false;
            }
        })
   
    }
  
    
    ngOnDestroy() {
        this.listUnitMedicineSub.unsubscribe();
        this.deleteUnitSub.unsubscribe();
    }
    deleteData(id){
        this.isDeleting = true;
        this.selectedId = id;
        this.store.dispatch(new medicine.DeleteDataMedicine({
            type: 'unit',
            data: id
        }));
    }
    deleteUnit(Id){
        this.dialogService.addDialog(ConfirmComponent, {
            title:'Confirm title', 
            message: this.fieldLabel.lbl_unit_delete})
            .subscribe((isConfirmed)=>{
                if(isConfirmed) {
                    this.deleteData(Id);
                }
            });
    }

}
