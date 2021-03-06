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
    selector: 'edit-patent',
    templateUrl: './edit.html',
    styleUrls: ['./edit.less']
})
export class EditPatent {
    minLenght: any;
    fieldLabel: any;
    patentId: any = 0;
    textLabel: any;
    patent: any;
    listPatentMedicineSub: any;
    listPatentMedicine: any;
    constructor(
        private store: Store<fromRoot.AppState>,
        
        private elementRef: ElementRef,
        private router: Router,
        private toastr: ToastrService,
        private activatedRoute: ActivatedRoute,
        private globalService: GlobalService,
        private patientModel: DataModel
    ) {        
        this.patentId = activatedRoute.params['value'].id;
        this.store.select(fromRoot.accountGetConfigJSON).subscribe((config) =>{
            if(config) {
                this.textLabel = config.TEXT_LABEL;
                this.fieldLabel = config.PATENT_MEDICINE;
            }      
            this.listPatentMedicineSub = this.store.select(fromRoot.getListPatentMedicine).subscribe((patentMedicines) => {
                if(patentMedicines){
                    this.listPatentMedicine = patentMedicines;
                    if(this.patentId != 0){
                        this.patent = _.find(patentMedicines, (patent) => {
                            return patent.id == this.patentId;
                        })
                    }
                }else{
                    this.globalService.loadList('patent');
                }  
            });    
        });
                          
    }
    loadList(){
        this.globalService.loadList('patent');
    }
    ngOnDestroy() {
    }

}
