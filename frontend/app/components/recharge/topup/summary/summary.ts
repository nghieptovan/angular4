import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';


import {SummaryRechargeComponent} from '../../summary/summary';
import * as fromRoot from '../../../../store';
import {RechargeService} from '../../../../store/recharge/recharge.service';

@Component({
    selector: 'app-topup-summary',
    templateUrl: './summary.html'
})
export class TopupSummaryComponent extends SummaryRechargeComponent {

    constructor(protected  store: Store<fromRoot.AppState>, protected activatedRoute: ActivatedRoute, protected rechargeService: RechargeService) {
        super(store, activatedRoute, rechargeService);
    }

    getUserPhoneValid() {
        return this.cartRequest.user_phone_number;
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
