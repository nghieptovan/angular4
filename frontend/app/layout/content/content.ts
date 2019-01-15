import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../store/index';
import * as home from '../../store/home/home.actions';
@Component({
    selector: 'app-content',
    templateUrl: './content.html',
    styleUrls: ['./content.less']
})
export class AppContent {
    constructor(private router: Router, private store: Store<fromRoot.AppState>) {
        
    }
}
