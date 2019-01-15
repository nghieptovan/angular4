import { Renderer2, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Dispatcher, Store } from '@ngrx/store';
import * as _ from 'lodash';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';

import { AppConstants } from '../../../../app.constant';
import { AddressBookModal } from '../../../../modals/addressbook/addressbook';
import { ConfirmModal } from '../../../../modals/confirm/confirm';
import { LoginModal } from '../../../../modals/login/login';
import { HttpService } from '../../../../services/http.service';
import * as checkout from '../../../../store/checkout/checkout.actions';
import * as fromRoot from '../../../../store/index';
import {LocalStorageConstants} from "../../../base/constants/LocalStorageConstants";
import {RegionManagement} from "../../../base/RegionManagement";
import {ActivatedRoute} from "@angular/router";
import {NormalPayment} from "../../../base/payment/NormalPayment";
import {IPayment} from "../../../base/payment/IPayment";

declare var $;
@Component({
    selector: 'lt-checkout-address-form',
    templateUrl: './address-form.html',
    styleUrls: ['./address-form.less']
})

export class LtCheckoutAddressFormComponent {
    @Input() uid: any;
    @ViewChild('addressForm') addressForm: NgForm;
    @Output('validationChange') validationChange = new EventEmitter<Boolean>();
    @Input()
    address: any = {
        street: ['']
    };
    @Output()
    addressChange = new EventEmitter<any>();

    commonRegions$: Observable<Array<any>>;

    cartInfo$: Observable<any>;
    authIsLoggedIn$: Observable<any>;
    userInfo: any = {
        addresses: []
    };
    displayedAddresses: Array<any>;
    cartVendors: any;
    regions: Array<any> = [];

    regexPhoneNumber: any = AppConstants.REGEX.TELEPHONE;
    regexEmail: any = AppConstants.REGEX.EMAIL;
    curRegion: any = {};

    selectedId : any;
    vendorId: number;
    paymentFunction: IPayment;

    constructor(protected store: Store<fromRoot.AppState>, private dispatcher: Dispatcher,
        private elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute,
        private dialogService: DialogService,
        private toastr: ToastrService,
        private httpService: HttpService,
        private renderer: Renderer2
    ) {
        this.vendorId = this.activatedRoute.params['value'].vendorId;
        this.loadPaymentFunction(this.vendorId);

        this.cartInfo$ = this.store.select(fromRoot.checkoutGetCartInfo);
        this.commonRegions$ = this.store.select(fromRoot.commonGetRegions);
        this.authIsLoggedIn$ = this.store.select(fromRoot.authGetLoggedInState);
        this.uid = elementRef.nativeElement.getAttribute('uid');
        this.__initModels();
    }

    ngDoCheck() {

    }

    ngAfterViewInit() {
        this.addressForm.valueChanges.debounceTime(100).subscribe((something) => {
            this.validationChange.emit(!this.addressForm.invalid);
            this.addressChange.emit(this.address);
        });
        this.commonRegions$.subscribe((regions: Array<any>) => {
            if (regions.length) {
                setTimeout(() => {
                    this.regions = _.clone(regions);
                }, 10);
            }
        }).unsubscribe();

        this.authIsLoggedIn$.subscribe((logged) => {
            if (logged) {
                this.store.select(fromRoot.accountGetInfo)
                    .subscribe((info) => {
                        setTimeout(() => {
                            if (info && info.id) {
                                this.userInfo = _.cloneDeep(info);
                                if (info.addresses && info.addresses.length) {
                                    _.map(this.userInfo.addresses, function (address: any) {
                                        address = this.__normalizeAddress(address);
                                    }.bind(this));
                                    // Arrange address order
                                    this.__getDisplayedAddresses();
                                    // Select default address
                                    this.__getDefaultAddress();
                                } else if (this.uid === 'shipping') {
                                    if (info.firstname && info.firstname !== 'Tên') {
                                        this.address.firstname = info.firstname;
                                    }
                                    if (info.lastname && info.lastname !== 'Họ') {
                                        this.address.lastname = info.lastname;
                                    }
                                    if (info.email) {
                                        this.address.extension_attributes.email_address = info.email;
                                    }
                                    if (info.phone_number) {
                                        this.address.telephone = info.phone_number;
                                    }
                                }
                            }
                        }, 100);
                    });
            }
        });
    }

    public markAsTouched() {
        for (const control in this.addressForm.form.controls) {
            this.addressForm.form.get(control).markAsTouched();
        }
    }

    selectArea(region, district, ward = null) {
        setTimeout(() => {
            if (region) {
                this.address._district = null;
                this.address._ward = null;
            }

            if (district && !ward) {
                this.address._ward = null;
            }

            this.__setAddressIds();
            this.__loadingShippingRule();
        }, 100);
    }

