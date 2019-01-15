import { Component } from '@angular/core';
import {LtCheckoutAddressFormComponent} from "../../../shipping/address-form/address-form";
import {CART_TYPE, CartManagement} from "../../../../base/cart/CartManagement";
import {VendorPayment} from "../../../../base/payment/VendorPayment";

declare var $;

@Component({
    selector: 'lt-vendor-checkout-address-form',
    templateUrl: '../../../shipping/address-form/address-form.html'
})

export class LtVendorCheckoutAddressFormComponent extends LtCheckoutAddressFormComponent{
    loadPaymentFunction(vendorId = null){
        this.paymentFunction = new VendorPayment(this.store, vendorId);
    }
}
