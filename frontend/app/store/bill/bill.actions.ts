import { Action } from '@ngrx/store';

/*
 Because the Categories collection is asynchronous, there need to be actions to handle
 each of the stages of the request.
 */
export const BILL_BY_PATIENT = '[BILL] load by patient';
export const BILL_BY_PATIENT_SUCCESS = '[BILL] successfully load by patient';
export const BILL_BY_PATIENT_FAILED = '[BILL] failed to load by patient';


export class BillByPatient implements Action {
    readonly type = BILL_BY_PATIENT;
    constructor(public payload: any) { }
}

export class BillByPatientFailed implements Action {
    readonly type = BILL_BY_PATIENT_FAILED;
    constructor(public payload: any) { }
}

export class BillByPatientSuccess implements Action {
    readonly type = BILL_BY_PATIENT_SUCCESS;
    constructor(public payload: any) { }
}



export type BillActions =
BillByPatient | BillByPatientFailed | BillByPatientSuccess
;
