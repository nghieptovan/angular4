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
    selector: 'edit-unit',
    templateUrl: './edit.html',
    styleUrls: ['./edit.less']
})
export class EditUnit {
    minLenght: any;
    fieldLabel: any;
    unitId: any = 0;
    textLabel: any;
    unit: any;
    listUnitMedicineSub: any;
    listUnitMedicine: any;
    constructor(
        private store: Store<fromRoot.AppState>,
        
        private elementRef: ElementRef,
        private router: Router,
        private toastr: ToastrService,
        private activatedRoute: ActivatedRoute,
        private globalService: GlobalService,
        private patientModel: DataModel
    ) {        
        this.unitId = activatedRoute.params['value'].id;
        this.store.select(fromRoot.accountGetConfigJSON).subscribe((config) =>{
            if(config) {
                this.textLabel = config.TEXT_LABEL;
                this.fieldLabel = config.DRUG_MEDICINE;
            }      
            this.listUnitMedicineSub = this.store.select(fromRoot.getListUnitMedicine).subscribe((unitMedicines) => {
                if(unitMedicines){
                    this.listUnitMedicine = unitMedicines;
                    if(this.unitId != 0){
                        this.unit = _.find(unitMedicines, (unit) => {
                            return unit.id == this.unitId;
                        })
                    }
                }else{
                    this.globalService.loadList('unit');
                }  
            });    
        });
                          
    }
    ngOnDestroy() {
        this.listUnitMedicineSub.unsubscribe();
    }
    loadList(){
        this.globalService.loadList('unit');
    }

}
