import { Component, ViewChild } from '@angular/core';
import { Dispatcher, Store, Action } from '@ngrx/store';
import * as _ from 'lodash';
import { DialogService } from 'ng2-bootstrap-modal/dist/dialog.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs/Subscription';

import { GlobalService } from '../../../services/global.service';
import * as checkout from '../../../store/checkout/checkout.actions';
import * as common from '../../../store/common/common.actions';
import * as fromRoot from '../../../store/index';
import { ConfirmModal } from './../../../modals/confirm/confirm';
import { LoginModal } from './../../../modals/login/login';
import { UserInfoTransformer } from './../../../transformers/UserInfoTransformer';
import { LtCheckoutAddressFormComponent } from './address-form/address-form';
import { AppConstants } from '../../../app.constant';
import {Observable} from "rxjs/Observable";
import {CartManagement} from "../../base/cart/CartManagement";
import { ActivatedRoute } from '@angular/router';
import {NormalPayment} from "../../base/payment/NormalPayment";
import {IPayment} from "../../base/payment/IPayment";
import {VendorPickupManagement} from "../../base/VendorPickupManagement";
import {GlobalConstants} from "../../base/constants/GlobalConstants";
import {IPickupInfoStorage} from "../../base/pickup_in_store/IPickupInfoStorage";
import {RegionManagement} from "../../base/RegionManagement";

@Component({
    selector: 'lt-checkout-shipping',
    templateUrl: './shipping.html',
    styleUrls: ['./shipping.less']
})

export class LtCheckoutShippingComponent {
    @ViewChild('billingForm') billingForm: LtCheckoutAddressFormComponent;
    @ViewChild('shippingForm') shippingForm: LtCheckoutAddressFormComponent;

    subscriber: Subscription;
    cartId: any;
    cartVendors: any;

    shippingAddress: any = {
        street: ['']
    };
    isShippingAddressValid: Boolean = false;

    billingAddress: any = {
        street: ['']
    };
    differentBillingAddress: Boolean = false;
    isBillingAddressValid: Boolean = false;
    vatInfo: any = {
        vat_required: 0,
        vat_company_name: '',
        vat_company_address: '',
        vat_company_taxcode: ''
    };


    userInfo: any = {
        addresses: []
    };

    cartItemCountSub: any;
    authSub: any;
    isLoggedIn: boolean = false;
    vendorId: number;
    paymentFunction: IPayment;
    shipTypeOptions: any = GlobalConstants.SHIP_TYPE_OPTIONS;
    vendorPickupMgr: VendorPickupManagement = VendorPickupManagement.getInstance();
    pickupInfo: Array<IPickupInfoStorage> = [];
    cartVendorsSub: any;
    regexPhoneNumber: any = AppConstants.REGEX.TELEPHONE;
    regexEmail: any = AppConstants.REGEX.EMAIL;

    constructor(protected store: Store<fromRoot.AppState>,
        protected activatedRoute: ActivatedRoute,
        private dispatcher: Dispatcher,
        private toastr: ToastrService,
        private dialogService: DialogService,
        private globalService: GlobalService
    ) {

        this.vendorId = this.activatedRoute.params['value'].vendorId;
        this.loadPaymentFunction(this.vendorId);
        this.globalService.getCartCurrentTimeStamp();
        this.pickupInfo = this.vendorPickupMgr.getVendorPickupInfo();

        if (this.paymentFunction.getStorage('differentBillingAddress')) {
            this.differentBillingAddress = JSON.parse(this.paymentFunction.getStorage('differentBillingAddress'));
        }
        let temp = JSON.parse(this.paymentFunction.getStorage('vatInfo'));
        if (temp) {
            this.vatInfo = temp;
        }

        this.authSub = this.store.select(fromRoot.authGetLoggedInState).subscribe(loggedIn => {
            //setTimeout(() => {
            this.isLoggedIn = loggedIn;
            //}, 100);
        });

        this.cartVendorsSub = this.store.select(this.getRootCheckoutGetShippingVendors()).subscribe((shippingRule) => {
            this.cartVendors = shippingRule;
            if(this.cartVendors && this.cartVendors.by_group){
                this.cartVendors = this.vendorPickupMgr.loadSelectedShipType(this.cartVendors);
            }
        });

    }

    ngAfterViewInit() {
        this.cartId = localStorage.getItem('cartId');

        if (this.cartId) {
            this.store.dispatch(new common.LoadTrackingCode({ type: 'checkout', id: this.cartId }));
        }

        this.cartItemCountSub = this.store.select(this.getRootCheckoutGetCartItemsCount())
            .subscribe((count) => {
                if (count > AppConstants.MAX_ITEMS_COUNT_IN_CART) {
                    const overCount = count - AppConstants.MAX_ITEMS_COUNT_IN_CART;
                    const errorMessage = 'Chúng tôi giới hạn tối đa ' + AppConstants.MAX_ITEMS_COUNT_IN_CART + ' sản phẩm trong giỏ hàng, vui lòng bỏ bớt ' + overCount + ' sản phẩm ra khỏi giỏ hàng';
                    this.toastr.error(errorMessage, 'Lỗi');
                    this.store.dispatch(this.paymentFunction.getUpdateCurrentStepAction(1));
                }
            });

        this.store.select(fromRoot.accountGetInfo)
            .subscribe((info) => {
                if (info && info.id) {
                    this.userInfo = info;
                }
            });

        this.subscriber = this.dispatcher.subscribe((action) => {
            switch (action.type) {
                case this.paymentFunction.getCART_UPDATE_SHIPPING_INFO_SUCCESSConst():
                    this.store.dispatch(this.paymentFunction.getUpdateCurrentStepAction(3));
                    break;
                default:
                    break;
            }
        });
    }

