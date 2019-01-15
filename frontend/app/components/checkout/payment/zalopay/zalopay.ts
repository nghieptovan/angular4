import { Component } from '@angular/core';
import { Dispatcher, Store } from '@ngrx/store';
import { DialogService } from 'ng2-bootstrap-modal';
import { Observable } from 'rxjs/Observable';

import { AppConstants } from '../../../../app.constant';
import { ConfirmModal } from '../../../../modals/confirm/confirm';
import * as fromRoot from '../../../../store';
import * as checkout from '../../../../store/checkout/checkout.actions';

@Component({
    selector: 'lt-checkout-payment-by-zalo',
    templateUrl: './zalopay.html',
    styleUrls: ['./zalopay.less']
})

export class LtCheckoutPaymentByZaloComponent {

    cartTotal$: Observable<any>;
    cartIsLoading$: Observable<any>;

    cartTotalSub:any;
    cartTotal:any;

    dispatcher: any;

    constructor(private store: Store<fromRoot.AppState>, dispatcher: Dispatcher, private dialogService: DialogService) {
        this.cartTotalSub = store.select(fromRoot.checkoutGetCartTotal).subscribe(cartTotal => {
            this.cartTotal = cartTotal;
        });
        this.cartIsLoading$ = store.select(fromRoot.checkoutGetLoadingState);
    }

    backToPreviousStep() {
        this.dialogService.addDialog(ConfirmModal)
            .subscribe((isConfirm) => {
                if (isConfirm) {
                    this.store.dispatch(new checkout.UpdateCurrentStep(2));
                }
            });
    }

    submitPayment() {
        const paymentMethod = {
            method: 'zalopay',
            additional_data: {}
        };

        this.store.dispatch(new checkout.CartUpdatePaymentInformation(paymentMethod));
    }

    selectPaymentType(type) {
        localStorage.setItem('selectedPaymentType', type);
    }

}
