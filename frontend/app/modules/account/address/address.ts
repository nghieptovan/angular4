import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import * as fromRoot from '../../../store/index';
import * as account from '../../../store/account/account.actions';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
// Redux
@Component({
    selector: 'app-account-address',
    templateUrl: './address.html',
    styleUrls: ['./address.less']
})
export class LotteAccountAddress {
    addresses: any = [];
    userInfo: any;
    defaultShipping: any;
    defaultBilling: any;

    accountInfoSub: any;
    constructor(private store: Store<fromRoot.AppState>, private router: Router) {
        this.accountInfoSub = this.store.select(fromRoot.accountGetInfo)
            .subscribe((userInfo) => {
                this.userInfo = userInfo;
                if (this.userInfo && this.userInfo.addresses && !this.userInfo.addresses.length) {
                    this.router.navigate(['/account/address/new']);
                }

                if (!userInfo.default_billing) {
                    userInfo.default_billing = -1;
                }

                if (!userInfo.default_shipping) {
                    userInfo.default_shipping = -1;
                }
                this.defaultBilling = _.find(userInfo.addresses, (address: any) => address.id.toString() === userInfo.default_billing.toString());
                this.defaultShipping = _.find(userInfo.addresses, (address: any) => address.id.toString() === userInfo.default_shipping.toString());

                this.addresses = _.filter(userInfo.addresses, (address: any) => {
                    return address.id.toString() !== userInfo.default_billing.toString() && address.id.toString() !== userInfo.default_shipping.toString();
                });

            });
    }

    ngOnDestroy() {
        this.accountInfoSub.unsubscribe();
    }

    deleteAddress(address) {
        const cloneUserInfo = _.cloneDeep(this.userInfo);
        const idx = _.findIndex(cloneUserInfo.addresses, (addr: any) => addr.id === address.id);
        cloneUserInfo.addresses.splice(idx, 1);
        delete cloneUserInfo.phone_number;
        delete cloneUserInfo.number_orders;
        delete cloneUserInfo.district;
        delete cloneUserInfo.ward;
        delete cloneUserInfo.number_product_wishlist;
        delete cloneUserInfo.is_subscribed;
        delete cloneUserInfo.marital_status;
        delete cloneUserInfo.anniversary_date;
        delete cloneUserInfo.street;
        delete cloneUserInfo.city;
        this.store.dispatch(new account.UpdateInfo({ customer: cloneUserInfo }));
    }
}
