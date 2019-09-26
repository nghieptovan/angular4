import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Dispatcher, Store } from '@ngrx/store';
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
    selector: 'edit-update-patient',
    templateUrl: './form.html',
    styleUrls: ['./form.less']
})
export class EditUpdatePatient implements OnInit {

    @Input() uid: any;
    @ViewChild('updateForm') updateForm: NgForm;
    @Output('validationChange') validationChange = new EventEmitter<Boolean>();
    @Input() isEdit: boolean;
    pageLoading: boolean = false;
    dispatcherSub: any;
    updatePatientSub: any;
    loadPatientSub: any;

    patients: any;
    patient$: any = null;
    birthdaySet: any = '';
    minLenght: any;
    loadJsonConfigSub: any;
    isSameId: boolean = true;
    isUpdatePatient: boolean = false;
    
    constructor(private store: Store<fromRoot.AppState>,
        private dispatcher: Dispatcher,
        private elementRef: ElementRef,
        private router: Router,
        private toastr: ToastrService,
        private activatedRoute: ActivatedRoute,
        private globalService: GlobalService,
        private patientModel: DataModel) {


        this.loadPatientSub = this.store.select(fromRoot.patientCurrentPatient).subscribe((patient) => {
            if(patient && patient.code == 200){
                console.log(patient);
                
                this.patient$ = patient.data;
                this.setBirthday();
            }
            console.log(this.patient$);
            
            // else{
            //     this.toastr.error('Không tìm thấy bệnh nhân');
            //     this.router.navigate(['benh-nhan']);
            // }
        });
        formvalidation();
        

        
        this.updatePatientSub = this.store.select(fromRoot.patientUpdatePatient).subscribe((patient) => {
            if(patient && this.isUpdatePatient){
                this.isUpdatePatient = false;
                this.toastr.success('Cập nhật thông tin bệnh nhân thành công');
                // this.router.navigate(['benh-nhan']);
            }
        });


    }
    ngOnInit() {
        let patientId = -1;
        if(this.isEdit){
            patientId = this.activatedRoute.params['value'].id;
        }
        console.log(this.isEdit, patientId);
        this.store.dispatch(new patient.LoadPatientById(patientId));       
        
    }
    setBirthday(){
        if(this.patient$.birthday){
            this.birthdaySet = this.patient$.birthday.substring(0,10);
        }

    }

    update(form){

    let { value } = form;
    const employeeInfo = JSON.parse(localStorage.getItem('employeeInfo'));
    if(form.valid){
        const data = {
            id: this.patient$.id  == 0 ? null : this.patient$.id,
            name: value.name,
            phone: value.phone,
            address: value.address,
            weight: value.weight,
            birthday: this.birthdaySet,
            diagnosis: value.diagnosis,
            sex: value.sex,
            status_id: this.patient$.status_id,
            employee_id: employeeInfo.id ? employeeInfo.id : 0
        }
        this.isUpdatePatient = true;
        this.store.dispatch(new patient.UpdatePatient(data));
    }
    }


    ngOnDestroy() {
    this.loadPatientSub.unsubscribe();
    this.updatePatientSub.unsubscribe();
    }

    selectDateTime(){
    $('.pickadate').pickadate({
        format: 'dd/mm/yyyy',
        formatSubmit: 'dd/mm/yyyy',
        selectMonths: true,
        selectYears: true,
        onSet: function(context) {
            moment.locale('vi');
            this.birthdaySet = moment.unix(context.select/1000).format("L");
        }
    });	
    }

}


