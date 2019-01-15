import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Dispatcher, Store, Action } from '@ngrx/store';
import * as _ from 'lodash';
import { DialogService } from 'ng2-bootstrap-modal';
import { Subscription } from 'rxjs/Subscription';

import { ConfirmModal } from '../../../modals/confirm/confirm';
import { GlobalService } from '../../../services/global.service';
import * as checkout from '../../../store/checkout/checkout.actions';
import * as common from '../../../store/common/common.actions';
import * as fromRoot from '../../../store/index';
import { AppConstants } from '../../../app.constant';
import {CartManagement} from "../../base/cart/CartManagement";
import {ActivatedRoute} from "@angular/router";
import {NormalPayment} from "../../base/payment/NormalPayment";
import {IPayment} from "../../base/payment/IPayment";
import {VendorPickupManagement} from "../../base/VendorPickupManagement";
import {GlobalConstants} from "../../base/constants/GlobalConstants";

@Component({
    selector: 'lt-checkout-payment',
    templateUrl: './payment.html',
    styleUrls: ['./payment.less'],
    encapsulation: ViewEncapsulation.None,
})

export class LtCheckoutPaymentComponent implements OnDestroy {
    paymentType: any;
    promotionType:any;
    cartId: any;
    vendorId: number;

    shippingAddress: any = {
        address: [''],
        firstname: '',
        lastname: '',
        telephone: ''
    };

    allowedPaymentMethods: Array<any>;
    codMaximumPrice: any = AppConstants.CHECKOUT.PAYMENT_COD_MAX_PRICE;
    subscriber: Subscription;
    paymentFunction:IPayment;

    promotions: any;
    momo: any;
    zalopay:any;

    card: any = {
        year: null,
        month: null,
        cvv: '',
        placeholder: '',
        number: '',
        is_save_my_card: false,
        date:null
    };

    cartVendors: any;
    cartVendorsSub: any;
    vendorPickupMgr: VendorPickupManagement = VendorPickupManagement.getInstance();
    pickupInfo: any;
    hasPickupInStore: boolean = false;
    isNoneCOD: boolean = false;


    constructor(
        protected store: Store<fromRoot.AppState>, private dispatcher: Dispatcher,
        protected activatedRoute: ActivatedRoute,
        private globalService: GlobalService, private dialogService: DialogService
    ) {
        this.vendorId = this.activatedRoute.params['value'].vendorId;
        this.loadPaymentFunction(this.vendorId);
        this.shippingAddress = JSON.parse(this.paymentFunction.getStorage('shippingAddress'));

        this.allowedPaymentMethods = JSON.parse(localStorage.getItem('allowedPaymentMethods'));
        this.paymentType = this.paymentFunction.getStorage('selectedPaymentType');
        this.promotionType = this.paymentFunction.getStorage('selectedPromotionType');

        if (!this.shippingAddress) {
            this.store.dispatch(this.paymentFunction.getUpdateCurrentStepAction(2));
        }
        this.globalService.getCartCurrentTimeStamp();

        this.store.dispatch(this.paymentFunction.getCartGetPaymentMethodAction());

        if (this.paymentType) {
            this.selectPaymentType(this.paymentType);
        } else {
            this.selectPaymentType('cashondelivery');
        }

        this.allowedPaymentMethods = JSON.parse(localStorage.getItem('allowedPaymentMethods'));
        this.promotions = _.filter(this.allowedPaymentMethods, (method) => {
            return method.code.indexOf('vietin_gateway_promotion') === 0;
        });

        this.momo = _.filter(this.allowedPaymentMethods, (method) => {
            return method.code.indexOf('momo') === 0;
        });

        this.zalopay = _.filter(this.allowedPaymentMethods, (method) => {
            return method.code.indexOf('zalopay') === 0;
        });

        this.cartVendorsSub = this.store.select(this.paymentFunction.getRootCheckoutGetShippingVendors()).subscribe((shippingRule) => {
            this.cartVendors = shippingRule;
            if(this.cartVendors && this.cartVendors.by_group){
                this.cartVendors = this.vendorPickupMgr.loadSelectedShipType(this.cartVendors);
                this.pickupInfo = _.find(this.cartVendors.by_group, vendor => {
                    return vendor.pickupInfo && vendor.pickupInfo.isActive;
                });

                _.each(this.cartVendors.by_group, vendor => {
                    _.each(vendor.products, item => {
                        if(item.is_none_cod){
                            this.isNoneCOD = true;
                            return;
                        }
                    });
                });

                this.hasPickupInStore = this.pickupInfo?true:false;
                if(this.hasPickupInStore || this.isNoneCOD){
                    this.selectPaymentType('vietin_gateway');
                    this.selectPromotionPayment('vietin_gateway');
                }
            }
        });



    }

