import { Component } from '@angular/core';
import { Dispatcher, Store, Action } from '@ngrx/store';
import { DialogService } from 'ng2-bootstrap-modal';
import { Observable } from 'rxjs/Observable';

import { AppConstants } from '../../../../app.constant';
import { ConfirmModal } from '../../../../modals/confirm/confirm';
import * as fromRoot from '../../../../store';
import * as checkout from '../../../../store/checkout/checkout.actions';
import * as _ from "lodash";
import {CartManagement} from "../../../base/cart/CartManagement";
import {ActivatedRoute} from "@angular/router";
import {NormalPayment} from "../../../base/payment/NormalPayment";

@Component({
    selector: 'lt-checkout-payment-by-cash',
    templateUrl: './cash.html',
    styleUrls: ['./cash.less']
})

export class LtCheckoutPaymentByCashComponent {

    cartTotalSub: any;
    cartTotal: any;
    cartIsLoading$: Observable<any>;
    codMaximumPrice: any = AppConstants.CHECKOUT.PAYMENT_COD_MAX_PRICE;
    vendorId: number;
    paymentFunction: any;

    dispatcher: any;
    allowCOD: boolean = false;

    constructor(
        protected store: Store<fromRoot.AppState>,
        dispatcher: Dispatcher,
        protected activatedRoute: ActivatedRoute,
        private dialogService: DialogService
    ) {
        this.vendorId = this.activatedRoute.params['value'].vendorId;
        this.loadPaymentFunction(this.vendorId);
        this.cartTotalSub = store.select(this.paymentFunction.getRootCheckoutGetCartTotal()).subscribe(cartTotal => {
            this.cartTotal = cartTotal;
        });

        this.cartIsLoading$ = store.select(this.paymentFunction.getRootCheckoutGetLoadingState());

        this.allowCOD = this.checkAllowCOD();
    }

    ngOnDestroy(){
        this.cartTotalSub.unsubscribe();
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
            method: 'cashondelivery',
            additional_data: {}
        };

        this.store.dispatch(this.paymentFunction.getCartUpdatePaymentInformationAction(paymentMethod));
    }

    checkAllowCOD(){
        // fixme: hard code product not allow --- MD request
        const res = _.find(this.cartTotal.items, item => {
            if(item.product_id === 3153037 || item.product_id === 3153353) return item;
        });

        return this.cartTotal.base_subtotal_with_discount <= this.codMaximumPrice && !res;
    }

    // must implement if extends
    loadPaymentFunction(vendorId = null){
        this.paymentFunction = new NormalPayment(this.store);
    }

}
