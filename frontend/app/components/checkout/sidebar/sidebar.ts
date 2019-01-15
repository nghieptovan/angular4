import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Dispatcher, Store, Action } from '@ngrx/store';
import * as _ from 'lodash';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';

import { ConfirmModal } from '../../../modals/confirm/confirm';
import * as checkout from '../../../store/checkout/checkout.actions';
import * as account from '../../../store/account/account.actions';
import * as fromRoot from '../../../store/index';
import { GlobalService } from './../../../services/global.service';
import {CartManagement} from "../../base/cart/CartManagement";
import {NormalPayment} from "../../base/payment/NormalPayment";
import {VendorPickupManagement} from "../../base/VendorPickupManagement";
import {GlobalConstants} from "../../base/constants/GlobalConstants";
import {VendorShippingTypeManagement} from "../../base/VendorShippingTypeManagement";

const MIN_L_POINT_APPLY = 100;
declare var $;
@Component({
    selector: 'lt-checkout-sidebar',
    templateUrl: './sidebar.html',
    styleUrls: ['./sidebar.less']
})

export class LtCheckoutSidebarComponent {
    @Input() uid: any;

    cartInfo: any;
    cartTotal: any;
    currentStep:any;
    cartCurrentStep$: Observable<any>;
    authIsLoggedIn$: Observable<Boolean>;
    cartVendorsSub: any;
    cartVendors: any;
    shippingFee: number;

    appliedLPoint: Number = 0;
    lpoint: any = 0;
    useLPoint: Boolean = false;
    hasLPoint: Boolean = false;
    LPointPattern: RegExp = new RegExp(/^[0-9]+$/);
    customerLPoint: any = 0;
    couponCode: String = '';
    hasCoupon: Boolean = false;
    inLpointCampaign: Boolean = false;
    inLpointCampaignForView: Boolean = false;
    inCustomerUsedLpoint: Boolean = false;
    customerLPointCampaign: Number = 0;
    useLpointCampaign: Boolean = true;
    listLpointCampaignOption: Array<{value: number, label: string}>;

    subscriber: Subscription;

    coupond:any;
    message:any;


    shippingAddress: any = {
        address: [''],
        firstname: '',
        lastname: '',
        telephone: '',
        extension_attributes:{
            email:''
        }
    };

    couponErrorMessage:any = null;
    errorLpointMessage:any = null;
    vendorId: number;
    vendorSub: any;
    vendorInfo: any;
    paymentFunction: any;
    vendorPickupMgr: VendorPickupManagement = VendorPickupManagement.getInstance();
    shipTypeOptions: any = GlobalConstants.SHIP_TYPE_OPTIONS;
    vendorShippingTypeMgr: VendorShippingTypeManagement = VendorShippingTypeManagement.getInstance();

    minLpoint:any=101;
    shipCarriers: any = GlobalConstants.SHIPPING_CARRIER;

