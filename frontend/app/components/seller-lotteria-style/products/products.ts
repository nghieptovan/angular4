import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import { ActivatedRoute } from '@angular/router';
import * as fromRoot from '../../../store';
import {BaseProductsComponent} from "../../base/products/products";
import * as products from '../../../store/products/products.actions';
import {CommonFSProductsComponent} from "../../common-fs/products/products";
declare var $;

@Component({
    selector: 'app-seller-lotteria-products',
    templateUrl: 'products.html'
})

export class SellerLotteriaProductsComponent extends CommonFSProductsComponent {
    viewMore() {
        super.viewMore();
        $('.sidebar-right-lot').removeClass('sidebar-fixedtop-abs');
    }

}