import { Action } from '@ngrx/store';

/*
 Because the Products collection is asynchronous, there need to be actions to handle
 each of the stages of the request.
 */

export const DEFAULT_PHONECARD_PROVIDER = 'vinaphone';
export const DEFAULT_GAMECARD_PROVIDER = 'fpt';
export const DEFAULT_TOPUP_PROVIDER = 'vinaphone';

export const LOAD_RECHARGE_CONFIG = '[Recharge] Load Recharge Config';
export const LOAD_RECHARGE_CONFIG_SUCCESS = '[Recharge] Load Recharge Config successfully';
export const LOAD_RECHARGE_CONFIG_FAILED = '[Recharge] Load Recharge Config failed';

export const SELECT_RECHARGE_TYPE = '[Recharge] Select Recharge Type';
export const SELECT_PRODUCT = '[Recharge] Select Product';
export const SELECT_PROVIDER = '[Recharge] Select Provider';

export const LOAD_PROVIDER_RECHARGE = '[PhoneCard] Load Provider';
export const LOAD_PROVIDER_RECHARGE_SUCCESS = '[PhoneCard] Load Provider successfully';
export const LOAD_PROVIDER_RECHARGE_FAILED = '[PhoneCard] Load Provider failed';

export const LOAD_PRODUCT_RECHARGE = '[PhoneCard] Load Product Recharge';
export const LOAD_PRODUCT_RECHARGE_SUCCESS = '[PhoneCard] Load Product Recharge successfully';
export const LOAD_PRODUCT_RECHARGE_FAILED = '[PhoneCard] Load Product Recharge failed';

export const CREATE_CART = '[Recharge] Create Recharge Cart';
export const CREATE_CART_SUCCESS = '[Recharge] Create Recharge Cart successfully';
export const CREATE_CART_FAILED = '[Recharge] Create Recharge Cart failed';

export const GET_CART = '[Recharge] Get Recharge Cart';
export const GET_CART_SUCCESS = '[Recharge] Get Recharge Cart successfully';
export const GET_CART_FAILED = '[Recharge] Get Recharge Cart failed';


export const UPDATE_CART_PRODUCT = '[Recharge] Update Recharge Product';
export const UPDATE_CART_PRODUCT_SUCCESS = '[Recharge] Update Recharge Product successfully';
export const UPDATE_CART_PRODUCT_FAILED = '[Recharge] Update Recharge Product failed';


export const SELECT_PAYMENT = '[Recharge] Select Payment Method';
export const SELECT_PAYMENT_SUCCESS = '[Recharge] Select Payment Method successfully';
export const SELECT_PAYMENT_FAILED = '[Recharge] Select Payment Method failed';

/*Coupon*/
export const CART_ADD_COUPON = '[Recharge] update coupon';
export const CART_ADD_COUPON_SUCCESS = '[Recharge] added coupon successfully';
export const CART_ADD_COUPON_FAILED = '[Recharge] added coupon failed';

export const CART_DELETE_COUPON = '[Recharge] delete coupon';
export const CART_DELETE_COUPON_SUCCESS = '[Recharge] delete coupon successfully';
export const CART_DELETE_COUPON_FAILED = '[Recharge] delete coupon failed';

/*Lpoint*/
export const CART_APPLY_LPOINT = '[Recharge] apply lpoint';
export const CART_APPLY_LPOINT_SUCCESS = '[Recharge] apply lpoint successfully';
export const CART_APPLY_LPOINT_FAILED = '[Recharge] apply lpoint failed';

export const CART_GET_LPOINT = '[Recharge] get lpoint';
export const CART_GET_LPOINT_SUCCESS = '[Recharge] get lpoint successfully';
export const CART_GET_LPOINT_FAILED = '[Recharge] get lpoint failed';

export const CART_CHECK_ORDER_STATUS = '[Recharge] check order status';
export const CART_CHECK_ORDER_STATUS_SUCCESS = '[Recharge] check order status successfully';
export const CART_CHECK_ORDER_STATUS_FAILED = '[Recharge] check order status failed';