    constructor(
        protected store: Store<fromRoot.AppState>,
        private dialogService: DialogService, private dispatcher: Dispatcher,
        protected router: Router,
        protected activatedRoute: ActivatedRoute,
        private globalService: GlobalService,
        private toastr: ToastrService
    ) {
        this.vendorId = this.activatedRoute.params['value'].vendorId;
        this.loadPaymentFunction(this.vendorId);

        this.vendorSub = this.store.select(fromRoot.vendorGetEntity).subscribe(vendorInfo => {
            this.vendorInfo = vendorInfo;
        });

        this.cartVendorsSub = this.store.select(this.getRootCheckoutGetShippingVendors()).subscribe(cartVendors => {
            this.cartVendors = cartVendors;
            this.cartVendors = this.vendorPickupMgr.loadSelectedShipType(this.cartVendors);
        });

        this.store.select(this.getRootCheckoutGetCurrentStep()).subscribe((currentStep : any) => {
            this.currentStep = currentStep
        });
        this.authIsLoggedIn$ = this.store.select(fromRoot.authGetLoggedInState);

        this.store.select(this.getRootCheckoutGetShippingFee()).subscribe((shippingFee: number) => {
            this.shippingFee = shippingFee;
        });

        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if(userInfo){
            //this.customerLPoint = userInfo.lpoint;
            this.store.select(this.getCustomerLpoint()).subscribe((lpoint)=>{
                this.customerLPoint = lpoint;
                this.useLPoint = this.customerLPoint > this.minLpoint;
            });this.store.dispatch(new account.GetLPoint());

        }




        this.store.select(this.getRootCheckoutGetCartInfo())
            .subscribe((cartInfo) => {
                this.cartInfo = cartInfo;

                if (cartInfo && cartInfo.customer_lpoint) {
                    this.customerLPoint = cartInfo.customer_lpoint;
                    this.useLPoint = this.customerLPoint > this.minLpoint;
                }
                if (cartInfo && cartInfo.lpoint_campaign_reward) {
                    this.customerLPointCampaign = cartInfo.lpoint_campaign_reward;
                    this.useLpointCampaign = cartInfo.lpoint_campaign_reward > 0;
                }

            });

        this.store.select(this.getRootCheckoutGetCartTotal())
            .subscribe((cartTotal) => {
                this.cartTotal = cartTotal;

                //console.log(this.cartTotal)
                if (cartTotal.total_segments && cartTotal.total_segments.length) {
                    const lpointSegment = _.find(cartTotal.total_segments, (segment: any) => {
                        return segment.code === 'lpoint';
                    });
                    //console.log(lpointSegment)
                    if (lpointSegment) {
                        this.lpoint = -parseInt(lpointSegment.value, 10);
                        this.appliedLPoint = parseInt(lpointSegment.value, 10);

                        if (this.appliedLPoint) {
                            this.hasLPoint = true;
                        }
                    }
                }
                if(cartTotal.extension_attributes && cartTotal.extension_attributes.lpoint_campaign_option){
                    this.listLpointCampaignOption = JSON.parse(cartTotal.extension_attributes.lpoint_campaign_option);
                }

                if(cartTotal.extension_attributes && cartTotal.extension_attributes.is_lpoint_campaign){
                    this.inLpointCampaign  = cartTotal.extension_attributes.is_lpoint_campaign;
                }
                if(cartTotal.extension_attributes && cartTotal.extension_attributes.is_lpoint_campaign_for_view) {
                    this.inLpointCampaignForView = cartTotal.extension_attributes.is_lpoint_campaign_for_view;
                }
                if(cartTotal.extension_attributes && cartTotal.extension_attributes.is_customer_used_lpoint) {
                    this.inCustomerUsedLpoint = cartTotal.extension_attributes.is_customer_used_lpoint;
                }

                if (cartTotal.coupon_code) {
                    this.couponCode = cartTotal.coupon_code;
                    this.hasCoupon = true;
                }





            });



        this.shippingAddress = JSON.parse(this.paymentFunction.getStorage('shippingAddress'));
        if (!this.shippingAddress) {
            this.store.dispatch(this.paymentFunction.getUpdateCurrentStepAction(2));
        }
        if(this.currentStep == 3 && this.shippingAddress){
            this.store.dispatch(this.paymentFunction.getCartLoadShippingRuleAction({
                cityId: this.shippingAddress._city.id,
                districtId: this.shippingAddress._district && this.shippingAddress._district.id? this.shippingAddress._district.id:null,
                wardId: this.shippingAddress._ward && this.shippingAddress._ward.id? this.shippingAddress._ward.id:null
            }));
        }


    }

