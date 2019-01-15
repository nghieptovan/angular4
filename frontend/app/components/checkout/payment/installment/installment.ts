import { Component } from '@angular/core';
import { Dispatcher, Store } from '@ngrx/store';
import * as _ from 'lodash';
import { DialogService } from 'ng2-bootstrap-modal';
import { Observable } from 'rxjs/Observable';

import { AppConstants } from '../../../../app.constant';
import { ConfirmModal } from '../../../../modals/confirm/confirm';
import * as checkout from '../../../../store/checkout/checkout.actions';
import * as fromRoot from '../../../../store/index';

@Component({
    selector: 'lt-checkout-payment-by-installment',
    templateUrl: './installment.html',
    styleUrls: ['./installment.less']
})

export class LtCheckoutPaymentByInstallmentComponent {

    installmentMinumumPrice: any;
    cartTotal$: Observable<any>;
    cartIsLoading$: Observable<any>;
    paymentRules$: Observable<any>;

    currentBank: any;
    currentTerm: any = 0;

    availableTerms: Array<any> = [];
    agreeWithTerms: Boolean = false;

    // Property to binding to credit card component
    isCardValid: Boolean = false;
    card: any = {
        year: (new Date()).getFullYear(),
        month: (new Date()).getMonth(),
        cvv: '',
        placeholder: '',
        number: '',
        date:null
    };

    selected : any;
    constructor(private store: Store<fromRoot.AppState>, dispatcher: Dispatcher, private dialogService: DialogService) {
        this.cartTotal$ = this.store.select(fromRoot.checkoutGetCartTotal);
        this.paymentRules$ = this.store.select(fromRoot.checkoutGetPaymentRules);
        this.cartIsLoading$ = store.select(fromRoot.checkoutGetLoadingState);
        this.store.dispatch(new checkout.CartGetPaymentRules());

        dispatcher.subscribe((action) => {
            switch (action.type) {
                case checkout.CART_CC_TRANSACTION_REQUEST_SUCCESS:
                    const data = action.payload;
                    if (data.success) {
                        this._createAndSubmitDynamicCCForm(data);
                    }
                    break;
                default:
                    break;
            }
        });

        this.installmentMinumumPrice = AppConstants.CHECKOUT.INSTALLMENT_MINIMUM_PRICE;
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
        let splitDate = this.card.date.split('/');
        if(splitDate.length > 0){
            this.card.month = splitDate[0];
            this.card.year = '20'+splitDate[1];
        }

        const paymentMethod = {
            method: 'vietin_gateway_installment',
            additional_data: {
                bankInstallment: this.currentBank.swift_code,
                bankInstallmentTerm: this.currentTerm,
                cardCVN: this.card.cvv,
                cardExpMonth: this.card.month,
                cardExpYear: this.card.year,
                cardName: this.card.placeholder,
                cardNumber: this.card.number,
                isNewCcCard: true,
                isSaveMyCard: false,
                selectedCard: 'new_cc_card',
                isAcceptInstallment: true,
                transaction_result: ''
            }
        };
        this.store.dispatch(new checkout.CartUpdatePaymentInformation(paymentMethod));
    }

    onBankChanged(bank) {
        if (bank) {
            this.availableTerms = bank.payment_terms.split(',');
            localStorage.setItem('installmentBank', bank.swift_code);
        }
    }

    _createAndSubmitDynamicCCForm(data) {
        const submitUrl = data.submit_url ? data.submit_url : AppConstants.CHECKOUT.VIETTIN_GATEWAY_URL;
        const form = document.createElement('form');
        const month = this.card.month ? this.card.month.toString().padZero(2) : '01';
        const year = this.card.year ? this.card.year.toString().padZero(4) : '2017';
        const cardData = {
            card_number: this.card.number.toString(),
            card_cvn: this.card.cvv.toString(),
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
