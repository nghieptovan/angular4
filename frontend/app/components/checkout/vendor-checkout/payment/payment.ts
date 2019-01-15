import { Component, ViewEncapsulation } from '@angular/core';
import {LtCheckoutPaymentComponent} from "../../payment/payment";
import {CART_TYPE, CartManagement} from "../../../base/cart/CartManagement";
import {Action} from "@ngrx/store";
import * as checkout from '../../../../store/checkout/vendor-checkout/checkout.actions';
import {VendorPayment} from "../../../base/payment/VendorPayment";

@Component({
    selector: 'lt-vendor-checkout-payment',
    templateUrl: './payment.html',
    styleUrls: ['../../payment/payment.less'],
    encapsulation: ViewEncapsulation.None,
})

export class LtVendorCheckoutPaymentComponent extends LtCheckoutPaymentComponent{
    loadPaymentFunction(vendorId = null){
        this.paymentFunction = new VendorPayment(this.store, vendorId);
    }
}
