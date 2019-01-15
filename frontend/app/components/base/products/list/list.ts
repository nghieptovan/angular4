import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Dispatcher, Store } from '@ngrx/store';
import * as _ from 'lodash';

import * as fromRoot from '../../../../store';
import * as checkout from '../../../../store/checkout/checkout.actions';
import * as account from '../../../../store/account/account.actions';

@Component({
    selector: 'app-base-product-list',
    template: ''
})
export class BaseListComponent {
    private _Products: any;
    isItemAddedToCart: any;
    isCartBeingCreated: boolean;
    selectedProduct: any;
    isCheckoutClicked: boolean;
    isLoggedIn: boolean = false;
    authSub: any;
    vendorInfoSub: any;
    vendorInfo: any;

    @Input()
    get Products(): any {
        return this._Products;
    }

    set Products(value: any) {
        this._Products = value;
    }


    constructor(protected store: Store<fromRoot.AppState>, private activatedRoute: ActivatedRoute,
        protected dispatcher: Dispatcher, protected router: Router
    ) {
        this.isItemAddedToCart = {};

        this.loadDispatcher();

        this.authSub = this.store.select(fromRoot.authGetLoggedInState).subscribe((isLoggedIn) => {
            // if (!isLoggedIn) {
            //     this.router.navigate(['account/login'], { queryParams: { redirect: window.location.pathname } });
            // }
            this.isLoggedIn = isLoggedIn;
        });

        this.vendorInfoSub = this.store.select(fromRoot.vendorGetEntity).subscribe(vendorInfo => {
            this.vendorInfo = vendorInfo;
        });
    }

    protected loadDispatcher(){
        this.dispatcher = <any>this.dispatcher.subscribe((action) => {
            switch (action.type) {
                case checkout.CART_CREATE_SUCCESS:
                    this.isCartBeingCreated = false;
                    this.selectedProduct.cartItem.quoteId = action.payload;
                    if (this.selectedProduct.cartItem.sku) {
                        this.store.dispatch(new checkout.CartAddItems({ product: this.selectedProduct, isCheckoutClicked: this.isCheckoutClicked }));
                    }
                    break;

                case checkout.CART_CREATE_FAILED:
                    this.isCartBeingCreated = false;
                    break;

                case checkout.CART_ADD_ITEMS_SUCCESS:
                    if (this.isCheckoutClicked) {
                        this.isCheckoutClicked = false;
                        // location.href = '/checkout/cart?step=1';
                        this.router.navigate(['checkout'], { queryParams: { step: 1 } });
                    } else {
                        if (action.payload.sku) {
                            this.isItemAddedToCart[action.payload.sku.toString()] = false;
                        }
                    }

                    this.selectedProduct = {
                        'cartItem': {}
                    };
                    break;

                case checkout.CART_ADD_ITEMS_FAILED:
                    this.isItemAddedToCart = {};
                    this.isCheckoutClicked = false;
                    this.isCartBeingCreated = false;
                    break;
                default:
                    break;
            }
        });
    }

    ngOnDestroy() {
        this.dispatcher.unsubscribe();
        this.authSub.unsubscribe();
        this.vendorInfoSub.unsubscribe();
        // this.userWishlistSub.unsubscribe();
    }

    // checkout(product, ev) {
    //     this.isCheckoutClicked = true;
    //     this.addToCart(product, ev);
    //
    //     return false;
    // }

    // Handle addToCartEvent that emitted by item component
    handleAddToCart(event_data) {
        const product = event_data.product;
        const ev = event_data.ev;

        if (product.type_id !== 'simple') {
            this.goProductDetail(product);
            ev.stopPropagation();
            return;
        }

        if (product.sku && !this.isItemAddedToCart[product.sku.toString()]) {
            if (!this.isCheckoutClicked) {
                this.isItemAddedToCart[product.sku.toString()] = true;
            }

            this.selectedProduct = {
                'cartItem': {
                    'sku': product.sku,
                    'name': product.name,
                    'qty': 1
                }
            };

            const cartId = localStorage.getItem('cartId');
            if (cartId) {
                this.selectedProduct.cartItem.quoteId = cartId;
                this.store.dispatch(new checkout.CartAddItems({ product: this.selectedProduct, isCheckoutClicked: this.isCheckoutClicked }));
            } else {
                this.isCartBeingCreated = true;
                this.store.dispatch(new checkout.CartCreate());
            }
        }

        return false;
    }

    goProductDetail(product) {
        const slug = product.url.toUrlKey();
        this.router.navigate(['product/', product.id, slug]);
        return false;
    }

    getProductImage(attributes) {
        return _.find(attributes, (attr: any) => {
            return attr.attribute_code === 'small_image';
        });
    }
}
