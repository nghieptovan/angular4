import { Action } from '@ngrx/store';

/*
 Because the Categories collection is asynchronous, there need to be actions to handle
 each of the stages of the request.
 */
export const LIST_ACCOUNT = '[ACCOUNT] load list';
export const LIST_ACCOUNT_SUCCESS = '[ACCOUNT] successfully load list';
export const LIST_ACCOUNT_FAILED = '[ACCOUNT] failed to load list';

export const REGISTER = '[ACCOUNT] register';
export const REGISTER_SUCCESS = '[ACCOUNT] successfully registered';
export const REGISTER_FAILED = '[ACCOUNT] failed to register';

export const DELETE_ACCOUNT = '[ACCOUNT] delete account';
export const DELETE_ACCOUNT_SUCCESS = '[ACCOUNT] successfully deleted account';
export const DELETE_ACCOUNT_FAILED = '[ACCOUNT] failed to delete account';

export const RESET_PASSWORD = '[USER] User reset password';
export const RESET_PASSWORD_SUCCESS = '[USER] successfully reset password';
export const RESET_PASSWORD_FAILED = '[USER] failed to reset password';

export const LOAD_INFO = '[USER] User loading info';
export const LOAD_INFO_SUCCESS = '[USER] successfully loaded user info';
export const LOAD_INFO_FAILED = '[USER] failed to load user info';

export const UPDATE_INFO = '[ACCOUNT] Update account info';
export const UPDATE_INFO_SUCCESS = '[ACCOUNT] successfully updated account info';
export const UPDATE_INFO_FAILED = '[ACCOUNT] failed to update info';

export const REFRESH_PAGE = '[ACCOUNT] Refresh page';

export const WISHLIST_ADD_PRODUCT = '[ACCOUNT] Add product to wishlist';
export const WISHLIST_ADD_PRODUCT_SUCCESS = '[ACCOUNT] Add product to wishlist successfully';
export const WISHLIST_ADD_PRODUCT_FAILED = '[ACCOUNT] Add product to wishlist failed';

export const WISHLIST_DELETE_PRODUCT = '[ACCOUNT] Delete product from wishlist';
export const WISHLIST_DELETE_PRODUCT_SUCCESS = '[ACCOUNT] Delete product from wishlist successfully';
export const WISHLIST_DELETE_PRODUCT_FAILED = '[ACCOUNT] Delete product from wishlist failed';

export const WISHLIST_SHARE_EMAIL = '[ACCOUNT] Share wishlist via e-mail';
export const WISHLIST_SHARE_EMAIL_SUCCESS = '[ACCOUNT] Share wishlist via e-mail successfully';
export const WISHLIST_SHARE_EMAIL_FAILED = '[ACCOUNT] Share wishlist via e-mail failed';

export const LOAD_WISHLIST = '[USER] User loading wishlist';
export const LOAD_WISHLIST_SUCCESS = '[USER] successfully loaded user wishlist';
export const LOAD_WISHLIST_FAILED = '[USER] failed to load user wishlist';

export const UPDATE_WISHLIST = '[USER] User updating wishlist';
export const UPDATE_WISHLIST_SUCCESS = '[USER] successfully updated user wishlist';
export const UPDATE_WISHLIST_FAILED = '[USER] failed to update user wishlist';

export const LOAD_ORDERS = '[USER] User loading orders';
export const LOAD_ORDERS_SUCCESS = '[USER] successfully loaded user orders';
export const LOAD_ORDERS_FAILED = '[USER] failed to load user orders';

export const LOAD_ORDER_BY_ID = '[USER] User loading order by id';
export const LOAD_ORDER_BY_ID_SUCCESS = '[USER] successfully loaded user order by id';
export const LOAD_ORDER_BY_ID_FAILED = '[USER] failed to load user order by id';

