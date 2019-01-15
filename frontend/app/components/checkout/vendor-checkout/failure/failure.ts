import { Component } from '@angular/core';
import {LtCheckoutFailureComponent} from "../../failure/failure";
import {VendorPayment} from "../../../base/payment/VendorPayment";


@Component({
    selector: 'lt-vendor-checkout-failure',
    templateUrl: './failure.html',
    styleUrls: ['../../failure/failure.less']
})

export class LtVendorCheckoutFailureComponent extends LtCheckoutFailureComponent{
    loadPaymentFunction(vendorId = null){
        this.paymentFunction = new VendorPayment(this.store, vendorId);
    }

    goToCheckout() {
        let slug = this.vendorInfo.url_key?this.vendorInfo.url_key:'lotte'
        window.location.replace('/seller/' + this.vendorInfo.id + '/' + slug);
        // this.router.navigate(['seller', this.vendorId, slug]);
    }

}
