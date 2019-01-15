import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { TpoConstants } from '../../../app.constant';
import * as fromRoot from '../../../store';

declare var $;

@Component({
    selector: 'app-dashboard-page',
    templateUrl: './dashboard-page.html',
    styleUrls: ['./dashboard-page.less']
})
export class LotteTpoDashboard implements OnInit {
    cmsBlocks: Array<any>;
    currentParams: any;
    blockIds: Array<any>;
    tpoGroupIds: Array<any>;
    componentType: number = TpoConstants.TPO_COMPONENT_TYPE_PRODUCTS.DASHBOARD;

    constructor(private store: Store<fromRoot.AppState>, private activatedRoute: ActivatedRoute) {
        this.activatedRoute.params.subscribe((params: any) => {
            if (this.currentParams !== params) {
                this.currentParams = params;
            }
        });

        $('body').addClass('cms-hashtag');
    }

    ngOnDestroy() {
        $('body').removeClass('cms-hashtag');
    }

    ngOnInit() {
    }
}
