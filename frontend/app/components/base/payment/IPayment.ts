import {Action} from "@ngrx/store";

export interface IPayment{
    loadCart();
    getCartType();
    clearCartInfo();
    getStorage(key);
    storeStorage(key, value);
    getCartCheckOrderStatusAction(): Action;
    getCartLoadAction(): Action;
    getCartAddCouponAction(couponCode: any): Action ;
    getCartDeleteCouponAction(): Action ;
    getCartApplyLPointAction(lpoint);
    getCartUpdateShippingInfoAction():Action;
    getCartGetPaymentMethodAction(): Action;
    getCartSetPaymentMethodAction(info): Action;
    getCartCCTransactionRequestAction(info): Action;
    getUpdateCurrentStepAction(step): Action;
    getCartUpdatePaymentInformationAction(info);
    getCartGetPaymentRulesAction():Action;
    getCartLoadShippingRuleAction(info):Action;
    getCartRefreshAction():Action;

    getRootCheckoutGetCurrentStep();
    getRootCheckoutGetSuccessMessage();
    getRootCheckoutGetShippingFee();
    getRootCheckoutGetCartInfo();
    getRootCheckoutGetCouponStatusMessage();
    getRootCheckoutGetCartItemsCount();
    getRootCheckoutGetShippingVendors();
    getRootCheckoutGetCartTotal();
    getRootCheckoutGetPaymentRules();
    getRootCheckoutGetLoadingState();


    getCartUpdatePaymentInformationSuccessConst();
    getCartRedirectToPaymentGatewayConst();
    getCartGetPaymentMethodsSuccessConst();
    getCART_CC_TRANSACTION_REQUEST_SUCCESSConst();
    getCART_MERGE_SUCCESSConst();
    getCART_CHECK_ORDER_STATUS_FAILEDConst();
    getCART_CHECK_ORDER_STATUS_SUCCESSConst();
    getCART_UPDATE_SHIPPING_INFO_SUCCESSConst();
    getCART_UPDATE_PAYMENT_INFORMATION_FAILEDConst();
    getCART_LOAD_SUCCESSConst();
    getCART_LOAD_FAILEDConst();
    getCART_DELETE_ITEM_SUCCESSConst();
    getCART_SET_PAYMENT_METHOD_SUCCESSConst();
    getCART_ADD_COUPON_SUCCESSConst();
    getCART_ADD_COUPON_FAILEDConst();
    getCART_DELETE_COUPON_SUCCESSConst();
    getCART_APPLY_LPOINT_SUCCESSConst();
    getCART_APPLY_LPOINT_FAILEDConst();



}