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
import { DataModel } from '../../../store/data';
import { GlobalService } from '../../../services/global.service';
import {formvalidation } from '../../../../assets/js/form-validation';
declare var $;

// Redux
@Component({
    selector: 'edit-diagnosis',
    templateUrl: './edit.html',
    styleUrls: ['./edit.less']
})
export class EditDiagnosis {
    minLenght: any;
    fieldLabel: any;
    diagnosisId: any = 0;
    textLabel: any;
    diagnosis: any;
    listDiagnosisSub: any;
    listDiagnosis: any;
    constructor(
        private store: Store<fromRoot.AppState>,
        
        private elementRef: ElementRef,
        private router: Router,
        private toastr: ToastrService,
        private activatedRoute: ActivatedRoute,
        private globalService: GlobalService,
        private patientModel: DataModel
    ) {        
        this.diagnosisId = activatedRoute.params['value'].id;
        this.store.select(fromRoot.accountGetConfigJSON).subscribe((config) =>{
            if(config) {
                this.textLabel = config.TEXT_LABEL;
                this.fieldLabel = config.DIAGNOSIS;
            }      
            this.listDiagnosisSub = this.store.select(fromRoot.getListDiagnosis).subscribe((listDiagnosis) => {
                if(listDiagnosis){
                    this.listDiagnosis = listDiagnosis;
                    if(this.diagnosisId != 0){
                        this.diagnosis = _.find(listDiagnosis, (diagnosis) => {
                            return diagnosis.id == this.diagnosisId;
                        })
                    }
                }else{
                    this.globalService.loadList('diagnosis');
                }  
            });    
        });
                          
    }
    ngOnDestroy() {
    }
    loadList(){
        this.globalService.loadList('diagnosis');
    }

}
