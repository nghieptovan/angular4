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
                private activatedRoute: ActivatedRoute) {
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

        if(form.valid){
            this.usernameMessage = '';
            this.passwordMessage = '';
            this.fullnameMessage = '';
            this.roleMessage = '';

            const data = {
                username: value.username,
                password: value.password,
                fullname: value.fullname,
                role_id: this.roleId,
                image: '',
                stringlogin: ''
            }
            this.store.dispatch(new account.Register(data));
        }else{
            if(!value.username)
                this.usernameMessage = AppConstants.MESSAGE_USERNAME;
            if(!value.password)
                this.passwordMessage = AppConstants.MESSAGE_PASSWORD;
            if(!value.fullname)
                this.fullnameMessage = AppConstants.MESSAGE_FULLNAME;
            if(!value.role)
                this.roleMessage = AppConstants.MESSAGE_ROLE;
            
        }
    }
    openDatePicker(id) {
        const self = this;
        $(id).DatePicker();
    }

    



    ngOnDestroy() {
      
    }



}
