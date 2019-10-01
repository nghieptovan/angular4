import { Action } from '@ngrx/store';

/*
 Because the Common collection is asynchronous, there need to be actions to handle
 each of the stages of the request.
 */
export const NULLABLE_ACTION = '[Common] nullable action';

export const LOAD_APPCONFIGS = '[Common] load appconfigs';
export const LOAD_APPCONFIGS_SUCCESS = '[Common] successfully loaded appconfigs';
export const LOAD_APPCONFIGS_FAILED = '[Common] failed to load appconfigs';

export const LOAD_URL_INFO = '[Common] load url info';
export const LOAD_URL_INFO_SUCCESS = '[Common] successfully loaded url info';
export const LOAD_URL_INFO_FAILED = '[Common] failed to load url info';

export const RESET_URL_INFO = '[Common] reset url info';

export const DETECT_CURRENT_LOCATION = '[Commont] detect current location';
export const DETECT_CURRENT_LOCATION_SUCCESS = '[Commont] detect current location successfully';
export const DETECT_CURRENT_LOCATION_FAILED = '[Commont] detect current location failed';

export const LOAD_COUNTRY_INFORMATION = '[Common] load country information';
export const LOAD_COUNTRY_INFORMATION_SUCCESS = '[Common] load country information successfully';
export const LOAD_COUNTRY_INFORMATION_FAILED = '[Common] load country information failed';

export const LOAD_SHARED_SESSION = '[Common] load shared session';
export const LOAD_SHARED_SESSION_SUCCESS = '[Common] load shared session successfully';
export const LOAD_SHARED_SESSION_FAILED = '[Common] load shared session failed';

export const LOAD_TRACKING_CODE = '[Common] load tracking code';
export const LOAD_TRACKING_CODE_SUCCESS = '[Common] load tracking code successfully';
export const LOAD_TRACKING_CODE_FAILED = '[Common] load tracking code failed';

export const SUBSCRIBE_NEWSLETTER = '[Common] subscribe newsletter';
export const SUBSCRIBE_NEWSLETTER_FAILED = '[Common] subscribe newsletter failed';
export const SUBSCRIBE_NEWSLETTER_SUCCESS = '[Common] subscribe newsletter successfully';

export const LOAD_RECENT_PRODUCTS = '[Common] load recent products';
export const LOAD_RECENT_PRODUCTS_FAILED = '[Common] load recent products failed';
export const LOAD_RECENT_PRODUCTS_SUCCESS = '[Common] load recent products successfully';

export const SET_LOADING_STATE = '[Common] set loading state';

export const LOAD_404_PAGE = '[Common] load static html';
export const LOAD_404_PAGE_SUCCESS = '[Common] successfully loaded static html';
export const LOAD_404_PAGE_FAILED = '[Common] failed to load static html';

export const SET_SEARCH_PAGE = '[Common] Set search page';

export const SET_PRODUCT_PAGE = '[Common] Set product page';

export const RESET_PRODUCT_PAGE = '[Common] Reset product page';

export const PREVENT_SCROLL_TOP = '[Common] Prevent scroll top';

export class NullableAction implements Action {
    readonly type = NULLABLE_ACTION;
    constructor() { }
}

export class LoadAppConfigs implements Action {
    readonly type = LOAD_APPCONFIGS;
    constructor() { }
}

export class LoadAppConfigsFailed implements Action {
    readonly type = LOAD_APPCONFIGS_FAILED;
    constructor(public payload: any) {

    }
}

export class LoadAppConfigsSuccess implements Action {
    readonly type = LOAD_APPCONFIGS_SUCCESS;
    constructor(public payload: any) {
    }
}

export class LoadUrlInfo implements Action {
    readonly type = LOAD_URL_INFO;
    constructor(public payload: any) { }
}

export class LoadUrlInfoFailed implements Action {
    readonly type = LOAD_URL_INFO_FAILED;
    constructor(public payload: any) {

    }
}

export class LoadUrlInfoSuccess implements Action {
    readonly type = LOAD_URL_INFO_SUCCESS;
    constructor(public payload: any) {
    }
}

export class ResetUrlInfo implements Action {
    readonly type = RESET_URL_INFO;
    constructor() { }
}

export class DetectCurrentLocation implements Action {
    readonly type = DETECT_CURRENT_LOCATION;
    constructor(public payload: any) { }
}
export class DetectCurrentLocationSuccess implements Action {
    readonly type = DETECT_CURRENT_LOCATION_SUCCESS;
    constructor(public payload: any) { }
}
export class DetectCurrentLocationFailed implements Action {
    readonly type = DETECT_CURRENT_LOCATION_FAILED;
    constructor(public payload: any) { }
}

