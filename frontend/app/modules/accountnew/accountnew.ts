import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';


import { GlobalService } from '../../services/global.service';
import * as fromRoot from '../../store';
import * as account from '../../store/account/account.actions';

import * as auth from '../../store/auth/auth.actions';
import { Observable } from 'rxjs/Observable';
import {Router} from "@angular/router";
import { AppConstants } from '../../app.constant';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';

import { chatjs } from '../../../assets/js/chat'; 
import { datatablessources } from '../../../assets/js/data-tables/datatables-sources'; 
import { modaljs } from '../../../assets/js/components-modal.min'; 

declare var $;

@Component({
    selector: 'accountnew',
    templateUrl: './accountnew.html',
    // template: '',
    styleUrls: ['./accountnew.less']
})

export class AccountNew {
    static isViewLoaded: any;
    accountGetLoadingState: any;
    getListAccountSub: any;
    deleteAccountSub: any;

    accountIsLoading$:boolean = false;

    usernameMessage: string = '';
    passwordMessage: string = '';
    dispatcherSub: any;
    authGetLoadingState: boolean = false;
    listAccount: any;
    errorMessage: string = '';
    selectedId: any;
    textLabel: any;
    constructor(private store: Store<fromRoot.AppState>, private globalService: GlobalService, private router: Router, private cookieService: CookieService, private toastr: ToastrService,) {
        
        const employeeInfo = JSON.parse(localStorage.getItem('employeeInfo'));
        this.accountGetLoadingState = this.store.select(fromRoot.accountGetLoadingState).subscribe((loading) => {
            this.accountIsLoading$ = loading;
        });
        
        this.getListAccountSub = this.store.select(fromRoot.accountGetAccountInfo).subscribe((info) => {
            if(!info){
                this.store.dispatch(new account.ListAccount());
            }else{
                if(info.code == 200){
                    this.listAccount = info.data;
                    datatablessources();
                    modaljs();
                }else{
                    this.errorMessage = info.message;
                }
            }
        });
        this.deleteAccountSub = this.store.select(fromRoot.accountGetDeleteAccount).subscribe((account) => {
            if(account){
                if(account.code == 200){
                    this.toastr.show(account.message);
                    this.listAccount  = _.filter(this.listAccount, (item) => { return item.id != this.selectedId; });
                    this.selectedId = null;
                    this.toastr.success(account.message);
                }else{
                    this.toastr.error(account.message);
                    this.errorMessage = account.message;
                }
            }
        });

        this.store.select(fromRoot.accountGetConfigJSON).subscribe((config) =>{
            if(config) {
                this.textLabel = config.TEXT_LABEL;
            }            
        });
        
        
    }
    
    ngOnDestroy() {
        this.getListAccountSub.unsubscribe();
        this.deleteAccountSub.unsubscribe();
        this.accountGetLoadingState.unsubscribe();
    }

    deleteAccount(id){
        this.selectedId = id;
        this.store.dispatch(new account.DeleteAccount(id));
    }
}
