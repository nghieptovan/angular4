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
declare var $;

// Redux
@Component({
    selector: 'edit-patient',
    templateUrl: './edit.html',
    styleUrls: ['./edit.less']
})
export class EditPatent {
    @Input() uid: any;
    @ViewChild('updateForm') updateForm: NgForm;
    @Output('validationChange') validationChange = new EventEmitter<Boolean>();
  
    pageLoading: boolean = false;
    dispatcherSub: any;
    updatePatientSub: any;
    loadPatientSub: any;

    patients: any;
    patient: any;
    birthdaySet: any = '';
    minLenght: any;
    textLabel: any;
    loadJsonConfigSub: any;
    isSameId: boolean = true;
    isUpdatePatient: boolean = false;
    constructor(
        private store: Store<fromRoot.AppState>,
        
        private elementRef: ElementRef,
        private router: Router,
        private toastr: ToastrService,
        private activatedRoute: ActivatedRoute,
        private globalService: GlobalService,
        private patientModel: DataModel
    ) {
        this.store.select(fromRoot.accountGetConfigJSON).subscribe((config) =>{
            if(config) {
                this.textLabel = config.TEXT_LABEL;
            }            
        });
        console.log('edit patient');
                    
    }
   

}