export class LoadCountryInformation implements Action {
    readonly type = LOAD_COUNTRY_INFORMATION;
    constructor() { }
}

export class LoadCountryInformationSuccess implements Action {
    readonly type = LOAD_COUNTRY_INFORMATION_SUCCESS;
    constructor(public payload: Array<any>) { }
}

export class LoadCountryInformationFailed implements Action {
    readonly type = LOAD_COUNTRY_INFORMATION_FAILED;
    constructor(public payload: any) { }
}

export class LoadSharedSession implements Action {
    readonly type = LOAD_SHARED_SESSION;
    constructor() { }
}

export class LoadSharedSessionSuccess implements Action {
    readonly type = LOAD_SHARED_SESSION_SUCCESS;
    constructor(public payload: any) { }
}

export class LoadSharedSessionFailed implements Action {
    readonly type = LOAD_SHARED_SESSION_FAILED;
    constructor(public payload: any) { }
}

export class LoadTrackingCode implements Action {
    readonly type = LOAD_TRACKING_CODE;
    constructor(public payload: any) { }
}

export class LoadTrackingCodeSuccess implements Action {
    readonly type = LOAD_TRACKING_CODE_SUCCESS;
    constructor(public payload: any) { }
}

export class LoadTrackingCodeFailed implements Action {
    readonly type = LOAD_TRACKING_CODE_FAILED;
    constructor(public payload: any) { }
}

export class SubscribeNewsLetter implements Action {
    readonly type = SUBSCRIBE_NEWSLETTER;
    constructor(public payload: any) { }
}
export class SubscribeNewsLetterFailed implements Action {
    readonly type = SUBSCRIBE_NEWSLETTER_FAILED;
    constructor(public payload: any) { }
}
export class SubscribeNewsLetterSuccess implements Action {
    readonly type = SUBSCRIBE_NEWSLETTER_SUCCESS;
    constructor(public payload: any) { }
}

export class LoadRecentProducts implements Action {
    readonly type = LOAD_RECENT_PRODUCTS;
    constructor() { }
}
export class LoadRecentProductsFailed implements Action {
    readonly type = LOAD_RECENT_PRODUCTS_FAILED;
    constructor(public payload: any) { }
}
export class LoadRecentProductsSuccess implements Action {
    readonly type = LOAD_RECENT_PRODUCTS_SUCCESS;
    constructor(public payload: any) { }
}

export class SetLoadingState implements Action {
    readonly type = SET_LOADING_STATE;
    constructor(public payload: Boolean) { }
}

export class Load404Page implements Action {
    readonly type = LOAD_404_PAGE;
    constructor() { }
}

export class Load404PageFailed implements Action {
    readonly type = LOAD_404_PAGE_FAILED;
    constructor(public payload: any) {

    }
}

export class Load404PageSuccess implements Action {
    readonly type = LOAD_404_PAGE_SUCCESS;
    constructor(public payload: any) {
    }
}

export class SetSearchPage implements Action {
    readonly type = SET_SEARCH_PAGE;
    constructor() {
    }
}

export class SetProductPage implements Action {
    readonly type = SET_PRODUCT_PAGE;
    constructor() {
    }
}

export class ResetProductPage implements Action {
    readonly type = RESET_PRODUCT_PAGE;
    constructor() {
    }
}

export class PreventScrollTop implements Action {
    readonly type = PREVENT_SCROLL_TOP;
    constructor(public prevent: boolean) {
    }
}

export type CommonActions =
    NullableAction |
    LoadAppConfigs | LoadAppConfigsFailed | LoadAppConfigsSuccess |
    LoadUrlInfo | LoadUrlInfoFailed | LoadUrlInfoSuccess | ResetUrlInfo |
    DetectCurrentLocation | DetectCurrentLocationFailed | DetectCurrentLocationSuccess |
    LoadCountryInformation | LoadCountryInformationSuccess | LoadCountryInformationFailed |
    LoadSharedSession | LoadSharedSessionFailed | LoadSharedSessionSuccess |
    LoadTrackingCode | LoadTrackingCodeFailed | LoadTrackingCodeSuccess |
    SubscribeNewsLetter | SubscribeNewsLetterFailed | SubscribeNewsLetterSuccess |
    LoadRecentProducts | LoadRecentProductsFailed | LoadRecentProductsSuccess |
    Load404Page | Load404PageFailed | Load404PageSuccess |
    SetLoadingState | SetSearchPage | SetProductPage | ResetProductPage | PreventScrollTop;

