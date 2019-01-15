import { Action } from '@ngrx/store';

export const CART_LOAD = '[Cart] load cart';
export const CART_LOAD_SUCCESS = '[Cart] successfully loaded cart';
export const CART_LOAD_FAILED = '[Cart] failed to load cart';

export const CART_LOAD_SHIPPING_RULE = '[Cart] Load shipping rule';
export const CART_LOAD_SHIPPING_RULE_SUCCESS = '[Cart] successfully loaded shipping rule';
export const CART_LOAD_SHIPPING_RULE_FAILED = '[Cart] fail to load shipping rule';

export const CART_ADD_ITEMS = '[Cart] add cart items';
export const CART_ADD_ITEMS_SUCCESS = '[Cart] successfully added cart items';
export const CART_ADD_ITEMS_FAILED = '[Cart] failed to add cart items';

export const CART_CREATE = '[Cart] Create cart';
export const CART_CREATE_SUCCESS = '[Cart] successfully created cart';
export const CART_CREATE_FAILED = '[Cart] failed to create cart';

export const CART_MERGE = '[Cart] Merge cart';
export const CART_MERGE_SUCCESS = '[Cart] successfully merged cart';
export const CART_MERGE_FAILED = '[Cart] failed to merge cart';

export const CART_GET_SHIPPING_METHODS = '[Cart] get shipping methods';
export const CART_GET_SHIPPING_METHODS_SUCCESS = '[Cart] get shipping methods successfully';
export const CART_GET_SHIPPING_METHODS_FAILED = '[Cart] get shipping methods failed';

export const CART_UPDATE_SHIPPING_INFO = '[Cart] update shipping info';
export const CART_UPDATE_SHIPPING_INFO_SUCCESS = '[Cart] successfully updated shipping info';
export const CART_UPDATE_SHIPPING_INFO_FAILED = '[Cart] failed to update shipping info';


export const CART_UPDATE_PAYMENT_INFORMATION = '[Cart] update payment information';
export const CART_UPDATE_PAYMENT_INFORMATION_SUCCESS = '[Cart] successfully updated payment information';
export const CART_UPDATE_PAYMENT_INFORMATION_FAILED = '[Cart] failed to update payment information';
export const CART_REDIRECT_TO_PAYMENT_GATEWAY = '[Cart] redirect to 3rd payment gateway';

// Cart items
export const CART_UPDATE_ITEM = '[Cart] update item';
export const CART_UPDATE_ITEM_SUCCESS = '[Cart] item updated successfully';
export const CART_UPDATE_ITEM_FAILED = '[Cart] item updated failed';

export const CART_DELETE_ITEM = '[Cart] delete item';
export const CART_DELETE_ITEM_SUCCESS = '[Cart] delete item sucessfully';
export const CART_DELETE_ITEM_FAILED = '[Cart] delete item failed';

export const CART_DELETE_MULTIPLE_ITEMS = '[Cart] delete multiple items';
export const CART_DELETE_MULTIPLE_ITEMS_SUCCESS = '[Cart] delete multiple items successfully';
export const CART_DELETE_MULTIPLE_ITEMS_FAILED = '[Cart] delete multiple items failed';

// Coupons
export const CART_ADD_COUPON = '[Cart] update coupon';
export const CART_ADD_COUPON_SUCCESS = '[Cart] added coupon successfully';
export const CART_ADD_COUPON_FAILED = '[Cart] added coupon failed';

export const CART_GET_COUPON = '[Cart] get coupon';
export const CART_GET_COUPON_SUCCESS = '[Cart] get coupon successfully';
export const CART_GET_COUPON_FAILED = '[Cart] get coupon failed';

export const CART_DELETE_COUPON = '[Cart] delete coupon';
export const CART_DELETE_COUPON_SUCCESS = '[Cart] delete coupon successfully';
export const CART_DELETE_COUPON_FAILED = '[Cart] delete coupon failed';

