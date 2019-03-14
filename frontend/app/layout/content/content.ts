import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../store/index';
import * as home from '../../store/home/home.actions';
import * as auth from '../../store/auth/auth.actions';
import { ToastrService } from 'ngx-toastr';
@Component({
    selector: 'app-content',
    templateUrl: './content.html',
    styleUrls: ['./content.less']
})
export class AppContent {
    isLoginPage: boolean = false;
    isLoginSub: any;
    constructor(private router: Router, private store: Store<fromRoot.AppState>,private toastr: ToastrService) {
        const employeeInfo = JSON.parse(localStorage.getItem('employeeInfo'));
        console.log(employeeInfo);
        if(!employeeInfo){
            if(!window.location.pathname.includes('login')){
                this.router.navigate(['login']);
            }
            this.isLoginPage = true; 
        }else{
            this.store.dispatch(new auth.LoadAccountById(employeeInfo.id));
            if(window.location.pathname.includes('login')){
                this.router.navigate(['benh-nhan']);
            }
            this.isLoginPage = false;
            
        }

        this.isLoginSub = this.store.select(fromRoot.authGetLoggedInState).subscribe((isLogin) => {
            if(isLogin){
                this.isLoginPage = false;
            }else{
                this.isLoginPage = true;
            }
        });
    }
  
    ngOnDestroy() {
        this.isLoginSub.unsubscribe();
    }

}
