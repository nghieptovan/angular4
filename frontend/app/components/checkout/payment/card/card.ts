import { Component, Input } from '@angular/core';
import { Dispatcher, Store } from '@ngrx/store';
import * as _ from 'lodash';
import { DialogService } from 'ng2-bootstrap-modal';
import { Observable } from 'rxjs/Observable';

import { ConfirmModal } from '../../../../modals/confirm/confirm';
import * as checkout from '../../../../store/checkout/checkout.actions';
import * as fromRoot from '../../../../store/index';
import { AppConstants } from '../../../../app.constant';
import {ActivatedRoute} from "@angular/router";
import {NormalPayment} from "../../../base/payment/NormalPayment";

@Component({
    selector: 'lt-checkout-payment-by-card',
    templateUrl: './card.html',
    styleUrls: ['./card.less']
})

export class LtCheckoutPaymentByCardComponent {
    promotionType: any;
    paymentTypeParent : any;
    cartIsLoading$: Observable<any>;
    promotions: Array<any>;
    vendorId: number;
    paymentFunction: any;

    isCardValid: Boolean = false;
    card: any = {
        year: null,
        month: null,
        cvv: '',
        placeholder: '',
        number: '',
        is_save_my_card: false,
        date:null
    };
    allowedPaymentMethods: Array<any>;
    @Input() promotion: any;
    @Input() paymentType: any;

    constructor(
        protected store: Store<fromRoot.AppState>, dispatcher: Dispatcher,
        protected activatedRoute: ActivatedRoute,
        private dialogService: DialogService
    ) {
        this.vendorId = this.activatedRoute.params['value'].vendorId;
        this.loadPaymentFunction(this.vendorId);

        this.allowedPaymentMethods = JSON.parse(localStorage.getItem('allowedPaymentMethods'));
        this.cartIsLoading$ = store.select(fromRoot.checkoutGetLoadingState);
        this.promotions = _.filter(this.allowedPaymentMethods, (method) => {
            return method.code.indexOf('vietin_gateway_promotion') === 0;
        });
        this.promotionType = localStorage.getItem('selectedPromotionType');
        this.paymentTypeParent = this.paymentFunction.getStorage('selectedPaymentType');

        dispatcher.subscribe((action) => {
            switch (action.type) {
                case this.paymentFunction.getCART_CC_TRANSACTION_REQUEST_SUCCESSConst():
                    const data = action.payload;
                    if (data.success) {
                        this._createAndSubmitDynamicCCForm(data);
                    }
                    break;
                default:
                    break;
            }
        });

        if (this.promotionType) {
            this.selectPromotionPayment(this.promotionType);
        } else {
            this.selectPromotionPayment('vietin_gateway');
        }
    }

    hasPayment(type: String) {
        return _.findIndex(this.allowedPaymentMethods, (method) => method.code === type) > -1;
    }

    backToPreviousStep() {
        this.dialogService.addDialog(ConfirmModal)
            .subscribe((isConfirm) => {
                if (isConfirm) {
                    this.store.dispatch(this.paymentFunction.getUpdateCurrentStepAction(2));
                }
            });
    }

    getPayment(type: String) {
        return _.find(this.allowedPaymentMethods, (method) => method.code === type);
    }

    selectPromotionPayment(promotion) {

        this.paymentTypeParent = 'vietin_gateway';
        this.paymentFunction.storeStorage('selectedPaymentType',this.paymentTypeParent);

        if (this.promotionType !== promotion) {

            this.promotionType = promotion;
            localStorage.setItem('selectedPromotionType', promotion);
            let postData = {};

            if (localStorage.getItem('token')) {
                postData = {
                    cartId: this.paymentFunction.getStorage('cartId'),
                    method: this._getPaymentPostData()
                };
            } else {
                const billingAddress = JSON.parse(this.paymentFunction.getStorage('billingAddress'));
                if (billingAddress) {
                    postData = {
                        email: billingAddress.extension_attributes.email_address,
                        paymentMethod: this._getPaymentPostData()
                    };
                }
            }
            this.resetCardInfomation();
            this.store.dispatch(this.paymentFunction.getCartSetPaymentMethodAction(postData));
        }
    }

    resetCardInfomation() {
        this.card = {
            year: null,
            month: null,
            cvv: '',
            placeholder: '',
            number: '',
            is_save_my_card: false,
            date:null
        };
    }

    submitPayment() {
        if (this.isCardValid) {
            const paymentMethod = this._getPaymentPostData();
            this.store.dispatch(this.paymentFunction.getCartUpdatePaymentInformationAction(paymentMethod));
        }
    }

    _getPaymentPostData() {
        let splitDate = this.card.date.split('/');
        if(splitDate.length > 0){
            this.card.month = splitDate[0];
            this.card.year = '20'+splitDate[1];
        }

        return {
            method: this.promotionType,
            additional_data: {
                cardCVN: this.card.cvv.toString(),
                cardExpMonth: this.card.month,
                cardExpYear: this.card.year,
                cardName: this.card.placeholder.toString(),
                cardNumber: this.card.number.toString(),
                isNewCcCard: true,
                isSaveMyCard: this.card.is_save_my_card,
                selectedCard: 'new_cc_card',
                transaction_result: ''
            }
        };
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

    // must implement if extends
    loadPaymentFunction(vendorId = null){
        this.paymentFunction = new NormalPayment(this.store);
    }

}