export const CART_REFRESH = '[Cart] Refresh page';

export const UPDATE_CURRENT_STEP = '[Current Step] updated successfully';

export const CART_GET_PAYMENT_RULES = '[Cart] get payment rules';
export const CART_GET_PAYMENT_RULES_SUCCESS = '[Cart] get payment rules success';
export const CART_GET_PAYMENT_RULES_FAILED = '[Cart] get payment rules failed';

export const CART_APPLY_LPOINT = '[Cart] apply lpoint';
export const CART_APPLY_LPOINT_SUCCESS = '[Cart] apply lpoint successfully';
export const CART_APPLY_LPOINT_FAILED = '[Cart] apply lpoint failed';

export const CART_CHECK_ORDER_STATUS = '[Cart] check order status';
export const CART_CHECK_ORDER_STATUS_SUCCESS = '[Cart] check order status successfully';
export const CART_CHECK_ORDER_STATUS_FAILED = '[Cart] check order status failed';

export const CART_RECREATE = '[Cart] recreate';
export const CART_RECREATE_FAILED = '[Cart] recreate failed';
export const CART_RECREATE_SUCCESS = '[Cart] recreate successfully';

export const CART_SET_PAYMENT_METHOD = '[Cart] set payment method';
export const CART_SET_PAYMENT_METHOD_SUCCESS = '[Cart] set payment method succesfully';
export const CART_SET_PAYMENT_METHOD_FAILED = '[Cart] set payment method failed';

export const CART_CC_TRANSACTION_REQUEST = '[Cart] CC transaction request';
export const CART_CC_TRANSACTION_REQUEST_SUCCESS = '[Cart] CC transaction request successfully';
export const CART_CC_TRANSACTION_REQUEST_FAILED = '[Cart] CC transaction request failed';

export const CART_GET_PAYMENT_METHODS = '[Cart] get payment methods';
export const CART_GET_PAYMENT_METHODS_SUCCESS = '[Cart] get payment method success';
export const CART_GET_PAYMENT_METHOD_FAILED = '[Cart] get payment method failed';

export const CART_ADD_WISHLIST = '[ACCOUNT] Add wishlist to cart';
export const CART_ADD_WISHLIST_SUCCESS = '[ACCOUNT] Add wishlist to cart successfully';
export const CART_ADD_WISHLIST_FAILED = '[ACCOUNT] Add wishlist to cart failed';

export const SET_ERROR_MESSAGE = '[Cart] set error message';

export const LPOINT_OUT_TIME_ERROR_MESSAGE = 'Rất tiếc khuyến mãi Lpoint này đã hết lượt sử dụng.'
export const LPOINT_CART_ERROR_MESSAGE = 'Chỉ áp dụng cho đơn hàng trên 200.000đ. Bạn có thể mua sắm thêm!'

export const MIN_ORDER_LPOINT_CAMPAIGN = 200000;
// cart Later
export const CART_LATER_CREATE = '[CART LATER] Create cart later';
export const CART_LATER_CREATE_SUCCESS = '[CART LATER] successfully created cart';
export const CART_LATER_CREATE_FAILED = '[CART LATER] failed to create cart';

export const CART_LATER_LOAD = '[CART LATER] Add cart later';
export const CART_LATER_LOAD_SUCCESS = '[CART LATER] Add cart later successfully';
export const CART_LATER_LOAD_FAILED = '[CART LATER] Add cart later failed';

export const CART_LATER_ADD_ITEM = '[CART LATER] add item';
export const CART_LATER_ADD_ITEM_SUCCESS = '[CART LATER] item added successfully';
export const CART_LATER_ADD_ITEM_FAILED = '[CART LATER] item added failed';

export const CART_LATER_UPDATE_ITEM = '[CART LATER] update item';
export const CART_LATER_UPDATE_ITEM_SUCCESS = '[CART LATER] item updated successfully';
export const CART_LATER_UPDATE_ITEM_FAILED = '[CART LATER] item updated failed';

