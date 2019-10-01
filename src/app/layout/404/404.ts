import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../store';
import * as common from '../../store/common/common.actions';

declare var $;

@Component({
    selector: 'app-notfound',
    templateUrl: './404.html',
    styleUrls: ['./404.less']
})
export class AppNotFound {

    content: any;
    contentHeading: any;

    common404PageSub: any;
    constructor(private store: Store<fromRoot.AppState>, private domSanitizer: DomSanitizer) {
        // this.store.dispatch(new common.Load404Page());
        
    }

 
}
