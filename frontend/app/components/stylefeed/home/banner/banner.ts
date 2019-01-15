import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../../store';
import * as stylefeed from '../../../../store/stylefeed/stylefeed.actions';

@Component({
    selector: 'lt-stylefeed-banner-left',
    templateUrl: './banner.html'
})
export class SFHomeBannerComponent {
    homeBannerSub: any;
    homeBanner: any;
    constructor(private store: Store<fromRoot.AppState>, private activatedRoute: ActivatedRoute) {
        this.homeBannerSub = this.store.select(fromRoot.styleFeedGetAllPosts).subscribe(state => {
            this.homeBanner = state.banner_post;
            //console.log(this.homeBanner);
        });

        this.store.dispatch(new stylefeed.LoadBlock(null));
    }

    ngOnDestroy() {
        this.homeBannerSub.unsubscribe();
    }

}
