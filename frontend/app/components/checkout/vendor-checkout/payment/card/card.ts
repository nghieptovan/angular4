import { Component, Input } from '@angular/core';
import {LtCheckoutPaymentByCardComponent} from "../../../payment/card/card";
import {VendorPayment} from "../../../../base/payment/VendorPayment";

@Component({
    selector: 'lt-vendor-checkout-payment-by-card',
    templateUrl: '../../../payment/card/card.html'
})

export class LtVendorCheckoutPaymentByCardComponent extends  LtCheckoutPaymentByCardComponent{
    loadPaymentFunction(vendorId = null){
        this.paymentFunction = new VendorPayment(this.store, vendorId);
    }
}