export const CART_CC_TRANSACTION_REQUEST = '[Recharge] CC transaction request';
export const CART_CC_TRANSACTION_REQUEST_SUCCESS = '[Recharge] CC transaction request successfully';
export const CART_CC_TRANSACTION_REQUEST_FAILED = '[Recharge] CC transaction request failed';

export const CART_GET_PAYMENT_METHODS = '[Recharge] get payment methods';
export const CART_GET_PAYMENT_METHODS_SUCCESS = '[Recharge] get payment method success';
export const CART_GET_PAYMENT_METHOD_FAILED = '[Recharge] get payment method failed';


export const CART_SET_PAYMENT_METHOD = '[Recharge] set payment method';
export const CART_SET_PAYMENT_METHOD_SUCCESS = '[Recharge] set payment method succesfully';
export const CART_SET_PAYMENT_METHOD_FAILED = '[Recharge] set payment method failed';

export const CART_REDIRECT_TO_PAYMENT_GATEWAY = '[Recharge] redirect to 3rd payment gateway';

export const PLACE_ORDER = '[Recharge] Place Order Recharge';
export const PLACE_ORDER_SUCCESS = '[Recharge] Place Order Recharge successfully';
export const PLACE_ORDER_FAILED = '[Recharge] Place Order Recharge failed';


export class LoadConfig implements Action {
    readonly type = LOAD_RECHARGE_CONFIG;
    constructor(public payload: any) {
    }
}

export class LoadConfigSuccess implements Action {
    readonly type = LOAD_RECHARGE_CONFIG_SUCCESS;
    constructor(public payload: any) {
    }
}

export class LoadConfigFailed implements Action {
    readonly type = LOAD_RECHARGE_CONFIG_FAILED;
    constructor(public payload: any) {
    }
}

export class LoadProductRecharge implements Action {
    readonly type = LOAD_PRODUCT_RECHARGE;
    constructor(public payload: any) {
    }
}

export class LoadProductRechargeSucess implements Action {
    readonly type = LOAD_PRODUCT_RECHARGE_SUCCESS;
    constructor(public payload: any) {
    }
}

export class LoadProductRechargeFailed implements Action {
    readonly type = LOAD_PRODUCT_RECHARGE_FAILED;
    constructor(public payload: any) {
    }
}

export class LoadProviderRecharge implements Action {
    readonly type = LOAD_PROVIDER_RECHARGE;
    constructor(public payload: any) {
    }
}

export class LoadProviderRechargeSucess implements Action {
    readonly type = LOAD_PROVIDER_RECHARGE_SUCCESS;
    constructor(public payload: any) {
    }
}

export class LoadProviderRechargeFailed implements Action {
    readonly type = LOAD_PROVIDER_RECHARGE_FAILED;
    constructor(public payload: any) {
    }
}


export class SelectRechargeType implements Action {
    readonly type = SELECT_RECHARGE_TYPE;
    constructor(public payload: any) {
    }
}

export class SelectProvider implements Action {
    readonly type = SELECT_PROVIDER;
    constructor(public payload: any) {
    }
}

export class SelectProduct implements Action {
    readonly type = SELECT_PRODUCT;
    constructor(public payload: any) {
    }
}

export class UpdateCartProduct implements Action {
    readonly type = UPDATE_CART_PRODUCT;
    constructor(public payload: any) {
    }
}


export class UpdateCartProductSuccess implements Action {
    readonly type = UPDATE_CART_PRODUCT_SUCCESS;
    constructor(public payload: any) {
    }
}


export class UpdateCartProductFailed implements Action {
    readonly type = UPDATE_CART_PRODUCT_FAILED;
    constructor(public payload: any) {
    }
}


export class GetCart implements Action {
    readonly type = GET_CART;
    constructor(public payload: any) {
    }
}


export class GetCartSuccess implements Action {
    readonly type = GET_CART_SUCCESS;
    constructor(public payload: any) {
    }
}


