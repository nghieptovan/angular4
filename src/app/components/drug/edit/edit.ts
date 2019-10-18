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
import * as medicine from '../../../store/medicine/medicine.actions';
import { DataModel } from '../../../store/data';
import { GlobalService } from '../../../services/global.service';
import {formvalidation } from '../../../../assets/js/form-validation';
declare var $;

// Redux
@Component({
    selector: 'edit-drug',
    templateUrl: './edit.html',
    styleUrls: ['./edit.less']
})
export class EditDrug {
    minLenght: any;
    fieldLabel: any;
    drugId: any = 0;
    textLabel: any;
    drug: any;
    listDrugMedicineSub: any;
    listDrugMedicine: any;
    constructor(
        private store: Store<fromRoot.AppState>,
        
        private elementRef: ElementRef,
        private router: Router,
        private toastr: ToastrService,
        private activatedRoute: ActivatedRoute,
        private globalService: GlobalService,
        private patientModel: DataModel
    ) {        
        this.drugId = activatedRoute.params['value'].id;
        this.store.select(fromRoot.accountGetConfigJSON).subscribe((config) =>{
            if(config) {
                this.textLabel = config.TEXT_LABEL;
                this.fieldLabel = config.DRUG_MEDICINE;
            }      
            this.listDrugMedicineSub = this.store.select(fromRoot.getListDrugMedicine).subscribe((drugMedicines) => {
                if(drugMedicines){
                    this.listDrugMedicine = drugMedicines;
                    if(this.drugId != 0){
                        this.drug = _.find(drugMedicines, (drug) => {
                            return drug.id == this.drugId;
                        })
                    }
                }else{
                    this.globalService.loadList('patent');
                }  
            });    
        });
                          
    }
    ngOnDestroy() {
    }

    loadList(){
        this.globalService.loadList('drug');
    }

}
