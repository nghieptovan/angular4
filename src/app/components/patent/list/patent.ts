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
    selector: 'patent',
    templateUrl: './patent.html'
})

export class Patent {
    static isViewLoaded: any;
    patientGetLoadingState: any;
    pageLoading: boolean = false;
    listPatentMedicineSub: any;
    deletePatentSub: any;
    listPatentMedicine: any;
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
                this.fieldLabel = config.PATENT_MEDICINE;
            }            
        });
        this.listPatentMedicineSub = this.store.select(fromRoot.getListPatentMedicine).subscribe((patentMedicines) => {
            if(patentMedicines){
                this.listPatentMedicine = patentMedicines;
                datatablessources(3);                
            }else{
                this.globalService.loadList('patent');
            }  
        });

        this.deletePatentSub = this.store.select(fromRoot.typeMedDelete).subscribe((type) => {
            if(type =='patent_success'){
                deleteRow(this.selectedId);
                this.toastr.success('Đã xóa biệt dược thành công.');
                this.isDeleting = false;
            }
            if(type == 'patent_failed'){
                this.toastr.error('Có lỗi xảy ra, vui lòng thử lại sau.');
                this.isDeleting = false;
            }
        })
   
    }
  
    ngOnDestroy() {
        this.listPatentMedicineSub.unsubscribe();
        this.deletePatentSub.unsubscribe();
    }
    actionPatent(action, patent) {
        console.log(patent);
        console.log(action);
        
        if(action != '' && patent.id){
            switch (action) {
                case 'capnhat':
                    this.router.navigateByUrl('/biet-duoc/cap-nhat/'+patent.id);
                    break;
                case 'xoa':
                        this.dialogService.addDialog(ConfirmComponent, {
                            title:'Confirm title', 
                            message:'Bạn muốn xóa biệt dược'})
                            .subscribe((isConfirmed)=>{
                                if(isConfirmed) {
                                    this.deletePatent(patent.id);
                                }
                            });
                    break;         
                default:
                    break;
            }
        }        
    }
    deleteData(id){
        this.isDeleting = true;
        this.selectedId = id;
        this.store.dispatch(new medicine.DeleteDataMedicine({
            type: 'patent',
            data: id
        }));
    }
    deletePatent(patentId){
        this.dialogService.addDialog(ConfirmComponent, {
            title:'Confirm title', 
            message:'Bạn muốn xóa biệt dược'})
            .subscribe((isConfirmed)=>{
                if(isConfirmed) {
                    this.deleteData(patentId);
                }
            });
    }

}
