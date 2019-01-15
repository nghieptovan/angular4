import { Action } from '@ngrx/store';

/*
 Because the Products collection is asynchronous, there need to be actions to handle
 each of the stages of the request.
 */
export const LOAD = '[Products] load products';
export const LOAD_SUCCESS = '[Products] successfully loaded products';
export const LOAD_FAILED = '[Products] failed to load products';

export const LOAD_PRODUCT_DETAILS = '[Product] load details';
export const LOAD_PRODUCT_DETAILS_SUCCESS = '[Product] successfully loaded details';
export const LOAD_PRODUCT_DETAILS_FAILED = '[Product] failed to load details';

export const LOAD_PRODUCT_RELATED = '[Product] load related products';
export const LOAD_PRODUCT_RELATED_SUCCESS = '[Product] success to load related products';
export const LOAD_PRODUCT_RELATED_FAILED = '[Product] failed to load related products';

export const SEARCH_PRODUCT = '[Products] Search';
export const SEARCH_PRODUCT_SUCCESS = '[Products] Successfully search products';
export const SEARCH_PRODUCT_FAILED = '[Products] Failed to search products';

export const PRODUCT_LOAD_SHIPPING_RULE = '[Product] Load shipping rule';
export const PRODUCT_LOAD_SHIPPING_RULE_SUCCESS = '[Product] successfully loaded shipping rule';
export const PRODUCT_LOAD_SHIPPING_RULE_FAILED = '[Product] fail to load shipping rule';

export const PRODUCT_LOAD_EXPRESS_SHIPPING_RULE = '[Product] Load express shipping rule';
export const PRODUCT_LOAD_EXPRESS_SHIPPING_RULE_SUCCESS = '[Product] successfully loaded express shipping rule';
export const PRODUCT_LOAD_EXPRESS_SHIPPING_RULE_FAILED = '[Product] fail to load express shipping rule';

export const LOAD_ADDITIONAL_DETAILS = '[Product] load additional details';
export const LOAD_ADDITIONAL_DETAILS_SUCCESS = '[Product] load additional details successfully';
export const LOAD_ADDITIONAL_DETAILS_FAILED = '[Product] load additional details failed';

export const GET_PRODUCT_REVIEWS = '[Product] get reviews';
export const GET_PRODUCT_REVIEWS_SUCCESS = '[Product] get reviews successfully';
export const GET_PRODUCT_REVIEWS_FAILED = '[Product] get reviews failed';

export const POST_PRODUCT_REVIEW = '[Product] post review';
export const POST_PRODUCT_REVIEW_SUCCESS = '[Product] post review successfully';
export const POST_PRODUCT_REVIEW_FAILED = '[Product] post review failed';

export const REGISTER_STOCK_ALERT = '[Product] register stock alert';
export const REGISTER_STOCK_ALERT_SUCCESS = '[Product] register stock alert successfully';
export const REGISTER_STOCK_ALERT_FAILED = '[Product] register stock alert failed';

export const GET_SEARCH_SUGGESTION = '[Products] Get search suggesion';
export const GET_SEARCH_SUGGESTION_SUCCESS = '[Products] Successfully get search suggestion';
export const GET_SEARCH_SUGGESTION_FAILED = '[Products] Failed to get search suggestion';

export const GET_SEARCH_CAMPAIGN = '[Products] Get search campaign';
export const GET_SEARCH_CAMPAIGN_SUCCESS = '[Products] Successfully get search campaign';
export const GET_SEARCH_CAMPAIGN_FAILED = '[Products] Failed to get search campaign';

export const RESET_PRODUCT_STATE = '[Products] Reset product state';
export const RESET_PRODUCT_DETAIL_STATE = '[Product] Reset product detail state';

export const CHECK_OMNI_BLINK = '[Products] check omni blink';
export const CHECK_OMNI_BLINK_SUCCESS = '[Products] successfully check omni blink';
export const CHECK_OMNI_BLINK_FAILED = '[Products] failed to check omni blink';