export const CART_LATER_DELETE_ITEM = '[CART LATER] delete item';
export const CART_LATER_DELETE_ITEM_SUCCESS = '[CART LATER] delete item sucessfully';
export const CART_LATER_DELETE_ITEM_FAILED = '[CART LATER] delete item failed';

export const CART_LATER_DELETE_MULTIPLE_ITEMS = '[CART LATER] delete multiple items';
export const CART_LATER_DELETE_MULTIPLE_ITEMS_SUCCESS = '[CART LATER] delete multiple items successfully';
export const CART_LATER_DELETE_MULTIPLE_ITEMS_FAILED = '[CART LATER] delete multiple items failed';

export const CART_VALIDATE_CARD_NO = '[CART] validate card no';
export const CART_VALIDATE_CARD_NO_SUCCESS = '[CART] validate card no successfully';
export const CART_VALIDATE_CARD_NO_FAILED = '[CART] validate card no failed';
export const CART_CLEAR_VALIDATE_CARD_NO = '[CART] clear validate card no';

export const CART_LATER_REFRESH = '[CART LATER] Refresh page';

// LOAD CART INFO
export class CartLoad implements Action {
    readonly type = CART_LOAD;
    constructor() { }
}

export class CartLoadFailed implements Action {
    readonly type = CART_LOAD_FAILED;

    constructor(public payload: any) {
    }
}

export class CartLoadSuccess implements Action {
    readonly type = CART_LOAD_SUCCESS;
    constructor(public payload: any) {
    }
}

// LOAD SHIPPING RULE
export class CartLoadShippingRule implements Action {
    readonly type = CART_LOAD_SHIPPING_RULE;
    constructor(public payload: any) { }
}

export class CartLoadShippingRuleFailed implements Action {
    readonly type = CART_LOAD_SHIPPING_RULE_FAILED;

    constructor(public payload: any) {
    }
}

export class CartLoadShippingRuleSuccess implements Action {
    readonly type = CART_LOAD_SHIPPING_RULE_SUCCESS;
    constructor(public payload: any) {
    }
}

// ADD A ITEM TO CART
export class CartAddItems implements Action {
    readonly type = CART_ADD_ITEMS;
    constructor(public payload: any) { }
}

export class CartAddItemsFailed implements Action {
    readonly type = CART_ADD_ITEMS_FAILED;

    constructor(public payload: any) {
    }
}

export class CartAddItemsSuccess implements Action {
    readonly type = CART_ADD_ITEMS_SUCCESS;
    constructor(public payload: any) {
    }
}

// CREATE AN EMPTY CART
export class CartCreate implements Action {
    readonly type = CART_CREATE;
    constructor() { }
}

export class CartCreateSuccess implements Action {
    readonly type = CART_CREATE_SUCCESS;
    constructor(public payload: any) { }
}

export class CartCreateFailed implements Action {
    readonly type = CART_CREATE_FAILED;
    constructor(public payload: any) { }
}

// MERGE CART WHEN LOGGING IN
export class CartMerge implements Action {
    readonly type = CART_MERGE;
    constructor(public payload: any) { }
}

export class CartMergeSuccess implements Action {
    readonly type = CART_MERGE_SUCCESS;
    constructor(public payload: any) { }
}

export class CartMergeFailed implements Action {
    readonly type = CART_MERGE_FAILED;
    constructor(public payload: any) { }
}

export class CartGetShippingMethods implements Action {
    readonly type = CART_GET_SHIPPING_METHODS;
    constructor() { }
}

export class CartGetShippingMethodsSuccess implements Action {
    readonly type = CART_GET_SHIPPING_METHODS_SUCCESS;
    constructor(public payload: any) { }
}

