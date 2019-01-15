import { Component } from '@angular/core';
import {LtCheckoutSuccessComponent} from "../../success/success";
import {VendorPayment} from "../../../base/payment/VendorPayment";

declare var $;

@Component({
    selector: 'lt-vendor-checkout-success',
    templateUrl: '../../success/success.html',
    styleUrls: ['../../success/success.less']
})

export class LtVendorCheckoutSuccessComponent extends LtCheckoutSuccessComponent{
    loadPaymentFunction(vendorId = null){
        this.paymentFunction = new VendorPayment(this.store, vendorId);
    }
}
