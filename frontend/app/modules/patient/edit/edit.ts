import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Dispatcher, Store } from '@ngrx/store';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';

import { AppConstants } from '../../../app.constant';
import * as fromRoot from '../../../store';
import * as account from '../../../store/account/account.actions';
import * as patient from '../../../store/patient/patient.actions';
import { DataModel } from '../../../store/data';

declare var $;

// Redux
@Component({
    selector: 'edit-patient',
    templateUrl: './edit.html',
    styleUrls: ['./edit.less']
})
export class EditPatient {
    @Input() uid: any;
    @ViewChild('updateForm') updateForm: NgForm;
    @Output('validationChange') validationChange = new EventEmitter<Boolean>();
  
    pageLoading: boolean = false;
    dispatcherSub: any;
    createAccountSub: any;
    getListPatientSub: any;
    patientGetLoadingState: any;
    roleSet: any;
    usernameMessage: any;
    passwordMessage: any;
    roleMessage: any;
    weightMessage: any;
    diagnosisMessage: any;
    fullnameMessage: any;
    birthdayMessage: any;
    addressMessage: any;
    phoneMessage: any;
    roleId: any;
    showRole: boolean = false;
    patients: any;
    patient: any;
    errorMessage: any;
    sexssss: any = true;
    birthdaySet: any = '';
    constructor(private store: Store<fromRoot.AppState>,
                private dispatcher: Dispatcher,
                private elementRef: ElementRef,
                private router: Router,
                private toastr: ToastrService,
                private activatedRoute: ActivatedRoute,
                private patientModel: DataModel) {
        this.getListPatientSub = this.store.select(fromRoot.patientGetListPatient).subscribe((patients) => {
            if(!patients){
                this.router.navigateByUrl('benh-nhan');
            }else{
                if(patients && patients.code == 200){
                    const patientId = this.activatedRoute.params['value'].id;
                    let findData = _.find(patients.data, function(o) { return o.id == patientId; });
                    if (findData.id) {
                        this.patient = patientModel.getPatientObject(findData);
                        if(this.patient.sex == 1){
                            this.patient.sex = false;
                        }else{
                            this.patient.sex = true;
                        }
                        this.birthdaySet = this.patient.birthday;
                    }else{
                        this.patient = patientModel.getPatientObject(); 
                    }
                }
            }
        });
        this.patientGetLoadingState = this.store.select(fromRoot.patientGetLoadingState).subscribe((loading) => {
            if(loading){
                this.toastr.success('Cập nhật thông tin bệnh nhân thành công');
            }
        });
        
    }

   
    register(form){
        let { value } = form;
        const employeeInfo = JSON.parse(localStorage.getItem('employeeInfo'));
        if(form.valid){
            this.fullnameMessage = '';
            this.phoneMessage = '';
            this.addressMessage = '';
            this.weightMessage = '';
            this.birthdayMessage = '';
            this.diagnosisMessage = '';

            const data = {
                id: this.patient.id,
                name: value.name,
                phone: value.phone,
                address: value.address,
                weight: value.weight,
                birthday: this.birthdaySet,
                diagnosis: value.diagnosis,
                sex: value.sex ? 2 : 1,
                status_id: this.patient.status_id,
                employee_id: employeeInfo.id
            }
            this.store.dispatch(new patient.UpdatePatient(data));
            
        }else{          
            if(!value.name)
                this.fullnameMessage = AppConstants.MESSAGE_FULLNAME;
            if(!value.phone)
                this.phoneMessage = AppConstants.MESSAGE_PHONENUMBER;
            if(!value.address)
                this.addressMessage = AppConstants.MESSAGE_ADDRESS;
            if(!value.weight)
                this.weightMessage = AppConstants.MESSAGE_WEIGHT;
            if(!value.birthday)
                this.birthdayMessage = AppConstants.MESSAGE_BIRTHDAY;
            if(!value.diagnosis)
                this.diagnosisMessage = AppConstants.MESSAGE_DIAGNOSIS;
        }
    }
    openDatePicker(id) {
        const self = this;
        const birthdatePicker = $(id).datepicker({
            prevText: 'Previous', prevStatus: '',
            prevJumpText: 'Previous', prevJumpStatus: '',
            nextText: 'Next', nextStatus: '',
            nextJumpText: 'Next', nextJumpStatus: '',
            monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            showMonthAfterYear: true,
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true,
            showOn: 'button',
            buttonImageOnly: true,
            buttonText: '',
            showButtonPanel: true,
            yearRange: '-100:+0',
            onSelect: function (dateText, inst) {                
                self.birthdaySet = dateText;
            }
        });
        birthdatePicker.datepicker('show');
    }

    ngOnDestroy() {
      this.getListPatientSub.unsubscribe();
      this.patientGetLoadingState.unsubscribe();
    }



}
