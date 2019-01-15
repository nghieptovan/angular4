import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {NgForm} from '@angular/forms';
import {AppConstants} from '../../../app.constant';

import * as fromRoot from '../../../store';
import * as rechargeAction from '../../../store/recharge/recharge.actions';
import * as _ from 'lodash';
import {Observable} from 'rxjs/Observable';
import {RechargeService} from '../../../store/recharge/recharge.service';

declare var $;

@Component({
    selector: 'app-recharge-summary',
    templateUrl: './summary.html'
})
export class SummaryRechargeComponent {

    @ViewChild('summaryForm') summaryForm: NgForm;

    qtyOptionsList: any

    cartRequestSub: any
    cartRequest: any;

    cartInfoSub: any
    cartInfo: any

    cartTotalSub: any
    cartTotal: any

    providerSelectedSub: any
    providerSelected: any

    providerLoadSub: any
    providers: any

    userInfoSub: any;
    userInfo: any;

    configsSub: any;
    configs: any;
    prefixNumber: any;

    regexPhoneNumber: any
    regexEmail: any

    authIsLoggedIn$: Observable<any>;

    constructor(protected  store: Store<fromRoot.AppState>, protected  activatedRoute: ActivatedRoute, protected rechargeService: RechargeService) {
        this.regexPhoneNumber = AppConstants.REGEX.TELEPHONE;
        this.regexEmail = AppConstants.REGEX.EMAIL;

        this.qtyOptionsList = _.range(1, 6);

        this.cartInfoSub = this.store.select(fromRoot.rechargeGetCartInfo).subscribe(rechargeCartInfo => {
            this.cartInfo = rechargeCartInfo;
        });

        this.cartTotalSub = this.store.select(fromRoot.rechargeGetCartTotal).subscribe(rechargeCartTotal => {
            this.cartTotal = rechargeCartTotal;
        });

        this.cartRequestSub = this.store.select(fromRoot.rechargeGetCartRequest).subscribe(cartRequest => {
            this.cartRequest = cartRequest;
        });

        this.providerSelectedSub = this.store.select(fromRoot.rechargeSelectProvider).subscribe(selectedProvider => {
            this.providerSelected = selectedProvider;
        });

        this.providerLoadSub = this.store.select(fromRoot.rechargeGetProvider).subscribe(loadProviders => {
            this.providers = loadProviders;
        });

        this.userInfoSub = this.store.select(fromRoot.accountGetInfo).subscribe((info) => {
            this.cartRequest.user_phone_number = info.phone_number ? info.phone_number : '';

            this.cartInfo.user_email = info.email ? info.email : '';
            this.cartInfo.user_phone_number = info.phone_number ? info.phone_numbe : '';
        });

        this.authIsLoggedIn$ = this.store.select(fromRoot.authGetLoggedInState);

        this.configsSub = this.store.select(fromRoot.rechargeGetConfigs).subscribe((configs) => {
            this.configs = configs;
        });

        this.rechargeService.listenPlaceOrderEvent().subscribe((message: boolean) => {
            this.submitOrderEvent(message);
        });
    }

    ngAfterViewInit() {
        this.summaryForm.valueChanges.debounceTime(500).subscribe((any) => {
            this.rechargeService.emitIsUserValidEvent(!this.summaryForm.invalid);
        });
    }

    submitOrderEvent(message) {
        if (message) {
            Object.keys(this.summaryForm.controls).forEach(field => {
                const control = this.summaryForm.form.get(field);
                control.markAsTouched({onlySelf: true});
                control.markAsDirty({onlySelf: true});
            });
            if ($('input[name=user_phone]').hasClass('mage-error') || $('input[name=user_email]').hasClass('mage-error')) {
                this.rechargeService.emitIsUserValidEvent(false);
            }else{
                this.rechargeService.emitIsUserValidEvent(true);
            }
        }
    }

    ngOnDestroy() {
        this.cartInfoSub.unsubscribe();
        this.cartRequestSub.unsubscribe();
        this.cartTotalSub.unsubscribe();
        this.providerSelectedSub.unsubscribe();
        this.providerLoadSub.unsubscribe();
        this.userInfoSub.unsubscribe();
        this.configsSub.unsubscribe();
    }

    selectProductQty(productQty) {
        if (this.cartRequest.product_id <= 0) {
            return false;
        }
        const rechargeCartId = localStorage.getItem('rechargeCartId');
        if (rechargeCartId) {
            this.store.dispatch(new rechargeAction.UpdateCartProduct({'cartRequest': this.cartRequest}));
        } else {
            this.store.dispatch(new rechargeAction.CreateCart('for_update'));
        }
    }

    validatePrefixPhone() {

        let phoneNumber = null;

        if (this.cartRequest.user_phone_number) {
            phoneNumber = this.cartRequest.user_phone_number.replace('+84', '0');
        }
        if (phoneNumber && phoneNumber.length > 4) {

            if (!this.prefixNumber && this.configs.prefix_phone_number) {
                this.prefixNumber = JSON.parse(this.configs.prefix_phone_number);

            }
            for (const keyProvider in this.prefixNumber) {
                for (const keyPrefix in this.prefixNumber[keyProvider]) {
                    if (phoneNumber.indexOf(this.prefixNumber[keyProvider][keyPrefix]) === 0) {
                        return true;
                    }
                }
            }

        }
        return false;
    }
}
