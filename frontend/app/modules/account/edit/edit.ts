import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Dispatcher, Store } from '@ngrx/store';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';

import { AppConstants } from '../../../app.constant';
import * as fromRoot from '../../../store';
import * as account from '../../../store/account/account.actions';

declare var $;

// Redux
@Component({
    selector: 'app-account-edit',
    templateUrl: './edit.html',
    styleUrls: ['./edit.less']
})
export class LotteAccountEdit implements OnInit, OnDestroy {
    @Input() uid: any;
    @ViewChild('updateForm') updateForm: NgForm;
    @Output('validationChange') validationChange = new EventEmitter<Boolean>();
    customers: any = {};
    customer: any = {};
    passwordPattern = AppConstants.REGEX.PASSWORD;
    phonePattern = AppConstants.REGEX.TELEPHONE;
    dob: any = {};
    anniversary: any = {};
    isValidWeddingDate: Boolean;
    isValidDobDate: Boolean;
    isFacebookLoggedIn: any;
    currentYear: number;
    commonRegions$: Observable<Array<any>>;
    regions: Array<any> = [];
    address: any = {};
    filter: any;
    userInfo: any = {
        addresses: []
    };
    backupUserInfo: any;
    isChangePassword: Boolean = false;
    appConstants: any;
    selectedCity: any = null;
    selectedDistrict: any = null;
    selectedWard: any = null;
    lpointBanner: any;
    userInfoClone: any;

    dispatcherSub: any;
    cmsContentsSub: any;

    defaultAddress:any = {};
    telephone:any;
    mstreet:any;

    constructor(private store: Store<fromRoot.AppState>,
                private dispatcher: Dispatcher,
                private elementRef: ElementRef,
                private router: Router,
                private toastr: ToastrService,
                private activatedRoute: ActivatedRoute) {
        this.isFacebookLoggedIn = localStorage.getItem('isFacebookLoggedIn');
        this.appConstants = AppConstants;
        this.uid = elementRef.nativeElement.getAttribute('uid');
        this.store.select(fromRoot.accountGetInfo).subscribe((info) => {
            if (info && info.id) {
                this.backupUserInfo = _.cloneDeep(info);
                this.userInfo = _.cloneDeep(info);
                if (!this.userInfo.gender) {
                    this.userInfo.gender = 4;
                }
                this.userInfoClone = _.cloneDeep(this.userInfo);
                if (!this.userInfo.marital_status) {
                    this.userInfo.marital_status = false;
                }
                this.getDefaultAddress()
                // if(this.userInfo.addresses.length > 0){
                //     this.userInfo.phone_number[0] =
                // }

            }
        });

        this.commonRegions$ = this.store.select(fromRoot.commonGetRegions);
        this.store.select(fromRoot.commonGetRegions)
            .subscribe((regions) => {
                this.regions = regions;
                this._initRegions();
            });

        this.dispatcherSub = dispatcher.subscribe((action) => {
            switch (action.type) {
                case account.UPDATE_INFO_SUCCESS:
                    this.router.navigate(['account']);
                    break;
                case account.UPDATE_INFO_FAILED:
                    if (action.payload.message) {
                        this.toastr.error(action.payload.message, 'Lỗi');
                    }

                    break;
                case account.LOAD_INFO_SUCCESS:
                    this._initDateOfBirth();
                    this._initAnniversaryDate();
                    this._initRegions();
                    break;
                default:
                    break;
            }
        });

        this.cmsContentsSub = this.store.select(fromRoot.commonGetCmsContents)
            .subscribe((cmsContent) => {
                this.lpointBanner = _.find(cmsContent, (cms: any) => {
                    return cms.identifier === 'tpo_account_banner';
                });
            });
    }

    private _initRegions() {
        if(this.regions.length > 0  && this.userInfo.addresses.length > 0){
            this.selectedCity     = _.find(this.regions, (city: any) => city.id === this.defaultAddress.region.region_id.toString());
            this.selectedDistrict = _.find(this.selectedCity.districts, (district: any) => district.id === this.defaultAddress.extension_attributes.district_id.toString());
            this.selectedWard     = _.find(this.selectedDistrict.wards, (ward: any) => ward.id === this.defaultAddress.extension_attributes.ward_id.toString());
            this.mstreet          = this.defaultAddress.street[0];
            this.telephone        = this.defaultAddress.telephone;
        }else{
            this.selectedCity     = null;
            this.selectedDistrict = null;
            this.selectedWard     = null;
            this.telephone        = null;
            this.mstreet          = null;
        }
        //console.log(this.defaultAddress)
    }

