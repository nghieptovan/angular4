import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";
import {WishList} from "../../components/base/wishlist/wishlist";

@Component({
    selector: 'lt-fs-quick-view',
    templateUrl: 'quick-view.html'
})

export class FSQuickViewModal extends DialogComponent<null, boolean> implements OnDestroy, OnInit {
    product: any;

    constructor(dialogService: DialogService, private wishlist: WishList) {
        super(dialogService);
        document.body.classList.add('body--block-scroll');
    }

    closeModal() {
        document.body.classList.remove('body--block-scroll');
        this.close();
    }

    ngOnInit() {
    }

    addOrRemoveWishlist(productId){
        this.wishlist.addOrRemoveWishlist(productId);
    }

    goProductDetail(product) {
        // const slug = UrlTransformer.transform(product.url);
        // if (environment.production) {
        window.location.href = product.product_url;
        // } else {
        //     this.router.navigate(['product/', product.id, /* slug, */ slug]);
        // }

        return false;
    }
}