import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Dispatcher, Store } from '@ngrx/store';
import * as _ from 'lodash';
import { DialogService } from 'ng2-bootstrap-modal';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs/Observable';
import { DomSanitizer } from '@angular/platform-browser';

import { AppConstants } from '../../app.constant';
import { GlobalService } from '../../services/global.service';
import * as fromRoot from '../../store';
import * as auth from '../../store/auth/auth.actions';
import * as account from '../../store/account/account.actions';
import { timeout } from 'rxjs/operator/timeout';

declare var $;

@Component({
    selector: 'app-header',
    templateUrl: './header.html'
})

export class AppHeader {

    userInfoSub: any;
    userInfo: any;

    constructor(private store: Store<fromRoot.AppState>, private router: Router,
        private domSanitizer: DomSanitizer,
        private dispatcher: Dispatcher, private dialogService: DialogService,
        private globalService: GlobalService, private cookieService: CookieService) {

        this.store.select(fromRoot.getLoggedIn).subscribe((getLoggedIn) => {
            if(getLoggedIn == 3){
                this.router.navigate(['login']); 
            }            
        });
    }
    signOut() {
        this.store.dispatch(new auth.Logout());     
    }
}
