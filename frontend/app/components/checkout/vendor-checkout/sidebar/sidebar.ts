import { Component, Input } from '@angular/core';
import {LtCheckoutSidebarComponent} from "../../sidebar/sidebar";
import {VendorPayment} from "../../../base/payment/VendorPayment";
import { Router, ActivatedRoute } from '@angular/router';
import { Dispatcher, Store, Action } from '@ngrx/store';
import * as _ from 'lodash';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import {GlobalService} from "../../../../services/global.service";
import * as fromRoot from "../../../../store/index";
import * as vendor from '../../../../store/vendor/vendor.actions';

@Component({
    selector: 'lt-vendor-checkout-sidebar',
    templateUrl: './sidebar.html',
    styleUrls: ['../../sidebar/sidebar.less']
})

export class LtVendorCheckoutSidebarComponent extends LtCheckoutSidebarComponent{
    vendorLandingSettingSub: any;
    vendorLandingSetting: any;

    constructor(
        store: Store<fromRoot.AppState>,
        dialogService: DialogService,
        dispatcher: Dispatcher,
        router: Router,
        activatedRoute: ActivatedRoute,
        globalService: GlobalService,
        toastr: ToastrService
    ) {
        super(store, dialogService, dispatcher, router, activatedRoute, globalService, toastr);
        this.vendorLandingSettingSub = this.store.select(fromRoot.vendorGetLandingSetting).subscribe(setting => {
            if(setting) {
                this.vendorLandingSetting = setting;
            }
        });
    }

        loadPaymentFunction(vendorId = null){
        this.paymentFunction = new VendorPayment(this.store, vendorId);
        this.store.dispatch(new vendor.LoadLandingSetting({ id: vendorId }));
    }

    ngOnDestroy(){
        super.ngOnDestroy();
        this.vendorLandingSettingSub.unsubscribe();
    }

    getRootCheckoutGetCurrentStep(){
        return fromRoot.vendorCheckoutGetCurrentStep;
    }

    getRootCheckoutGetShippingVendors(){
        return fromRoot.vendorCheckoutGetShippingVendors;
    }

    getRootCheckoutGetShippingFee(){
        return fromRoot.vendorCheckoutGetShippingFee;
    }

    getRootCheckoutGetCartTotal(){
        return fromRoot.vendorCheckoutGetCartTotal;
    }

    getRootCheckoutGetCartInfo(){
        return fromRoot.vendorCheckoutGetCartInfo;
    }

    getRootCheckoutGetCouponStatusMessage(){
        return fromRoot.vendorCheckoutGetCouponStatusMessage;
    }

    go2CartPage(){
        let slug = this.vendorInfo.url_key?this.vendorInfo.url_key:'lotte'
        window.location.replace('/seller/' + this.vendorInfo.id + '/' + slug);
        // this.router.navigate(['/seller', this.vendorId, slug]);
    }

    getDurationDelivery(){
        if(this.vendorLandingSetting && this.vendorLandingSetting.duration_delivery){
            return this.vendorLandingSetting.duration_delivery;
        }
        return 1;
    }

}
