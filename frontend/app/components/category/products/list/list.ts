import { Component, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Dispatcher, Store } from '@ngrx/store';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';

import * as checkout from '../../../../store/checkout/checkout.actions';
import * as fromRoot from '../../../../store/index';
import { environment } from '../../../../../environments/environment';

@Component({
    selector: 'lt-products-list',
    templateUrl: './list.html',
    styleUrls: ['./list.less']
})
export class LtProductsListComponent implements OnDestroy {
    @Input('products')
    products: any;
    isItemAddedToCart: any;
    isCartBeingCreated: boolean;
    selectedProduct: any;
    cartCount: any = 0;
    isCheckoutClicked: boolean;
    commonProductBaseUrl$: Observable<any>;

    cartCountSub: any;
    constructor(private router: Router, private activatedRoute: ActivatedRoute,
        private store: Store<fromRoot.AppState>, private dispatcher: Dispatcher) {
        this.commonProductBaseUrl$ = this.store.select(fromRoot.commonGetProductBaseUrl);
        this.selectedProduct = {
            'cartItem': {}
        };

        this.isItemAddedToCart = {};

        this.cartCountSub = this.store.select(fromRoot.checkoutGetCartItemsCount)
            .subscribe((cartCount) => {
                this.cartCount = cartCount;
            });

        this.dispatcher = <any>this.dispatcher.subscribe((action) => {
            switch (action.type) {
                case checkout.CART_CREATE_SUCCESS:

                    if (this.selectedProduct.cartItem.sku) {
                        this.isCartBeingCreated = false;
                        this.selectedProduct.cartItem.quoteId = action.payload;
                        this.store.dispatch(new checkout.CartAddItems({ product: this.selectedProduct, isCheckoutClicked: this.isCheckoutClicked }));
                    }
                    break;

                case checkout.CART_CREATE_FAILED:
                    this.isCartBeingCreated = false;
                    break;

                case checkout.CART_ADD_ITEMS_SUCCESS:
                    if (this.isCheckoutClicked) {
                        this.isCheckoutClicked = false;
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
        this.cartCountSub.unsubscribe();
    }

    checkout(product, ev) {
        this.isCheckoutClicked = true;
        this.addToCart(product, ev);
        ev.stopPropagation();

        return false;
    }

    addToCart(product, ev) {
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

        if (ev) {
            ev.stopPropagation();
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

    isExpiredProductLabel(label) {
        if (label.label_to_date && label.label_from_date) {
            const now = moment();
            const toDate = moment(label.label_to_date);
            const fromDate = moment(label.label_from_date);

            if (now.isAfter(toDate) || now.isBefore(fromDate)) {
                return true;
            }
        }

        return false;
    }
}
