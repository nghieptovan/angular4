import { Component } from '@angular/core';
import { Store, Dispatcher } from '@ngrx/store';
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
declare var $;

@Component({
    selector: 'accountnew',
    templateUrl: './accountnew.html',
    // template: '',
    styleUrls: ['./accountnew.less']
})

export class AccountNew {
    static isViewLoaded: any;
    authGetLoadingStateSub: any;
    getListAccountSub: any;
    deleteAccountSub: any;

    // accountIsLoading$: Observable<any>;

    usernameMessage: string = '';
    passwordMessage: string = '';
    dispatcherSub: any;
    authGetLoadingState: boolean = false;
    listAccount: any;
    errorMessage: string = '';
    selectedId: any;
    constructor(private store: Store<fromRoot.AppState>, private globalService: GlobalService, private router: Router, private cookieService: CookieService,
        dispatcher: Dispatcher, private toastr: ToastrService,) {
        
        const employeeInfo = JSON.parse(localStorage.getItem('employeeInfo'));
            console.log('lfkjsdfjdsf');
            
        
        // this.authGetLoadingStateSub = this.store.select(fromRoot.authGetLoadingState).subscribe((loading) => {
        //     this.authGetLoadingState = loading;
        // });
        
        this.getListAccountSub = this.store.select(fromRoot.accountGetAccountInfo).subscribe((info) => {
            if(!info){
                this.store.dispatch(new account.ListAccount());
            }else{
                if(info.code == 200){
                    this.listAccount = info.data;
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
        
        
    }
    
    ngOnDestroy() {
        this.getListAccountSub.unsubscribe();
        this.deleteAccountSub.unsubscribe();
    }

    deleteAccount(id){
        this.selectedId = id;
        this.store.dispatch(new account.DeleteAccount(id));
    }
}
