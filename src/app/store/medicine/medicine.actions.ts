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

export const LOAD_DRUG_MEDICINE = '[DRUG_MEDICINE] load dược chất';
export const LOAD_DRUG_MEDICINE_SUCCESS = '[DRUG_MEDICINE] successfully load dược chất';
export const LOAD_DRUG_MEDICINE_FAILED = '[DRUG_MEDICINE] failed to load dược chất';

export const LOAD_PATENT_MEDICINE = '[PATENT_MEDICINE] load biệt dược';
export const LOAD_PATENT_MEDICINE_SUCCESS = '[PATENT_MEDICINE] successfully load biệt dược';
export const LOAD_PATENT_MEDICINE_FAILED = '[PATENT_MEDICINE] failed to load biệt dược';

export const LOAD_UNIT_MEDICINE = '[UNIT_MEDICINE] load biệt dược';
export const LOAD_UNIT_MEDICINE_SUCCESS = '[UNIT_MEDICINE] successfully load biệt dược';
export const LOAD_UNIT_MEDICINE_FAILED = '[UNIT_MEDICINE] failed to load biệt dược';

export const LOAD_BEHAVIOUR_MEDICINE = '[BEHAVIOUR_MEDICINE] load behaviour';
export const LOAD_BEHAVIOUR_MEDICINE_SUCCESS = '[BEHAVIOUR_MEDICINE] successfully load behaviour';
export const LOAD_BEHAVIOUR_MEDICINE_FAILED = '[BEHAVIOUR_MEDICINE] failed to load behaviour';


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

// load drug medicine
export class LoadDrugMedicine implements Action {
    readonly type = LOAD_DRUG_MEDICINE;
    constructor(public payload: any) { }
}

export class LoadDrugMedicineFailed implements Action {
    readonly type = LOAD_DRUG_MEDICINE_FAILED;
    constructor(public payload: any) { }
}

export class LoadDrugMedicineSuccess implements Action {
    readonly type = LOAD_DRUG_MEDICINE_SUCCESS;
    constructor(public payload: any) { }
}
// load patent medicine
export class LoadPatentMedicine implements Action {
    readonly type = LOAD_PATENT_MEDICINE;
    constructor(public payload: any) { }
}

export class LoadPatentMedicineFailed implements Action {
    readonly type = LOAD_PATENT_MEDICINE_FAILED;
    constructor(public payload: any) { }
}

export class LoadPatentMedicineSuccess implements Action {
    readonly type = LOAD_PATENT_MEDICINE_SUCCESS;
    constructor(public payload: any) { }
}
// load unit medicine
export class LoadUnitMedicine implements Action {
    readonly type = LOAD_UNIT_MEDICINE;
    constructor(public payload: any) { }
}

export class LoadUnitMedicineFailed implements Action {
    readonly type = LOAD_UNIT_MEDICINE_FAILED;
    constructor(public payload: any) { }
}

export class LoadUnitMedicineSuccess implements Action {
    readonly type = LOAD_UNIT_MEDICINE_SUCCESS;
    constructor(public payload: any) { }
}
// load behaviour medicine
export class LoadBehaviourMedicine implements Action {
    readonly type = LOAD_BEHAVIOUR_MEDICINE;
    constructor(public payload: any) { }
}

export class LoadBehaviourMedicineFailed implements Action {
    readonly type = LOAD_BEHAVIOUR_MEDICINE_FAILED;
    constructor(public payload: any) { }
}

export class LoadBehaviourMedicineSuccess implements Action {
    readonly type = LOAD_BEHAVIOUR_MEDICINE_SUCCESS;
    constructor(public payload: any) { }
}

export type MedicineActions =
ListMedicine | ListMedicineFailed | ListMedicineSuccess 
| LoadMedicine | LoadMedicineFailed | LoadMedicineSuccess
| LoadTypeMedicine | LoadTypeMedicineFailed | LoadTypeMedicineSuccess
| LoadDrugMedicine | LoadDrugMedicineFailed | LoadDrugMedicineSuccess
| LoadPatentMedicine | LoadPatentMedicineFailed | LoadPatentMedicineSuccess
| LoadUnitMedicine | LoadUnitMedicineFailed | LoadUnitMedicineSuccess
| LoadBehaviourMedicine | LoadBehaviourMedicineSuccess | LoadBehaviourMedicineFailed
;
