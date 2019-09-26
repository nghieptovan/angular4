import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Dispatcher, Store } from '@ngrx/store';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';
import { GlobalService } from '../../../services/global.service';
import { AppConstants } from '../../../app.constant';
import * as fromRoot from '../../../store';
import * as account from '../../../store/account/account.actions';
import {formvalidation } from '../../../../assets/js/form-validation';

import * as dataConfig from '../../../../assets/config/config.json';

declare var $;

// Redux
@Component({
    selector: 'add-accountnew',
    templateUrl: './add.html',
    styleUrls: ['./add.less']
})
export class AddAccountNew {
    @Input() uid: any;
    @ViewChild('updateForm') updateForm: NgForm;
    @Output('validationChange') validationChange = new EventEmitter<Boolean>();
    customers: any = {};
    

    dispatcherSub: any;
    createAccountSub: any;
    
    defaultRole: any = 3;
    showRole: boolean = false;
    minLenght: any;
    loadJsonConfigSub: any;
    isCreate: boolean = false;
    textLabel: any;
    constructor(private store: Store<fromRoot.AppState>,
                private dispatcher: Dispatcher,
                private elementRef: ElementRef,
                private router: Router,
                private toastr: ToastrService,
                private activatedRoute: ActivatedRoute,
                private globalService: GlobalService) {
        formvalidation();

        this.createAccountSub = this.store.select(fromRoot.accountGetCreateAccount).subscribe((account) => {
            if(account && this.isCreate){
                if(account.code == 200){
                    this.customers = account.data;
                    this.isCreate = false;
                  setTimeout(() => {
                    this.router.navigateByUrl('tai-khoan');
                  }, 1500, this.toastr.success(account.message)); 
                }
                if(account.code == 201){
                    this.toastr.error(account.message);
                }
            }
        });

        this.loadJsonConfigSub = this.store.select(fromRoot.accountGetConfigJSON).subscribe((config) =>{
            if(config) {
                this.minLenght = config.MIN_LENGTH_6;
                this.textLabel = config.TEXT_LABEL;
            }            
        });
      
    }

    backToList(){
        this.router.navigateByUrl('tai-khoan');
    }
    update(form){
        const { value } = form;
        if(form.valid){
            this.isCreate = true;
            const data = {
                username: value.username,
                password: value.password,
                fullname: value.fullname,
                role_id: value.role_id,
                image: '',
                stringlogin: ''
            };            
            this.store.dispatch(new account.Register(data));
        }
    }

    ngOnDestroy() {
        this.createAccountSub.unsubscribe();
        this.loadJsonConfigSub.unsubscribe();
    }



}
