import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../store/index';
import * as home from '../../store/home/home.actions';
import { ToastrService } from 'ngx-toastr';
@Component({
    selector: 'app-content',
    templateUrl: './content.html',
    styleUrls: ['./content.less']
})
export class AppContent {
    show$: boolean = false;
    loadingSub: any;
    constructor(private router: Router, private store: Store<fromRoot.AppState>,private toastr: ToastrService) {
    }
    ngAfterContentInit(){
        this.loadingSub = this.store.select(fromRoot.patientGetLoadingState).subscribe((loading) => {
            this.show$ = loading;            
        }); 
    }
    ngOnDestroy() {
        this.loadingSub.unsubscribe();
    }
}
