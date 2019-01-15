import { Component } from '@angular/core';
import {BaseListItemComponent} from "../../../../base/products/list/item/item";

@Component({
    selector: 'app-common-fs-product-list-item',
    templateUrl: './item.html',
})
export class CommonFSListItemComponent extends BaseListItemComponent{

    addOrRemoveWishlist(productId) {
        this.toggleWishListSaved();
        super.addOrRemoveWishlist(productId);
    }

    toggleWishListSaved(){
        this.wishListSaved = !this.wishListSaved;
    }

}