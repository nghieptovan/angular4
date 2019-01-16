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
    usernameMessage: string = '';
    passwordMessage: string = '';
    dispatcherSub: any;
    authGetLoadingState: boolean = false;
    constructor(private store: Store<fromRoot.AppState>, private globalService: GlobalService, private router: Router, private cookieService: CookieService,
        dispatcher: Dispatcher) {
        
        const employeeInfo = JSON.parse(localStorage.getItem('employeeInfo'));
            console.log('lfkjsdfjdsf');
            

        // this.dispatcherSub = dispatcher.subscribe((action) => {
        //     switch (action.type) {
        //         case auth.LOGIN_SUCCESS:
        //             this.router.navigate(['dashboard']);
        //             break;
        //     }
        // });
        
        // this.authGetLoadingStateSub = this.store.select(fromRoot.authGetLoadingState).subscribe((loading) => {
        //     this.authGetLoadingState = loading;
        // });
        this.store.dispatch(new account.ListAccount());
        
    }
    
    ngOnDestroy() {
        // this.authGetLoadingStateSub.unsubscribe();
        // this.dispatcherSub.unsubscribe();
    }

    login(form) {
        const value = form.value;
        if(form.valid){
            this.usernameMessage = '';
            this.passwordMessage = '';
            const data = {
                username: value.username,
                password: value.password,
            }
            this.store.dispatch(new auth.Login(data));
        }else{
            if(!value.username)
                this.usernameMessage = AppConstants.MESSAGE_USERNAME;
            if(!value.password)
                this.passwordMessage = AppConstants.MESSAGE_PASSWORD;
            
        }
        
    }
}
