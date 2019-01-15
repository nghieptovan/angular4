import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';

import { GlobalService } from '../../../../services/global.service';
import * as fromRoot from '../../../../store/index';
import * as products from '../../../../store/products/products.actions';

@Component({
    selector: 'lt-products-pagination',
    templateUrl: './pagination.html',
    styleUrls: ['./pagination.less']
})
export class LtProductsPaginationComponent {
    pages: any = [];
    pagesArray: any;
    nbPages: number;
    currentPage: number;
    hitsPerPage: number;
    sortBy: any = '';
    productsStateSub: any;
    requestBody: any;
    constructor(private store: Store<fromRoot.AppState>, private activatedRoute: ActivatedRoute, private router: Router,
        private globalService: GlobalService) {
        this.productsStateSub = this.store.select(fromRoot.productsGetState)
            .subscribe((state: any) => {
                this.pagesArray = state.products.pagesArray;
                this.nbPages = state.products.nbPages;
                this.currentPage = state.products.page;
                this.hitsPerPage = state.products.hitsPerPage;
                this.requestBody = state.requestBody;
                this.sortBy = this.requestBody.params && this.requestBody.params.order ? this.requestBody.params.order : '';
            });
    }

    ngOnDestroy() {
        this.productsStateSub.unsubscribe();
    }

    selectPage(page) {
        if (page < 1 || page > this.nbPages) {
            return;
        }

        if (this.requestBody) {
            this.requestBody.params.page = page;
            this.store.dispatch(new products.Load(this.requestBody));
            const path = this.router['url'];
            const currentUrl = path.indexOf('?') === -1 ? path : path.substring(0, path.indexOf('?'));

            const params = this.globalService.parseRequestBodyToUrlParams(this.requestBody);
            if (params) {
                this.router.navigate([currentUrl], { queryParams: params });
            } else {
                this.router.navigate([currentUrl]);
            }

            const mainContent = document.querySelector('#maincontent');

            if (mainContent) {
                window.scrollTo(0, mainContent['offsetTop']);
            }
        }
    }

    selectPageSize(size) {
        if (this.requestBody) {
            this.requestBody.params.page = 1;
            this.requestBody.params.hitsPerPage = size;
            this.store.dispatch(new products.Load(this.requestBody));
            const path = this.router['url'];
            const currentUrl = path.indexOf('?') === -1 ? path : path.substring(0, path.indexOf('?'));

            const params = this.globalService.parseRequestBodyToUrlParams(this.requestBody);
            if (params) {
                this.router.navigate([currentUrl], { queryParams: params });
            } else {
                this.router.navigate([currentUrl]);
            }

            const mainContent = document.querySelector('#maincontent');

            if (mainContent) {
                window.scrollTo(0, mainContent['offsetTop']);
            }

        }
    }

    setOrderBy(key) {
        if (key && this.requestBody) {
            this.requestBody.params.order = _.clone(this.sortBy);
            this.requestBody.params.page = 1;
            this.store.dispatch(new products.Load(this.requestBody));
            const path = this.router['url'];
            const currentUrl = path.indexOf('?') === -1 ? path : path.substring(0, path.indexOf('?'));

            const params = this.globalService.parseRequestBodyToUrlParams(this.requestBody);
            if (params) {
                this.router.navigate([currentUrl], { queryParams: params });
            } else {
                this.router.navigate([currentUrl]);
            }

            const mainContent = document.querySelector('#maincontent');

            if (mainContent) {
                window.scrollTo(0, mainContent['offsetTop']);
            }
        }
    }
}
