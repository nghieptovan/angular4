import {Component, ViewChild, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppConstants} from '../../../../app.constant';
import {NgForm} from '@angular/forms';

import * as fromRoot from '../../../../store';
import * as rechargeAction from '../../../../store/recharge/recharge.actions';

@Component({
    selector: 'app-topup-input-phone',
    templateUrl: './input-phone.html'
})
export class TopupInputPhoneComponent {

    @ViewChild('inputPhoneForm') inputPhoneForm: NgForm;

    cartRequestSub: any
    cartRequest: any;

    providerSub: any;
    providers: any;

    providerSelectedSub: any;
    providerSelected: any;

    configsSub: any;
    configs: any;

    regexPhoneNumber: any;

    prefixNumber: any;
    userInfo: any;

    constructor(private store: Store<fromRoot.AppState>, private activatedRoute: ActivatedRoute) {
        this.regexPhoneNumber = AppConstants.REGEX.TELEPHONE;


        this.providerSub = this.store.select(fromRoot.rechargeGetProvider).subscribe(loadProviders => {
            this.providers = loadProviders;

            if (localStorage.getItem('userInfo')) {
                this.userInfo = JSON.parse(localStorage.getItem('userInfo'));

                if (this.userInfo && this.userInfo.phone_number) {
                    this.onChangePhoneNumber(this.userInfo.phone_number);
                }
            }
        });

        this.providerSelectedSub = this.store.select(fromRoot.rechargeSelectProvider).subscribe(selectedProvider => {
            this.providerSelected = selectedProvider;

        });

        this.cartRequestSub = this.store.select(fromRoot.rechargeGetCartRequest).subscribe(cartRequest => {
            this.cartRequest = cartRequest;
        });

        this.configsSub = this.store.select(fromRoot.rechargeGetConfigs).subscribe((configs) => {
            this.configs = configs;
        });
    }


    ngOnDestroy() {
        this.cartRequestSub.unsubscribe();
        this.providerSub.unsubscribe();
        this.providerSelectedSub.unsubscribe();
        this.configsSub.unsubscribe();
    }

    onChangePhoneNumber(phoneNumber) {
        if (phoneNumber && phoneNumber.length > 4) {
            const selectedProvider = this.getProviderCode(phoneNumber);
            if (selectedProvider.value !== '') {
                this.store.dispatch(new rechargeAction.SelectProvider({selectedProvider: selectedProvider}));
            }
        }
    }

    getProviderCode(phoneNumber) {

        phoneNumber = phoneNumber.replace('+84', '0');

        for (const keyProvider in this.providers) {
            const providerPrefix = this.providers[keyProvider].prefix.split(',');
            for (const keyPrefix in providerPrefix) {
                if (phoneNumber.indexOf(providerPrefix[keyPrefix]) === 0) {
                    return this.providers[keyProvider];
                }
            }
        }

        return '';
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
