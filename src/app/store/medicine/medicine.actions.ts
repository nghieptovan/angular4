import { Action } from '@ngrx/store';

/*
 Because the Categories collection is asynchronous, there need to be actions to handle
 each of the stages of the request.
 */
export const LIST_MEDICINE = '[MEDICINE] load list';
export const LIST_MEDICINE_SUCCESS = '[MEDICINE] successfully load list';
export const LIST_MEDICINE_FAILED = '[MEDICINE] failed to load list';

export const LOAD_MEDICINE_BY_ID = '[MEDICINE] load medicine';
export const LOAD_MEDICINE_BY_ID_SUCCESS = '[MEDICINE] successfully load medicine';
export const LOAD_MEDICINE_BY_ID_FAILED = '[MEDICINE] failed to load medicine';

// action for depend data
export const DELETE_DATA_MEDICINE = '[DATA_MEDICINE] xóa dữ liệu thuốc';
export const DELETE_DATA_MEDICINE_SUCCESS = '[DATA_MEDICINE] xóa dữ liệu thuốc thành công';
export const DELETE_DATA_MEDICINE_FAILED = '[DATA_MEDICINE] xóa dữ liệu thuốc thất bại';

export const UPDATE_DATA_MEDICINE = '[DATA_MEDICINE] cập nhật dữ liệu thuốc';
export const UPDATE_DATA_MEDICINE_SUCCESS = '[DATA_MEDICINE] cập nhật dữ liệu thuốc thành công';
export const UPDATE_DATA_MEDICINE_FAILED = '[DATA_MEDICINE] cập nhật dữ liệu thuốc thất bại';

export const LOAD_DATA_MEDICINE = '[DATA_MEDICINE] tải dữ liệu thuốc';
export const LOAD_DATA_MEDICINE_SUCCESS = '[DATA_MEDICINE] tải dữ liệu thuốc thành công';
export const LOAD_DATA_MEDICINE_FAILED = '[DATA_MEDICINE] tải dữ liệu thuốc thất bại';

//xóa dữ liệu thuốc
export class DeleteDataMedicine implements Action {
    readonly type = DELETE_DATA_MEDICINE;
    constructor(public payload: any) { }
}

export class DeleteDataMedicineFailed implements Action {
    readonly type = DELETE_DATA_MEDICINE_FAILED;
    constructor(public payload: any) { }
}

export class DeleteDataMedicineSuccess implements Action {
    readonly type = DELETE_DATA_MEDICINE_SUCCESS;
    constructor(public payload: any) { }
}
//cập nhật dữ liệu thuốc
export class UpdateDataMedicine implements Action {
    readonly type = UPDATE_DATA_MEDICINE;
    constructor(public payload: any) { }
}

export class UpdateDataMedicineFailed implements Action {
    readonly type = UPDATE_DATA_MEDICINE_FAILED;
    constructor(public payload: any) { }
}

export class UpdateDataMedicineSuccess implements Action {
    readonly type = UPDATE_DATA_MEDICINE_SUCCESS;
    constructor(public payload: any) { }
}

// tải dữ liệu thuốc
export class LoadDataMedicine implements Action {
    readonly type = LOAD_DATA_MEDICINE;
    constructor(public payload: any) { }
}

export class LoadDataMedicineFailed implements Action {
    readonly type = LOAD_DATA_MEDICINE_FAILED;
    constructor(public payload: any) { }
}

export class LoadDataMedicineSuccess implements Action {
    readonly type = LOAD_DATA_MEDICINE_SUCCESS;
    constructor(public payload: any) { }
}


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


export type MedicineActions =
ListMedicine | ListMedicineFailed | ListMedicineSuccess 
| LoadMedicine | LoadMedicineFailed | LoadMedicineSuccess
| DeleteDataMedicine | DeleteDataMedicineSuccess | DeleteDataMedicineFailed
| UpdateDataMedicine | UpdateDataMedicineSuccess | UpdateDataMedicineFailed
| LoadDataMedicine | LoadDataMedicineSuccess | LoadDataMedicineFailed
;
