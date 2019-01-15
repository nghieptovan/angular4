import { Action } from '@ngrx/store';

export const LOAD_HOME_CMSBLOCK = '[Home] load cms blocks';
export const LOAD_HOME_CMSBLOCK_SUCCESS = '[Home] successfully loaded cms blocks';
export const LOAD_HOME_CMSBLOCK_FAILED = '[Home] failed to load cms blocks';

export const LOAD_MORE_PRODUCTS = '[Home] load more products';
export const LOAD_MORE_PRODUCTS_SUCCESS = '[Home] successfully loaded more products';
export const LOAD_MORE_PRODUCTS_FAILED = '[Home] failed to load more products';

export const SET_HOME_STATE = '[Home] Set isHomePage';
export const RESET_HOME_STATE = '[Home] Reset home state';


export class LoadHomeCmsBlock implements Action {
    readonly type = LOAD_HOME_CMSBLOCK;
    constructor() { }
}

export class LoadHomeCmsBlockFailed implements Action {
    readonly type = LOAD_HOME_CMSBLOCK_FAILED;
    constructor(public payload: any) {
    }
}

export class LoadHomeCmsBlockSuccess implements Action {
    readonly type = LOAD_HOME_CMSBLOCK_SUCCESS;
    constructor(public payload: any) {
    }
}

export class LoadMoreProducts implements Action {
    readonly type = LOAD_MORE_PRODUCTS;
    constructor(public payload: any) { }
}

export class LoadMoreProductsFailed implements Action {
    readonly type = LOAD_MORE_PRODUCTS_FAILED;
    constructor(public payload: any) {
    }
}

export class LoadMoreProductsSuccess implements Action {
    readonly type = LOAD_MORE_PRODUCTS_SUCCESS;
    constructor(public payload: any) {
    }
}

export class SetHomeState implements Action {
    readonly type = SET_HOME_STATE;
    constructor() {
    }
}

export class ResetHomeState implements Action {
    readonly type = RESET_HOME_STATE;
    constructor() {
    }
}

export type HomeActions =
    LoadHomeCmsBlock | LoadHomeCmsBlockFailed | LoadHomeCmsBlockSuccess |
    LoadMoreProducts | LoadMoreProductsFailed | LoadMoreProductsSuccess |
    SetHomeState | ResetHomeState;
