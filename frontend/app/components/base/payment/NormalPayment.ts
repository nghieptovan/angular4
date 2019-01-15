import {IPayment} from "./IPayment";
import {CART_TYPE, CartManagement} from "../cart/CartManagement";
import {Action, Store} from "@ngrx/store";
import * as fromRoot from '../../../store';
import * as checkout from '../../../store/checkout/checkout.actions';
import {LocalStorageConstants} from "../constants/LocalStorageConstants";

export class NormalPayment implements IPayment{
    constructor(
        protected store: Store<fromRoot.AppState>
    ){

    }

    loadCart(){
        CartManagement.getInstance(this.store).loadCart();
    }

    getCartType(){
        return {type:CART_TYPE.NORMAL_CART, id: null};
    }

    clearCartInfo(){
        localStorage.removeItem('cartId');
        localStorage.removeItem('paymentMethod');
        localStorage.removeItem('shipping_duration');
        localStorage.removeItem('orderSuccess');
        localStorage.removeItem('differentBillingAddress');
        localStorage.removeItem('billingAddress');
        localStorage.removeItem('shippingAddress');
        localStorage.removeItem('shipping_comments');
        localStorage.removeItem('vatInfo');
        localStorage.removeItem('shippingRules');
        localStorage.removeItem('cart');
        localStorage.removeItem('selectedPaymentType');
        localStorage.removeItem('installmentBank');
        localStorage.removeItem(LocalStorageConstants.VENDOR_PICKUP_INFO);
    }

    getStorage(key){
        return localStorage.getItem(key);
    }

    storeStorage(key, value){
        localStorage.setItem(key, value);
    }

    getCartRefreshAction():Action{
        return CartManagement.getInstance(this.store).getCart().getCartRefreshAction();
    }

    getCartLoadShippingRuleAction(info): Action {
        return CartManagement.getInstance(this.store).getCart().getCartLoadShippingRuleAction(info);
    }

    getCartCheckOrderStatusAction(): Action {
        return CartManagement.getInstance(this.store).getCart().getCartCheckOrderStatusAction();
    }

    getCartLoadAction(): Action {
        return CartManagement.getInstance(this.store).getCart().getCartLoadAction();
    }

    getCartAddCouponAction(couponCode: any): Action {
        return CartManagement.getInstance(this.store).getCart().getCartAddCouponAction(couponCode);
    }

    getCartDeleteCouponAction(): Action {
        return CartManagement.getInstance(this.store).getCart().getCartDeleteCouponAction();
    }

    getCartApplyLPointAction(lpoint: any) {
        return CartManagement.getInstance(this.store).getCart().getCartApplyLPointAction(lpoint);
    }

    getCartUpdateShippingInfoAction(): Action {
        return CartManagement.getInstance(this.store).getCart().getCartUpdateShippingInfoAction();
    }

    getCartGetPaymentMethodAction(): Action {
        return CartManagement.getInstance(this.store).getCart().getCartGetPaymentMethodsAction();
    }

    getCartSetPaymentMethodAction(info: any): Action {
        return CartManagement.getInstance(this.store).getCart().getCartSetPaymentMethodAction(info);
    }

    getCartCCTransactionRequestAction(info: any): Action {
        return CartManagement.getInstance(this.store).getCart().getCartCCTransactionRequestAction(info);
    }

    getUpdateCurrentStepAction(step: any): Action {
        return CartManagement.getInstance(this.store).getCart().getUpdateCurrentStepAction(step);
    }

    getCartUpdatePaymentInformationAction(info: any) {
        return CartManagement.getInstance(this.store).getCart().getCartUpdatePaymentInformationAction(info);
    }

    getCartGetPaymentRulesAction(): Action {
        return CartManagement.getInstance(this.store).getCart().getCartGetPaymentRulesAction();
    }

    getRootCheckoutGetCurrentStep() {
        return fromRoot.checkoutGetCurrentStep;
    }

    getRootCheckoutGetSuccessMessage() {
        return fromRoot.checkoutGetSuccessMessage;
    }

    getRootCheckoutGetShippingFee() {
        return fromRoot.checkoutGetShippingFee;
    }

    getRootCheckoutGetCartInfo() {
        return fromRoot.checkoutGetCartInfo;
    }

    getRootCheckoutGetCouponStatusMessage() {
        return fromRoot.checkoutGetCouponStatusMessage;
    }

    getRootCheckoutGetCartItemsCount() {
        return fromRoot.checkoutGetCartItemsCount;
    }

    getRootCheckoutGetShippingVendors() {
        return fromRoot.checkoutGetShippingVendors;
    }

    getRootCheckoutGetCartTotal() {
        return fromRoot.checkoutGetCartTotal;
    }

    getRootCheckoutGetPaymentRules() {
        return fromRoot.checkoutGetPaymentRules;
    }

    getRootCheckoutGetLoadingState() {
        return fromRoot.checkoutGetLoadingState;
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