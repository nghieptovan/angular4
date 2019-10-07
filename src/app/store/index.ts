/*
  Import createSelector from reselect to make selection of different parts of the state fast efficient
 */
import { createSelector } from 'reselect';
/*
  Import the store logger to log all the actions to the console
 */
import { storeLogger } from 'ngrx-store-logger';

import { compose } from '@ngrx/core';
import { combineReducers, State, ActionReducerMap, ActionReducer } from '@ngrx/store';
import { state } from '@angular/core';

/*
 Import the layout state
 */
import * as fromAuth from './auth/auth.reducer';
import * as fromAccount from './account/account.reducer';
import * as fromPatient from './patient/patient.reducer';
import * as fromBill from './bill/bill.reducer';
import * as fromMedicine from './medicine/medicine.reducer';
import { AppConstants } from '../app.constant';


export interface AppState {
    auth: fromAuth.State;
    account: fromAccount.State;
    patient: fromPatient.State;
    bill: fromBill.State;
    medicine: fromMedicine.State;
}


export const reducers: ActionReducerMap<AppState> = {
    auth: fromAuth.reducer,
    account: fromAccount.reducer,
    patient: fromPatient.reducer,
    bill: fromBill.reducer,
    medicine: fromMedicine.reducer
  };
  

export function logger(reducer: ActionReducer<AppState>): any {
    return storeLogger()(reducer);
  }
  
export const metaReducers = !AppConstants.ENVIRONMENT_DEV ? [] : [logger];

/*
Authorize
 */

export const authGetState = (state: AppState) => state.auth;
export const authGetLoadingState = createSelector(authGetState, fromAuth.getLoadingState);
export const authGetLoggedInState = createSelector(authGetState, fromAuth.getLoggedInState);
export const authGetErrorMessage = createSelector(authGetState, fromAuth.getErrorMessage);
export const getLoginUser = createSelector(authGetState, fromAuth.getLoginUser);
export const getLoggedOut = createSelector(authGetState, fromAuth.getLoggedOut);
export const getLoggedIn = createSelector(authGetState, fromAuth.getLoggedIn);
/*
Bill
 */

export const billGetState = (state: AppState) => state.bill;

export const billGetLoadingState = createSelector(billGetState, fromBill.getLoadingState);
export const billByPatient = createSelector(billGetState, fromBill.getBillByPatient);


// Medicine

export const medicineGetState = (state: AppState) => state.medicine;

export const medicineGetLoadingState = createSelector(medicineGetState, fromMedicine.getLoadingState);


export const medicineGetErrorMessage = createSelector(medicineGetState, fromMedicine.getErrorMessage);

export const getListMedicine = createSelector(medicineGetState, fromMedicine.getListMedicine);
export const getListTypeMedicine = createSelector(medicineGetState, fromMedicine.getListTypeMedicine);
export const getListDrugMedicine = createSelector(medicineGetState, fromMedicine.getListDrugMedicine);
export const getListPatentMedicine = createSelector(medicineGetState, fromMedicine.getListPatentMedicine);
export const getListUnitMedicine = createSelector(medicineGetState, fromMedicine.getListUnitMedicine);
export const getListBehaviourMedicine = createSelector(medicineGetState, fromMedicine.getListBehaviourMedicine);

export const getCurrentMedicine = createSelector(medicineGetState, fromMedicine.getCurrentMedicine);
export const getCurrentTypeMedicine = createSelector(medicineGetState, fromMedicine.getCurrentTypeMedicine);
export const getCurrentPatentMedicine = createSelector(medicineGetState, fromMedicine.getCurrentPatentMedicine);
export const getCurrentDrugMedicine = createSelector(medicineGetState, fromMedicine.getCurrentDrugMedicine);
export const getCurrentUnitMedicine = createSelector(medicineGetState, fromMedicine.getCurrentUnitMedicine);
export const getCurrentBehaviourMedicine = createSelector(medicineGetState, fromMedicine.getCurrentBehaviourMedicine);
export const medStatusCreateOrUpdate = createSelector(medicineGetState, fromMedicine.medStatusCreateOrUpdate);
export const typeMedDelete = createSelector(medicineGetState, fromMedicine.typeMedDelete);
export const dataMedDelete = createSelector(medicineGetState, fromMedicine.dataMedDelete);


//End Medicine


/*
Patient
 */

export const patientGetState = (state: AppState) => state.patient;

export const patientGetLoadingState = createSelector(patientGetState, fromPatient.getLoadingState);
export const patientGetListPatient = createSelector(patientGetState, fromPatient.getListPatient);
export const patientCurrentPatient = createSelector(patientGetState, fromPatient.getCurrentPatient);
export const patientUpdatePatient = createSelector(patientGetState, fromPatient.getUpdatePatient);
export const patientDeletePatient = createSelector(patientGetState, fromPatient.getDeletePatient);

/*
Account
 */

export const accountGetState = (state: AppState) => state.account;

export const accountGetLoadingState = createSelector(accountGetState, fromAccount.getLoadingState);
export const accountGetAccountInfo = createSelector(accountGetState, fromAccount.getAccountInfo);
export const accountGetCreateAccount = createSelector(accountGetState, fromAccount.getCreateAccount);
export const accountGetDeleteAccount = createSelector(accountGetState, fromAccount.getDeleteAccount);
export const accountGetUpdateAccount = createSelector(accountGetState, fromAccount.getUpdateAccount);
export const accountGetConfigJSON = createSelector(accountGetState, fromAccount.getConfigJSON);