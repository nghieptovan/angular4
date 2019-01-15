import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, Dispatcher } from '@ngrx/store';
import * as _ from 'lodash';
import { AppConstants } from '../../../../app.constant';
import * as fromRoot from '../../../../store/index';
import * as account from '../../../../store/account/account.actions';
import { Observable } from 'rxjs/Observable';
import { UserInfoTransformer } from '../../../../transformers/UserInfoTransformer';

declare var $;
@Component({
    selector: 'app-account-address-new',
    templateUrl: './new.html',
    styleUrls: ['./new.less']
})
export class LotteAccountAddressNew {
    address: any = {
        extension_attributes: {}
    };
    selectedCity: any = null;
    selectedDistrict: any = null;
    selectedWard: any = null;
    isSaveAddress: Boolean;
    regions: any = [];
    userInfo: any;
    emailRegex: any = AppConstants.REGEX.EMAIL;
    phoneRegex: any = AppConstants.REGEX.TELEPHONE;

    userInfoSub: any;
    regionSub: any;
    dispatcherSub: any;
    constructor(private store: Store<fromRoot.AppState>, private activatedRoute: ActivatedRoute,
        private dispatcher: Dispatcher, private router: Router) {
        this._initAddress();
        this.userInfoSub = this.store.select(fromRoot.accountGetInfo)
            .subscribe((userInfo: any) => {
                this.userInfo = userInfo;
                const addressId = this.activatedRoute.params['value'].id;
                if (!_.isEmpty(userInfo)) {
                    this.address.lastname = userInfo.lastname;
                    this.address.firstname = userInfo.firstname;
                }
            });

        this.dispatcherSub = dispatcher.subscribe((action) => {
            switch (action.type) {
                case account.UPDATE_INFO_SUCCESS:
                    if (this.isSaveAddress) {
                        this.router.navigate(['account/address']);
                        this.isSaveAddress = false;
                    }

                    break;
                default:
                    break;
            }

        });

        this.regionSub = this.store.select(fromRoot.commonGetRegions)
            .subscribe((regions) => {
                this.regions = regions;
            });
    }

    _initAddress() {
        this.address = {
            extension_attributes: {},
            street: [''],
            region: {},
            country_id: 'VN',
            postcode: '70000'
        };
    }

    selecteArea(city, district) {
        if (district) {
            this.selectedWard = null;
            return;
        }
        this.selectedDistrict = null;
        this.selectedWard = null;
    }

    saveAddress(form) {
        if (form.invalid) {
            return;
        }
        this.parseAddress();
        this.isSaveAddress = true;
        if (!this.userInfo.addresses || (this.userInfo.addresses && !this.userInfo.addresses.length)) {
            this.address.default_billing = true;
            this.address.default_shipping = true;
        }
        const cloneUserInfo = _.cloneDeep(this.userInfo);
        cloneUserInfo.addresses.push(this.address);
        // cloneUserInfo = UserInfoTransformer.transform(cloneUserInfo);

        if (this.address.default_billing) {
            cloneUserInfo.default_billing = this.address.id;
        }
        if (this.address.default_shipping) {
            cloneUserInfo.default_shipping = this.address.id;
        }
        delete cloneUserInfo.phone_number;
        delete cloneUserInfo.number_orders;
        delete cloneUserInfo.number_product_wishlist;
        delete cloneUserInfo.is_subscribed;
        delete cloneUserInfo.marital_status;
        delete cloneUserInfo.anniversary_date;
        delete cloneUserInfo.district;
        delete cloneUserInfo.ward;
        delete cloneUserInfo.street;
        delete cloneUserInfo.city;
        delete cloneUserInfo.comment;
        this.store.dispatch(new account.UpdateInfo({ customer: cloneUserInfo }));
    }

    parseAddress() {
        this.address.district = _.clone(this.selectedDistrict.name);
        this.address.city = _.clone(this.selectedCity.name);
        this.address.ward = _.clone(this.selectedWard.name);
        this.address.extension_attributes.district_id = Number.parseInt(this.selectedDistrict.id);
        this.address.region_id = Number.parseInt(this.selectedCity.id);
        this.address.extension_attributes.ward_id = Number.parseInt(this.selectedWard.id);
    }

    ngOnInit() {
        $('body').addClass('customer-address-form');
    }

    ngOnDestroy() {
        this.userInfoSub.unsubscribe();
        this.regionSub.unsubscribe();
        this.dispatcherSub.unsubscribe();
        $('body').removeClass('customer-address-form');
    }
}

