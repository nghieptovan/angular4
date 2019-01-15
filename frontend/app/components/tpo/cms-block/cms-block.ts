import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../store';
import * as tpo from '../../../store/tpo/tpo.actions';

@Component({
    selector: 'app-tpo-cms-block',
    templateUrl: './cms-block.html',
    styleUrls: ['./cms-block.less']
})
export class TpoCmsBlockComponent {
    cmsBlocks: any;

    cmsBlockSub: any;
    constructor(private store: Store<fromRoot.AppState>, private activatedRoute: ActivatedRoute) {
        this.cmsBlockSub = this.store.select(fromRoot.tpoCmsBlockGetContent).subscribe(state => {
            this.cmsBlocks = state;
        });

        this.store.dispatch(new tpo.LoadBlock(null));
    }

    ngOnDestroy() {
        this.cmsBlockSub.unsubscribe();
    }

    loadBlockConent(blockId) {
        const actionPayload = {
            key: blockId
        };
        this.store.dispatch(new tpo.LoadBlock(actionPayload));
    }
}
