import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../store';
import * as account from '../../../store/account/account.actions';
import * as _ from 'lodash';

// Redux
@Component({
    selector: 'app-account-myseller-rating',
    templateUrl: './myseller-rating.html',
    styleUrls: ['./myseller-rating.less']
})
export class LotteAccountMySellerRating {
    ratings: any;
    totals: Number;
    lpointBanner: any;

    sellerRatingSub: any;
    cmsContentsSub: any;
    constructor(private store: Store<fromRoot.AppState>) {
        this.store.dispatch(new account.LoadRatedSeller());
        this.sellerRatingSub = this.store.select(fromRoot.accountGetRatedSeller)
            .subscribe((response) => {
                if (!_.isEmpty(response)) {
                    this.totals = response.vendor_count;
                    this.ratings = response.reviews;
                }
            });

        this.cmsContentsSub = this.store.select(fromRoot.commonGetCmsContents)
            .subscribe((cmsContent) => {
                this.lpointBanner = _.find(cmsContent, (cms: any) => {
                    return cms.identifier === 'tpo_account_banner';
                });
            });
    }

    ngOnDestroy() {
        this.cmsContentsSub.unsubscribe();
        this.sellerRatingSub.unsubscribe();
    }
}