export class CartGetShippingMethodsFailed implements Action {
    readonly type = CART_GET_SHIPPING_METHODS_FAILED;
    constructor(public payload: any) { }
}

// UPDATE SHIPPING INFO
export class CartUpdateShippingInfo implements Action {
    readonly type = CART_UPDATE_SHIPPING_INFO;
    constructor() {

    }
}

export class CartUpdateShippingInfoFailed implements Action {
    readonly type = CART_UPDATE_SHIPPING_INFO_FAILED;
    constructor(public payload: any) {

    }
}

export class CartUpdateShippingInfoSuccess implements Action {
    readonly type = CART_UPDATE_SHIPPING_INFO_SUCCESS;
    constructor(public payload: any) {

    }
}

// UPDATE PAYMENT INFORMATION
export class CartUpdatePaymentInformation implements Action {
    readonly type = CART_UPDATE_PAYMENT_INFORMATION;
    constructor(public payload: any) {

    }
}

export class CartUpdatePaymentInformationFailed implements Action {
    readonly type = CART_UPDATE_PAYMENT_INFORMATION_FAILED;
    constructor(public payload: any) {

    }
}

export class CartUpdatePaymentInformationSuccess implements Action {
    readonly type = CART_UPDATE_PAYMENT_INFORMATION_SUCCESS;
    constructor(public payload: any) {

    }
}

export class CartRedirectToPaymentGateway implements Action {
    readonly type = CART_REDIRECT_TO_PAYMENT_GATEWAY;
    constructor(public payload: any) {

    }
}

// UPDATE CART ITEM
export class CartUpdateItem implements Action {
    readonly type = CART_UPDATE_ITEM;
    constructor(public payload: any) {

    }
}

export class CartUpdateItemSuccess implements Action {
    readonly type = CART_UPDATE_ITEM_SUCCESS;
    constructor(public payload: any) {

    }
}

export class CartUpdateItemFailed implements Action {
    readonly type = CART_UPDATE_ITEM_FAILED;
    constructor(public payload: any) {

    }
}

// DELETE CART ITEM
export class CartDeleteItem implements Action {
    readonly type = CART_DELETE_ITEM;
    constructor(public payload: any) {

    }
}

export class CartDeleteItemSuccess implements Action {
    readonly type = CART_DELETE_ITEM_SUCCESS;
    constructor(public payload: any) {

    }
}

export class CartDeleteItemFailed implements Action {
    readonly type = CART_DELETE_ITEM_FAILED;
    constructor(public payload: any) {

    }
}

export class CartDeleteMultipleItems implements Action {
    readonly type = CART_DELETE_MULTIPLE_ITEMS;
    constructor(public payload: any) {

    }
}
export class CartDeleteMultipleItemsSuccess implements Action {
    readonly type = CART_DELETE_MULTIPLE_ITEMS_SUCCESS;
    constructor(public payload: any) {

    }
}
export class CartDeleteMultipleItemsFailed implements Action {
    readonly type = CART_DELETE_MULTIPLE_ITEMS_FAILED;
    constructor(public payload: any) {

    }
}


// ADD COUPON
export class CartAddCoupon implements Action {
    readonly type = CART_ADD_COUPON;
    constructor(public payload: any) {

    }
}

export class CartAddCouponSuccess implements Action {
    readonly type = CART_ADD_COUPON_SUCCESS;
    constructor(public payload: any) {

    }
}
export class CartAddCouponFailed implements Action {
    readonly type = CART_ADD_COUPON_FAILED;
    constructor(public payload: any) {

    }
}

export class CartGetCoupon implements Action {
    readonly type = CART_GET_COUPON;
    constructor() {

    }
}
export class CartGetCouponSuccess implements Action {
    readonly type = CART_GET_COUPON_SUCCESS;
    constructor(public payload: any) {

    }
}
export class CartGetCouponFailed implements Action {
    readonly type = CART_GET_COUPON_FAILED;
    constructor(public payload: any) {

    }
}

