import { Component } from '@angular/core';
import {LtCheckoutPaymentByAtmComponent} from "../../../payment/atm/atm";
import * as fromRoot from '../../../../../store'
import {CART_TYPE, CartManagement} from "../../../../base/cart/CartManagement";
import {Action} from "@ngrx/store";
import {VendorPayment} from "../../../../base/payment/VendorPayment";

@Component({
    selector: 'lt-vendor-checkout-payment-by-atm',
    templateUrl: '../../../payment/atm/atm.html'
})

export class LtVendorCheckoutPaymentByAtmComponent extends  LtCheckoutPaymentByAtmComponent{
    loadPaymentFunction(vendorId = null){
        this.paymentFunction = new VendorPayment(this.store, vendorId);
    }

}
