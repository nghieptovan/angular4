import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import { AppConstants } from '../../../app.constant';
import * as fromRoot from '../../../store';
import * as account from '../../../store/account/account.actions';
import * as patient from '../../../store/patient/patient.actions';
import { DataModel } from '../../../store/data';
import { GlobalService } from '../../../services/global.service';
import {formvalidation } from '../../../../assets/js/form-validation';
import * as medicine from '../../../store/medicine/medicine.actions';
declare var $;

// Redux
@Component({
    selector: 'edit-update-medicine',
    templateUrl: './form.html',
    styleUrls: ['./form.less']
})
export class EditUpdateMedicine implements OnInit {

    @Input() isEdit: boolean;
    @Input() currentMedicine: any;
    loadJsonConfigSub: any;
    listTypeMedicineSub: any;
    listTypeMedicine: any = [];
    listDrugMedicineSub: any;
    listDrugMedicine: any = [];
    filterDrug: any = [];
    listPatentMedicineSub: any;
    listPatentMedicine: any = [];
    filterPatent: any = [];
    listBehaviourMedicineSub: any;
    listBehaviourMedicine: any = [];
    listUnitMedicineSub: any;
    listUnitMedicine: any = [];
    // currentMedicine: any;

    showPatent: boolean = false;
    showDrug: boolean = false;
    minLenght: any;
    textLabel: any;
    fieldLabel: any;
    
    constructor(private store: Store<fromRoot.AppState>,
                private elementRef: ElementRef,
                private router: Router,
                private toastr: ToastrService,
                private activatedRoute: ActivatedRoute,
                private globalService: GlobalService,
                private patientModel: DataModel) {        
        this.loadJsonConfigSub = this.store.select(fromRoot.accountGetConfigJSON).subscribe((config) =>{
            if(config) {
                this.minLenght = config.MIN_LENGTH_6;
                this.textLabel = config.TEXT_LABEL;
                this.fieldLabel = config.MEDICINE_LABEL;
            }            
        });
        
        this.listPatentMedicineSub = this.store.select(fromRoot.getListPatentMedicine).subscribe((patentMedicines) => {
            if(patentMedicines){
                this.listPatentMedicine = patentMedicines;
                this.filterPatent = patentMedicines;
            }else{
                this.globalService.loadList('patent');
            }  
        });
        this.listDrugMedicineSub = this.store.select(fromRoot.getListDrugMedicine).subscribe((drugMedicines) => {
            if(drugMedicines){
                this.listDrugMedicine = drugMedicines;
                this.filterDrug = drugMedicines;
            }else{
                this.globalService.loadList('drug');
            }  
        });

        this.listTypeMedicineSub = this.store.select(fromRoot.getListTypeMedicine).subscribe((typeMedicines) => {
            if(typeMedicines){
                this.listTypeMedicine = typeMedicines;
            }else{
                this.globalService.loadList('type');
            }    
        });
        this.listBehaviourMedicineSub = this.store.select(fromRoot.getListBehaviourMedicine).subscribe((behaviourMedicines) => {
            if(behaviourMedicines){
                this.listBehaviourMedicine = behaviourMedicines;
            }else{
                this.globalService.loadList('behaviour');
            }  
        });      
        this.listUnitMedicineSub = this.store.select(fromRoot.getListUnitMedicine).subscribe((unitMedicines) => {
            if(unitMedicines){
                this.listUnitMedicine = unitMedicines;
            }else{
                this.globalService.loadList('unit');
            }  
        });
              
    }
    ngOnInit() {
        
    }
    ngOnDestroy(){
        this.loadJsonConfigSub.unsubscribe();
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
    filterValue(type, value){
        console.log(type);
        console.log(value);
        
    }

}


