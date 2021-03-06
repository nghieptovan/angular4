import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../store/index';
import * as auth from '../../store/auth/auth.actions';
import { ToastrService } from 'ngx-toastr';
@Component({
    selector: 'app-content',
    templateUrl: './content.html',
    styleUrls: ['./content.less']
})
export class AppContent {
    @Input() user: any;
    isLoginPage: boolean = false;
    isContentPage: boolean = false;
    isLoginSub: any;
    constructor(private router: Router, private store: Store<fromRoot.AppState>,private toastr: ToastrService) {
        this.isLoginSub = this.store.select(fromRoot.getLoggedIn).subscribe((getLoggedIn) => {
            if(getLoggedIn == 3){
                this.isLoginPage = true;
                this.router.navigate(['login']); 
            }            
        });
        console.log(this.isLoginPage);
        
    }
  
    ngOnInit() {
     
    }
    ngOnDestroy() {
        this.isLoginSub.unsubscribe();
    }

}
