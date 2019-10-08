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
    selector: 'type',
    templateUrl: './type.html'
})

export class Type {
    static isViewLoaded: any;
    pageLoading: boolean = false;
    listTypeMedicineSub: any;
    deleteTypeSub: any;
    listTypeMedicine: any;
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
                this.fieldLabel = config.TYPE_MEDICINE;
            }            
        });

        this.listTypeMedicineSub = this.store.select(fromRoot.getListTypeMedicine).subscribe((typeMedicines) => {
            if(typeMedicines){
                this.listTypeMedicine = typeMedicines;
                datatablessources(3); 
            }else{
                this.store.dispatch(new medicine.LoadTypeMedicine(0));
            }  
        });

        this.deleteTypeSub = this.store.select(fromRoot.typeMedDelete).subscribe((type) => {
            if(type == 'type_success' && this.isDeleting){
                deleteRow(this.selectedId);
                this.toastr.success(this.fieldLabel.lbl_type_delete_success);
                this.isDeleting = false;
            }
            if(type == 'type_failed' && this.isDeleting){
                this.toastr.error(this.fieldLabel.lbl_type_failed);
                this.isDeleting = false;
            }
        })
   
    }
  
    
    ngOnDestroy() {
        this.listTypeMedicineSub.unsubscribe();
        this.deleteTypeSub.unsubscribe();
    }
    deleteData(id){
        this.isDeleting = true;
        this.selectedId = id;
        this.store.dispatch(new medicine.DeleteDataMedicine({
            type: 'type',
            data: id
        }));
    }
    deleteType(Id){
        this.dialogService.addDialog(ConfirmComponent, {
            title:'Confirm title', 
            message: this.fieldLabel.lbl_type_delete})
            .subscribe((isConfirmed)=>{
                if(isConfirmed) {
                    this.deleteData(Id);
                }
            });
    }

}