export class GetCartFailed implements Action {
    readonly type = GET_CART_FAILED;
    constructor(public payload: any) {
    }
}


export class CreateCart implements Action {
    readonly type = CREATE_CART;
    constructor(public payload: any) {
    }
}


export class CreateCartSuccess implements Action {
    readonly type = CREATE_CART_SUCCESS;
    constructor(public payload: any) {
    }
}


export class CreateCartFailed implements Action {
    readonly type = CREATE_CART_FAILED;
    constructor(public payload: any) {
    }
}


export class SelectPayment implements Action {
    readonly type = SELECT_PAYMENT;
    constructor(public payload: any) {
    }
}


export class SelectPaymentSuccess implements Action {
    readonly type = SELECT_PAYMENT_SUCCESS;
    constructor(public payload: any) {
    }
}


export class SelectPaymentFailed implements Action {
    readonly type = SELECT_PAYMENT_FAILED;
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

export class CartApplyLPoint implements Action {
    readonly type = CART_APPLY_LPOINT;
    constructor(public payload: any) {

    }
}
export class CartApplyLPointSuccess implements Action {
    readonly type = CART_APPLY_LPOINT_SUCCESS;
    constructor(public payload: any) {

    }
}
export class CartApplyLPointFailed implements Action {
    readonly type = CART_APPLY_LPOINT_FAILED;
    constructor(public payload: any) {

    }
}

export class CartGetLPoint implements Action {
    readonly type = CART_GET_LPOINT;
    constructor() {

    }
}
export class CartGetLPointSuccess implements Action {
    readonly type = CART_GET_LPOINT_SUCCESS;
    constructor(public payload: any) {

    }
}
export class CartGetLPointFailed implements Action {
    readonly type = CART_GET_LPOINT_FAILED;
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

export class PlaceOrder implements Action {
    readonly type = PLACE_ORDER;
    constructor(public payload: any) {
    }
}

export class CartRedirectToPaymentGateway implements Action {
    readonly type = CART_REDIRECT_TO_PAYMENT_GATEWAY;
    constructor(public payload: any) {

    }
}
export class PlaceOrderSuccess implements Action {
    readonly type = PLACE_ORDER_SUCCESS;
    constructor(public payload: any) {
    }
}


export class PlaceOrderFailed implements Action {
    readonly type = PLACE_ORDER_FAILED;
    constructor(public payload: any) {
    }
}


export type RechargeActions =
    LoadConfig | LoadConfigSuccess | LoadConfigFailed |
    LoadProductRecharge | LoadProductRechargeSucess | LoadProductRechargeFailed |
    LoadProviderRecharge | LoadProviderRechargeSucess | LoadProviderRechargeFailed |
    SelectRechargeType | SelectProvider | SelectProduct |
    GetCart | GetCartSuccess | GetCartFailed |
    CreateCart | CreateCartSuccess | CreateCartFailed |
    UpdateCartProduct | UpdateCartProductSuccess | UpdateCartProductFailed |
    SelectPayment | SelectPaymentSuccess | SelectPaymentFailed |
    CartAddCoupon | CartAddCouponSuccess | CartAddCouponFailed |
    CartDeleteCoupon | CartDeleteCouponFailed | CartDeleteCouponSuccess |
    CartApplyLPoint | CartApplyLPointFailed | CartApplyLPointSuccess |
    CartGetLPoint | CartGetLPointFailed | CartGetLPointSuccess |
    CartGetPaymentMethods | CartGetPaymentMethodsFailed | CartGetPaymentMethodsSuccess |
    CartSetPaymentMethod | CartSetPaymentMethodFailed | CartSetPaymentMethodSuccess |
    PlaceOrder | PlaceOrderSuccess | PlaceOrderFailed |
    CartCCTransactionRequest | CartCCTransactionRequestSuccess  | CartCCTransactionRequestFailed |
    CartCheckOrderStatus | CartCheckOrderStatusFailed | CartCheckOrderStatusSuccess;