export const LOAD_ORDER_TRACKING = '[USER] User loading order tracking';
export const LOAD_ORDER_TRACKING_SUCCESS = '[USER] successfully loaded user order tracking';
export const LOAD_ORDER_TRACKING_FAILED = '[USER] failed to load user order tracking';

export const CANCEL_ORDER = '[USER] Cancel an order';
export const CANCEL_ORDER_SUCCESS = '[USER] successfully cancel an order';
export const CANCEL_ORDER_FAILED = '[USER] failed to cancel an order';

export const GET_LPOINT = '[USER] get lpoint';
export const GET_LPOINT_SUCCESS = '[USER] get lpoint successfully';
export const GET_LPOINT_FAILED = '[USER] get lpoint failed';

export const CHECK_SUBSCRIPTION_STATUS = '[USER] check subscription status';
export const CHECK_SUBSCRIPTION_STATUS_FAILED = '[USER] check subscription status failed';
export const CHECK_SUBSCRIPTION_STATUS_SUCCESS = '[USER] check subscription status successfully';

export const SUBSCRIBE = '[USER] subscribe';
export const SUBSCRIBE_FAILED = '[USER] subscribe failed';
export const SUBSCRIBE_SUCCESS = '[USER] subscribe successfully';

export const UNSUBSCRIBE = '[USER] unsubscribe';
export const UNSUBSCRIBE_FAILED = '[USER] unsubscribe failed';
export const UNSUBSCRIBE_SUCCESS = '[USER] unsubscribe successfully';

export const LOAD_RATING_SELLER_PENDING = '[USER] User loading rating pending';
export const LOAD_RATING_SELLER_PENDING_SUCCESS = '[USER] successfully loaded rating pending';
export const LOAD_RATING_SELLER_PENDING_FAILED = '[USER] failed to load rating pending';

export const LOAD_RATING_SELLER = '[USER] User loading rated';
export const LOAD_RATING_SELLER_SUCCESS = '[USER] successfully loaded rated';
export const LOAD_RATING_SELLER_FAILED = '[USER] failed to load rated';

export const LOAD_QA = '[USER] User loading Q&A';
export const LOAD_QA_SUCCESS = '[USER] successfully loaded Q&A';
export const LOAD_QA_FAILED = '[USER] failed to load Q&A';

export const SUBMIT_RATING_SELLER = '[USER] User submit rating';
export const SUBMIT_RATING_SELLER_SUCCESS = '[USER] successfully submit rating';
export const SUBMIT_RATING_SELLER_FAILED = '[USER] failed to submit rating';

export const LOAD_DETAIL_COMMENT = '[USER] User loading detail comment';
export const LOAD_DETAIL_COMMENT_SUCCESS = '[USER] successfully loaded detail comment';
export const LOAD_DETAIL_COMMENT_FAILED = '[USER] failed to load detail comment';

export const LOAD_LPOINT_HISTORY = '[USER] User loading history lpoint';
export const LOAD_LPOINT_HISTORY_SUCCESS = '[USER] successfully loaded history lpoint';
export const LOAD_LPOINT_HISTORY_FAILED = '[USER] failed to load history lpoint';

export const LOAD_DETAIL_LPOINT_HISTORY = '[USER] User loading detail history lpoint';
export const LOAD_DETAIL_LPOINT_HISTORY_SUCCESS = '[USER] successfully loaded detail history lpoint';
export const LOAD_DETAIL_LPOINT_HISTORY_FAILED = '[USER] failed to load detail history lpoint';

export const UPDATE_LPOINT = '[ACCOUNT] Update L-Point';
export const UPDATE_LPOINT_SUCCESS = '[ACCOUNT] successfully updated L-Point';
export const UPDATE_LPOINT_FAILED = '[ACCOUNT] failed to update L-Point';

export const GUEST_ORDER_TRACKING = '[GUEST] Loading guest order tracking';
export const GUEST_ORDER_TRACKING_SUCCESS = '[GUEST] successfully loaded guest order tracking';
export const GUEST_ORDER_TRACKING_FAILED = '[GUEST] failed to load guest order tracking';

