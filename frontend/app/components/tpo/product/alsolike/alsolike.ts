import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../../store';
import * as tpo from '../../../../store/tpo/tpo.actions';
import {accountGetLpointHistory} from "../../../../store/index";

@Component({
    selector: 'app-tpo-product-alsolike',
    templateUrl: './alsolike.html',
    styleUrls: ['./alsolike.less']
})
export class TpoProductAlsolikeComponent {
    tpoDetailSub: any;
    related_hashtags: any;

    constructor(private store: Store<fromRoot.AppState>, private activatedRoute: ActivatedRoute,
        private router: Router
    ) {
        this.tpoDetailSub = this.store.select(fromRoot.tpoGroupGetTpoDetail).subscribe(state => {
            this.related_hashtags = state.related_hashtags;
        });

    }

    ngOnDestroy() {
        this.tpoDetailSub.unsubscribe();
    }

    gotoTpoDetail(tpoItem) {
        window.location.href = '/xu-huong/chi-tiet/' + tpoItem.slug;
    }
}
