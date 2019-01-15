import {Component, OnInit, ElementRef} from '@angular/core';
import {CategoryFSFilterCretiriaComponent} from "../cretiria";
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { GlobalService } from '../../../../../../services/global.service';
import * as fromRoot from '../../../../../../store/index';
import * as products from '../../../../../../store/products/products.actions';
import * as _ from 'lodash';

@Component({
    selector: 'app-cfs-product-filter-sort-by',
    templateUrl: 'sort-by.html'
})

export class CategoryFSFilterSortByComponent extends CategoryFSFilterCretiriaComponent implements OnInit {
    sortByConfig: Array<{name:string, value:string}> = [
        {name: 'Tên sản phẩm A - Z', value: 'name ASC'},
        {name: 'Tên sản phẩm Z - A', value: 'name DESC'},
        {name: 'Giá Thấp Đến Cao', value: 'price_default ASC'},
        {name: 'Giá Cao Đến Thấp', value: 'price_default DESC'},
        {name: 'Mới', value: 'created_at ASC'},
    ];

    constructor(
        router: Router,
        activatedRoute: ActivatedRoute,
        store: Store<fromRoot.AppState>,
        globalService: GlobalService,
        _elementRef : ElementRef
    ) {
        super(router, activatedRoute, store, globalService, _elementRef);
    }

    setOrderBy(key) {
        if (key && this.requestBody) {
            this.requestBody.params.order = key;
            // this.requestBody.params.page = 1;
            // this.requestBody.params.order = _.clone(this.sortBy);
            // this.requestBody.params.page = 1;
            this.store.dispatch(new products.Load(this.requestBody));
            const path = this.router['url'];
            const currentUrl = path.indexOf('?') === -1 ? path : path.substring(0, path.indexOf('?'));

            const params = this.globalService.parseRequestBodyToUrlParams(this.requestBody);
            if (params) {
                this.router.navigate([currentUrl], { queryParams: params });
            } else {
                this.router.navigate([currentUrl]);
            }

            // this.scrollTopMain();
        }
    }
}