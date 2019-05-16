/*
  Import createSelector from reselect to make selection of different parts of the state fast efficient
 */
import { createSelector } from 'reselect';
/*
  Import the store logger to log all the actions to the console
 */
import { storeLogger } from 'ngrx-store-logger';

import { compose } from '@ngrx/core';
import { combineReducers, State } from '@ngrx/store';
import { state } from '@angular/core';

/*
 Import the layout state
 */
import * as fromAuth from './auth/auth.reducer';
import * as fromCommon from './common/common.reducer';
import * as fromAccount from './account/account.reducer';
import * as fromPatient from './patient/patient.reducer';
import * as fromBill from './bill/bill.reducer';
import * as fromMedicine from './medicine/medicine.reducer';


export interface AppState {
    auth: fromAuth.State;
    account: fromAccount.State;
    patient: fromPatient.State;
    bill: fromBill.State;
    medicine: fromMedicine.State;
    common: fromCommon.State;
}

export const reducers = {
    auth: fromAuth.reducer,
    account: fromAccount.reducer,
    patient: fromPatient.reducer,
    bill: fromBill.reducer,
    medicine: fromMedicine.reducer
};


const productionReducer: Function = compose(combineReducers)(reducers);
const developmentReducer: Function = compose(storeLogger(), combineReducers)(reducers);


export function reducer(state: any, action: any) {
    if (window.location.hostname.includes('localhost') || window.location.hostname.includes('dev.lotte')) {
        return developmentReducer(state, action);
    }
    return productionReducer(state, action);
}

/*
Common
 */
export const commonGetState = (state: AppState) => state.common;

export const commonGetLoadingState = createSelector(commonGetState, fromCommon.getLoadingState);

export const commonGetCmsContents = createSelector(commonGetState, fromCommon.getCmsContents);

export const commonGetCurrencySybol = createSelector(commonGetState, fromCommon.getCurrentSymbol);

export const commonGetConfigs = createSelector(commonGetState, fromCommon.getConfigs);

export const commonGetNsoBaseUrl = createSelector(commonGetState, fromCommon.getNsoBaseUrl);

export const commonGetStoreLogos = createSelector(commonGetState, fromCommon.getStoreLogos);

export const commonGetUrlInfo = createSelector(commonGetState, fromCommon.getUrlInfo);

export const commonGetProductBaseUrl = createSelector(commonGetState, fromCommon.getProductBaseUrl);

export const commonGetStaticBaseUrl = createSelector(commonGetState, fromCommon.getStaticBaseUrl);

export const commonGetLinkBaseUrl = createSelector(commonGetState, fromCommon.getLinkBaseUrl);

export const commonGetRegions = createSelector(commonGetState, fromCommon.getRegions);

export const commonGetSharedSession = createSelector(commonGetState, fromCommon.getSharedSession);

export const commonGetCurrentLocation = createSelector(commonGetState, fromCommon.getCurrentLocation);

export const commonGetRecentProducts = createSelector(commonGetState, fromCommon.getRecentProducts);

export const commonGet404Page = createSelector(commonGetState, fromCommon.get404Page);

export const commonGetIsTopBanner = createSelector(commonGetState, fromCommon.getIsTopBanner);

export const commonGetIsProductPage = createSelector(commonGetState, fromCommon.getIsProductPage);

export const commonGetPreventScrollTop = createSelector(commonGetState, fromCommon.getPreventScrollTop);

/*
Authorize
 */

export const authGetState = (state: AppState) => state.auth;

export const authGetLoadingState = createSelector(authGetState, fromAuth.getLoadingState);

export const authGetLoggedInState = createSelector(authGetState, fromAuth.getLoggedInState);

export const authGetErrorMessage = createSelector(authGetState, fromAuth.getErrorMessage);
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


//End Medicine


/*
Patient
 */

export const patientGetState = (state: AppState) => state.patient;

export const patientGetLoadingState = createSelector(patientGetState, fromPatient.getLoadingState);
export const patientGetListPatient = createSelector(patientGetState, fromPatient.getListPatient);
export const patientCurrentPatient = createSelector(patientGetState, fromPatient.getCurrentPatient);
export const patientUpdatePatient = createSelector(patientGetState, fromPatient.getUpdatePatient);

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

export const accountGetInfo = createSelector(accountGetState, fromAccount.getInfo);

export const accountGetWishList = createSelector(accountGetState, fromAccount.getWishList);

export const accountGetSharedWishlist = createSelector(accountGetState, fromAccount.getSharedWishlist);

export const accountGetOrders = createSelector(accountGetState, fromAccount.getOrders);

export const accountGetOrderDetail = createSelector(accountGetState, fromAccount.getOrderDetail);

export const accountGetOrderTracking = createSelector(accountGetState, fromAccount.getOrderTracking);

export const accountGetLPoint = createSelector(accountGetState, fromAccount.getLPoint);

export const accountGetIsSubscribed = createSelector(accountGetState, fromAccount.getIsSubscribed);

export const accountGetRatingSellerPending = createSelector(accountGetState, fromAccount.getRatingSellerPending);

export const accountGetRatedSeller = createSelector(accountGetState, fromAccount.getRatedSeller);

export const accountGetQA = createSelector(accountGetState, fromAccount.getQA);

export const accountGetDetailComment = createSelector(accountGetState, fromAccount.getDetailComment);

export const accountGetLpointHistory = createSelector(accountGetState, fromAccount.getLpointHistory);

export const accountGetDetailLpointHistory = createSelector(accountGetState, fromAccount.getDetailsLpointHistory);

export const accountUpdateLpoint = createSelector(accountGetState, fromAccount.updateLpoint);

export const accountGetErrorMessage = createSelector(accountGetState, fromAccount.getErrorMessage);

export const accountGetGuestOrderTracking = createSelector(accountGetState, fromAccount.getGuestOrderTracking);
