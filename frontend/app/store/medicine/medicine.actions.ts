import { Action } from '@ngrx/store';

/*
 Because the Categories collection is asynchronous, there need to be actions to handle
 each of the stages of the request.
 */
export const LIST_MEDICINE = '[MEDICINE] load list';
export const LIST_MEDICINE_SUCCESS = '[MEDICINE] successfully load list';
export const LIST_MEDICINE_FAILED = '[MEDICINE] failed to load list';

// export const UPDATE_PATIENT = '[MEDICINE] update patient';
// export const UPDATE_PATIENT_SUCCESS = '[MEDICINE] successfully update patient';
// export const UPDATE_PATIENT_FAILED = '[MEDICINE] failed to update patient';

// export const LOAD_PATIENT_BY_ID = '[MEDICINE] LoadPatientById';
// export const LOAD_PATIENT_BY_ID_SUCCESS = '[MEDICINE] successfully LoadPatientById';
// export const LOAD_PATIENT_BY_ID_FAILED = '[MEDICINE] failed to LoadPatientById';

//list patient
export class ListMedicine implements Action {
    readonly type = LIST_MEDICINE;
    constructor(public payload: any) { }
}

export class ListMedicineFailed implements Action {
    readonly type = LIST_MEDICINE_FAILED;
    constructor(public payload: any) { }
}

export class ListMedicineSuccess implements Action {
    readonly type = LIST_MEDICINE_SUCCESS;
    constructor(public payload: any) { }
}



export type MedicineActions =
ListMedicine | ListMedicineFailed | ListMedicineSuccess
;
