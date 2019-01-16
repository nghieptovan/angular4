import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import { CookieService } from 'ngx-cookie-service';

import * as common from '../../store/common/common.actions';
import * as fromRoot from '../../store/index';
import { AppConstants } from './../../app.constant';
import { Router } from '@angular/router';
import { GlobalService } from '../../services/global.service';

declare var $: any;
@Component({
    selector: 'app-footer',
    templateUrl: './footer.html',
    styleUrls: ['./footer.less']
})
export class AppFooter {
    constructor(private store: Store<fromRoot.AppState>, private router: Router, private domSanitizer: DomSanitizer, private http: Http,
        private cookieService: CookieService, private globalService: GlobalService) {
        
    }

}
