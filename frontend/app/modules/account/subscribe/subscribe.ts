import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import * as fromRoot from '../../../store/index';
import * as account from '../../../store/account/account.actions';

declare var $;

@Component({
    selector: 'app-account-subscribe',
    templateUrl: './subscribe.html',
    styleUrls: ['./subscribe.less']
})
export class LotteAccountSubscribe  implements OnInit, OnDestroy {
    lpointBanner: any;
    isSubscribed$: any;
    cmsContentsSub: any;
    constructor(private store: Store<fromRoot.AppState>) {
        this.isSubscribed$ = this.store.select(fromRoot.accountGetIsSubscribed);

        this.store.dispatch(new account.CheckSubscriptionStatus());

        this.cmsContentsSub = this.store.select(fromRoot.commonGetCmsContents)
            .subscribe((cmsContent) => {
                this.lpointBanner = _.find(cmsContent, (cms: any) => {
                    return cms.identifier === 'tpo_account_banner';
                });
            });
    }

    subscribe() {
        this.store.dispatch(new account.Subscribe());
    }

    unsubscribe() {
        this.store.dispatch(new account.Unsubscribe());
    }

    ngOnInit(): void {
        $('body').addClass('newsletter-manage-index');
    }

    ngOnDestroy() {
        this.cmsContentsSub.unsubscribe();
        $('body').removeClass('newsletter-manage-index');
    }

}
