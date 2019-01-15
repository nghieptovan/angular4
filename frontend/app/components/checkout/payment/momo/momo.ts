import { Component } from '@angular/core';
import { Dispatcher, Store } from '@ngrx/store';
import { DialogService } from 'ng2-bootstrap-modal';
import { Observable } from 'rxjs/Observable';

import { AppConstants } from '../../../../app.constant';
import { ConfirmModal } from '../../../../modals/confirm/confirm';
import * as fromRoot from '../../../../store';
import * as checkout from '../../../../store/checkout/checkout.actions';
import {ActivatedRoute} from "@angular/router";
import {NormalPayment} from "../../../base/payment/NormalPayment";

@Component({
    selector: 'lt-checkout-payment-by-momo',
    templateUrl: './momo.html',
    styleUrls: ['./momo.less']
})

export class LtCheckoutPaymentByMomoComponent {

    cartTotal$: Observable<any>;
    cartIsLoading$: Observable<any>;

    cartTotalSub:any;
    cartTotal:any;

    dispatcher: any;
    momoMaximumPrice: any = AppConstants.CHECKOUT.MOMO_MAX_PRICE;
    vendorId: number;
    paymentFunction: any;


    constructor(
        protected store: Store<fromRoot.AppState>, dispatcher: Dispatcher, private dialogService: DialogService,
        protected activatedRoute: ActivatedRoute
    ) {
        this.vendorId = this.activatedRoute.params['value'].vendorId;
        this.loadPaymentFunction(this.vendorId);

        //this.cartTotal$ = store.select(fromRoot.checkoutGetCartTotal);
        this.cartTotalSub = store.select(this.paymentFunction.getRootCheckoutGetCartTotal()).subscribe(cartTotal => {
            this.cartTotal = cartTotal;
        });
        this.cartIsLoading$ = store.select(this.paymentFunction.getRootCheckoutGetLoadingState());
    }

    backToPreviousStep() {
        this.dialogService.addDialog(ConfirmModal)
            .subscribe((isConfirm) => {
                if (isConfirm) {
                    this.store.dispatch(this.paymentFunction.getUpdateCurrentStepAction(2));
                }
            });
    }

    submitPayment() {
        const paymentMethod = {
            method: 'momo',
            additional_data: {}
        };

        this.store.dispatch(this.paymentFunction.getCartUpdatePaymentInformationAction(paymentMethod));
    }

    selectPaymentType(type) {
        this.paymentFunction.storeStorage('selectedPaymentType', type);
    }

    allowMoMo(){
        return  this.cartTotal.base_subtotal_with_discount <= this.momoMaximumPrice;
    }

    // must implement if extends
    loadPaymentFunction(vendorId = null){
        this.paymentFunction = new NormalPayment(this.store);
    }

}