    ngOnDestroy() {
        this.globalService.reloadCartWhenTimestampChanged();
        this.globalService.removeTrackingCode();
        this.cartItemCountSub.unsubscribe();
        this.authSub.unsubscribe();
        this.cartVendorsSub.unsubscribe();
    }

    goToNextStep(ngForm) {
        for (const control in ngForm.form.controls) {
            ngForm.form.get(control).markAsTouched();
        }
        this.billingForm.markAsTouched();
        this.shippingForm.markAsTouched();
        if (ngForm.valid && this.isShippingAddressValid) {
            // store pickup info
            _.each(this.cartVendors.by_group, vendor => {
                vendor.pickupInfo = Object.assign(vendor.pickupInfo, {
                    vendor_name: vendor.vendor_name,
                    vendor_location: vendor.vendor_data.pickup_location,
                    duration_standard: this.vendorPickupMgr.getShippingDuration().cart_text
                });

                this.vendorPickupMgr.storeStorageVendorPickup(vendor.vendor_id, vendor.pickupInfo);
            });

            const ruleIsNotMatched = this.__shippingRuleIsNotMatched();
            if (this.differentBillingAddress && !this.isBillingAddressValid) {
                const errorMessage = 'Vui lòng điền dữ liệu thông tin thanh toán';
                this.toastr.error(errorMessage, 'Vui lòng nhập dữ liệu');
            } else if (this.__shippingRuleIsNotMatched()) {
                const errorMessage = ruleIsNotMatched.vendor_fail_message?ruleIsNotMatched.vendor_fail_message:'Có sản phẩm trong giỏ hàng không được giao ở vị trí bạn đã chọn';
                this.toastr.error(errorMessage, 'Không thể thanh toán');
            } else {
                this.paymentFunction.storeStorage('vatInfo', JSON.stringify(this.vatInfo));
                this.paymentFunction.storeStorage('shippingAddress', JSON.stringify(this.shippingAddress));
                this.paymentFunction.storeStorage('currentCity', JSON.stringify(this.shippingAddress._city));
                this.paymentFunction.storeStorage('currentDistrict', JSON.stringify(this.shippingAddress._district));
                this.paymentFunction.storeStorage('shipping_comments', this.shippingAddress.shipping_comments);
                this.paymentFunction.storeStorage('differentBillingAddress', JSON.stringify(this.differentBillingAddress))
                if (!this.differentBillingAddress) {
                    this.paymentFunction.storeStorage('billingAddress', JSON.stringify(this.shippingAddress));
                } else {
                    this.paymentFunction.storeStorage('billingAddress', JSON.stringify(this.shippingAddress));
                }
                if (!this.differentBillingAddress || (this.differentBillingAddress && this.isBillingAddressValid)) {
                    // Update user addresses
                    const userInfo = _.cloneDeep(this.userInfo);
                    if (userInfo.id) {
                        let shouldUpdate = false;
                        if (!this.shippingAddress.id) {
                            userInfo.addresses.push(_.clone(this.shippingAddress));
                            shouldUpdate = true;
                        }
                        if (this.differentBillingAddress && !this.billingAddress.id) {
                            userInfo.addresses.push(_.clone(this.billingAddress));
                            shouldUpdate = true;
                        }
                        if (shouldUpdate) {
                            const updateUserData = {
                                customer: UserInfoTransformer.transform(userInfo)
                            };

                            localStorage.setItem('updatedUserInfo', JSON.stringify(updateUserData));
                        }
                    }
                    this.store.dispatch(this.paymentFunction.getCartUpdateShippingInfoAction());
                }
            }
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

    onChangeShipType(vendor){
        this.vendorPickupMgr.storeStorageVendorPickup(vendor.vendor_id, {isActive: vendor.pickupInfo.isActive});
        RegionManagement.getInstance(this.store).loadCartShippingRule();
    }

    onChangeShippingAddress(event){
        this.shippingAddress = event;
        if(this.shippingAddress){
            // copy customer name and email.
            _.each(this.cartVendors.by_group, vendor => {
                if(vendor.pickupInfo){
                    if(this.shippingAddress.firstname && this.shippingAddress.lastname){
                        vendor.pickupInfo.customer_name = this.shippingAddress.lastname + ' ' + this.shippingAddress.firstname;
                    }

                    if(this.shippingAddress.extension_attributes.email_address){
                        vendor.pickupInfo.customer_email = this.shippingAddress.extension_attributes.email_address;
                    }
                    // update storage
                    this.vendorPickupMgr.storeStorageVendorPickup(vendor.vendor_id, vendor.pickupInfo);
                }
            });
        }
    }

    private __shippingRuleIsNotMatched() {
        if (this.cartVendors && this.cartVendors.by_group) {
            return _.find(this.cartVendors.by_group, (item: any) => {
                return !item.vendor_shippable;
            });
        }
        return false;
    }

    login() {
        this.dialogService.addDialog(LoginModal);
    }

    // must implement if extends
    loadPaymentFunction(vendorId = null){
        this.paymentFunction = new NormalPayment(this.store);
    }

    getRootCheckoutGetCartItemsCount(){
        return fromRoot.checkoutGetCartItemsCount;
    }

    getRootCheckoutGetShippingVendors(){
        return fromRoot.checkoutGetShippingVendors;
    }
}