export const RESET_ACCOUNT_MSG_ERRORS = '[User] Reset account messsage errors';

export class ListAccount implements Action {
    readonly type = LIST_ACCOUNT;
    constructor() { }
}

export class ListAccountFailed implements Action {
    readonly type = LIST_ACCOUNT_FAILED;
    constructor(public payload: any) { }
}

export class ListAccountSuccess implements Action {
    readonly type = LIST_ACCOUNT_SUCCESS;
    constructor(public payload: any) { }
}


export class Register implements Action {
    readonly type = REGISTER;
    constructor(public payload: any) { }
}

export class RegisterFailed implements Action {
    readonly type = REGISTER_FAILED;
    constructor(public payload: any) { }
}

export class RegisterSuccess implements Action {
    readonly type = REGISTER_SUCCESS;
    constructor(public payload: any) { }
}

export class DeleteAccount implements Action {
    readonly type = DELETE_ACCOUNT;
    constructor(public payload: any) { }
}

export class DeleteAccountFailed implements Action {
    readonly type = DELETE_ACCOUNT_FAILED;
    constructor(public payload: any) { }
}

export class DeleteAccountSuccess implements Action {
    readonly type = DELETE_ACCOUNT_SUCCESS;
    constructor(public payload: any) { }
}


//end pm
export class ResetPassword implements Action {
    readonly type = RESET_PASSWORD;
    constructor(public payload: any) { }
}

export class ResetPasswordFailed implements Action {
    readonly type = RESET_PASSWORD_FAILED;
    constructor(public payload: any) { }
}

export class ResetPasswordSuccess implements Action {
    readonly type = RESET_PASSWORD_SUCCESS;
    constructor(public payload: any) { }
}

export class LoadInfo implements Action {
    readonly type = LOAD_INFO;
    constructor() {
    }
}

export class LoadInfoFailed implements Action {
    readonly type = LOAD_INFO_FAILED;
    constructor(public payload: any) {
    }
}

export class LoadInfoSuccess implements Action {
    readonly type = LOAD_INFO_SUCCESS;
    constructor(public payload: any) {
    }
}

export class UpdateInfo implements Action {
    readonly type = UPDATE_INFO;
    constructor(public payload: any) { }
}

export class UpdateInfoFailed implements Action {
    readonly type = UPDATE_INFO_FAILED;
    constructor(public payload: any) { }
}

export class UpdateInfoSuccess implements Action {
    readonly type = UPDATE_INFO_SUCCESS;
    constructor(public payload: any) { }
}

export class RefreshPage implements Action {
    readonly type = REFRESH_PAGE;
    constructor() { }
}

export class AddProductToWishList implements Action {
    readonly type = WISHLIST_ADD_PRODUCT;
    constructor(public payload: any) { }
}
export class AddProductToWishListSuccess implements Action {
    readonly type = WISHLIST_ADD_PRODUCT_SUCCESS;
    constructor(public payload: any) { }
}
export class AddProductToWishListFailed implements Action {
    readonly type = WISHLIST_ADD_PRODUCT_FAILED;
    constructor(public payload: any) { }
}

export class ShareWishlistViaEmail implements Action {
    readonly type = WISHLIST_SHARE_EMAIL;
    constructor(public payload: any) { }
}
export class ShareWishlistViaEmailSuccess implements Action {
    readonly type = WISHLIST_SHARE_EMAIL_SUCCESS;
    constructor(public payload: any) { }
}
export class ShareWishlistViaEmailFailed implements Action {
    readonly type = WISHLIST_SHARE_EMAIL_FAILED;
    constructor(public payload: any) { }
}