    ngAfterViewInit() {
        this.subscriber = this.dispatcher.subscribe((action) => {
            switch (action.type) {
                case this.paymentFunction.getCART_ADD_COUPON_SUCCESSConst():
                    if (this.cartTotal && this.cartTotal.subtotal_with_discount < checkout.MIN_ORDER_LPOINT_CAMPAIGN && this.cartInfo && this.cartInfo.lpoint_campaign_reward > 0) {
                        this.removeLPoint();
                        if (this.customerLPoint) {
                            this.customerLPoint = 0;
                        }
                        if (this.customerLPointCampaign) {
                            this.customerLPointCampaign = 0;
                        }
                    }
                    this.hasCoupon = true;
                    this.couponErrorMessage = null;
                    this.globalService.loadShippingRuleForCurrentLocation(this.paymentFunction.getCartType());
                    break;
                case checkout.CART_GET_COUPON_SUCCESS:
                    this.couponCode = action.payload;
                    this.hasCoupon = true;
                    this.couponErrorMessage = null;
                    break;
                case this.paymentFunction.getCART_ADD_COUPON_FAILEDConst():
                    this.couponErrorMessage = action.payload.json().message;
                    this.couponCode = null;
                    this.hasCoupon = false;
                    break;
                case this.paymentFunction.getCART_DELETE_COUPON_SUCCESSConst():
                    this.couponCode = null;
                    this.hasCoupon = false;
                    this.couponErrorMessage = null;
                    this.globalService.loadShippingRuleForCurrentLocation(this.paymentFunction.getCartType());
                    break;
                case this.paymentFunction.getCART_APPLY_LPOINT_SUCCESSConst():
                    if (this.lpoint) {
                        this.hasLPoint = true;
                        this.errorLpointMessage = 'Có lỗi xảy ra, vui lòng thử lại.';
                    } else {
                        this.hasLPoint = false;
                        this.errorLpointMessage = null;
                    }
                    break;
                case this.paymentFunction.getCART_APPLY_LPOINT_FAILEDConst():
                    this.lpoint = 0;
                    this.errorLpointMessage = action.payload.json().messsage;
                    break;
                case this.paymentFunction.getCART_SET_PAYMENT_METHOD_SUCCESSConst():
                    if (action.payload.cart_totals) {
                        const selectedPaymentCoupon = action.payload.cart_totals.coupon_code;
                        this.couponCode = selectedPaymentCoupon;
                        if (!selectedPaymentCoupon) {
                            this.hasCoupon = false;
                        }
                        if (this.cartTotal && this.cartTotal.subtotal_with_discount < checkout.MIN_ORDER_LPOINT_CAMPAIGN && this.cartInfo && this.cartInfo.lpoint_campaign_reward > 0) {
                            this.removeLPoint();
                            if (this.customerLPoint) {
                                this.customerLPoint = 0;
                            }
                            if (this.customerLPointCampaign) {
                                this.customerLPointCampaign = 0;
                            }
                        }
                    }
                    break;
                default:
                    break;
            }
        });
    }

    ngOnDestroy() {
        this.subscriber.unsubscribe();
        this.cartVendorsSub.unsubscribe();
        this.vendorSub.unsubscribe();
    }

    applyCoupon() {
        this.store.dispatch(this.paymentFunction.getCartAddCouponAction(this.couponCode));
        this.coupond =  this.store.select(this.getRootCheckoutGetCouponStatusMessage()).subscribe((payload) => {
            this.message = payload;
        });
    }

    removeCoupon() {
        this.store.dispatch(this.paymentFunction.getCartDeleteCouponAction());
    }

    checkLpoint() {
        if (!this.useLPoint && this.lpoint) {
            if (this.hasLPoint) {
                this.store.dispatch(this.paymentFunction.getCartApplyLPointAction(0));
            }
            this.lpoint = 0;
        }
    }

    updateLPoint() {
        if (!this.lpoint) {
            return;
        }
        if (parseInt(this.lpoint.toString(), 10) > this.customerLPoint) {
            this.toastr.error('Bạn đã nhập quá số LPoint hiện có', 'Lỗi');
            this.lpoint = this.customerLPoint;
        } else {
            // [LT-586] huytt: Change apply Lpoint unit from 1000đ to 100đ
            if (parseInt(this.lpoint.toString(), 10) < MIN_L_POINT_APPLY && this.lpoint !== 0) {
                this.toastr.error('Số L-Point tối thiểu là '+ MIN_L_POINT_APPLY);
                this.lpoint = MIN_L_POINT_APPLY;
            } else {
                this.lpoint = this.lpoint ? Math.floor(this.lpoint / MIN_L_POINT_APPLY) * MIN_L_POINT_APPLY : this.lpoint;
                const grandTotal = this.cartTotal.grand_total - this.cartTotal.shipping_amount + this.shippingFee - parseInt(this.appliedLPoint.toString(), 10);
                this.lpoint = this.lpoint > grandTotal ? grandTotal : this.lpoint;
                this.store.dispatch(this.paymentFunction.getCartApplyLPointAction(this.lpoint));
            }
        }
    }
    checkLpointCampaign() {
        if (this.lpoint) {
            if (this.hasLPoint) {
                this.store.dispatch(this.paymentFunction.getCartApplyLPointAction(0));
            }
            this.lpoint = 0;
        }
        if (this.customerLPointCampaign) {
            this.customerLPointCampaign = 0;
        }
    }
    updateLPointCampaign(lpointOption: any) {
        this.lpoint = lpointOption.value;

        if (!this.lpoint) {
            return;
        }
        this.lpoint = this.lpoint ? Math.floor(this.lpoint / 1000) * 1000 : this.lpoint;
        const grandTotal = this.cartTotal.grand_total - this.cartTotal.shipping_amount + this.shippingFee - parseInt(this.appliedLPoint.toString(), 10);
        this.lpoint = this.lpoint > grandTotal ? grandTotal : this.lpoint;
        this.store.dispatch(this.paymentFunction.getCartApplyLPointAction(this.lpoint));
    }

