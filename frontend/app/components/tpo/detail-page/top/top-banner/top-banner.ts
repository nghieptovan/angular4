import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../../../store';

@Component({
    selector: 'app-tpo-top-banner',
    templateUrl: './top-banner.html',
    styleUrls: ['./top-banner.less']
})
export class TpoTopBannerComponent {

    tpoDeail: any;
    currentUrl: any;

    constructor(private store: Store<fromRoot.AppState>, private activatedRoute: ActivatedRoute) {
        this.store.select(fromRoot.tpoGroupGetTpoDetail).subscribe(state => {
            this.tpoDeail = state;
        });

        this.currentUrl = window.location.href;
    }
}
