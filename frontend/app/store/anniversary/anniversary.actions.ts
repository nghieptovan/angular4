import { Action } from '@ngrx/store';

/*
 Because the Categories collection is asynchronous, there need to be actions to handle
 each of the stages of the request.
 */
export const LOAD = '[Anniversary] load';
export const LOAD_SUCCESS = '[Anniversary] successfully loaded';
export const LOAD_FAILED = '[Anniversary] failed to load';

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

export type AnniversaryActions =
    Load | LoadFailed | LoadSuccess;
