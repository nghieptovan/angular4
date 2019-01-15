import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../store/index';
import * as categories from '../../store/categories/categories.actions';
import { AppConstants } from '../../app.constant';
@Component({
    selector: 'lt-breadcumb',
    templateUrl: './breadcumb.html',
    styleUrls: ['./breadcumb.less']
})
export class LtBreadCumbComponent {
    breadcrumbs: any;
    urlInfo: any;
    lotteVnStoreKey: any = AppConstants.DEFAULT_STORE_URL_KEY.LOTTE_VN;
    urlInfoSub: any;
    constructor(private store: Store<fromRoot.AppState>, private router: Router) {
        this.urlInfoSub = this.store.select(fromRoot.commonGetUrlInfo)
            .subscribe((urlInfo) => {
                this.urlInfo = urlInfo;
                this.breadcrumbs = urlInfo.breadcrumbs ?
                    urlInfo.breadcrumbs.filter(b => b.categories) : null;
            });
    }

    ngOnDestroy() {
        this.urlInfoSub.unsubscribe();
    }

    goToCategoryPage(cat) {
        this.router.navigate(['category', cat.id, cat.url_key]);
        return false;
    }

    backToHome() {
        this.store.dispatch(new categories.SetSelectedStore(''));
        this.router.navigate(['/']);
        return false;
    }

    selectStoreLotteVn() {
        this.store.dispatch(new categories.SetSelectedStore(this.lotteVnStoreKey));
        this.router.navigate(['/']);
        return false;
    }
}
