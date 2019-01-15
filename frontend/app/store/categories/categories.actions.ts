import { Action } from '@ngrx/store';

/*
 Because the Categories collection is asynchronous, there need to be actions to handle
 each of the stages of the request.
 */
export const LOAD = '[Categories] load categories';
export const LOAD_SUCCESS = '[Categories] successfully loaded categories';
export const LOAD_FAILED = '[Categories] failed to load categories';

export const LOAD_FACETS = '[Categories] load facets';
export const LOAD_FACETS_SUCCESS = '[Categories] successfully loaded facets';
export const LOAD_FACETS_FAILED = '[Categories] failed to load facets';

export const UPDATE = '[Categories] update categories';
export const UPDATE_SUCCESS = '[Categories] successfully updated categories';
export const UPDATE_FAILED = '[Categories] failed to update categories';

export const SET_SELECTED_STORE = '[Categories] Set selected store';

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

export class LoadFacets implements Action {
    readonly type = LOAD_FACETS;

    constructor(public payload: any) {
    }
}

export class LoadFacetsFailed implements Action {
    readonly type = LOAD_FACETS_FAILED;

    constructor(public payload: any) {
    }
}

export class LoadFacetsSuccess implements Action {
    readonly type = LOAD_FACETS_SUCCESS;

    constructor(public payload: any) {
    }
}

export class UpdateCategories implements Action {
    readonly type = UPDATE;

    constructor(public payload: any) {
    }
}

export class SetSelectedStore implements Action {
    readonly type = SET_SELECTED_STORE;
    constructor(public payload: any) {
    }
}

export type CategoriesActions =
    Load | LoadFailed | LoadSuccess |
    LoadFacets | LoadFacetsFailed | LoadFacetsSuccess |
    UpdateCategories | SetSelectedStore
    ;