export class Load implements Action {
    readonly type = LOAD;

    constructor(public payload: any) {
    }
}

export class LoadFailed implements Action {
    readonly type = LOAD_FAILED;

    constructor(public payload: any) {
    }
}

export class LoadSuccess implements Action {
    readonly type = LOAD_SUCCESS;

    constructor(public payload: any) {
    }
}

export class LoadProductDetails implements Action {
    readonly type = LOAD_PRODUCT_DETAILS;

    constructor(public payload: any) {
    }
}

export class LoadProductDetailsSuccess implements Action {
    readonly type = LOAD_PRODUCT_DETAILS_SUCCESS;

    constructor(public payload: any) {
    }
}

export class LoadProductDetailsFailed implements Action {
    readonly type = LOAD_PRODUCT_DETAILS_FAILED;

    constructor(public payload: any) {
    }
}

export class LoadProductsRelated implements Action {
    readonly type = LOAD_PRODUCT_RELATED;

    constructor(public payload: any) {
    }
}

export class LoadProductsRelatedSuccess implements Action {
    readonly type = LOAD_PRODUCT_RELATED_SUCCESS;

    constructor(public payload: any) {
    }
}

export class LoadProductsRelatedFailed implements Action {
    readonly type = LOAD_PRODUCT_RELATED_FAILED;

    constructor(public payload: any) {
    }
}

export class SearchProduct implements Action {
    readonly type = SEARCH_PRODUCT;

    constructor(public payload: any) {
    }
}

export class SearchProductFailed implements Action {
    readonly type = SEARCH_PRODUCT_FAILED;

    constructor(public payload: any) {
    }
}

export class SearchProductSuccess implements Action {
    readonly type = SEARCH_PRODUCT_SUCCESS;

    constructor(public payload: any) {
    }
}

export class ProductLoadShippingRule implements Action {
    readonly type = PRODUCT_LOAD_SHIPPING_RULE;
    constructor(public payload: any) { }
}

export class ProductLoadShippingRuleFailed implements Action {
    readonly type = PRODUCT_LOAD_SHIPPING_RULE_FAILED;

    constructor(public payload: any) {
    }
}
export class ProductLoadShippingRuleSuccess implements Action {
    readonly type = PRODUCT_LOAD_SHIPPING_RULE_SUCCESS;
    constructor(public payload: any) {
    }
}

export class ProductLoadExpressShippingRule implements Action {
    readonly type = PRODUCT_LOAD_EXPRESS_SHIPPING_RULE;
    constructor(public payload: any) { }
}

export class ProductLoadExpressShippingRuleFailed implements Action {
    readonly type = PRODUCT_LOAD_EXPRESS_SHIPPING_RULE_FAILED;

    constructor(public payload: any) {
    }
}

export class ProductLoadExpressShippingRuleSuccess implements Action {
    readonly type = PRODUCT_LOAD_EXPRESS_SHIPPING_RULE_SUCCESS;
    constructor(public payload: any) {
    }
}

export class LoadAdditionalDetails implements Action {
    readonly type = LOAD_ADDITIONAL_DETAILS;
    constructor(public payload: any) { }
}
export class LoadAdditionalDetailsSuccess implements Action {
    readonly type = LOAD_ADDITIONAL_DETAILS_SUCCESS;
    constructor(public payload: any) { }
}
export class LoadAdditionalDetailsFailed implements Action {
    readonly type = LOAD_ADDITIONAL_DETAILS_FAILED;
    constructor(public payload: any) { }
}

export class GetProductReviews implements Action {
    readonly type = GET_PRODUCT_REVIEWS;
    constructor(public payload: any) { }
}
export class GetProductReviewsSuccess implements Action {
    readonly type = GET_PRODUCT_REVIEWS_SUCCESS;
    constructor(public payload: any) { }
}
export class GetProductReviewsFailed implements Action {
    readonly type = GET_PRODUCT_REVIEWS_FAILED;
    constructor(public payload: any) { }
}