    ngAfterViewInit() {
        this.cartId = localStorage.getItem('cartId');
        if (this.cartId) {
            this.store.dispatch(new common.LoadTrackingCode({ type: 'checkout', id: this.cartId }));
        }
        localStorage.setItem('cartId_old',localStorage.getItem('cartId'));

    }

    ngOnInit() {
        this.subscriber = this.dispatcher.subscribe((action) => {
            switch (action.type) {
                case this.paymentFunction.getCartUpdatePaymentInformationSuccessConst():
                    this.paymentFunction.storeStorage('orderSuccess', JSON.stringify(action.payload));
                    const paymentMethod = JSON.parse(this.paymentFunction.getStorage('paymentMethod'));
                    if (paymentMethod && paymentMethod.method && paymentMethod.method.indexOf('vietin_gateway') > -1) {
                        this.store.dispatch(this.paymentFunction.getCartCCTransactionRequestAction(action.payload.order_id));
                    } else {
                        this.store.dispatch(this.paymentFunction.getUpdateCurrentStepAction(4));
                    }
                    break;
                case this.paymentFunction.getCartRedirectToPaymentGatewayConst():
                    this.paymentFunction.storeStorage('orderSuccess', JSON.stringify(action.payload));
                    location.href = action.payload.url;
                    break;
                case this.paymentFunction.getCartGetPaymentMethodsSuccessConst():
                    this.allowedPaymentMethods = action.payload;
                    break;
                default:
                    break;
            }
        });
    }

    ngOnDestroy() {
        this.subscriber.unsubscribe();
        this.globalService.removeTrackingCode();
        this.cartVendorsSub.unsubscribe();
    }



    selectPaymentType(type) {

        if (this.paymentType !== type) {
            this.paymentType = type;
            this.promotionType = null;
            this.paymentFunction.storeStorage('selectedPaymentType', this.paymentType);
            let postData = {};
            if (localStorage.getItem('token')) {
                postData = {
                    cartId: localStorage.getItem('cartId'),
                    method: this._getPaymentPostData()
                };
            } else {
                const billingAddress = JSON.parse(this.paymentFunction.getStorage('billingAddress'));
                if (billingAddress) {
                    postData = {
                        email: billingAddress.extension_attributes.email_address,
                        paymentMethod: this._getPaymentPostData()
                    };
                }
            }
            if (this.hasPayment(type)) {
                this.store.dispatch(this.paymentFunction.getCartSetPaymentMethodAction(postData));
            }
        }
    }

    selectPromotionPayment(promotion) {

        this.paymentType = 'vietin_gateway';
        this.paymentFunction.storeStorage('selectedPaymentType',this.paymentType);

        if (this.promotionType !== promotion) {

            this.promotionType = promotion;
            localStorage.setItem('selectedPromotionType', promotion);
            let postData = {};

            if (localStorage.getItem('token')) {
                postData = {
                    cartId: localStorage.getItem('cartId'),
                    method: this._getPaymentPromotionPostData()
                };
            } else {
                const billingAddress = JSON.parse(this.paymentFunction.getStorage('billingAddress'));
                if (billingAddress) {
                    postData = {
                        email: billingAddress.extension_attributes.email_address,
                        paymentMethod: this._getPaymentPromotionPostData()
                    };
                }
            }
            this.resetCardInfomation();
            this.store.dispatch(this.paymentFunction.getCartSetPaymentMethodAction(postData));
        }
    }

    resetCardInfomation() {
        this.card = {
            year: null,
            month: null,
            cvv: '',
            placeholder: '',
            number: '',
            is_save_my_card: false,
            date:null
        };
    }

    getPayment(type: String) {
        return _.find(this.allowedPaymentMethods, (method) => method.code === type);
    }
    hasPayment(type: String) {
        return _.findIndex(this.allowedPaymentMethods, (method) => method.code === type) > -1;
    }

    backToPreviousStep() {
        this.dialogService.addDialog(ConfirmModal)
            .subscribe((isConfirm) => {
                if (isConfirm) {
                    this.store.dispatch(this.paymentFunction.getUpdateCurrentStepAction(2));
                }
            });
    }

    _getPaymentPostData() {
        return {
            method: this.paymentType
        };
    }


    _getPaymentPromotionPostData() {
        return {
            method: this.promotionType
        };
    }

    // must implement if extends
    loadPaymentFunction(vendorId = null){
        this.paymentFunction = new NormalPayment(this.store);
    }
}
