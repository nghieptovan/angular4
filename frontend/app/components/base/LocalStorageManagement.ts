import {Injectable} from '@angular/core';
import {LocalStorageConstants} from "./constants/LocalStorageConstants";
import {ICartInfoStorage} from "./payment/ICartInfoStorage";

@Injectable()
export class LocalStorageManagement{
    private static _instance:LocalStorageManagement = null;

    public static getInstance(): LocalStorageManagement {
        if (this._instance === null) {
            this._instance = new LocalStorageManagement();
        }
        return this._instance;
    }

    private constructor(){
    }

    clearExclude(exclude_keys:Array<string> = []){
        const exclude_data = [];
        exclude_keys.forEach(key => {
            exclude_data.push({
                key: key,
                value: localStorage.getItem(key)
            });
        });
        localStorage.clear();

        exclude_data.forEach(data => {
            localStorage.setItem(data.key, data.value);
        });
    }

    clearVendorCartInfo(vendorId){
        let storage = this.getStorageVendorCart();
        if(storage){
            delete storage[vendorId];
            localStorage.setItem(LocalStorageConstants.VENDOR_CART, JSON.stringify(storage));
        }
    }

    getStorageVendorCart(){
        const storageJson = localStorage.getItem(LocalStorageConstants.VENDOR_CART);
        if(storageJson){
            return JSON.parse(storageJson);
        }

        return null;
    }

    getStorageVendorCartId(vendorId) : string{
        const cartInfo = this.getVendorCartInfo(vendorId);
        if(cartInfo){
            return cartInfo.cartId;
        }
        return null;
    }

    getVendorCartInfo(vendorId){
        const storage = this.getStorageVendorCart();
        if(storage){
            return storage[vendorId];
        }
        return null;
    }

    storeStorageVendorCartInfo(vendorId, cartInfo){
        let storage = this.getStorageVendorCart();
        if(!storage) storage = {};
        if(!storage[vendorId]){
             let intial: ICartInfoStorage = {
                cartId: null,
                paymentMethod: null,//not yet
                shipping_duration: null,
                orderSuccess: null,
                differentBillingAddress: null,
                billingAddress: null,
                shippingAddress: null,
                shipping_comments: null,
                vatInfo: null,
                shippingRules: null,
                cart: null,
                selectedPaymentType: null,
                shipping_method_code: null
            };
            storage[vendorId] = intial;
        }

        storage[vendorId] = Object.assign({}, storage[vendorId], cartInfo);

        localStorage.setItem(LocalStorageConstants.VENDOR_CART, JSON.stringify(storage));
    }
}