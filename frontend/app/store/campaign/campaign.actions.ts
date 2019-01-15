import { Action } from '@ngrx/store';

/*
 Because the Products collection is asynchronous, there need to be actions to handle
 each of the stages of the request.
 */
export const LOAD = '[CAMPAIGN] load campaign';
export const LOAD_SUCCESS = '[CAMPAIGN] successfully loaded campaign';
export const LOAD_FAILED = '[CAMPAIGN] failed to load campaign';

export const LOAD_PRODUCTS = '[CAMPAIGN] load products by promotion id';
export const LOAD_PRODUCTS_SUCCESS = '[CAMPAIGN] successfully loaded products by promotion id';
export const LOAD_PRODUCTS_FAILED = '[CAMPAIGN] failed to load products by promotion id';

export const LOAD_PROMOTIONS = '[CAMPAIGN] load promotions';
export const LOAD_PROMOTIONS_SUCCESS = '[CAMPAIGN] successfully loaded promotions';
export const LOAD_PROMOTIONS_FAILED = '[CAMPAIGN] failed to load promotions';

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

export class LoadProducts implements Action {
    readonly type = LOAD_PRODUCTS;
    constructor(public payload: any) {
    }
}

export class LoadProductsFailed implements Action {
    readonly type = LOAD_PRODUCTS_FAILED;
    constructor(public payload: any) {
    }
}

export class LoadProductsSuccess implements Action {
    readonly type = LOAD_PRODUCTS_SUCCESS;
    constructor(public payload: any) {
    }
}

export class LoadPromotions implements Action {
    readonly type = LOAD_PROMOTIONS;
    constructor(public payload: any) {
    }
}

export class LoadPromotionsFailed implements Action {
    readonly type = LOAD_PROMOTIONS_FAILED;
    constructor(public payload: any) {
    }
}

export class LoadPromotionsSuccess implements Action {
    readonly type = LOAD_PROMOTIONS_SUCCESS;
    constructor(public payload: any) {
    }
}

export type CampaignActions =
    Load | LoadFailed | LoadSuccess |
    LoadProducts | LoadProductsFailed | LoadProductsSuccess |
    LoadPromotions | LoadPromotionsFailed | LoadPromotionsSuccess;

