import { Component} from '@angular/core';
import {LtCheckoutCreditCardComponent} from "../../payment/credit-card/credit-card";
import {VendorPayment} from "../../../base/payment/VendorPayment";

declare var $;
@Component({
    selector: 'lt-vendor-credit-card',
    templateUrl: '../../payment/credit-card/credit-card.html'
})
export class LtVendorCheckoutCreditCardComponent extends LtCheckoutCreditCardComponent{

    loadPaymentFunction(vendorId = null){
        this.paymentFunction = new VendorPayment(this.store, vendorId);
    }
}


