import { Action } from '@ngrx/store';

/*
 Because the Categories collection is asynchronous, there need to be actions to handle
 each of the stages of the request.
 */
export const LOAD = '[Brand] load brand';
export const LOAD_SUCCESS = '[Brand] successfully loaded brand';
export const LOAD_FAILED = '[Brand] failed to load brand';

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

export type BrandActions =
    Load | LoadFailed | LoadSuccess;