    private _setAddressIds() {
        if (this.address._city && this.address._city.id) {
            this.address.region_id = this.address._city.id;
        }
        if (this.address._district && this.address._district.id) {
            this.address.district_id = this.address._district.id;
        }
        if (this.address._ward && this.address._ward.id) {
            this.address.ward_id = this.address._ward.id;
        }
        if (this.address.street) {
            this.address._street = this.address.street[0];
        }
    }

    private _initDateOfBirth() {
        if (!('dob' in this.userInfo)) {
            this.dob._day = null;
            this.dob._month = null;
            this.dob._year = null;
        } else {
            this.dob._day = new Date(this.userInfo.dob).getDate();
            this.dob._month = new Date(this.userInfo.dob).getMonth() + 1;
            this.dob._year = new Date(this.userInfo.dob).getFullYear();
        }
        this.currentYear = new Date().getFullYear() - 15;
        this.dob._dates = _.range(1, 32);
        this.dob._months = _.range(1, 13);
        this.dob._years = _.range(this.currentYear, this.currentYear - 69);
    }

    private _initAnniversaryDate() {
        this.currentYear = new Date().getFullYear();
        this.anniversary._dates = _.range(1, 32);
        this.anniversary._months = _.range(1, 13);
        this.anniversary._years = _.range(this.currentYear, this.currentYear - 69);
        if (this.userInfo.marital_status === true && ('anniversary_date' in this.userInfo)) {
            this.anniversary._day = new Date(this.userInfo.anniversary_date).getDate();
            this.anniversary._month = new Date(this.userInfo.anniversary_date).getMonth() + 1;
            this.anniversary._year = new Date(this.userInfo.anniversary_date).getFullYear();
        } else {
            this.anniversary._day = null;
            this.anniversary._month = null;
            this.anniversary._year = null;
        }
    }

    private _initCustomer() {
        this.customers = {
            customer: {
                id: this.userInfo.id,
                email: this.userInfo.email,
                firstname: this.userInfo.firstname,
                lastname: this.userInfo.lastname,
                gender: this.userInfo.gender ? this.userInfo.gender : null,
                store_id: this.userInfo.store_id ? this.userInfo.store_id : null,
                website_id: this.userInfo.website_id ? this.userInfo.website_id : null,
                disable_auto_group_change: this.userInfo.disable_auto_group_change ? this.userInfo.disable_auto_group_change : null,
                extension_attributes: {
                    phone_number: this.userInfo.phone_number ? this.userInfo.phone_number : null,
                    marital_status: this.userInfo.marital_status ? this.userInfo.marital_status : null,
                    anniversary_date: this.userInfo.anniversary_date ? this.userInfo.anniversary_date : null,
                    street: this.userInfo.street ? this.userInfo.street : null,
                    city: this.userInfo.city ? this.userInfo.city : null,
                    district: this.userInfo.district ? this.userInfo.district : null,
                    ward: this.userInfo.ward ? this.userInfo.ward : null
                }
            },
            change_password: {}
        };
    }

    ngOnInit() {
        $('body').addClass('customer-account-edit');
        this._initDateOfBirth();
        this._initAnniversaryDate();
        this.isChangePassword = !!this.activatedRoute.snapshot.queryParams['change-password'];
    }

    ngAfterViewInit(): void {
        this.updateForm.valueChanges.debounceTime(100).subscribe((something) => {
            this.validationChange.emit(!this.updateForm.invalid);
        });
        this.commonRegions$.subscribe((regions: Array<any>) => {
            if (regions.length) {
                setTimeout(() => {
                    this.regions = _.clone(regions);
                }, 10);
            }
        }).unsubscribe();
    }

    selectArea(region, district) {
        setTimeout(() => {
            if (region) {
                this.address._district = null;
                this.address._ward = null;
            }
            if (district) {
                this.address._ward = null;
            }
            this._setAddressIds();
        }, 100);
    }

