import { Component } from '@angular/core';
import { Dispatcher, Store, Action } from '@ngrx/store';
import { DialogService } from 'ng2-bootstrap-modal';
import { Observable } from 'rxjs/Observable';

import { ConfirmModal } from '../../../../modals/confirm/confirm';
import * as checkout from '../../../../store/checkout/checkout.actions';
import * as fromRoot from '../../../../store/index';
import {CartManagement} from "../../../base/cart/CartManagement";
import {ActivatedRoute} from "@angular/router";
import {NormalPayment} from "../../../base/payment/NormalPayment";

@Component({
    selector: 'lt-checkout-payment-by-atm',
    templateUrl: './atm.html',
    styleUrls: ['./atm.less']
})

export class LtCheckoutPaymentByAtmComponent {

    paymentRules$: Observable<any>;
    cartIsLoading$: Observable<any>;
    paymentType:any;
    currentBank = null;
    vendorId: number;
    paymentFunction: any;

    selected : any;
    constructor(protected store: Store<fromRoot.AppState>, dispatcher: Dispatcher,
                protected activatedRoute: ActivatedRoute,
                private dialogService: DialogService
    ) {
        this.vendorId = this.activatedRoute.params['value'].vendorId;
        this.loadPaymentFunction(this.vendorId);

        this.paymentRules$ = this.store.select(this.paymentFunction.getRootCheckoutGetPaymentRules());
        this.cartIsLoading$ = store.select(this.paymentFunction.getRootCheckoutGetLoadingState());
        this.store.dispatch(this.paymentFunction.getCartGetPaymentRulesAction());
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
            method: 'local_atm',
            additional_data: {
                bankPayment: this.currentBank.value
            }
        };
        this.store.dispatch(this.paymentFunction.getCartUpdatePaymentInformationAction(paymentMethod));
    }

    selectPaymentType(type) {
        this.paymentFunction.storeStorage('selectedPaymentType', type);
    }

    // must implement if extends
    loadPaymentFunction(vendorId = null){
        this.paymentFunction = new NormalPayment(this.store);
    }
}
