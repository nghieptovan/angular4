import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../../store';
import * as account from '../../../store/account/account.actions';

declare var $;

// Redux
@Component({
    selector: 'app-account-l-point',
    templateUrl: './l-point.html',
    styleUrls: ['./l-point.less']
})
export class LotteAccountLPoint implements OnInit, OnDestroy {
    lpointHistorySub: any;
    lpointHistory: any;
    delailLpointSub: any;
    delailLpoint: any;
    page = 1;
    Lpoint: any;
    lpointBanner: any;
    isLPointShown: any = {};
    userInfo$: Observable<any>;

    cmsContentsSub: any;
    updateLpointSub: any;
    constructor(private store: Store<fromRoot.AppState>) {
        this.updateLpointSub = this.store.select(fromRoot.accountUpdateLpoint)
            .subscribe((results) => {
                this.Lpoint = results;
            });
        this.store.dispatch(new account.UpdateLPoint());
        this.store.dispatch(new account.LoadLpointHistory({ 'page': this.page }));
        this.userInfo$ = this.store.select(fromRoot.accountGetInfo);

        this.cmsContentsSub = this.store.select(fromRoot.commonGetCmsContents)
            .subscribe((cmsContent) => {
                this.lpointBanner = _.find(cmsContent, (cms: any) => {
                    return cms.identifier === 'tpo_account_banner';
                });
            });
    }

    ngOnInit(): void {
        this.cmsContentsSub.unsubscribe();
        this.getLpointsHistory();
        $('body').addClass('lpoint-transactionhistory-index');
    }

    showDetail(order_id) {
        this.isLPointShown = {};
        this.isLPointShown[order_id] = true;
        this.delailLpointSub = this.store.select(fromRoot.accountGetDetailLpointHistory)
            .subscribe((results) => {
                this.delailLpoint = results;
            });
        this.store.dispatch(new account.LoadDetailLpointHistory({ 'order_id': order_id }));
    }

    getLpointsHistory() {
        this.lpointHistorySub = this.store.select(fromRoot.accountGetLpointHistory)
            .subscribe((results) => {
                this.lpointHistory = results;
            });
        this.store.dispatch(new account.LoadLpointHistory({ 'page': this.page }));
    }

    updateLPoint() {
        this.updateLpointSub = this.store.select(fromRoot.accountUpdateLpoint)
            .subscribe((results) => {
                this.Lpoint = results;
            });
        this.store.dispatch(new account.UpdateLPoint());
    }

    ngOnDestroy() {
        $('body').removeClass('lpoint-transactionhistory-index');
        this.updateLpointSub.unsubscribe();
    }

    goToPage(n: number): void {
        this.page = n;
        this.getLpointsHistory();
    }

    goNext(): void {
        this.page++;
        this.getLpointsHistory();
    }

    goPrev(): void {
        this.page--;
        this.getLpointsHistory();
    }
}
