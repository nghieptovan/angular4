import { Action } from '@ngrx/store';

/*
 Because the Products collection is asynchronous, there need to be actions to handle
 each of the stages of the request.
 */
export const LOAD = '[TPO Group] load tpo group';
export const LOAD_SUCCESS = '[TPO Group] successfully loaded tpo group';
export const LOAD_FAILED = '[TPO Group] failed to load tpo group';

export const LOAD_TPO_DETAILS = '[TPO Detail] load details';
export const LOAD_TPO_DETAILS_SUCCESS = '[TPO Detail] successfully loaded details';
export const LOAD_TPO_DETAILS_FAILED = '[TPO Detail] failed to load details';

export const LOAD_TPO_PRODUCTS = '[TPO Products] load products';
export const LOAD_TPO_PRODUCTS_SUCCESS = '[TPO Products] success to load products';
export const LOAD_TPO_PRODUCTS_FAILED = '[TPO Products] failed to load products';

export const LOAD_TPO_DASHBOARD_PRODUCTS = '[TPO Dashboard Products] load products';
export const LOAD_TPO_DASHBOARD_PRODUCTS_SUCCESS = '[TPO Dashboard Products] success to load products';
export const LOAD_TPO_DASHBOARD_PRODUCTS_FAILED = '[TPO Dashboard Products] failed to load products';

export const UPDATE_TPO_DETAIL_SOCIAL = '[Update TPO Detail Social] updating';
export const UPDATE_TPO_DETAIL_SOCIAL_SUCCESS = '[Update TPO Detail Social] update success';
export const UPDATE_TPO_DETAIL_SOCIAL_FAILED = '[Update TPO Detail Social] update failed';

export const LOAD_BLOCK = '[TPO Block] load block';
export const LOAD_BLOCK_SUCCESS = '[TPO Block] successfully loaded block';
export const LOAD_BLOCK_FAILED = '[TPOBlock] failed to load block';

export const GET_SEARCH_TPO = '[TPO Search] Get search tpo';
export const GET_SEARCH_TPO_SUCCESS = '[TPO Search] Successfully get search tpo';
export const GET_SEARCH_TPO_FAILED = '[TPO Search] Failed to get search tpo';



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

export class LoadTpoDetails implements Action {
    readonly type = LOAD_TPO_DETAILS;

    constructor(public payload: any) {
    }
}

export class LoadTpoDetailsSuccess implements Action {
    readonly type = LOAD_TPO_DETAILS_SUCCESS;

    constructor(public payload: any) {
    }
}

export class LoadTpoDetailsFailed implements Action {
    readonly type = LOAD_TPO_DETAILS_FAILED;

    constructor(public payload: any) {
    }
}

export class UpdateTpoDetailsSocial implements Action {
    readonly type = UPDATE_TPO_DETAIL_SOCIAL;

    constructor(public payload: any) {
    }
}

export class UpdateTpoDetailsSocialSuccess implements Action {
    readonly type = UPDATE_TPO_DETAIL_SOCIAL_SUCCESS;

    constructor(public payload: any) {
    }
}

export class UpdateTpoDetailsSocialFailed implements Action {
    readonly type = UPDATE_TPO_DETAIL_SOCIAL_FAILED;

    constructor(public payload: any) {
    }
}

// export class LoadTpoProductsAlsoLike implements Action {
//     readonly type = LOAD_TPO_PRODUCT_ALSOLIKE;
//
//     constructor(public payload: any) {
//     }
// }
//
// export class LoadTpoProductsAlsoLikeSuccess implements Action {
//     readonly type = LOAD_TPO_PRODUCT_ALSOLIKE_SUCCESS;
//
//     constructor(public payload: any) {
//     }
// }
//
// export class LoadTpoProductsAlsoLikeFailed implements Action {
//     readonly type = LOAD_TPO_PRODUCT_ALSOLIKE_FAILED;
//
//     constructor(public payload: any) {
//     }
// }

export class LoadTpoProducts implements Action {
    readonly type = LOAD_TPO_PRODUCTS;

    constructor(public payload: any) {
    }
}

export class LoadTpoProductsSuccess implements Action {
    readonly type = LOAD_TPO_PRODUCTS_SUCCESS;

    constructor(public payload: any) {
    }
}

export class LoadTpoProductsFailed implements Action {
    readonly type = LOAD_TPO_PRODUCTS_FAILED;

    constructor(public payload: any) {
    }
}

export class LoadTpoDashboardProducts implements Action {
    readonly type = LOAD_TPO_DASHBOARD_PRODUCTS;

    constructor(public payload: any) {
    }
}

export class LoadTpoDashboardProductsSuccess implements Action {
    readonly type = LOAD_TPO_DASHBOARD_PRODUCTS_SUCCESS;

    constructor(public payload: any) {
    }
}

export class LoadTpoDashboardProductsFailed implements Action {
    readonly type = LOAD_TPO_DASHBOARD_PRODUCTS_FAILED;

    constructor(public payload: any) {
    }
}

export class LoadBlock implements Action {
    readonly type = LOAD_BLOCK;

    constructor(public payload: any) {
    }
}

export class LoadBlockFailed implements Action {
    readonly type = LOAD_BLOCK_FAILED;

    constructor(public payload: any) {
    }
}

export class LoadBlockSuccess implements Action {
    readonly type = LOAD_BLOCK_SUCCESS;

    constructor(public payload: any) {
    }
}

export class GetSearchTpo implements Action {
    readonly type = GET_SEARCH_TPO;
    constructor(public payload: any) {

    }
}
export class GetSearchTpoSuccess implements Action {
    readonly type = GET_SEARCH_TPO_SUCCESS;
    constructor(public payload: any) {
    }
}

export class GetSearchTpoFailed implements Action {
    readonly type = GET_SEARCH_TPO_FAILED;
    constructor(public payload: any) {
    }
}

export type TpoGroup =
    Load | LoadFailed | LoadSuccess |
    LoadTpoDetails | LoadTpoDetailsFailed | LoadTpoDetailsSuccess |
    UpdateTpoDetailsSocial | UpdateTpoDetailsSocialSuccess | UpdateTpoDetailsSocialFailed |
    LoadTpoProducts | LoadTpoProductsFailed | LoadTpoProductsSuccess |
    LoadTpoDashboardProducts | LoadTpoDashboardProductsFailed | LoadTpoDashboardProductsSuccess |
    LoadBlock | LoadBlockFailed | LoadBlockSuccess|
    GetSearchTpo | GetSearchTpoFailed | GetSearchTpoSuccess
    ;