export class CartDeleteCoupon implements Action {
    readonly type = CART_DELETE_COUPON;
    constructor() {

    }
}
export class CartDeleteCouponSuccess implements Action {
    readonly type = CART_DELETE_COUPON_SUCCESS;
    constructor(public payload: any) {

    }
}
export class CartDeleteCouponFailed implements Action {
    readonly type = CART_DELETE_COUPON_FAILED;
    constructor(public payload: any) {

    }
}

// REFRESH CART WHEN PAGE REFRESH
export class CartRefresh implements Action {
    readonly type= CART_REFRESH;
    constructor() {

    }
}

// UPDATE CURRENT STEP IN CHECKOUT
export class UpdateCurrentStep implements Action {
    readonly type = UPDATE_CURRENT_STEP;
    constructor(public payload: any) {

    }
}

export class CartGetPaymentRules implements Action {
    readonly type = CART_GET_PAYMENT_RULES;
    constructor() { }
}
export class CartGetPaymentRulesSuccess implements Action {
    readonly type = CART_GET_PAYMENT_RULES_SUCCESS;
    constructor(public payload: any) { }
}
export class CartGetPaymentRulesFailed implements Action {
    readonly type = CART_GET_PAYMENT_RULES_FAILED;
    constructor(public payload: any) { }
}

export class CartApplyLPoint implements Action {
    readonly type = CART_APPLY_LPOINT;
    constructor(public payload: any) { }
}
export class CartApplyLPointSuccess implements Action {
    readonly type = CART_APPLY_LPOINT_SUCCESS;
    constructor(public payload: any) { }
}
export class CartApplyLPointFailed implements Action {
    readonly type = CART_APPLY_LPOINT_FAILED;
    constructor(public payload: any) { }
}

export class CartCheckOrderStatus implements Action {
    readonly type = CART_CHECK_ORDER_STATUS;
    constructor() {}
}
export class CartCheckOrderStatusSuccess implements Action {
    readonly type = CART_CHECK_ORDER_STATUS_SUCCESS;
    constructor() {}
}
export class CartCheckOrderStatusFailed implements Action {
    readonly type = CART_CHECK_ORDER_STATUS_FAILED;
    constructor(public payload: any) {}
}

export class CartRecreate implements Action {
    readonly type = CART_RECREATE;
    constructor(public payload: any) {}
}
export class CartRecreateSuccess implements Action {
    readonly type = CART_RECREATE_SUCCESS;
    constructor(public payload: any) {}
}
export class CartRecreateFailed implements Action {
    readonly type = CART_RECREATE_FAILED;
    constructor(public payload: any) {}
}

export class CartSetPaymentMethod implements Action {
    readonly type = CART_SET_PAYMENT_METHOD;
    constructor(public payload: any) {}
}
export class CartSetPaymentMethodSuccess implements Action {
    readonly type = CART_SET_PAYMENT_METHOD_SUCCESS;
    constructor(public payload: any) {}
}
export class CartSetPaymentMethodFailed implements Action {
    readonly type = CART_SET_PAYMENT_METHOD_FAILED;
    constructor(public payload: any) {}
}

export class CartCCTransactionRequest implements Action {
    readonly type = CART_CC_TRANSACTION_REQUEST;
    constructor(public payload: any) {}
}
export class CartCCTransactionRequestSuccess implements Action {
    readonly type = CART_CC_TRANSACTION_REQUEST_SUCCESS;
    constructor(public payload: any) {}
}
export class CartCCTransactionRequestFailed implements Action {
    readonly type = CART_CC_TRANSACTION_REQUEST_FAILED;
    constructor(public payload: any) {}
}

