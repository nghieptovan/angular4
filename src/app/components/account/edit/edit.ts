import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';

import { AppConstants } from '../../../app.constant';
import * as fromRoot from '../../../store';
import * as account from '../../../store/account/account.actions';
import {formvalidation } from '../../../../assets/js/form-validation';

declare var $;

// Redux
@Component({
    selector: 'edit-accountnew',
    templateUrl: './edit.html',
    styleUrls: ['./edit.less']
})
export class EditAccountNew{
    @Input() uid: any;
    @ViewChild('updateForm') updateForm: NgForm;
    @Output('validationChange') validationChange = new EventEmitter<Boolean>();
    getListAccountSub: any;
    getUpdateAccountSub: any;
    accountGetLoadingState: any;
    accountIsLoading:boolean = false;
    account: any;
    roleSet: any;
    showRole: boolean = false;
    roleId: any;
    usernameMessage: any;
    passwordMessage: any;
    roleMessage: any;
    fullnameMessage: any;
    isLoaded: boolean = false;
    appConstants: any;
    minLenght: any;
    textLabel: any;
    fieldLabel: any;
    loadJsonConfigSub: any;
    constructor(private store: Store<fromRoot.AppState>,
                
                private elementRef: ElementRef,
                private router: Router,
                private toastr: ToastrService,
                private activatedRoute: ActivatedRoute) {
        this.appConstants = AppConstants;
        this.accountGetLoadingState = this.store.select(fromRoot.accountGetLoadingState).subscribe((loading) => {
        });
                    
        this.getListAccountSub = this.store.select(fromRoot.accountGetAccountInfo).subscribe((info) => {
            if(!info){
                this.router.navigateByUrl('tai-khoan');
            }else{
                if(info && info.code == 200){
                    const userId = this.activatedRoute.params['value'].id;
                    this.account = _.find(info.data, function(o) { return o.id == userId; });
                    formvalidation();
                }
            }
            
        });
        this.getUpdateAccountSub = this.store.select(fromRoot.accountGetUpdateAccount).subscribe((account) => {
                if(account && account.code == 200 && this.isLoaded){
                    this.toastr.success(account.message);
                    this.router.navigateByUrl('tai-khoan');
                }
        });

        this.loadJsonConfigSub = this.store.select(fromRoot.accountGetConfigJSON).subscribe((config) =>{
            if(config) {
                this.minLenght = config.MIN_LENGTH_6;
                this.textLabel = config.TEXT_LABEL;
                this.fieldLabel = config.EMPLOYEE_LABEL;
            }            
        });

       
    }
    ngOnDestroy() {
        this.getListAccountSub.unsubscribe();
        this.loadJsonConfigSub.unsubscribe();
        this.getUpdateAccountSub.unsubscribe();
        this.accountGetLoadingState.unsubscribe();
    }
    backToList(){
        this.router.navigateByUrl('tai-khoan');
    }
    setRole(status){
        if(status == 1)
            this.showRole = true;
        if(status == 2)
            this.showRole = false;
    }

    selectRole(value){
        console.log(value);
        
        $('.role-name').val(value).change();
        // $(".role-name > option[value=" + value + "]").prop("selected",true);
        // this.roleSet = value;
        // switch (value) {
        //     case 'admin':
        //         this.roleId = 1;
        //         break;
        //     case 'Tiếp tân':
        //         this.roleId = 2;
        //         break;
        //     case 'Bác sỹ':
        //         this.roleId = 3;
        //         break;
        //     case 'Phát thuốc':
        //         this.roleId = 4;
        //         break;        
        //     default:
        //         break;
        // }
        // this.showRole = false;
        
    }
    update(form){
        const { value } = form;
        if(form.valid){
            const data = {
                username: value.username,
                password: value.password,
                fullname: value.fullname,
                role_id: value.role_id,
                image: '',
                stringlogin: '',
                id: this.account.id
            }
            this.isLoaded = true;
            this.store.dispatch(new account.UpdateInfo(data));
            // console.log(data);
        }
        // }else{
        //     if(!value.username)
        //         this.usernameMessage = AppConstants.MESSAGE_USERNAME;
        //     if(!value.password)
        //         this.passwordMessage = AppConstants.MESSAGE_PASSWORD;
        //     if(!value.fullname)
        //         this.fullnameMessage = AppConstants.MESSAGE_FULLNAME;
        //     if(!value.role)
        //         this.roleMessage = AppConstants.MESSAGE_ROLE;
            
        // }
    }


   

}
