import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Dispatcher, Store } from '@ngrx/store';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../store';
import * as account from '../../store/account/account.actions';
import * as checkout from '../../store/checkout/checkout.actions';
import * as common from '../../store/common/common.actions';

declare var $;
@Component({
    selector: 'app-shared-wishlist',
    templateUrl: './shared-wishlist.html',
    styleUrls: ['./shared-wishlist.less']
})
export class LotteSharedWishlist {

    wishlist: any;
    addedProduct: any;
    addedWishlist: any;
    isAddToCartClicked: Boolean;
    isWishlistOutOfStock: Boolean;
    isLoggedIn$: Observable<any>;

    dispatcherSub: any;
    wishlistSub: any;
    constructor(private store: Store<fromRoot.AppState>, private activatedRoute: ActivatedRoute, private router: Router, private dispatcher: Dispatcher) {
        this.wishlistSub = this.store.select(fromRoot.accountGetSharedWishlist)
            .subscribe((wishlist) => {
                this.wishlist = wishlist;
                const idx = _.findIndex(wishlist, (item: any) => item.product.is_in_stock);
                this.isWishlistOutOfStock = idx === -1 ? true : false;
            });

        this.isLoggedIn$ = this.store.select(fromRoot.authGetLoggedInState);

        const wishlistId = Number.parseInt(this.activatedRoute.params['value'].id);
        this.store.dispatch(new account.LoadWishList(wishlistId));
        this.store.dispatch(new common.LoadTrackingCode({ type: 'wishlist', id: wishlistId }));

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
                        this.store.dispatch(new checkout.CartAddWishlist(this.addedWishlist));
                        this.addedWishlist = null;
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
        $('body').addClass('wishlist-shared-index');
    }

    ngOnDestroy() {
        $('body').removeClass('wishlist-shared-index');
    }

    goToProductDetail(product) {
        this.router.navigate(['product', product.product_id, product.url_key]);
        return false;
    }

    goToBrandPage(brand) {
        this.router.navigate(['brand', brand.brand_id, brand.brand_path.replace('/brand/', '')]);
        return false;
    }

    addToWishlist(product) {
        this.store.dispatch(new account.AddProductToWishList(product.product_id));
    }


    addToCart(product) {
        if (product.type_id !== 'simple') {
            this.goToProductDetail(product);
            return;
        }

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

    addWishlistToCart() {
        const cartId = localStorage.getItem('cartId');
        if (cartId) {
            this.store.dispatch(new checkout.CartAddWishlist(this.wishlist[0].wishlist_id));
        } else {
            this.addedWishlist = this.wishlist[0].wishlist_id;
            this.store.dispatch(new checkout.CartCreate());
        }

    }
}
