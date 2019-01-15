import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Dispatcher, Store } from '@ngrx/store';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';

import * as fromRoot from '../../../store';
import * as account from '../../../store/account/account.actions';
import * as checkout from '../../../store/checkout/checkout.actions';

declare var $;
@Component({
    selector: 'app-account-wishlist',
    templateUrl: './wishlist.html',
    styleUrls: ['./wishlist.less']
})
export class LotteAccountWishlist {

    wishlist: any;
    isItemShared: any = {};
    addedProduct: any;
    addedWishlist: any;
    isAddToCartClicked: Boolean;
    toggleShareWishlist: boolean;
    isWishlistOutOfStock: any;
    lpointBanner: any;

    wishlistSub: any;
    dispatcherSub: any;
    cmsContentsSub: any;
    constructor(private store: Store<fromRoot.AppState>, private router: Router, private dispatcher: Dispatcher,
        private toastrService: ToastrService) {
        this.wishlistSub = this.store.select(fromRoot.accountGetWishList)
            .subscribe((wishlist) => {
                this.wishlist = wishlist;
                const idx = _.findIndex(wishlist, (item: any) => item.product.is_in_stock);
                this.isWishlistOutOfStock = idx === -1 ? true : false;
            });

        this.cmsContentsSub = this.store.select(fromRoot.commonGetCmsContents)
            .subscribe((cmsContent) => {
                this.lpointBanner = _.find(cmsContent, (cms: any) => {
                    return cms.identifier === 'tpo_account_banner';
                });
            });

        this.dispatcherSub = this.dispatcher.subscribe((action) => {
            switch (action.type) {
                case checkout.CART_ADD_ITEMS_SUCCESS:
                    if (this.isAddToCartClicked) {
                        this.isAddToCartClicked = false;
                        this.addedProduct = null;
                    }
                    break;
                case checkout.CART_ADD_ITEMS_FAILED:
                    this.isAddToCartClicked = false;
                    break;

                case checkout.CART_CREATE_SUCCESS:
                    if (this.addedProduct && this.addedProduct.cartItem) {
                        this.addedProduct.cartItem.quoteId = action.payload;
                        this.store.dispatch(new checkout.CartAddItems({ product: this.addedProduct, isAddToCartClicked: this.isAddToCartClicked }));
                    }

                    if (this.addedWishlist) {
                        this.store.dispatch(new checkout.CartAddWishlist(null));
                        this.addedWishlist = null;
                    }

                    break;

                case checkout.CART_ADD_WISHLIST_FAILED:
                    if (action.payload && action.payload.message) {
                        this.toastrService.error(action.payload.message, 'Lỗi');
                    }
                    break;
                case checkout.CART_CREATE_FAILED:
                    this.isAddToCartClicked = false;
                    break;
                default:
                    break;
            }
        });
    }

    ngOnInit() {
        $('body').addClass('page-multiple-wishlist');
    }

    ngOnDestroy() {
        this.wishlistSub.unsubscribe();
        this.dispatcherSub.unsubscribe();
        this.cmsContentsSub.unsubscribe();
        $('body').removeClass('page-multiple-wishlist');
    }

    goToProductDetail(product) {
        this.router.navigate(['product', product.product_id, product.url_key]);
        return false;
    }

    goToBrandPage(brand) {
        this.router.navigate(['brand', brand.brand_id, brand.brand_path.replace('/brand/', '')]);
        return false;
    }

    addToCart(product) {
         if (product.type_id !== 'simple') {
             this.goToProductDetail(product);
             return;
         }
//console.log(product);
        this.isAddToCartClicked = true;
        this.addedProduct = {
            cartItem: {
                'sku': product.sku,
                'name': product.name,
                'qty': 1
            }
        };

        const cartId = localStorage.getItem('cartId');
        if (cartId) {
            this.addedProduct.cartItem.quoteId = cartId;
            this.store.dispatch(new checkout.CartAddItems({ product: this.addedProduct, isAddToCartClicked: false }));
        } else {
            this.store.dispatch(new checkout.CartCreate());
        }
    }

    toggleShareItem(idx) {
        if (this.isItemShared[idx]) {
            this.isItemShared[idx] = false;
        } else {
            this.isItemShared = {};
            this.isItemShared[idx] = true;
        }
    }

    shareSocialProduct(flag, product) {
        const productUrl = window.location.protocol + '//' + window.location.hostname + '/product/' + product.product_id + '/' + product.url_key;
        const productName = product.name;
        switch (flag) {
            case 'facebook':
                let url = `http://www.facebook.com/sharer.php?s=100&p[url]=` + productUrl;
                window.open(url, '_blank', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');
                break;
            case 'twitter':
                url = `https://twitter.com/share?url=` + productUrl +
                    `&text=` + productName;
                window.open(url, '_blank', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');
                break;
            case 'google':
                url = `https://plus.google.com/share?url=` + productUrl;
                window.open(url, '_blank', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');
                break;
            default:
                break;
        }
    }

    shareSocialWishlist(flag, wishlist) {
        const wishlistUrl = window.location.protocol + '//' + window.location.hostname + '/shared-wishlist/' + wishlist[0].wishlist_id;
        switch (flag) {
            case 'facebook':
                const url = `http://www.facebook.com/sharer.php?u=` + wishlistUrl;
                window.open(url, '_blank', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');
                break;
            case 'google':
                this.router.navigate(['account/wishlist/share', wishlist[0].wishlist_id]);
                break;
            default:
                break;
        }
    }

    updateWishlist(wishlist) {
        const wishlistClone = _.cloneDeep(wishlist);
        this.store.dispatch(new account.UpdateWishList(wishlistClone));
    }

    addWishlistToCart() {
        const cartId = localStorage.getItem('cartId');
        if (cartId) {
            this.store.dispatch(new checkout.CartAddWishlist(null));
        } else {
            this.addedWishlist = 1;
            this.store.dispatch(new checkout.CartCreate());
        }
    }

    removeItem(item) {
        this.store.dispatch(new account.DeleteProductFromWishList(item.wishlist_item_id));
    }
}
