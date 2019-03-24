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
import { PatientModel } from '../../../store/patient/patient.model';

declare var $;

// Redux
@Component({
    selector: 'add-patient',
    templateUrl: './add.html',
    styleUrls: ['./add.less']
})
export class AddPatient {
    @Input() uid: any;
    @ViewChild('updateForm') updateForm: NgForm;
    @Output('validationChange') validationChange = new EventEmitter<Boolean>();
    customers: any = {};
    

    dispatcherSub: any;
    createAccountSub: any;
    roleSet: any;
    usernameMessage: any;
    passwordMessage: any;
    roleMessage: any;
    fullnameMessage: any;
    roleId: any;
    showRole: boolean = false;
    constructor(private store: Store<fromRoot.AppState>,
                private dispatcher: Dispatcher,
                private elementRef: ElementRef,
                private router: Router,
                private toastr: ToastrService,
                private activatedRoute: ActivatedRoute,
                private patientModel: PatientModel) {
                    
        let object = patientModel.getPatientObject();
        console.log(object);
        
        this.createAccountSub = this.store.select(fromRoot.accountGetCreateAccount).subscribe((account) => {
            if(account){
                if(account.code == 200){
                    this.customers = account.data
                  setTimeout(() => {
                    this.router.navigateByUrl('tai-khoan');
                  }, 1500, this.toastr.success(account.message));
                    
                    
                }
                if(account.code == 201){
                    this.toastr.error(account.message);
                }
            }
        });
      
    }

    setRole(status){
        if(status == 1)
            this.showRole = true;
        if(status == 2)
            this.showRole = false;
    }

    selectRole(value){
        this.roleSet = value;
        switch (value) {
            case 'Admin':
                this.roleId = 1;
                break;
            case 'Tiếp tân':
                this.roleId = 2;
                break;
            case 'Bác sỹ':
                this.roleId = 3;
                break;
            case 'Phát thuốc':
                this.roleId = 4;
                break;        
            default:
                break;
        }
        this.showRole = false;
        
    }
    register(form){
        const { value } = form;
console.log(value);

        // if(form.valid){
        //     this.usernameMessage = '';
        //     this.passwordMessage = '';
        //     this.fullnameMessage = '';
        //     this.roleMessage = '';

        //     const data = {
        //         username: value.username,
        //         password: value.password,
        //         fullname: value.fullname,
        //         role_id: this.roleId,
        //         image: '',
        //         stringlogin: ''
        //     }
        //     this.store.dispatch(new account.Register(data));
        // }else{
        //     if(!value.username)
        //         this.usernameMessage = AppConstants.MESSAGE_USERNAME;
        //     if(!value.password)
        //         this.passwordMessage = AppConstants.MESSAGE_PASSWORD;
        //     if(!value.fullname)
        //         this.fullnameMessage = AppConstants.MESSAGE_FULLNAME;
        //     if(!value.role)
        //         this.roleMessage = AppConstants.MESSAGE_ROLE;
            

        //         // $patient = new Patient;

        //         // $patient->code = 'BN'.date("Ymdhis");
        //         // $patient->name = $request->input('name');
        //         // $patient->sex = $request->input('sex');
        //         // $patient->weight = $request->input('weight');
        //         // $patient->birthday = $request->input('birthday');
        //         // $patient->address = $request->input('address');
        //         // $patient->phone = $request->input('phone');
        //         // $patient->diagnosis = $request->input('diagnosis');
        //         // $patient->employee_id = $request->input('employee_id');
        //         // $patient->status_id = 1;
        // }
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
            // dateFormat: 'dd/mm/yy',
            dateFormat: 'd-m-yy',
            changeMonth: true,
            changeYear: true,
            showOn: 'button',
            buttonImageOnly: true,
            buttonText: '',
            showButtonPanel: true,
            yearRange: '-100:+0',
            onSelect: function (dateText, inst) {console.log(dateText);
            
            }
        });
        birthdatePicker.datepicker('show');
    }

    



    ngOnDestroy() {
      
    }



}
