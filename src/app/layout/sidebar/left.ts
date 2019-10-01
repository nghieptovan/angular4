import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { DialogService } from 'ng2-bootstrap-modal';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs/Observable';
import { DomSanitizer } from '@angular/platform-browser';

import { AppConstants } from '../../app.constant';
import { GlobalService } from '../../services/global.service';
import * as fromRoot from '../../store';
import * as auth from '../../store/auth/auth.actions';
@Component({
    selector: 'left-sidebar',
    templateUrl: './left.html'
})

export class LeftSidebar {
    userInfo: any;
    userInfoSub: any;
    hideMenu: boolean = true;
    isAdmin: boolean = false;
    constructor(private store: Store<fromRoot.AppState>, private router: Router,
        private domSanitizer: DomSanitizer,
         private dialogService: DialogService,
        private globalService: GlobalService, private cookieService: CookieService) {

        // this.userInfoSub = this.store.select(fromRoot.getLoginUser).subscribe( (user) => {
        //     if(user && user.role_id == 1){
        //         this.isAdmin = true;
        //     }else{
        //         this.isAdmin = false;
        //     }         
        // });
        
    }
    showmenu(){
        this.hideMenu = !this.hideMenu;     
    }
}
