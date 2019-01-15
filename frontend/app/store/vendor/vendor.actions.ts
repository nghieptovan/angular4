import { Action } from '@ngrx/store';

/*
 Because the Categories collection is asynchronous, there need to be actions to handle
 each of the stages of the request.
 */
export const LOAD = '[Vendor] load vendor';
export const LOAD_SUCCESS = '[Vendor] successfully loaded vendor';
export const LOAD_FAILED = '[Vendor] failed to load vendor';

export const LOAD_LANDING_SETTING = '[Vendor] load landing setting';
export const LOAD_LANDING_SETTING_SUCCESS = '[Vendor] successfully loaded landing setting';
export const LOAD_LANDING_SETTING_FAILED = '[Vendor] failed to load landing setting';

export const CLEAR_STAGE = '[Vendor] clear stage';

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

export class LoadLandingSetting implements Action {
    readonly type = LOAD_LANDING_SETTING;

    constructor(public payload: any){
    }
}

export class LoadLandingSettingFailed implements Action {
    readonly type = LOAD_LANDING_SETTING_FAILED;

    constructor(public payload: any) {
    }
}

export class LoadLandingSettingSuccess implements Action {
    readonly type = LOAD_LANDING_SETTING_SUCCESS;

    constructor(public payload: any) {
    }
}

export class clearStage implements Action {
    readonly type = CLEAR_STAGE;

    constructor() {
    }
}

export type VendorActions =
    Load | LoadFailed | LoadSuccess | clearStage |
    LoadLandingSetting | LoadLandingSettingFailed | LoadLandingSettingSuccess;