export class CartGetPaymentMethods implements Action {
    readonly type = CART_GET_PAYMENT_METHODS;
    constructor() {}
}
export class CartGetPaymentMethodsSuccess implements Action {
    readonly type = CART_GET_PAYMENT_METHODS_SUCCESS;
    constructor(public payload: any) {}
}
export class CartGetPaymentMethodsFailed implements Action {
    readonly type = CART_GET_PAYMENT_METHOD_FAILED;
    constructor(public payload: any) {}
}

export class CartAddWishlist implements Action {
    readonly type = CART_ADD_WISHLIST;
    constructor(public payload: any) {}
}
export class CartAddWishlistSuccess implements Action {
    readonly type = CART_ADD_WISHLIST_SUCCESS;
    constructor(public payload: any) {}
}
export class CartAddWishlistFailed implements Action {
    readonly type = CART_ADD_WISHLIST_FAILED;
    constructor(public payload: any) {}
}

export class SetErrorMessage implements Action {
    readonly type = SET_ERROR_MESSAGE;
    constructor(public payload: any) {

    }
}

export class CartLaterCreate implements Action {
    readonly type = CART_LATER_CREATE;
    constructor(public payload: any) {
    }
}
export class CartLaterCreateSuccess implements Action {
    readonly type = CART_LATER_CREATE_SUCCESS;
    constructor(public payload: any) {
    }
}
export class CartLaterCreateFailed implements Action {
    readonly type = CART_LATER_CREATE_FAILED;
    constructor(public payload: any) {
    }
}
export class CartLaterLoad implements Action {
    readonly type = CART_LATER_LOAD;
    constructor(public payload: any) {
    }
}
export class CartLaterLoadSuccess implements Action {
    readonly type = CART_LATER_LOAD_SUCCESS;
    constructor(public payload: any) {
    }
}
export class CartLaterLoadFailed implements Action {
    readonly type = CART_LATER_LOAD_FAILED;
    constructor(public payload: any) {
    }
}
export class CartLaterAddItem implements Action {
    readonly type = CART_LATER_ADD_ITEM;
    constructor(public payload: any) {
    }
}
export class CartLaterAddItemSuccess implements Action {
    readonly type = CART_LATER_ADD_ITEM_SUCCESS;
    constructor(public payload: any) {
    }
}
export class CartLaterAddItemFailed implements Action {
    readonly type = CART_LATER_ADD_ITEM_FAILED;
    constructor(public payload: any) {
    }
}
export class CartLaterUpdateItem implements Action {
    readonly type = CART_LATER_UPDATE_ITEM;
    constructor(public payload: any) {
    }
}
export class CartLaterUpdateItemSuccess implements Action {
    readonly type = CART_LATER_UPDATE_ITEM_SUCCESS;
    constructor(public payload: any) {
    }
}
export class CartLaterUpdateItemFailed implements Action {
    readonly type = CART_LATER_UPDATE_ITEM_FAILED;
    constructor(public payload: any) {
    }
}
export class CartLaterDeleteItem implements Action {
    readonly type = CART_LATER_DELETE_ITEM;
    constructor(public payload: any) {
    }
}
export class CartLaterDeleteItemSuccess implements Action {
    readonly type = CART_LATER_DELETE_ITEM_SUCCESS;
    constructor(public payload: any) {
    }
}
export class CartLaterDeleteItemFailed implements Action {
    readonly type = CART_LATER_DELETE_ITEM_FAILED;
    constructor(public payload: any) {
    }
}
export class CartLaterDeleteMultipleItems implements Action {
    readonly type = CART_LATER_DELETE_MULTIPLE_ITEMS;
    constructor(public payload: any) {
    }
}
export class CartLaterDeleteMultipleItemsSuccess implements Action {
    readonly type = CART_LATER_DELETE_MULTIPLE_ITEMS_SUCCESS;
    constructor(public payload: any) {
    }
}
export class CartLaterDeleteMultipleItemsFailed implements Action {
    readonly type = CART_LATER_DELETE_MULTIPLE_ITEMS_FAILED;
    constructor(public payload: any) {
    }
}

