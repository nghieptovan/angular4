
import { Component } from '@angular/core';
import {CommonFSListComponent} from "../../../common-fs/products/list/list";
import * as checkout from '../../../../store/checkout/vendor-checkout/checkout.actions';
import {CART_TYPE, CartManagement} from "../../../base/cart/CartManagement";
import * as _ from 'lodash';
@Component({
    selector: 'app-seller-lotteria-product-list',
    templateUrl: './list.html'
})
export class SellerLotteriaListComponent extends CommonFSListComponent{
    protected loadDispatcher(){
        this.dispatcher = <any>this.dispatcher.subscribe((action) => {
            switch (action.type) {
                case checkout.CART_CREATE_SUCCESS:
                    this.isCartBeingCreated = false;
                    if(this.selectedProduct && this.selectedProduct.cartItem){
                        this.selectedProduct.cartItem.quoteId = action.payload;
                        if (this.selectedProduct.cartItem.sku) {
                            this.store.dispatch(CartManagement.getInstance(this.store).getCart({
                                type:CART_TYPE.VENDOR_CART,
                                id:this.vendorInfo.id
                            }).getCartAddItemsAction(this.selectedProduct));
                        }
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

    handleAddToCart(event_data) {
        const product = event_data.product;
        const qty = event_data.qty;
        const ev = event_data.ev;

        if (product.sku) {
            if (!this.isCheckoutClicked) {
                this.isItemAddedToCart[product.sku.toString()] = true;
            }

            this.selectedProduct = {
                'cartItem': {
                    'sku': product.sku,
                    'name': product.name,
                    'qty': qty
                }
            };

            if (product.type_id !== 'simple') {
                const options = [];
                _.each(product.options, option => {
                    options.push({
                        option_id: option.attribute_id,
                        option_value: option.value_index
                    });
                });
                this.selectedProduct.cartItem['product_option'] = {
                    extension_attributes: {
                        configurable_item_options: options
                    }
                };
            }


            CartManagement.getInstance(this.store).addToCart(product, qty, {
                type:CART_TYPE.VENDOR_CART,
                id:this.vendorInfo.id
            });
        }

        return true;
    }
}