    removeLPoint() {
        this.store.dispatch(this.paymentFunction.getCartApplyLPointAction(0));
    }

    gotoVendorPage(id, path) {
        this.router.navigate(['seller', id, path.replace('/', '')]);
    }

    parseGifts(text: string) {
        return JSON.parse(text);
    }

    backToPreviousStep() {
        this.dialogService.addDialog(ConfirmModal)
            .subscribe((isConfirm) => {
                if (isConfirm) {
                    let currentStep = (this.currentStep) > 1 ? (this.currentStep) - 1 : (this.currentStep);
                    if(currentStep === 1){
                        this.go2CartPage();
                    } else {
                        this.store.dispatch(this.paymentFunction.getUpdateCurrentStepAction(currentStep));
                    }
                }
            });
    }

    onClickSubmit(){
        let message = 'Bạn chưa nhập đầy đủ thông tin';
        const ruleIsNotMatched = this._shippingRuleIsNotMatched();
        if (ruleIsNotMatched) {
            message = ruleIsNotMatched.vendor_fail_message?ruleIsNotMatched.vendor_fail_message:'Có sản phẩm trong giỏ hàng không được giao ở vị trí bạn đã chọn';
            this.toastr.error(message, 'Lỗi');
        }else{
            if(typeof($('.checkout').attr('disabled')) == 'undefined' ){
                $('.checkout').trigger('click');
            }else{
                const selectedPaymentType = this.paymentFunction.getStorage('selectedPaymentType');
                if(selectedPaymentType == 'cashondelivery' || selectedPaymentType == 'momo'){
                    message = 'Bạn không thể thanh toán với phương thức này';
                }
                if(selectedPaymentType == 'vietin_gateway'){
                    $('.use_new_cc_card input').focus();
                    $('.use_new_cc_card input').blur();
                }
                this.toastr.error(message, 'Lỗi');
            }
        }
    }

    _shippingRuleIsNotMatched() {
        if (this.cartVendors && this.cartVendors.by_group) {
            return _.find(this.cartVendors.by_group, (item: any) => {
                return !item.vendor_shippable;
            });
        }
        return false;
    }

    // must implement if extends
    loadPaymentFunction(vendorId = null){
        this.paymentFunction = new NormalPayment(this.store);
    }

    getRootCheckoutGetCurrentStep(){
        return fromRoot.checkoutGetCurrentStep;
    }

    getRootCheckoutGetShippingVendors(){
        return fromRoot.checkoutGetShippingVendors;
    }

    getRootCheckoutGetShippingFee(){
        return fromRoot.checkoutGetShippingFee;
    }

    getRootCheckoutGetCartTotal(){
        return fromRoot.checkoutGetCartTotal;
    }

    getRootCheckoutGetCartInfo(){
        return fromRoot.checkoutGetCartInfo;
    }

    getRootCheckoutGetCouponStatusMessage(){
        return fromRoot.checkoutGetCouponStatusMessage;
    }

    getCustomerLpoint(){
        return fromRoot.accountGetLPoint;
    }

    go2CartPage(){
        this.store.dispatch(this.paymentFunction.getUpdateCurrentStepAction(1));
    }
}
