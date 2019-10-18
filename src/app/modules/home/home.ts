import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';

import { GlobalService } from '../../services/global.service';
import * as fromRoot from '../../store';
import { Observable } from 'rxjs/Observable';
import {Router} from "@angular/router";
import * as medicine from '../../store/medicine/medicine.actions';
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
        // this.globalService.loadList('patent');
        // this.globalService.loadList('drug');
        // this.globalService.loadList('type');
        // this.globalService.loadList('behaviour');
        // this.globalService.loadList('unit');
    }
    ngOnInit(){
        
    }
}
