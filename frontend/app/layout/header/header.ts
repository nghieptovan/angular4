import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Dispatcher, Store } from '@ngrx/store';
import * as _ from 'lodash';
import { DialogService } from 'ng2-bootstrap-modal';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs/Observable';
import { DomSanitizer } from '@angular/platform-browser';

import { AppConstants } from '../../app.constant';
import { LoginModal } from '../../modals/login/login';
import { GlobalService } from '../../services/global.service';
import * as fromRoot from '../../store';
import * as auth from '../../store/auth/auth.actions';
import * as categories from '../../store/categories/categories.actions';
import * as checkout from '../../store/checkout/checkout.actions';
import * as account from '../../store/account/account.actions';
import { timeout } from 'rxjs/operator/timeout';

declare var $;

@Component({
    selector: 'app-header',
    templateUrl: './header.html'
})

export class AppHeader {
    
    constructor(private store: Store<fromRoot.AppState>, private router: Router,
        private domSanitizer: DomSanitizer,
        private dispatcher: Dispatcher, private dialogService: DialogService,
        private globalService: GlobalService, private cookieService: CookieService) {
        // const employeeInfo = JSON.parse(localStorage.getItem('employeeInfo'));
        // if(!employeeInfo){
        //     window.location.assign('/login');
        // }
        
    }
    signOut() {
        localStorage.removeItem('employeeInfo');
        window.location.assign('/login');
        // this.router.navigate[('login')];
    }
    ngAfterViewInit(){
        
    }
}