    updateInfo(updateForm) {
        const form = _.cloneDeep(updateForm.value);
        this.isValidDobDate = this._isValidDateTime(form.day, form.month, form.year);
        this.isValidWeddingDate = this._isValidDateTime(form.wedDay, form.wedMonth, form.wedYear);
        if (updateForm.valid && this.isValidWeddingDate && this.isValidDobDate) {
            //console.log(this.userInfo.addresses)
            this._initCustomer();
            this.customer = this.customers.customer;

            if(this.userInfo.addresses.length <= 0) {
                let address = {
                    extension_attributes: {
                        district_id : Number.parseInt(this.selectedDistrict.id),
                        ward_id     : Number.parseInt(this.selectedWard.id),
                        email_address : this.customer.email
                    },
                    street: [this.mstreet],
                    region: {},
                    region_id : Number.parseInt(this.selectedCity.id),
                    country_id: 'VN',
                    postcode: '70000',
                    default_billing : true,
                    default_shipping : true,
                    district : _.clone(this.selectedDistrict.name),
                    city : _.clone(this.selectedCity.name),
                    ward : _.clone(this.selectedWard.name),
                    lastname : form.lastname,
                    firstname : form.firstname,
                    telephone: form.phone_number,
                    customer_id:this.customer.id
                };
                this.customer.addresses =  [address];
            }else{
                this.updateAddressInfo();
                this.customer.addresses =  this.userInfo.addresses;
            }

            this.customer.firstname = form.firstname;
            this.customer.lastname = form.lastname;
            this.customer.gender = form.gender;
            this.customer.phone_number = form.phone_number;
            this.customer.extension_attributes.marital_status = form.marital_status;
            this.customer.extension_attributes.phone_number = form.phone_number;
            this.customer.extension_attributes.street = form.street;
            this.customer.extension_attributes.district = _.clone(this.selectedDistrict.id);
            this.customer.extension_attributes.city = _.clone(this.selectedCity.id);
            this.customer.extension_attributes.ward = _.clone(this.selectedWard.id);
            this.customer.dob = form.year + '-' + form.month + '-' + form.day;
            if (form.marital_status === true) {
                this.customer.extension_attributes.anniversary_date = form.wedYear + '-' + form.wedMonth + '-' + form.wedDay;
            }
            if (form.change_password) {
                this.customers.change_password.current_password = form.currentPassword;
                this.customers.change_password.new_password = form.password;
            }
            this.store.dispatch(new account.UpdateInfo(this.customers));
        }
    }

    updateAddressInfo(){
        this.defaultAddress.region = {
            region_id:_.clone(this.selectedCity.id)
        };
        this.defaultAddress.extension_attributes = {
            district_id : _.clone(this.selectedDistrict.id)
        };
        this.defaultAddress.extension_attributes = {
            ward_id : _.clone(this.selectedWard.id)
        };
        this.defaultAddress.street = [this.mstreet];
        this.defaultAddress.telephone  = this.telephone;
        let result = this.userInfo.addresses.map(item => item.id === this.defaultAddress.id ? this.defaultAddress : item );

    }

    _isValidDateTime(day, month, year) {
        let isValid = true;
        if ((year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0)) {
            if (day > 29 && month === 2) {
                isValid = false;
            }
        } else {
            if (day > 28 && month === 2) {
                isValid = false;
            }
        }
        return isValid;
    }

    resetForm(form) {
        this.userInfo = _.cloneDeep(this.backupUserInfo);
        this._initCustomer();
        this._initDateOfBirth();
        this._initAnniversaryDate();
        this._initRegions();
        _.forOwn(form.controls, (control) => {
            control.markAsPristine();
            control.markAsUntouched();
            control.updateValueAndValidity();
        });
    }

    ngOnDestroy() {
        this.dispatcherSub.unsubscribe();
        this.cmsContentsSub.unsubscribe();
        $('body').removeClass('customer-account-edit');
    }

    getDefaultAddress(){
        if(this.userInfo.addresses.length > 0){
            this.defaultAddress = _.find(this.userInfo.addresses,{default_shipping:true});
            if(typeof this.defaultAddress == 'undefined'){
                this.defaultAddress = _.find(this.userInfo.addresses,{default_billing:true});
                if(typeof this.defaultAddress == 'undefined'){
                    this.defaultAddress = this.userInfo.addresses[0];
                }
            }
        }
    }

}
