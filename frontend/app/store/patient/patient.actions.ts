import { Action } from '@ngrx/store';

/*
 Because the Categories collection is asynchronous, there need to be actions to handle
 each of the stages of the request.
 */
export const LIST_PATIENT = '[PATIENT] load list';
export const LIST_PATIENT_SUCCESS = '[PATIENT] successfully load list';
export const LIST_PATIENT_FAILED = '[PATIENT] failed to load list';

export const UPDATE_PATIENT = '[PATIENT] update patient';
export const UPDATE_PATIENT_SUCCESS = '[PATIENT] successfully update patient';
export const UPDATE_PATIENT_FAILED = '[PATIENT] failed to update patient';

export class ListPatient implements Action {
    readonly type = LIST_PATIENT;
    constructor(public payload: any) { }
}

export class ListPatientFailed implements Action {
    readonly type = LIST_PATIENT_FAILED;
    constructor(public payload: any) { }
}

export class ListPatientSuccess implements Action {
    readonly type = LIST_PATIENT_SUCCESS;
    constructor(public payload: any) { }
}

export class UpdatePatient implements Action {
    readonly type = UPDATE_PATIENT;
    constructor(public payload: any) { }
}

export class UpdatePatientFailed implements Action {
    readonly type = UPDATE_PATIENT_FAILED;
    constructor(public payload: any) { }
}

export class UpdatePatientSuccess implements Action {
    readonly type = UPDATE_PATIENT_SUCCESS;
    constructor(public payload: any) { }
}


export type PatientActions =
ListPatient | ListPatientFailed | ListPatientSuccess
| UpdatePatient | UpdatePatientFailed | UpdatePatientSuccess
;