export class PostProductReview implements Action {
    readonly type = POST_PRODUCT_REVIEW;
    constructor(public payload: any) { }
}
export class PostProductReviewSuccess implements Action {
    readonly type = POST_PRODUCT_REVIEW_SUCCESS;
    constructor(public payload: any) { }
}
export class PostProductReviewFailed implements Action {
    readonly type = POST_PRODUCT_REVIEW_FAILED;
    constructor(public payload: any) { }
}

export class RegisterStockAlert implements Action {
    readonly type = REGISTER_STOCK_ALERT;
    constructor(public payload: any) { }
}
export class RegisterStockAlertSuccess implements Action {
    readonly type = REGISTER_STOCK_ALERT_SUCCESS;
    constructor(public payload: any) { }
}
export class RegisterStockAlertFailed implements Action {
    readonly type = REGISTER_STOCK_ALERT_FAILED;
    constructor(public payload: any) { }
}

export class GetSearchSuggestion implements Action {
    readonly type = GET_SEARCH_SUGGESTION;
    constructor(public payload: any) {

    }
}
export class GetSearchSuggestionSuccess implements Action {
    readonly type = GET_SEARCH_SUGGESTION_SUCCESS;
    constructor(public payload: any) {
    }
}

export class GetSearchSuggestionFailed implements Action {
    readonly type = GET_SEARCH_SUGGESTION_FAILED;
    constructor(public payload: any) {
    }
}

export class GetSearchCampaign implements Action {
    readonly type = GET_SEARCH_CAMPAIGN;
    constructor(public payload: any) {

    }
}
export class GetSearchCampaignSuccess implements Action {
    readonly type = GET_SEARCH_CAMPAIGN_SUCCESS;
    constructor(public payload: any) {
    }
}

export class GetSearchCampaignFailed implements Action {
    readonly type = GET_SEARCH_CAMPAIGN_FAILED;
    constructor(public payload: any) {
    }
}

export class ResetProductState implements Action {
    readonly type = RESET_PRODUCT_STATE;
    constructor() {
    }
}

export class ResetProductDetailState implements Action {
    readonly type = RESET_PRODUCT_DETAIL_STATE;
    constructor() {
    }
}

export class CheckOmniBlink implements Action {
    readonly type = CHECK_OMNI_BLINK;

    constructor(public payload: any) {
    }
}

export class CheckOmniBlinkFailed implements Action {
    readonly type = CHECK_OMNI_BLINK_FAILED;

    constructor(public payload: any) {
    }
}

export class CheckOmniBlinkSuccess implements Action {
    readonly type = CHECK_OMNI_BLINK_SUCCESS;

    constructor(public payload: any) {
    }
}

export type ProductActions =
    Load | LoadFailed | LoadSuccess |
    LoadProductDetails | LoadProductDetailsFailed | LoadProductDetailsSuccess |
    LoadProductsRelated | LoadProductsRelatedSuccess | LoadProductsRelatedFailed |
    SearchProduct | SearchProductFailed | SearchProductSuccess |
    ProductLoadShippingRule | ProductLoadShippingRuleFailed | ProductLoadShippingRuleSuccess |
    LoadAdditionalDetails | LoadAdditionalDetailsFailed | LoadAdditionalDetailsSuccess |
    GetProductReviews | GetProductReviewsFailed | GetProductReviewsSuccess |
    PostProductReview | PostProductReviewFailed | PostProductReviewSuccess |
    RegisterStockAlert | RegisterStockAlertFailed | RegisterStockAlertSuccess |
    GetSearchSuggestion | GetSearchSuggestionFailed | GetSearchSuggestionSuccess |
    GetSearchCampaign | GetSearchCampaignFailed | GetSearchCampaignSuccess |
    ResetProductState | ResetProductDetailState |
    CheckOmniBlink | CheckOmniBlinkFailed | CheckOmniBlinkSuccess |
    ProductLoadExpressShippingRule | ProductLoadExpressShippingRuleFailed | ProductLoadExpressShippingRuleSuccess
    ;