export class DeleteProductFromWishList implements Action {
    readonly type = WISHLIST_DELETE_PRODUCT;
    constructor(public payload: any) { }
}
export class DeleteProductFromWishListSuccess implements Action {
    readonly type = WISHLIST_DELETE_PRODUCT_SUCCESS;
    constructor(public payload: any) { }
}
export class DeleteProductFromWishListFailed implements Action {
    readonly type = WISHLIST_DELETE_PRODUCT_FAILED;
    constructor(public payload: any) { }
}

export class LoadWishList implements Action {
    readonly type = LOAD_WISHLIST;
    constructor(public payload: any) {
    }
}

export class LoadWishListFailed implements Action {
    readonly type = LOAD_WISHLIST_FAILED;
    constructor(public payload: any) {
    }
}

export class LoadWishListSuccess implements Action {
    readonly type = LOAD_WISHLIST_SUCCESS;
    constructor(public payload: any) {
    }
}

export class UpdateWishList implements Action {
    readonly type = UPDATE_WISHLIST;
    constructor(public payload: any) {
    }
}

export class UpdateWishListFailed implements Action {
    readonly type = UPDATE_WISHLIST_FAILED;
    constructor(public payload: any) {
    }
}

export class UpdateWishListSuccess implements Action {
    readonly type = UPDATE_WISHLIST_SUCCESS;
    constructor(public payload: any) {
    }
}

export class LoadOrders implements Action {
    readonly type = LOAD_ORDERS;
    constructor(public payload: any) {
    }
}

export class LoadOrdersFailed implements Action {
    readonly type = LOAD_ORDERS_FAILED;
    constructor(public payload: any) {
    }
}

export class LoadOrdersSuccess implements Action {
    readonly type = LOAD_ORDERS_SUCCESS;
    constructor(public payload: any) {
    }
}

export class LoadOrderById implements Action {
    readonly type = LOAD_ORDER_BY_ID;
    constructor(public payload: any) {
    }
}

export class LoadOrderByIdFailed implements Action {
    readonly type = LOAD_ORDER_BY_ID_FAILED;
    constructor(public payload: any) {
    }
}

export class LoadOrderByIdSuccess implements Action {
    readonly type = LOAD_ORDER_BY_ID_SUCCESS;
    constructor(public payload: any) {
    }
}

export class LoadOrderTracking implements Action {
    readonly type = LOAD_ORDER_TRACKING;
    constructor(public payload: any) {
    }
}

export class LoadOrderTrackingFailed implements Action {
    readonly type = LOAD_ORDER_TRACKING_FAILED;
    constructor(public payload: any) {
    }
}

export class LoadOrderTrackingSuccess implements Action {
    readonly type = LOAD_ORDER_TRACKING_SUCCESS;
    constructor(public payload: any) {
    }
}

export class CancelOrder implements Action {
    readonly type = CANCEL_ORDER;
    constructor(public payload: any) {
    }
}

export class CancelOrderFailed implements Action {
    readonly type = CANCEL_ORDER_FAILED;
    constructor(public payload: any) {
    }
}

export class CancelOrderSuccess implements Action {
    readonly type = CANCEL_ORDER_SUCCESS;
    constructor(public payload: any) {
    }
}

export class GetLPoint implements Action {
    readonly type = GET_LPOINT;
    constructor() {
    }
}
export class GetLPointSuccess implements Action {
    readonly type = GET_LPOINT_SUCCESS;
    constructor(public payload: any) {
    }
}
export class GetLPointFailed implements Action {
    readonly type = GET_LPOINT_FAILED;
    constructor() {
    }
}

export class CheckSubscriptionStatus implements Action {
    readonly type = CHECK_SUBSCRIPTION_STATUS;
    constructor() {}
}
export class CheckSubscriptionStatusFailed implements Action {
    readonly type = CHECK_SUBSCRIPTION_STATUS_FAILED;
    constructor(public payload: any) {}
}
export class CheckSubscriptionStatusSucccess implements Action {
    readonly type = CHECK_SUBSCRIPTION_STATUS_SUCCESS;
    constructor(public payload: any) {}
}

