import { Component } from '@angular/core';
import {LtCheckoutPaymentByMomoComponent} from "../../../payment/momo/momo";
import {VendorPayment} from "../../../../base/payment/VendorPayment";

@Component({
    selector: 'lt-vendor-checkout-payment-by-momo',
    templateUrl: '../../../payment/momo/momo.html'
})

export class LtVendorCheckoutPaymentByMomoComponent extends LtCheckoutPaymentByMomoComponent{
    loadPaymentFunction(vendorId = null){
        this.paymentFunction = new VendorPayment(this.store, vendorId);
    }
}