    selectAddress(value) {
        if (value) {
            this.address.isOther = false;
            value = this.__normalizeAddress(value);
            this.address = _.merge(this.__initBlankAddress(), _.cloneDeep(value));
            this.__loadingShippingRule();
            if(document.querySelector("#shipping-form") != null){
                document.querySelector("#shipping-form").setAttribute('hidden','hidden');
            }

        }else{
            this.address = this.__initBlankAddress();
            this.__loadingShippingRule();
        }

        this.__setAddressIds();
        if (this.userInfo.id && this.displayedAddresses && value && value.id) {
            if (!_.find(this.displayedAddresses, (address) => {
                return address.id === value.id;
            })) {
                this.displayedAddresses[this.displayedAddresses.length - 1] = value;
            }
        }

        if(this.uid == 'shipping'){
            if(document.querySelector('div.current') != null){
                document.querySelector('div.current').classList.remove('current');
            }
            if(document.querySelector('#add-item-'+value.id) != null){
                document.querySelector('#add-item-'+value.id).classList.add('current');
            }
            if(document.querySelector('.btn-edit') != null){
                document.querySelector('.btn-edit').setAttribute('hidden','hidden');
            }
            if(document.querySelector('#btn-'+value.id) != null){
                document.querySelector('#btn-'+value.id).removeAttribute('hidden');
            }
            if(!value){
                if(document.querySelector('#add-item-new') != null){
                    document.querySelector('#add-item-new').classList.add('current');
                }
                this.editAddress('new');
            }
        }


    }

    editAddress(uid){
        uid == 'false' ? 'new' : uid;

        var element =  document.querySelector("#shipping-form");
        var addUid  =  document.querySelector('.add-'+uid);

        if(element != null && addUid != null){

            this.selectedId = uid;
            element.removeAttribute('hidden');
            addUid.appendChild(element);
        }
    }

    backToPreviousStep() {
        this.dialogService.addDialog(ConfirmModal)
            .subscribe((isConfirm) => {
                if (isConfirm) {
                    this.store.dispatch(this.paymentFunction.getUpdateCurrentStepAction(1));
                }
            });
    }

    login() {
        this.dialogService.addDialog(LoginModal);
    }

    showModalAddressBook() {
        this.dialogService.addDialog(AddressBookModal)
            .subscribe((result) => {
                if (result) {
                    this.selectAddress(result);
                }
            });
    }

    private __getDefaultAddress() {
        if(this.address && this.address.isOther && this.uid == 'shipping'){
            setTimeout(()=>{
                this.selectAddress(false);
                this.__loadingShippingRule()
            ,200});
        } else {
            const localStorageKey = this.uid === 'billing'
                ? 'billingAddress'
                : 'shippingAddress';
            let userAddressIndex = -1;
            let cachedAddress = null;
            if (localStorage.getItem(localStorageKey)) {
                cachedAddress = JSON.parse(localStorage.getItem(localStorageKey));
            }
            if (cachedAddress && (!cachedAddress.id || _.find(this.userInfo.addresses, (address: any) => address.id === cachedAddress.id))) {
                if (this.uid === 'shipping') {
                    this.selectAddress(cachedAddress);
                } else if (this.uid === 'billing' && JSON.parse(this.paymentFunction.getStorage('differentBillingAddress'))) {
                    this.selectAddress(cachedAddress);
                }
            } else {
                if (this.userInfo && this.userInfo.id) {
                    const defaultSelectedId = this.uid === 'shipping' ? this.userInfo.default_shipping : this.userInfo.default_billing;
                    userAddressIndex = _.findIndex(this.userInfo.addresses, (address: any) => {
                        return address.id.toString() === defaultSelectedId;
                    });
                }
                if (userAddressIndex >= 0) {
                    this.selectAddress(this.userInfo.addresses[userAddressIndex]);
                } else {
                    this.selectAddress(false);
                }
            }
        }

    }

