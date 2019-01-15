import { Component } from '@angular/core';
import {LtCheckoutPaymentByCashComponent} from "../../../payment/cash/cash";
import {CART_TYPE, CartManagement} from "../../../../base/cart/CartManagement";
import {Action} from "@ngrx/store";
import * as fromRoot from '../../../../../store';
import {VendorPayment} from "../../../../base/payment/VendorPayment";

@Component({
    selector: 'lt-vendor-checkout-payment-by-cash',
    templateUrl:  '../../../payment/cash/cash.html'
})

export class LtVendorCheckoutPaymentByCashComponent extends LtCheckoutPaymentByCashComponent{
    loadPaymentFunction(vendorId = null){
        this.paymentFunction = new VendorPayment(this.store, vendorId);
    }
}
