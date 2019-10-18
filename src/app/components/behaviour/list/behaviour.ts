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
    selector: 'behaviour',
    templateUrl: './behaviour.html'
})

export class Behaviour {
    static isViewLoaded: any;
    pageLoading: boolean = false;
    listBehaviourMedicineSub: any;
    deleteBehaviourSub: any;
    listBehaviourMedicine: any;
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
                this.fieldLabel = config.BEHAVIOUR_MEDICINE;
            }            
        });

        this.listBehaviourMedicineSub = this.store.select(fromRoot.getListBehaviourMedicine).subscribe((behaviourMedicines) => {
            if(behaviourMedicines){
                this.listBehaviourMedicine = behaviourMedicines;
                datatablessources(3); 
            }else{
                this.loadData();
            }  
        });

        this.deleteBehaviourSub = this.store.select(fromRoot.typeMedDelete).subscribe((behaviour) => {
            if(behaviour == 'behaviour_success' && this.isDeleting){
                deleteRow(this.selectedId);
                this.toastr.success(this.fieldLabel.lbl_behaviour_delete_success);
                this.isDeleting = false;
            }
            if(behaviour == 'behaviour_failed' && this.isDeleting){
                this.toastr.error(this.fieldLabel.lbl_behaviour_failed);
                this.isDeleting = false;
            }
        })
   
    }

    loadData(){
        this.globalService.loadList('behaviour');
    }
  
    
    ngOnDestroy() {
        this.listBehaviourMedicineSub.unsubscribe();
        this.deleteBehaviourSub.unsubscribe();
    }
    deleteData(id){
        this.isDeleting = true;
        this.selectedId = id;
        this.store.dispatch(new medicine.DeleteDataMedicine({
            type: 'behaviour',
            data: id
        }));
    }
    deleteBehaviour(Id){
        this.dialogService.addDialog(ConfirmComponent, {
            title:'Confirm title', 
            message: this.fieldLabel.lbl_behaviour_delete})
            .subscribe((isConfirmed)=>{
                if(isConfirmed) {
                    this.deleteData(Id);
                }
            });
    }

}
