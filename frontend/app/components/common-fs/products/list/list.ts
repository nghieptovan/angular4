import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Dispatcher, Store } from '@ngrx/store';
import * as fromRoot from '../../../../store';
import {BaseListComponent} from "../../../base/products/list/list";
import {DialogService} from "ng2-bootstrap-modal";
import {FSQuickViewModal} from "../../../../modals/quick-view/quick-view";
import {WishList} from "../../../base/wishlist/wishlist";

@Component({
    selector: 'app-common-fs-product-list',
    templateUrl: './list.html',
    styleUrls: ['./list.less']
})
export class CommonFSListComponent extends BaseListComponent{
    constructor(store: Store<fromRoot.AppState>, activatedRoute: ActivatedRoute,
        dispatcher: Dispatcher, router: Router, private dialogService: DialogService
    ) {
        super(store, activatedRoute, dispatcher, router);
    }

    showQuickViewModal(product) {
        this.dialogService.addDialog(FSQuickViewModal, {product: product});
    }
}