export class Subscribe implements Action {
    readonly type = SUBSCRIBE;
    constructor() {}
}
export class SubscribeFailed implements Action {
    readonly type = SUBSCRIBE_FAILED;
    constructor(public payload: any) {}
}
export class SubscribeSuccess implements Action {
    readonly type = SUBSCRIBE_SUCCESS;
    constructor(public payload: any) {}
}

export class Unsubscribe implements Action {
    readonly type = UNSUBSCRIBE;
    constructor() {}
}
export class UnsubscribeFailed implements Action {
    readonly type = UNSUBSCRIBE_FAILED;
    constructor(public payload: any) {}
}
export class UnsubscribeSuccess implements Action {
    readonly type = UNSUBSCRIBE_SUCCESS;
    constructor(public payload: any) {}
}

export class LoadRatingPending implements Action {
    readonly type = LOAD_RATING_SELLER_PENDING;
    constructor() {
    }
}

export class LoadRatingPendingFailed implements Action {
    readonly type = LOAD_RATING_SELLER_PENDING_FAILED;
    constructor(public payload: any) {
    }
}
export class LoadRatingPendingSuccess implements Action {
    readonly type = LOAD_RATING_SELLER_PENDING_SUCCESS;
    constructor(public payload: any) {
    }
}

export class LoadRatedSeller implements Action {
    readonly type = LOAD_RATING_SELLER;
    constructor() {
    }
}

export class LoadRatedSellerFailed implements Action {
    readonly type = LOAD_RATING_SELLER_FAILED;
    constructor(public payload: any) {
    }
}
export class LoadRatedSellerSuccess implements Action {
    readonly type = LOAD_RATING_SELLER_SUCCESS;
    constructor(public payload: any) {
    }
}

export class SubmitRating implements Action {
    readonly type = SUBMIT_RATING_SELLER;
    constructor(public payload: any) {
    }
}

export class SubmitRatingFailed implements Action {
    readonly type = SUBMIT_RATING_SELLER_FAILED;
    constructor(public payload: any) {
    }
}

export class SubmitRatingSuccess implements Action {
    readonly type = SUBMIT_RATING_SELLER_SUCCESS;
    constructor(public payload: any) {
    }
}

export class LoadQA implements Action {
    readonly type = LOAD_QA;
    constructor(public payload: any) {
    }
}
export class LoadQAFailed implements Action {
    readonly type = LOAD_QA_FAILED;
    constructor(public payload: any) {
    }
}
export class LoadQASuccess implements Action {
    readonly type = LOAD_QA_SUCCESS;
    constructor(public payload: any) {
    }
}

export class LoadDetailComment implements Action {
    readonly type = LOAD_DETAIL_COMMENT;
    constructor(public payload: any) {
    }
}

export class LoadDetailCommentFailed implements Action {
    readonly type = LOAD_DETAIL_COMMENT_FAILED;
    constructor(public payload: any) {
    }
}
export class LoadDetailCommentSuccess implements Action {
    readonly type = LOAD_DETAIL_COMMENT_SUCCESS;
    constructor(public payload: any) {
    }
}

export class LoadLpointHistory implements Action {
    readonly type = LOAD_LPOINT_HISTORY;
    constructor(public payload: any) {
    }
}

export class LoadLpointHistoryFailed implements Action {
    readonly type = LOAD_LPOINT_HISTORY_FAILED;
    constructor(public payload: any) {
    }
}
export class LoadLpointHistorySuccess implements Action {
    readonly type = LOAD_LPOINT_HISTORY_SUCCESS;
    constructor(public payload: any) {
    }
}

export class LoadDetailLpointHistory implements Action {
    readonly type = LOAD_DETAIL_LPOINT_HISTORY;
    constructor(public payload: any) {
    }
}

