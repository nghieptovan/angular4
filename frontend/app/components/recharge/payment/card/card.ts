import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Dispatcher, Store} from '@ngrx/store';
import {DialogService} from 'ng2-bootstrap-modal';
import {NgForm} from '@angular/forms';

import * as fromRoot from '../../../../store';
import {AppConstants} from '../../../../app.constant';

import * as rechargeAction from '../../../../store/recharge/recharge.actions';

import * as _ from 'lodash';
import {RechargeService} from '../../../../store/recharge/recharge.service';

@Component({
    selector: 'app-recharge-payment-card',
    templateUrl: './card.html'
})
export class PaymentCardRechargeComponent {

    @ViewChild('creditCardForm') creditCardForm: NgForm;

    @Input('promotion') promotion: string;

    ccPromotion: any;

    selectedPaymentSub: any;
    selectedPayment: any;

    regexCardNumber: any;
    regexNumber: any = new RegExp(/^[1-9][0-9]*$/);
    years: Array<number> = [];
    months: Array<number> = [];

    isUserInfoValid: Boolean = true;

    constructor(protected store: Store<fromRoot.AppState>, protected dialogService: DialogService, dispatcher: Dispatcher, protected rechargeService: RechargeService) {
        this.regexCardNumber = AppConstants.REGEX.CARD_NUMBER;

        this.selectedPaymentSub = this.store.select(fromRoot.rechargeSelectPayment).subscribe(state => {
            this.selectedPayment = state;
        });

        this.selectedPayment.additional_data.credit_card_month = 0;
        this.selectedPayment.additional_data.credit_card_year = 0;


        this.rechargeService.listenIsUserValidEvent().subscribe((message: boolean) => {
            this.isUserInfoValid = message;
        });

        let currentYear = (new Date()).getFullYear();
        for (let i = 0; i <= 10; i++) {
            this.years.push(currentYear++);
        }

        this.months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

        dispatcher.subscribe((action) => {
            switch (action.type) {
                case '[Recharge] CC transaction request successfully':
                    const data = action.payload;
                    if (data.success) {
                        this._createAndSubmitDynamicCCForm(data);
                    }
                    break;
                default:
                    break;
            }
        });
    }

    ngOnDestroy() {
        this.selectedPaymentSub.unsubscribe();
    }

    placeOrder() {
        this.rechargeService.emitPlaceOrderEvent(true);

        if (this.selectedPayment) {

            if (!this.creditCardForm.invalid && this.isUserInfoValid) {
                this.store.dispatch(new rechargeAction.PlaceOrder({'selectPayment': this.selectedPayment}));
            }
        }
    }

    _createAndSubmitDynamicCCForm(data) {
        const submitUrl = data.submit_url ? data.submit_url : AppConstants.CHECKOUT.VIETTIN_GATEWAY_URL;
        const form = document.createElement('form');
        const month = this.selectedPayment.additional_data.credit_card_month ? this.selectedPayment.additional_data.credit_card_month.toString().padZero(2) : '01';
        const year = this.selectedPayment.additional_data.credit_card_year ? this.selectedPayment.additional_data.credit_card_year.toString().padZero(4) : '2017';
        const cardData = {
            card_number: this.selectedPayment.additional_data.credit_card_number.toString(),
            card_cvn: this.selectedPayment.additional_data.credit_card_ccv.toString(),
            card_expiry_date: month + '-' + year
        };
        _.extend(data.fields, cardData);
        _.forEach(data.fields, (value: string, key: string) => {
            const input = document.createElement('input');
            input.name = key.toString();
            input.value = value.toString();
            form.appendChild(input);
        });
        form.method = 'POST';
        form.action = submitUrl;
        document.body.appendChild(form);
        form.submit();
    }
}

