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

export const LOAD_MEDICINE_BY_ID = '[MEDICINE] load medicine';
export const LOAD_MEDICINE_BY_ID_SUCCESS = '[MEDICINE] successfully load medicine';
export const LOAD_MEDICINE_BY_ID_FAILED = '[MEDICINE] failed to load medicine';


export const LOAD_TYPE_MEDICINE = '[TYPE_MEDICINE] load type_medicine';
export const LOAD_TYPE_MEDICINE_SUCCESS = '[TYPE_MEDICINE] successfully load type_medicine';
export const LOAD_TYPE_MEDICINE_FAILED = '[TYPE_MEDICINE] failed to load type_medicine';
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

// load medicine
export class LoadMedicine implements Action {
    readonly type = LOAD_MEDICINE_BY_ID;
    constructor(public payload: any) { }
}

export class LoadMedicineFailed implements Action {
    readonly type = LOAD_MEDICINE_BY_ID_FAILED;
    constructor(public payload: any) { }
}

export class LoadMedicineSuccess implements Action {
    readonly type = LOAD_MEDICINE_BY_ID_SUCCESS;
    constructor(public payload: any) { }
}

// load type medicine
export class LoadTypeMedicine implements Action {
    readonly type = LOAD_TYPE_MEDICINE;
    constructor(public payload: any) { }
}

export class LoadTypeMedicineFailed implements Action {
    readonly type = LOAD_TYPE_MEDICINE_FAILED;
    constructor(public payload: any) { }
}

export class LoadTypeMedicineSuccess implements Action {
    readonly type = LOAD_TYPE_MEDICINE_SUCCESS;
    constructor(public payload: any) { }
}


export type MedicineActions =
ListMedicine | ListMedicineFailed | ListMedicineSuccess 
| LoadMedicine | LoadMedicineFailed | LoadMedicineSuccess
| LoadTypeMedicine | LoadTypeMedicineFailed | LoadTypeMedicineSuccess
;
