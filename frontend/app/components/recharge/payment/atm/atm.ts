import {Component, Input, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {RechargeService} from '../../../../store/recharge/recharge.service';
import {NgForm} from '@angular/forms';

import * as fromRoot from '../../../../store';
import * as checkout from '../../../../store/checkout/checkout.actions';
import * as rechargeAction from '../../../../store/recharge/recharge.actions';

@Component({
    selector: 'app-recharge-payment-atm',
    templateUrl: './atm.html'
})
export class PaymentAtmRechargeComponent {

    @ViewChild('localAtmForm') localAtmForm: NgForm;

    selectedPaymentSub: any;
    selectedPayment: any;
    regexString: any = new RegExp(/^[a-zA-Z]+$/);

    paymentRulesSub: any;
    paymentRules: any;

    isUserInfoValid: Boolean = true;

    constructor(protected store: Store<fromRoot.AppState>, protected activatedRoute: ActivatedRoute, protected rechargeService: RechargeService) {
        this.selectedPaymentSub = this.store.select(fromRoot.rechargeSelectPayment).subscribe(state => {
            this.selectedPayment = state;
        });
        this.paymentRulesSub = this.store.select(fromRoot.checkoutGetPaymentRules).subscribe(state => {
            this.paymentRules = state;
        });
        this.selectedPayment.additional_data.local_atm_bank = 0;

        this.rechargeService.listenIsUserValidEvent().subscribe((message: boolean) => {
            this.isUserInfoValid = message;
        });
        this.store.dispatch(new checkout.CartGetPaymentRules());
    }

    ngOnDestroy() {
        this.selectedPaymentSub.unsubscribe();
        this.paymentRulesSub.unsubscribe();
    }

    placeOrder() {
        this.rechargeService.emitPlaceOrderEvent(true);

        if (this.selectedPayment) {

            if (!this.localAtmForm.invalid && this.isUserInfoValid) {
                this.store.dispatch(new rechargeAction.PlaceOrder({'selectPayment': this.selectedPayment}));
            }
        }
    }
}
