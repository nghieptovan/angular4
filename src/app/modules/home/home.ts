import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';

import { GlobalService } from '../../services/global.service';
import * as fromRoot from '../../store';
import { Observable } from 'rxjs/Observable';
import {Router} from "@angular/router";

declare var $;

@Component({
    selector: 'app-home',
    templateUrl: './home.html',
    // template: '',
    styleUrls: ['./home.less']
})

export class LotteFashion {
    static isViewLoaded: any;
    isTopBanner$: Observable<any>;
    isLoading: boolean = false;
    constructor(private store: Store<fromRoot.AppState>, private globalService: GlobalService, private router: Router, private cookieService: CookieService) {
        // const employeeInfo = JSON.parse(localStorage.getItem('employeeInfo'));
        
        // if(employeeInfo && employeeInfo.username){
        //     console.log(employeeInfo);
        // }else{
        //     this.router.navigate(['login']);
        // }
    }
    ngOnInit(){
        
    }
}
