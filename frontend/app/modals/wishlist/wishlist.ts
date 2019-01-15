import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";
import {WishList} from "../../components/base/wishlist/wishlist";
import { Dispatcher, Store } from '@ngrx/store';
import * as fromRoot from '../../store/index';
import * as checkout from '../../store/checkout/checkout.actions';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from './../../services/global.service';

declare var $;
@Component({
    selector: 'lt-wishlist-modal',
    templateUrl: 'wishlist.html'
})

export class WishlistModal extends DialogComponent<null, boolean> implements OnDestroy, OnInit {
    product: any;

    userWishlist:any;
    checkedList:any;

    constructor(dialogService: DialogService, private wishlist: WishList, private store: Store<fromRoot.AppState>,private toastr: ToastrService,
        private globalService: GlobalService,
    ) {
        super(dialogService);

        this.userWishlist = wishlist.userWishlist;
        this.checkedList = [];

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

    gotoProductDetail(product) {
        window.location.href = '/product/' + product.product_url + '/' + product.product_url;
        return false;
    }

    removeItem(item,event) {
        this.wishlist.removeItem(item);
        document.querySelector('#wishlist-'+item.wishlist_item_id).remove();
    }

    parseProduct(item,cartId){
        let addedProduct = { cartItem : {
                quoteId : cartId,
                name    : item.name,
                sku     : item.sku,
                qty : 1
            }
        };

        if(item.type_id == 'configurable'){
            if(typeof item.super_attributes != 'undefined' && item.super_attributes != '' && item.super_attributes != null && item.super_attributes != false ){
                let productOption    = {extension_attributes:{configurable_item_options:[]}};
                const superAttributes  = item.super_attributes.replace(/"/g,'').replace('{','').replace('}','').split(',');
                if(typeof superAttributes != 'undefined' && superAttributes.length > 0 ){
                    for (var k in superAttributes){
                        productOption.extension_attributes.configurable_item_options.push({
                            option_id    : superAttributes[k].split(':')[0],
                            option_value : superAttributes[k].split(':')[1]
                        });
                    }
                }
                addedProduct.cartItem['product_option'] = productOption;
            }

        }
        return addedProduct;
    }

    addWishlistTocart(){
        if(this.checkedList.length > 0){
            const maxSold  = 50;
            const cartInfo = JSON.parse(localStorage.getItem('cart'));
            const cartId   = localStorage.getItem('cartId');
            if (!cartId) {
                this.store.dispatch(new checkout.CartCreate());
            }
            if(this.checkedList.length + cartInfo.info.items_qty > maxSold){
                this.toastr.error('Sản phẩm này giới hạn số lượng khi đặt hàng. Bạn có thể mua tối đa ' + maxSold + ' sản phẩm cho mỗi đơn hàng.');
                return false;
            }
            for(var i in this.checkedList){
                if(this.checkedList[i].product != null){
                    this.store.dispatch(new checkout.CartAddItems({product: this.parseProduct(this.checkedList[i].product,cartId)}));
                }
            }

            setTimeout(() => {
                this.store.dispatch(new checkout.CartLoad());
                this.closeModal();
            }, 1000);

        }

    }

    onCheckboxChange(item,event){
        if(event.target.checked) {
            this.checkedList.push(item);
        } else {
            this.checkedList = this.checkedList.filter(function(itemInArr) {
                return itemInArr !== item
            })
        }
    }

    onProductOptionChange(item,event){
        let parsedobj = JSON.parse( item.product.super_attributes);
        parsedobj[event.target.id] = event.target.value
        item.product.super_attributes = JSON.stringify(parsedobj);
    }
}
