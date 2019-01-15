import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DialogService } from 'ng2-bootstrap-modal';
import { Observable } from 'rxjs/Observable';

import { AppConstants } from '../../../../app.constant';
import * as fromRoot from '../../../../store/index';
import { CvvGuideModal } from './../../../../modals/cvvguide/cvvguide';
import { TextMaskModule } from 'angular2-text-mask';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe.js'
import * as checkout from '../../../../store/checkout/checkout.actions';
import {ActivatedRoute} from "@angular/router";
import {NormalPayment} from "../../../base/payment/NormalPayment";

declare var $;
@Component({
    selector: 'lt-credit-card',
    templateUrl: './credit-card.html',
    styleUrls: ['./credit-card.less'],
})
export class LtCheckoutCreditCardComponent {
    public mask = [/\d/, /\d/, '/', /\d/, /\d/];
    public autoCorrectedDatePipe = createAutoCorrectedDatePipe('mm/yy', {
        minyear: 18,
        maxyear: 99
    });

    @ViewChild('cardForm') cardForm: NgForm;

    @Output('validationChange') validationChange = new EventEmitter<Boolean>();

    @Input() card: any;
    @Input() uid: any;

    years: Array<number> = [];
    months: Array<number> = [];
    description: any;

    regexCardNumber: any;
    regexCvv: any;
    regexExpiredDate: any;

    authIsLoggedIn$: Observable<any>;

    regexDate:any;

    dated: any = '';
    cardNoValid: boolean = true;
    cardNoValidSub: any;
    cardNoTimeoutId: any;
    vendorId: number;
    paymentFunction: any;

    constructor(protected store: Store<fromRoot.AppState>, private dialogService: DialogService, protected activatedRoute: ActivatedRoute,) {
        this.vendorId = this.activatedRoute.params['value'].vendorId;
        this.loadPaymentFunction(this.vendorId);

        this.regexCardNumber = AppConstants.REGEX.CARD_NUMBER;
        this.regexCvv = AppConstants.REGEX.CVV;
        this.regexExpiredDate = AppConstants.REGEX.EXPIRED_DATE;
        this.authIsLoggedIn$ = this.store.select(fromRoot.authGetLoggedInState);
        let currentYear = (new Date()).getFullYear();
        for (let i = 0; i <= 10; i++) {
            this.years.push(currentYear++);
        }

        this.months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        this.description = 1;

        this.cardNoValidSub = this.store.select(fromRoot.checkoutGetCardNoValid).subscribe(valid => {
            this.cardNoValid = valid;
        });
    }

    ngAfterViewInit() {
        this.cardForm.valueChanges.debounceTime(500).subscribe((something) => {
            this.validationChange.emit(!this.cardForm.invalid && this.cardNoValid);
        });
    }

    // onCvvPress() {
    //     if (this.card.cvv.length > 3) {
    //         return false;
    //     }
    //     return true;
    // }

    showCvvGuide() {
        this.dialogService.addDialog(CvvGuideModal);
    }

    // validateDate(expiry){
    //     console.log(expiry);
    //     var stillValid = (new Date("01/" + expiry).getTime() > new Date().getTime());
    //     console.log(stillValid);
    // }

    normalizeYear(year){
        // Century fix
        var YEARS_AHEAD = 20;
        if (year<100){
            var nowYear = new Date().getFullYear();
            year += Math.floor(nowYear/100)*100;
            if (year > nowYear + YEARS_AHEAD){
                year -= 100;
            } else if (year <= nowYear - 100 + YEARS_AHEAD) {
                year += 100;
            }
        }
        return year;
    }

    // checkExp(){
    //     var match=$('#exp').val().match(/^\s*(0?[1-9]|1[0-2])\/(\d\d|\d{4})\s*$/);
    //     if (!match){
    //         alert('Input string isn\'t match the expiration date format or date fragments are invalid.')
    //         return;
    //     }
    //     var exp = new Date(this.normalizeYear(1*match[2]),1*match[1]-1,1).valueOf();
    //     var now=new Date();
    //     var currMonth = new Date(now.getFullYear(),now.getMonth(),1).valueOf();
    //     if (exp<=currMonth){
    //         alert('Expired');
    //     } else {
    //         alert('Valid');
    //     };
    // }

    cardNoChange(){
        // clearTimeout(this.cardNoTimeoutId);
        // only support normal checkout.
        if(!this.vendorId){
            const selectedPaymentType = this.paymentFunction.getStorage('selectedPaymentType');
            const selectedPromotionType = this.paymentFunction.getStorage('selectedPromotionType');
            const installmentBank = this.paymentFunction.getStorage('installmentBank');
            if(selectedPaymentType !== 'vietin_gateway' || selectedPromotionType != 'vietin_gateway'){
                // this.cardNoTimeoutId = setTimeout(() => {
                this.store.dispatch(new checkout.cartValidateCardNo({
                    cardNumber:this.card.number.toString(),
                    code: selectedPaymentType !== 'vietin_gateway'?selectedPaymentType:selectedPromotionType,
                    bankInstallment: installmentBank
                }));
                // }, 500);
            }
        }
    }

    ngOnDestroy(){
        this.cardNoValidSub.unsubscribe();
        this.store.dispatch(new checkout.clearCartValidateCardNo());
    }

    // must implement if extends
    loadPaymentFunction(vendorId = null){
        this.paymentFunction = new NormalPayment(this.store);
    }
}


