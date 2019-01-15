import { Component } from '@angular/core';
import {CART_TYPE, CartManagement} from "../../../base/cart/CartManagement";
import { Action } from '@ngrx/store';
import * as fromRoot from "../../../../store/index";
import * as checkout from "../../../../store/checkout/vendor-checkout/checkout.actions";
import {LtCheckoutShippingComponent} from "../../shipping/shipping";
import {VendorPayment} from "../../../base/payment/VendorPayment";

@Component({
    selector: 'lt-vendor-checkout-shipping',
    templateUrl: './shipping.html'
})

export class LtVendorCheckoutShippingComponent extends LtCheckoutShippingComponent{
    loadPaymentFunction(vendorId = null){
        this.paymentFunction = new VendorPayment(this.store, vendorId);
    }

    getRootCheckoutGetCartItemsCount(){
        return fromRoot.vendorCheckoutGetCartItemsCount;
    }

    getRootCheckoutGetShippingVendors(){
        return fromRoot.vendorCheckoutGetShippingVendors;
    }
}
