import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../../store';
import * as products from '../../../store/products/products.actions';
import * as tpo from '../../../store/tpo/tpo.actions';
import * as common from '../../../store/common/common.actions';
import {FacetsDefaultConstants} from "../../../components/base/products/constants/FacetsDefaultConstants";

declare var $;

@Component({
    selector: 'app-header-search',
    templateUrl: './search.html',
    styleUrls: ['./search.less']
})

export class AppHeaderSearch {
    isSearchInputFocus: boolean;
    searchResult: any;
    searchSuggestion$: Observable<any>;
    searchCampaign$: Observable<any>;
    searchTpo$: Observable<any>;
    searchSuggestionAll$: Observable<any>;
    searchHistory: any = [];
    isSearchAll: Boolean = false;
    isCategoryPage: Boolean;
    keyword: any;

    searchResultSub: any;
    searchKeywordSub: any;
    timeOutSearchId: any;
    submitPending$: Observable<any>;

    constructor(private store: Store<fromRoot.AppState>, private router: Router, private activatedRoute: ActivatedRoute) {
        this.searchResultSub = this.store.select(fromRoot.productsGetSearchResult)
            .subscribe((result) => {
                this.searchResult = result;
            });

        // [LT-974] huytt: prevent multiple click submit
        this.submitPending$ = this.store.select(fromRoot.productsGetSearchPending);

        this.searchCampaign$ = this.store.select(fromRoot.productsGetSearchCampaign);

        this.searchTpo$ = this.store.select(fromRoot.tpoGetSearchTpo);

        this.searchKeywordSub = this.store.select(fromRoot.productsGetSearchKeyword)
            .subscribe((keyword) => {
                this.keyword = keyword;
            });
        this.searchSuggestion$ = this.store.select(fromRoot.productsGetSearchSuggestion);
        this.searchSuggestionAll$ = this.store.select(fromRoot.productsGetSearchSuggestionAll);
        const localStorageGetHistory = JSON.parse(localStorage.getItem('searchHistory'));
        if (localStorageGetHistory) {
            this.searchHistory = localStorageGetHistory;
        }
    }

    ngOnDestroy() {
        this.searchResultSub.unsubscribe();
        this.searchKeywordSub.unsubscribe();
    }

    search(keyword, isSuggestion = false) {
        clearTimeout(this.timeOutSearchId);
        this.timeOutSearchId = setTimeout(() => {
            if (isSuggestion) {
                setTimeout(() => {
                    this.goToSearchResult(keyword);
                }, 300);
                return;
            }

            this.keyword = _.clone(keyword);
            const searchQuery = {
                keyword: keyword,
                pageSize: 4,
                page: 0
            };

            if (keyword) {
                this.store.dispatch(new products.SearchProduct(searchQuery));
                this.store.dispatch(new products.GetSearchCampaign(keyword));
                this.store.dispatch(new tpo.GetSearchTpo(keyword));
            }
        },500);
    }

    searchInCategory(item) {
        if (item.category) {
            this.router.navigate(['category', item.category.id, item.category.url_key], { queryParams: this.keyword });
        }
    }

    hideSearch() {
        setTimeout(() => {
            this.isSearchInputFocus = false;
            $('body').removeClass('css-backdrop-search-lt');
        }, 300);
    }

    goToSearchResult(keyword) {
        // [LT-974] huytt: prevent multiple enter submit
        $('#search').blur();

        this.searchHistory.unshift(keyword);
        this.searchHistory = _.take(_.uniqWith(this.searchHistory, _.isEqual), 5);
        localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
        if (keyword && keyword.trim()) {
            this.searchProduct(keyword);
            this.router.navigate([`search`], { queryParams: { q: keyword } });
            this.store.dispatch(new common.SetSearchPage());

            this.hideSearch();
        }
        // this.submitPending = false;
    }

    searchProduct(keyword) {
        const actionPayload = {
            key: keyword,
            params: {
                page: 1,
                query: keyword,
                hitsPerPage: 40,
                // facets: ['categories', 'product_brand', 'color', 'size', 'vendor']
                facets: FacetsDefaultConstants.facets,
            },
            priceMax: 0,
            type: 'search'
        };

        if (actionPayload.key) {
            this.store.dispatch(new products.Load(actionPayload));
        }
    }

    clearSearchHistory(ev) {
        localStorage.removeItem('searchHistory');
        this.searchHistory = [];
    }

    goProductDetail(product) {
        const slug = product.url.toUrlKey();
        this.keyword = null;
        this.router.navigate(['product/', product.id, slug]);
    }

    searchInputFocus(){
        this.isSearchInputFocus = true;
        if(!$('body').hasClass('css-backdrop-search-lt')){
            $('body').addClass('css-backdrop-search-lt');
        }
    }
}
