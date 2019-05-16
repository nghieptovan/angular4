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
    listDrugMedicineSub: any;
    listDrugMedicine: any = [];
    listPatentMedicineSub: any;
    listPatentMedicine: any = [];
    listBehaviourMedicineSub: any;
    listBehaviourMedicine: any = [];
    listUnitMedicineSub: any;
    listUnitMedicine: any = [];
    currentMedicine: any;
    defaultCurrentMedicine: any = {
        "id": 0,
        "name": "",
        "display_name": "",
        "description": "",
        "amount": 0,
        "typemedicine_id": 0,
        "behaviourmedicine_id": 0,
        "sellprice": 0,
        "importedprice": 0,
        "drug_id": 0,
        "patentmedicine_id": 0,
        "unit_id": 0,
        "type_medicine": {
          "name": "",
          "code": ""
        },
        "behaviour_medicine": {
          "name": "",
          "code": ""
        },
        "unit": {
          "name": "",
          "code": ""
        },
        "drug": {
          "code": "",
          "name": ""
        },
        "patent_medicine": {
          "name": "",
          "code": ""
        }
      };
    currentMedicineSub: any;
    showPatent: boolean = false;
    showDrug: boolean = false;
    
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

        if(!this.globalService.getSessionData('listDrugMedicine')){
            this.store.dispatch(new medicine.LoadDrugMedicine(0));
        }else{
            this.listDrugMedicine = this.globalService.getSessionData('listDrugMedicine');
        }

        if(!this.globalService.getSessionData('listPatentMedicine')){
            this.store.dispatch(new medicine.LoadPatentMedicine(0));
        }else{
            this.listPatentMedicine = this.globalService.getSessionData('listPatentMedicine');
        } 

        if(!this.globalService.getSessionData('listBehaviourMedicine')){
            this.store.dispatch(new medicine.LoadBehaviourMedicine(0));
        }else{
            this.listBehaviourMedicine = this.globalService.getSessionData('listBehaviourMedicine');
        } 

        if(!this.globalService.getSessionData('listUnitMedicine')){
            this.store.dispatch(new medicine.LoadUnitMedicine(0));
        }else{
            this.listUnitMedicine = this.globalService.getSessionData('listUnitMedicine');
        } 

        
        
    }
    ngOnInit() {
        console.log(this.isEdit);
        
        if(this.isEdit){
            const idMedicine = this.activatedRoute.params['value'].id;
            if(idMedicine){
                this.loadMedicine(idMedicine);
            }
        }else{
            this.currentMedicine = this.defaultCurrentMedicine;
        }

        this.listTypeMedicineSub = this.store.select(fromRoot.getListTypeMedicine).subscribe((typeMedicines) => {
            if(typeMedicines && typeMedicines.code == 200){
                this.listTypeMedicine = typeMedicines.data;
                this.globalService.setSessionData('listTypeMedicine', this.listTypeMedicine);
            }
        });
        this.listDrugMedicineSub = this.store.select(fromRoot.getListDrugMedicine).subscribe((drugMedicines) => {
            if(drugMedicines && drugMedicines.code == 200){
                this.listDrugMedicine = drugMedicines.data;
                this.globalService.setSessionData('listDrugMedicine', this.listDrugMedicine);
            }
        });
        this.listPatentMedicineSub = this.store.select(fromRoot.getListPatentMedicine).subscribe((patentMedicines) => {
            if(patentMedicines && patentMedicines.code == 200){
                this.listPatentMedicine = patentMedicines.data;
                this.globalService.setSessionData('listPatentMedicine', this.listPatentMedicine);
            }
        });
        this.listBehaviourMedicineSub = this.store.select(fromRoot.getListBehaviourMedicine).subscribe((behaviourMedicines) => {
            if(behaviourMedicines && behaviourMedicines.code == 200){
                this.listBehaviourMedicine = behaviourMedicines.data;
                this.globalService.setSessionData('listBehaviourMedicine', this.listBehaviourMedicine);
            }
        });
        this.listUnitMedicineSub = this.store.select(fromRoot.getListUnitMedicine).subscribe((unitMedicines) => {
            if(unitMedicines && unitMedicines.code == 200){
                this.listUnitMedicine = unitMedicines.data;
                this.globalService.setSessionData('listUnitMedicine', this.listUnitMedicine);
            }
        });
        this.currentMedicineSub = this.store.select(fromRoot.getCurrentMedicine).subscribe((medicine) => {
            if(medicine && medicine.code == 200 && medicine.data){               
                this.currentMedicine = medicine.data;
            }
            if(!this.isEdit){
                this.currentMedicine = this.defaultCurrentMedicine;
            }
        });
    }
    ngOnDestroy(){

    }

    loadMedicine(idMedicine){
        this.store.dispatch(new medicine.ListMedicine(idMedicine));        
    }
    selectDrugMedicine(item){
        this.currentMedicine.drug = item;
        this.currentMedicine.drug_id = item.id;
        console.log(item);
        
    }
    selectPatentMedicine(item){
        this.currentMedicine.patent_medicine = item;
        this.currentMedicine.patentmedicine_id = item.id;
        console.log(item);        
    }
    showPatentList(type){
        this.showPatent = type;
    }
    showDrugList(type){
        this.showDrug = type;
    }
    saveForm(form){
        
        console.log(form.value);
        
    }

}


