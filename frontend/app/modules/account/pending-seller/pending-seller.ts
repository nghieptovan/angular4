import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../store';
import * as account from '../../../store/account/account.actions';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';

// Redux
@Component({
    selector: 'app-account-pending-seller',
    templateUrl: './pending-seller.html',
    styleUrls: ['./pending-seller.less']
})
export class LotteAccountPendingSeller {
    ratingSub: any;
    ratings: any;
    totals: Number;
    isLoading$: Observable<any>;
    dataRating: any;
    // Map rate option_id with rating value
    ratingOptions = [41, 42, 43, 44, 45];
    lpointBanner: any;

    cmsContentsSub: any;
    constructor(private store: Store<fromRoot.AppState>) {
        this.ratingSub = this.store.select(fromRoot.accountGetRatingSellerPending)
            .subscribe((response) => {
                if (!_.isEmpty(response.shipments)) {
                    this.totals = response.shipments.length;
                    this.ratings = response.shipments;
                }
            });

        this.cmsContentsSub = this.store.select(fromRoot.commonGetCmsContents)
            .subscribe((cmsContent) => {
                this.lpointBanner = _.find(cmsContent, (cms: any) => {
                    return cms.identifier === 'tpo_account_banner';
                });
            });
        this.isLoading$ = this.store.select(fromRoot.accountGetLoadingState);
        this.store.dispatch(new account.LoadRatingPending());
    }

    ngAfterViewInit() {
        this._initRating();
    }

    private _initRating() {
        this.dataRating = {
            'data': {
                'id': '',
                'rel_id': '',
                'nickname': '',
                'title': '',
                'detail': '',
                'rating_id': '',
                'option_id': '',
                'validate_rating': ''
            }
        };
    }

    ngOnDestroy() {
        this.ratingSub.unsubscribe();
        this.cmsContentsSub.unsubscribe();
    }

    submitRating(form, key) {
        this._initRating();
        const rating = this.ratings[key];
        const data = form.value;
        const dataSubmit = this.dataRating.data;
        dataSubmit.id = rating.id;
        dataSubmit.rel_id = rating.rel_id;
        dataSubmit.nickname = data.nickname;
        dataSubmit.title = data.title;
        dataSubmit.detail = data.detail;
        dataSubmit.rating_id = rating.aggregate_ratings[0].rating_id;
        dataSubmit.option_id = this.ratingOptions[this.ratings[key].aggregate_ratings[0].options - 1];
        dataSubmit.validate_rating = '';
        this.store.dispatch(new account.SubmitRating(this.dataRating));
    }
}
