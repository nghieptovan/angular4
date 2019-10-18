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
    selector: 'drug',
    templateUrl: './drug.html'
})

export class Drug {
    static isViewLoaded: any;
    patientGetLoadingState: any;
    pageLoading: boolean = false;
    listDrugMedicineSub: any;
    deleteDrugSub: any;
    listDrugMedicine: any;
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
                this.fieldLabel = config.DRUG_MEDICINE;
            }            
        });

        this.listDrugMedicineSub = this.store.select(fromRoot.getListDrugMedicine).subscribe((drugMedicines) => {
            if(drugMedicines){
                this.listDrugMedicine = drugMedicines;
                datatablessources(3); 
            }else{
               this.loadList();
            }  
        });

        this.deleteDrugSub = this.store.select(fromRoot.typeMedDelete).subscribe((type) => {
            if(type =='drug_success' && this.isDeleting){
                deleteRow(this.selectedId);
                this.toastr.success('Đã xóa dược chất thành công.');
                this.isDeleting = false;
            }
            if(type == 'drug_failed' && this.isDeleting){
                this.toastr.error('Có lỗi xảy ra, vui lòng thử lại sau.');
                this.isDeleting = false;
            }
        })
   
    }
  
    loadList(){
        this.globalService.loadList('drug');
    }
    ngOnDestroy() {
        this.listDrugMedicineSub.unsubscribe();
        this.deleteDrugSub.unsubscribe();
    }
    deleteData(id){
        this.isDeleting = true;
        this.selectedId = id;
        this.store.dispatch(new medicine.DeleteDataMedicine({
            type: 'drug',
            data: id
        }));
    }
    deleteDrug(drugId){
        this.dialogService.addDialog(ConfirmComponent, {
            title:'Confirm title', 
            message:'Bạn muốn xóa dược chất'})
            .subscribe((isConfirmed)=>{
                if(isConfirmed) {
                    this.deleteData(drugId);
                }
            });
    }

}
