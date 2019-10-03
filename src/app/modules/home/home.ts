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
        this.store.dispatch(new medicine.LoadPatentMedicine(0));
        this.store.dispatch(new medicine.LoadDrugMedicine(0));
        this.store.dispatch(new medicine.LoadTypeMedicine(0));
        this.store.dispatch(new medicine.LoadBehaviourMedicine(0));
        this.store.dispatch(new medicine.LoadUnitMedicine(0));
    }
    ngOnInit(){
        
    }
}
