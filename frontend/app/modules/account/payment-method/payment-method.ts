import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';

import * as fromRoot from '../../../store';

declare var $;
// Redux
@Component({
    selector: 'smcustomer-paymentmethod-index',
    templateUrl: './payment-method.html',
    styleUrls: ['./payment-method.less']
})
export class LotteAccountPaymentMethod implements OnInit, OnDestroy {
    lpointBanner: any;

    cmsContentsSub: any;
    constructor(private store: Store<fromRoot.AppState>) {
        this.cmsContentsSub = this.store.select(fromRoot.commonGetCmsContents)
            .subscribe((cmsContent) => {
                this.lpointBanner = _.find(cmsContent, (cms: any) => {
                    return cms.identifier === 'tpo_account_banner';
                });
            });
    }

    ngOnInit(): void {
        $('body').addClass('smcustomer-paymentmethod-index');
    }

    ngOnDestroy() {
        this.cmsContentsSub.unsubscribe();
        $('body').removeClass('smcustomer-paymentmethod-index');
    }

}
