import { Component } from '@angular/core';
import {LotteCheckout} from "../checkout";
import {CART_TYPE, CartManagement} from "../../../components/base/cart/CartManagement";
import * as fromRoot from '../../../store/index';
import {VendorPayment} from "../../../components/base/payment/VendorPayment";
import * as vendor from '../../../store/vendor/vendor.actions';

@Component({
    selector: 'app-vendor-checkout',
    templateUrl: './checkout.html'
})

export class LotteVendorCheckout extends LotteCheckout{
    loadPaymentFunction(vendorId = null){
        this.paymentFunction = new VendorPayment(this.store, vendorId);
        this.paymentFunction.loadCart();
    }

    goToFailure(){
        this.router.navigate(['checkout', this.vendorId, 'onepage', 'failure']);
    }

    goToStep4(){
        this.router.navigate(['checkout', this.vendorId], { queryParams: { step: 4 } });
    }

    isNoItem(cartItemCount, cartLoading){
        const isNoItem = super.isNoItem(cartItemCount, cartLoading);
        if(isNoItem){
            this.router.navigate(['/seller', this.vendorId]);
        }
        return isNoItem;
    }

    go2CartPage(){
        let slug = this.vendorInfo.url_key?this.vendorInfo.url_key:'lotte'
        window.location.replace('/seller/' + this.vendorInfo.id + '/' + slug);
        // this.router.navigate(['/seller', this.vendorId, slug]);
    }

    ngOnDestroy(){
        super.ngOnDestroy();
        this.store.dispatch(new vendor.clearStage());
    }
}

