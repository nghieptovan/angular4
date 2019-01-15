import {Component, OnInit, ElementRef} from '@angular/core';
import {CommonFSFilterCretiriaComponent} from "../cretiria";
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { GlobalService } from '../../../../../../services/global.service';
import * as fromRoot from '../../../../../../store/index';
import * as common from '../../../../../../store/common/common.actions';

@Component({
    selector: 'app-common-fs-product-filter-sort-by',
    templateUrl: 'sort-by.html'
})

export class CommonFSFilterSortByComponent extends CommonFSFilterCretiriaComponent implements OnInit {
    sortByConfig: Array<{name:string, value:string}> = [
        {name: 'Chắc chắn bạn sẽ thích', value: '_score'},
        {name: 'Bán chạy nhất', value: 'best_selling DESC'},
        {name: 'Giá Thấp Đến Cao', value: 'price_default ASC'},
        {name: 'Giá Cao Đến Thấp', value: 'price_default DESC'},
        {name: 'Giảm giá', value: 'price_discount_percent DESC'},
        {name: 'Hàng mới về', value: 'created_at desc'},
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
            this.sortBy = key;

            this.processFilter();
        }
    }
}