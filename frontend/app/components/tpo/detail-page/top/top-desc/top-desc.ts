import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../../../store';

@Component({
    selector: 'app-tpo-top-desc',
    templateUrl: './top-desc.html',
    styleUrls: ['./top-desc.less']
})
export class TpoTopDescComponent {

    tpoDeail: any;
    isReadMore: boolean;

    constructor(private store: Store<fromRoot.AppState>, private activatedRoute: ActivatedRoute) {
        this.store.select(fromRoot.tpoGroupGetTpoDetail).subscribe(state => {
            this.tpoDeail = state;
        });
    }

    readMore() {
        this.isReadMore = !this.isReadMore;
    }

}