export class cartValidateCardNo implements Action {
    readonly type = CART_VALIDATE_CARD_NO;
    constructor(public payload: any) {
    }
}
export class cartValidateCardNoSuccess implements Action {
    readonly type = CART_VALIDATE_CARD_NO_SUCCESS;
    constructor(public payload: any) {
    }
}
export class cartValidateCardNoFailed implements Action {
    readonly type = CART_VALIDATE_CARD_NO_FAILED;
    constructor(public payload: any) {
    }
}
export class clearCartValidateCardNo implements Action {
    readonly type = CART_CLEAR_VALIDATE_CARD_NO;
    constructor() {
    }
}
export class CartLaterRefresh implements Action {
    readonly type = CART_LATER_REFRESH;
    constructor(public payload: any) {
    }
}


export type CartActions =
    CartLoad | CartLoadFailed | CartLoadSuccess |
    CartLoadShippingRule | CartLoadShippingRuleFailed | CartLoadShippingRuleSuccess |
    CartAddItems | CartAddItemsFailed | CartAddItemsSuccess |
    CartCreate | CartCreateSuccess | CartCreateFailed |
    CartMerge | CartMergeSuccess | CartMergeFailed |
    CartGetShippingMethods | CartGetShippingMethodsFailed | CartGetShippingMethodsSuccess |
    CartUpdateShippingInfo | CartUpdateShippingInfoFailed | CartUpdateShippingInfoSuccess |
    CartUpdatePaymentInformation | CartUpdatePaymentInformationFailed | CartUpdatePaymentInformationSuccess |
    CartUpdateItem | CartUpdateItemSuccess | CartUpdateItemFailed |
    CartDeleteItem | CartDeleteItemSuccess | CartDeleteItemFailed |
    CartDeleteMultipleItems | CartDeleteMultipleItemsFailed | CartDeleteMultipleItemsSuccess |
    CartAddCoupon | CartAddCouponSuccess | CartAddCouponFailed |
    CartDeleteCoupon | CartDeleteCouponFailed | CartDeleteCouponSuccess |
    CartGetCoupon | CartGetCouponFailed | CartGetCouponSuccess |
    UpdateCurrentStep | CartRefresh |
    CartGetPaymentRules | CartGetPaymentRulesFailed | CartGetPaymentRulesSuccess |
    CartApplyLPoint | CartApplyLPointSuccess | CartApplyLPointFailed |
    CartCheckOrderStatus | CartCheckOrderStatusFailed | CartCheckOrderStatusSuccess |
    CartRecreate | CartRecreateFailed | CartRecreateSuccess |
    CartSetPaymentMethod | CartSetPaymentMethodFailed | CartSetPaymentMethodSuccess |
    CartCCTransactionRequest | CartCCTransactionRequestFailed | CartCCTransactionRequestSuccess |
    CartGetPaymentMethods | CartGetPaymentMethodsFailed | CartGetPaymentMethodsSuccess |
    CartAddWishlist | CartAddWishlistSuccess | CartAddWishlistFailed |
    CartLaterCreate | CartLaterCreateSuccess | CartLaterCreateFailed |
    CartLaterLoad | CartLaterLoadSuccess | CartLaterLoadFailed |
    CartLaterAddItem | CartLaterAddItemSuccess | CartLaterAddItemFailed |
    CartLaterUpdateItem | CartLaterUpdateItemSuccess | CartLaterUpdateItemFailed |
    CartLaterDeleteItem | CartLaterDeleteItemSuccess | CartLaterDeleteItemFailed |
    CartLaterDeleteMultipleItems | CartLaterDeleteMultipleItemsSuccess | CartLaterDeleteMultipleItemsFailed |
    cartValidateCardNo | cartValidateCardNoSuccess | cartValidateCardNoFailed | clearCartValidateCardNo |
    CartLaterRefresh |
    SetErrorMessage;
