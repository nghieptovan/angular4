import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dispatcher, Store } from '@ngrx/store';

import * as fromRoot from '../../../store/index';
declare var $;
// Redux
@Component({
    selector: 'search-fs-noresults',
    templateUrl: './noresults.html',
    styleUrls: ['./noresults.less']
})
export class SearchFSNoResults {
    searchKeyword$: any;
    constructor(private store: Store<fromRoot.AppState>) {
        this.searchKeyword$ = this.store.select(fromRoot.productsGetSearchKeyword);
        $('body').addClass('catalogsearch-result-index');
    }

    ngOnDestroy() {
        $('body').removeClass('catalogsearch-result-index');
    }
}
