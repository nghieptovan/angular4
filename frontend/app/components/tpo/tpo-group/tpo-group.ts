import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../store';
import * as tpo from '../../../store/tpo/tpo.actions';

@Component({
    selector: 'app-tpo-group',
    templateUrl: './tpo-group.html',
    styleUrls: ['./tpo-group.less']
})
export class TpoGroupComponent {
    tpoGroups: Array<any>;

    tpoGroupSub: any;
    constructor(private store: Store<fromRoot.AppState>, private activatedRoute: ActivatedRoute,
        private router: Router
    ) {
        this.tpoGroupSub = this.store.select(fromRoot.tpoGroupGetGroups).subscribe(state => {
            this.tpoGroups = state;

        });

        this.loadTpoGroup();
    }

    ngOnDestroy() {
        this.tpoGroupSub.unsubscribe();
    }

    loadTpoGroup() {
        this.store.dispatch(new tpo.Load(null));
    }

    gotoTpoDetail(tpoItem) {
        window.location.href = '/xu-huong/chi-tiet/' + tpoItem.url_key;
    }
}
