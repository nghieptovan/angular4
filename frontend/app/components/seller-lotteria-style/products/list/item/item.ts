import { Component } from '@angular/core';
import {BaseListItemComponent} from "../../../../base/products/list/item/item";
import {CommonFSListItemComponent} from "../../../../common-fs/products/list/item/item";
import {WishList} from "../../../../base/wishlist/wishlist";
import {LotteriaConfigAddcartModal} from "../../../../../modals/lotteria-config-addcart/lotteria-config-addcart";
import * as fromRoot from "../../../../../store/index";
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {DialogService} from "ng2-bootstrap-modal";

@Component({
    selector: 'app-seller-lotteria-product-list-item',
    templateUrl: './item.html',
})
export class SellerLotteriaListItemComponent extends CommonFSListItemComponent{
    addedQty: number = 1;
    timeoutId: any;
    constructor(
        store: Store<fromRoot.AppState>,
        router: Router,
        wishlist: WishList,
        private dialogService: DialogService
    ) {
        super(store, router, wishlist);

    }


    changeQty(qty) {
        if (this.addedQty === 1 && qty === -1) {
            return;
        }
        this.addedQty += qty;
    }

    addToCart(product, ev) {
        if(product.type_id === 'configurable'){
            this.dialogService.addDialog(LotteriaConfigAddcartModal, {
                product: product,
                productChildren: this.productChildren,
                attributeIds: this.attributeIds,
                configurableAttributes: this.configurableAttributes,
                selectedOptions: this.selectedOptions,
                addedQty: this.addedQty
            }).subscribe((result) => {
                if (result && result.selectedProduct) {
                    this.addedQty = result.qty;
                    result.selectedProduct.sku = this._Product.sku;
                    this.emitAddToCartEvent(result.selectedProduct, ev);
                }
            });
        } else {
            this.emitAddToCartEvent(product, ev);
        }
    }

    emitAddToCartEvent(product, ev){
        // emit event with data for list component
        this.addToCartEvent.emit({
            product: product,
            qty: this.addedQty,
            ev: ev
        });
    }

    validateProductQty(ev) {
        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(() => {
            if(this.addedQty < 1) {
                this.addedQty = 1;
            }
        }, 500);
    }

}