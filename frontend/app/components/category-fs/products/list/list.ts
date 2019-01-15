import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Dispatcher, Store } from '@ngrx/store';
import * as fromRoot from '../../../../store';
import {BaseListComponent} from "../../../base/products/list/list";

@Component({
    selector: 'app-cfs-product-list',
    templateUrl: './list.html',
    styleUrls: ['./list.less']
})
export class CategoryFSListComponent extends BaseListComponent{
    // constructor(store: Store<fromRoot.AppState>, activatedRoute: ActivatedRoute,
    //     dispatcher: Dispatcher, router: Router
    // ) {
    //     super(store, activatedRoute, dispatcher, router);
    // }
}
