import {IPayment} from "./IPayment";
import {CART_TYPE, CartManagement} from "../cart/CartManagement";
import {Action, Store} from "@ngrx/store";
import * as fromRoot from '../../../store';
import * as checkout from '../../../store/checkout/vendor-checkout/checkout.actions';
import {LocalStorageManagement} from "../LocalStorageManagement";

export class VendorPayment implements IPayment{
    protected cartType: any;
    constructor(
        protected store: Store<fromRoot.AppState>,
        protected id: number
    ){
        this.cartType = {
            type: CART_TYPE.VENDOR_CART,
            id: id
        };
    }

    loadCart(){
        CartManagement.getInstance(this.store).loadCart(this.cartType);
    }

    getCartType(){
        return this.cartType;
    }

    clearCartInfo(){
        LocalStorageManagement.getInstance().clearVendorCartInfo(this.id);
    }

    getStorage(key){
        const cartInfo = LocalStorageManagement.getInstance().getVendorCartInfo(this.id);
        if(cartInfo){
            return cartInfo[key];
        }
        return null;

    }

    storeStorage(key, value){
        let temp = {};
        temp[key] = value;
        LocalStorageManagement.getInstance().storeStorageVendorCartInfo(this.id, temp);
    }

    getCartRefreshAction():Action{
        return CartManagement.getInstance(this.store).getCart(this.cartType).getCartRefreshAction();
    }

    getCartLoadShippingRuleAction(info): Action {
        return CartManagement.getInstance(this.store).getCart(this.cartType).getCartLoadShippingRuleAction(info);
    }

    getCartCheckOrderStatusAction(): Action {
        return CartManagement.getInstance(this.store).getCart(this.cartType).getCartCheckOrderStatusAction();
    }

    getCartLoadAction(): Action {
        return CartManagement.getInstance(this.store).getCart(this.cartType).getCartLoadAction();
    }

    getCartAddCouponAction(couponCode: any): Action {
        return CartManagement.getInstance(this.store).getCart(this.cartType).getCartAddCouponAction(couponCode);
    }

    getCartDeleteCouponAction(): Action {
        return CartManagement.getInstance(this.store).getCart(this.cartType).getCartDeleteCouponAction();
    }

    getCartApplyLPointAction(lpoint: any) {
        return CartManagement.getInstance(this.store).getCart(this.cartType).getCartApplyLPointAction(lpoint);
    }

    getCartUpdateShippingInfoAction(): Action {
        return CartManagement.getInstance(this.store).getCart(this.cartType).getCartUpdateShippingInfoAction();
    }

    getCartGetPaymentMethodAction(): Action {
        return CartManagement.getInstance(this.store).getCart(this.cartType).getCartGetPaymentMethodsAction();
    }

    getCartSetPaymentMethodAction(info: any): Action {
        return CartManagement.getInstance(this.store).getCart(this.cartType).getCartSetPaymentMethodAction(info);
    }

    getCartCCTransactionRequestAction(info: any): Action {
        return CartManagement.getInstance(this.store).getCart(this.cartType).getCartCCTransactionRequestAction(info);
    }

    getUpdateCurrentStepAction(step: any): Action {
        return CartManagement.getInstance(this.store).getCart(this.cartType).getUpdateCurrentStepAction(step);
    }

    getCartUpdatePaymentInformationAction(info: any) {
        return CartManagement.getInstance(this.store).getCart(this.cartType).getCartUpdatePaymentInformationAction(info);
    }

    getCartGetPaymentRulesAction(): Action {
        return CartManagement.getInstance(this.store).getCart(this.cartType).getCartGetPaymentRulesAction();
    }

    getRootCheckoutGetCurrentStep() {
        return fromRoot.vendorCheckoutGetCurrentStep;
    }

    getRootCheckoutGetSuccessMessage() {
        return fromRoot.vendorCheckoutGetSuccessMessage;
    }

    getRootCheckoutGetShippingFee() {
        return fromRoot.vendorCheckoutGetShippingFee;
    }

    getRootCheckoutGetCartInfo() {
        return fromRoot.vendorCheckoutGetCartInfo;
    }

    getRootCheckoutGetCouponStatusMessage() {
        return fromRoot.vendorCheckoutGetCouponStatusMessage;
    }

    getRootCheckoutGetCartItemsCount() {
        return fromRoot.vendorCheckoutGetCartItemsCount;
    }

    getRootCheckoutGetShippingVendors() {
        return fromRoot.vendorCheckoutGetShippingVendors;
    }

    getRootCheckoutGetCartTotal() {
        return fromRoot.vendorCheckoutGetCartTotal;
    }

    getRootCheckoutGetPaymentRules() {
        return fromRoot.vendorCheckoutGetPaymentRules;
    }

    getRootCheckoutGetLoadingState() {
        return fromRoot.vendorCheckoutGetLoadingState;
    }

    getCartUpdatePaymentInformationSuccessConst() {
        return checkout.CART_UPDATE_PAYMENT_INFORMATION_SUCCESS;
    }

    getCartRedirectToPaymentGatewayConst() {
        return checkout.CART_REDIRECT_TO_PAYMENT_GATEWAY;
    }

    getCartGetPaymentMethodsSuccessConst() {
        return checkout.CART_GET_PAYMENT_METHODS_SUCCESS;
    }

    getCART_CC_TRANSACTION_REQUEST_SUCCESSConst(){
        return checkout.CART_CC_TRANSACTION_REQUEST_SUCCESS;
    }

    getCART_MERGE_SUCCESSConst(){
        return checkout.CART_MERGE_SUCCESS;
    }

    getCART_CHECK_ORDER_STATUS_FAILEDConst(){
        return checkout.CART_CHECK_ORDER_STATUS_FAILED;
    }

    getCART_CHECK_ORDER_STATUS_SUCCESSConst(){
        return checkout.CART_CHECK_ORDER_STATUS_SUCCESS;
    }

    getCART_UPDATE_SHIPPING_INFO_SUCCESSConst(){
        return checkout.CART_UPDATE_SHIPPING_INFO_SUCCESS;
    }

    getCART_UPDATE_PAYMENT_INFORMATION_FAILEDConst(){
        return checkout.CART_UPDATE_PAYMENT_INFORMATION_FAILED;
    }

    getCART_LOAD_SUCCESSConst(){
        return checkout.CART_LOAD_SUCCESS;
    }

    getCART_LOAD_FAILEDConst(){
        return checkout.CART_LOAD_FAILED;
    }

    getCART_DELETE_ITEM_SUCCESSConst(){
        return checkout.CART_DELETE_ITEM_SUCCESS
    }

    getCART_SET_PAYMENT_METHOD_SUCCESSConst(){
        return checkout.CART_SET_PAYMENT_METHOD_SUCCESS;
    }

    getCART_ADD_COUPON_SUCCESSConst(){
        return checkout.CART_ADD_COUPON_SUCCESS;
    }

    getCART_ADD_COUPON_FAILEDConst(){
        return checkout.CART_ADD_COUPON_FAILED;
    }

    getCART_DELETE_COUPON_SUCCESSConst(){
        return checkout.CART_DELETE_COUPON_SUCCESS;
    }

    getCART_APPLY_LPOINT_SUCCESSConst(){
        return checkout.CART_APPLY_LPOINT_SUCCESS;
    }

    getCART_APPLY_LPOINT_FAILEDConst(){
        return checkout.CART_APPLY_LPOINT_FAILED;
    }
}