export class LoadDetailLpointHistoryFailed implements Action {
    readonly type = LOAD_DETAIL_LPOINT_HISTORY_FAILED;
    constructor(public payload: any) {
    }
}
export class LoadDetailLpointHistorySuccess implements Action {
    readonly type = LOAD_DETAIL_LPOINT_HISTORY_SUCCESS;
    constructor(public payload: any) {
    }
}
export class UpdateLPoint implements Action {
    readonly type = UPDATE_LPOINT;
    constructor() {
    }
}
export class UpdateLPointSuccess implements Action {
    readonly type = UPDATE_LPOINT_SUCCESS;
    constructor(public payload: any) {
    }
}
export class UpdateLPointFailed implements Action {
    readonly type = UPDATE_LPOINT_FAILED;
    constructor(public payload: any) {
    }
}

export class LoadGuestTrackingOrder implements Action {
    readonly type = GUEST_ORDER_TRACKING;
    constructor(public payload: any) {
    }
}
export class LoadGuestTrackingOrderSuccess implements Action {
    readonly type = GUEST_ORDER_TRACKING_SUCCESS;
    constructor(public payload: any) {
    }
}

export class LoadGuestTrackingOrderFailed implements Action {
    readonly type = GUEST_ORDER_TRACKING_FAILED;
    constructor(public payload: any) {
    }
}

export class ResetAccountMsgErrors implements Action {
    readonly type = RESET_ACCOUNT_MSG_ERRORS;
    constructor() {
    }
}
export type AccountActions =
    Register | RegisterFailed | RegisterSuccess |
    ResetPassword | ResetPasswordFailed | ResetPasswordSuccess |
    LoadInfo | LoadInfoFailed | LoadInfoSuccess |
    UpdateInfo | UpdateInfoFailed | UpdateInfoSuccess |
    RefreshPage |
    AddProductToWishList | AddProductToWishListFailed | AddProductToWishListSuccess |
    DeleteProductFromWishList | DeleteProductFromWishListFailed | DeleteProductFromWishListSuccess |
    ShareWishlistViaEmail | ShareWishlistViaEmailFailed | ShareWishlistViaEmailSuccess |
    LoadWishList | LoadWishListFailed | LoadWishListSuccess |
    UpdateWishList | UpdateWishListFailed | UpdateWishListSuccess |
    LoadOrders | LoadOrdersSuccess | LoadOrdersFailed |
    LoadOrderById | LoadOrderByIdSuccess | LoadOrderByIdFailed |
    LoadOrderTracking | LoadOrderTrackingSuccess | LoadOrderTrackingFailed |
    CancelOrder | CancelOrderSuccess | CancelOrderFailed |
    GetLPoint | GetLPointFailed | GetLPointSuccess |
    CheckSubscriptionStatus | CheckSubscriptionStatusFailed | CheckSubscriptionStatusSucccess |
    Subscribe | SubscribeFailed | SubscribeSuccess |
    Unsubscribe | UnsubscribeFailed | UnsubscribeSuccess |
    LoadRatingPending | LoadRatingPendingFailed | LoadRatingPendingSuccess |
    LoadRatedSeller | LoadRatedSellerFailed | LoadRatedSellerSuccess |
    LoadQA | LoadQAFailed | LoadQASuccess |
    SubmitRating | SubmitRatingFailed | SubmitRatingSuccess |
    LoadDetailComment | LoadDetailCommentFailed | LoadDetailCommentSuccess |
    LoadLpointHistory | LoadLpointHistoryFailed | LoadLpointHistorySuccess |
    LoadDetailLpointHistory | LoadDetailLpointHistoryFailed | LoadDetailLpointHistorySuccess |
    UpdateLPoint | UpdateLPointFailed | UpdateLPointSuccess |
    LoadGuestTrackingOrder | LoadGuestTrackingOrderFailed | LoadGuestTrackingOrderSuccess | ResetAccountMsgErrors |
    ListAccount | ListAccountFailed | ListAccountSuccess |
    DeleteAccount | DeleteAccountSuccess | DeleteAccountFailed;
