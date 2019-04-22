import {Injectable} from '@angular/core';
import {Store, Dispatcher} from "@ngrx/store";
import * as fromRoot from '../../../store';
import * as _ from 'lodash';
import {LocalStorageConstants} from "../constants/LocalStorageConstants";
import {AppConstants} from "../../../app.constant";
import * as products from '../../../store/products/products.actions';
import * as checkout from '../../../store/checkout/checkout.actions';
import {AbstractCart} from "./AbstractCart";
import {VendorCart} from "./VendorCart";
import {NormalCart} from "./NormalCart";

export const CART_TYPE = {
    NORMAL_CART: 1,
    VENDOR_CART: 2
};

@Injectable()
export class CartManagement{
    private static _instance:CartManagement = null;
    private _carts: any = {};
    private timeOutLoadShippingId: any;

    // Return the instance
    public static getInstance(store): CartManagement {
        if (this._instance === null) {
            this._instance = new CartManagement(store);
        }
        return this._instance;
    }

    private constructor(
        private store: Store<fromRoot.AppState>
    ){
    }

    private _createCart(cart_type = {type:CART_TYPE.NORMAL_CART, id: null}): AbstractCart{
        let cart = null;
        switch (cart_type.type){
            case CART_TYPE.VENDOR_CART:
                if(cart_type.id){
                    if(!this._carts[cart_type.type]){
                        this._carts[cart_type.type] = {};
                    }
                    cart = new VendorCart(this.store, cart_type.id);
                    this._carts[cart_type.type][cart_type.id] = cart;
                }
                break;
            default:
                cart = new NormalCart(this.store, cart_type.id);
                this._carts[cart_type.type] = cart;
                break;
        }
        return cart;
    }

    loadCart(cart_type = {type:CART_TYPE.NORMAL_CART, id: null}){
        let cart = this.getCart(cart_type);
        if(cart){
            cart.loadCart();
        }
    }

    recreateCart(cartId, cart_type = {type:CART_TYPE.NORMAL_CART, id: null}){
        let cart = this.getCart(cart_type);
        if(cart){
            cart.recreateCart(cartId);
        }
    }

    addToCart(product, qty, cart_type = {type:CART_TYPE.NORMAL_CART, id: null}){
        let cart = this.getCart(cart_type);

        if(cart){
            cart.addToCart(product, qty);
            
        }
    }

    loadShippingRule(region, cart_type = {type:CART_TYPE.NORMAL_CART, id: null}){
        let cart = this.getCart(cart_type);

        if(cart){
            clearTimeout(this.timeOutLoadShippingId);
            this.timeOutLoadShippingId = setTimeout(() => {
                cart.loadShippingRule(region);
            }, 1000);
        }
    }

    removeCartItem(item, cart_type = {type:CART_TYPE.NORMAL_CART, id: null}){
        let cart = this.getCart(cart_type);

        if(cart){
            cart.removeCartItem(item);

        }
    }

    updateCartItem(item, cart_type = {type:CART_TYPE.NORMAL_CART, id: null}){
        let cart = this.getCart(cart_type);

        if(cart){
            cart.updateCartItem(item);
        }
    }

    getCarts(){
        return this._carts;
    }

    getCart(cart_type = {type:CART_TYPE.NORMAL_CART, id: null}): AbstractCart{
        let cart = null;
        switch (cart_type.type){
            case CART_TYPE.VENDOR_CART:
                if(cart_type.id && this._carts[cart_type.type] && this._carts[cart_type.type][cart_type.id]){
                    cart = this._carts[cart_type.type][cart_type.id];
                }
                break;
            default:
                cart = this._carts[cart_type.type];
        }

        if(!cart){
            cart = this._createCart(cart_type);
        }
        return cart;
    }

    getCartId(cart_type = {type:CART_TYPE.NORMAL_CART, id: null}){
        let cart = this.getCart(cart_type);

        if(cart){
            return cart.getCartId();
        }
        return null;
    }

    ngOnDestroy(){
    }

}