    private __getDisplayedAddresses() {
        const addresses = _.reverse(_.cloneDeep(this.userInfo.addresses));
        this.displayedAddresses = [];
        const defaultChecked = _.find(addresses, (address : any) => {
            if(typeof this.userInfo.email != 'undefined'){
                if(address.extension_attributes.email_address == null || address.extension_attributes.email_address == ''){
                    address.extension_attributes.email_address = this.userInfo.email;
                }
            }
            if (this.uid === 'shipping' && this.userInfo.default_shipping) {
                return address.id
                    && this.userInfo.default_shipping
                    && address.id.toString() === this.userInfo.default_shipping.toString();
            } else if (this.uid === 'billing' && this.userInfo.default_billing) {
                return address.id
                    && this.userInfo.default_shipping
                    && address.id.toString() === this.userInfo.default_billing.toString();
            } else {
                return -1;
            }

        });
        if (defaultChecked) {
            this.displayedAddresses.push(defaultChecked);

        }
        if (this.address && this.address.id && _.findIndex(this.displayedAddresses, (item) => item.id === this.address.id) === -1) {
            this.displayedAddresses.push(this.address);
        }
        _.each(addresses, (address: any) => {
            if (this.displayedAddresses.length < 3 && _.findIndex(this.displayedAddresses, (item) => item.id === address.id) === -1) {
                if(typeof this.userInfo.email != 'undefined'){
                    if(address.extension_attributes.email_address == null || address.extension_attributes.email_address == ''){
                        address.extension_attributes.email_address = this.userInfo.email;
                    }
                }

                this.displayedAddresses.push(address);
            }
        });

    }

    protected __loadingShippingRule() {
        if (this.uid === 'shipping'
            && this.address._city && this.address._city.id
            && this.address._district && this.address._district.id
            && this.address._ward && this.address._ward.id
        ) {
            this.store.dispatch(this.paymentFunction.getCartLoadShippingRuleAction({
                cityId: this.address._city.id,
                districtId: this.address._district.id,
                wardId: this.address._ward.id
            }));
        }
    }

    private __initBlankAddress() {
        this.address = {
            street: [''],
            city: 'Ho Chi Minh',
            country_id: 'VN',
            postcode: '70000',
            firstname: '',
            lastname: '',
            extension_attributes: {
                is_home: true,
                email_address: AppConstants.DEFAULT_EMPTY_EMAIL,
                region_id: AppConstants.DEFAULT_REGION.CITY_ID,
                district_id: AppConstants.DEFAULT_REGION.DISTRICT_ID,
                ward_id: AppConstants.DEFAULT_REGION.WARD_ID,
            },
            shipping_comments: this.paymentFunction.getStorage('shipping_comments'),
            _city: null,
            _district: null,
            _ward: null,
            isOther: false
        };

        //this.curRegion = RegionManagement.getInstance(this.store).getCurrentRegion();
        const regionInfo = localStorage.getItem(LocalStorageConstants.KEY_USER_SHIPPING_ADDRESS);
        if(regionInfo){
            this.curRegion = JSON.parse(regionInfo);
        }

        if(this.curRegion && this.curRegion.city){
            this.address._city = _.clone(this.curRegion.city);
            this.address._district = _.clone(this.curRegion.district);
            this.address._ward = _.clone(this.curRegion.ward);
            this.address.isOther = this.curRegion.isOther;
            //RegionManagement.getInstance(this.store).loadCartShippingRule();
        }
        // }

        return this.address;
    }

    private __initModels() {
        this.__initBlankAddress();

        if (this.uid === 'shipping') {
            this.address.shipping_comments = '';
            const comment = this.paymentFunction.getStorage('shipping_comments');
            if (comment) {
                this.address.shipping_comments = comment;
            }
        }
        this.__getDefaultAddress();
    }

    private __normalizeAddress(address) {
        if (address.extension_attributes && address.extension_attributes.is_home) {
            address.extension_attributes.is_home = address.extension_attributes.is_home === 1 || address.extension_attributes.is_home === true;
        }
        if (address.region_id && address.id) {
            address._city = this.regions.find(region => {
                return region.id === address.region_id.toString();
            });
            if (address.extension_attributes.district_id) {
                address._district = address._city.districts.find(district => {
                    return district.id === address.extension_attributes.district_id.toString();
                });
                if (address.extension_attributes.ward_id && address._district && address._district.wards.length) {
                    address._ward = address._district.wards.find(ward => {
                        return ward.id === address.extension_attributes.ward_id.toString();
                    });
                }
            }
        }
        address.isOther = this.curRegion.isOther;
        return address;
    }

    private __setAddressIds() {

        if (this.address._city && this.address._city.id) {
            this.address.region_id = this.address._city.id;
        }
        if (this.address._district && this.address._district.id) {
            this.address.district_id = this.address._district.id;
        }
        if (this.address._ward && this.address._ward.id) {
            this.address.ward_id = this.address._ward.id;
        }
    }

    equals(item1: any, item2: any) {
        return item1 && item2 ? item1.id === item2.id : item1 === item2;
    }

    // must implement if extends
    loadPaymentFunction(vendorId = null){
        this.paymentFunction = new NormalPayment(this.store);
    }
}
