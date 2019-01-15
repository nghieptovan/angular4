import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';

import * as fromRoot from '../../../../store';
import * as account from '../../../../store/account/account.actions';

// Redux
@Component({
    selector: 'app-account-detail-comment',
    templateUrl: './detail.html',
    styleUrls: ['./detail.less']
})
export class LotteAccountDetailComment {
    detailCommentSub: any;
    detailComment: any;
    constructor(private store: Store<fromRoot.AppState>, private activatedRoute: ActivatedRoute) {
        this.store.dispatch(new account.LoadDetailComment({ 'id': this.activatedRoute.params['value'].id, 'customer_id': this.activatedRoute.params['value'].customer_id }));
        this.detailCommentSub = this.store.select(fromRoot.accountGetDetailComment)
            .subscribe((results) => {
                if (results.review_id && !_.isEmpty(results)) {
                    this.detailComment = results;
                }
            });
    }

    ngOnDestroy() {
        this.detailCommentSub.unsubscribe();
    }
}
