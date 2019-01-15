import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, Dispatcher } from '@ngrx/store';
import * as _ from 'lodash';
import { AppConstants } from '../../../../app.constant';
import * as fromRoot from '../../../../store/index';
import * as account from '../../../../store/account/account.actions';
import { Observable } from 'rxjs/Observable';

declare var $;
@Component({
    selector: 'app-account-address-edit',
    templateUrl: './edit.html',
    styleUrls: ['./edit.less']
})
export class LotteAccountAddressEdit {
    address: any;
    selectedCity: any;
    selectedDistrict: any;
    selectedWard: any;
    isDefaultBilling: Boolean;
    isDefaultShipping: Boolean;
    isSaveAddress: Boolean;
    regions: any = [];
    userInfo: any;
    emailRegex: any = AppConstants.REGEX.EMAIL;
    phoneRegex: any = AppConstants.REGEX.TELEPHONE;

    userInfoSub: any;
    regionSub: any;
    dispatcherSub: any;
    constructor(private store: Store<fromRoot.AppState>, private activatedRoute: ActivatedRoute, private router: Router, private dispatcher: Dispatcher) {
        this._initAddress();

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

        this.userInfoSub = this.store.select(fromRoot.accountGetInfo)
            .subscribe((userInfo: any) => {
                this.userInfo = userInfo;
                const addressId = this.activatedRoute.params['value'].id;
                if (!_.isEmpty(userInfo) && !this.selectedCity) {
                    this.address = _.find(userInfo.addresses, (address: any) => address.id.toString() === addressId);
                    this.address.default_billing = userInfo.default_billing === this.address.id.toString();
                    this.isDefaultBilling = _.clone(this.address.default_billing);
                    this.address.default_shipping = userInfo.default_shipping === this.address.id.toString();
                    this.isDefaultShipping = _.clone(this.address.default_shipping);
                }
            });

        this.regionSub = this.store.select(fromRoot.commonGetRegions)
            .subscribe((regions) => {
                this.regions = regions;
                if (regions.length && !_.isEmpty(this.address.extension_attributes)) {
                    this.selectedCity = _.find(regions, (city: any) => city.id === this.address.region_id.toString());
                    this.selectedDistrict = _.find(this.selectedCity.districts, (district: any) => district.id === this.address.extension_attributes.district_id.toString());
                    this.selectedWard = _.find(this.selectedDistrict.wards, (ward: any) => ward.id === this.address.extension_attributes.ward_id.toString());
                }
            });
    }

    _initAddress() {
        this.address = {
            extension_attributes: {},
            street: [''],
            region: {}
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
        const cloneUserInfo = _.cloneDeep(this.userInfo);
        if (this.address.default_billing) {
            cloneUserInfo.default_billing = this.address.id.toString();
        }
        if (this.address.default_shipping) {
            cloneUserInfo.default_shipping = this.address.id.toString();
        }
        const idx = _.findIndex(cloneUserInfo.addresses, (address: any) => address.id === this.address.id);
        _.each(cloneUserInfo.addresses, (address: any) => {
            delete address.default_billing;
            delete address.default_shipping;
        });
        cloneUserInfo.addresses[idx] = _.cloneDeep(this.address);
        delete cloneUserInfo.phone_number;
        delete cloneUserInfo.number_orders;
        delete cloneUserInfo.number_product_wishlist;
        delete cloneUserInfo.is_subscribed;
        delete cloneUserInfo.district;
        delete cloneUserInfo.ward;
        delete cloneUserInfo.marital_status;
        delete cloneUserInfo.anniversary_date;
        delete cloneUserInfo.street;
        delete cloneUserInfo.city;
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
