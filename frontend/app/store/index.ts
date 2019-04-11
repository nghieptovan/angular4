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
import * as fromProducts from './products/products.reducer';
import * as fromCategories from './categories/categories.reducer';
import * as fromCheckout from './checkout/checkout.reducer';
import * as fromVendorCheckout from './checkout/vendor-checkout/checkout.reducer';
import * as fromCommon from './common/common.reducer';
import * as fromAccount from './account/account.reducer';
import * as fromHome from './home/home.reducer';
import * as fromTpo from './tpo/tpo.reducer';
import * as fromCampaign from './campaign/campaign.reducer';
import * as fromStyleFeed from './stylefeed/stylefeed.reducer';
import * as fromBrand from './brand/brand.reducer';
import * as fromVendor from './vendor/vendor.reducer';
import * as fromRecharge from './recharge/recharge.reducer';
import * as fromPatient from './patient/patient.reducer';
import * as fromBill from './bill/bill.reducer';
import * as fromMedicine from './medicine/medicine.reducer';

import * as fromBigBangV2 from './game/bigbangv2/bigbangv2.reducer';
import * as fromPigV1 from './game/pigv1/pigv1.reducer';

import * as fromAnniversary from './anniversary/anniversary.reducer';

export interface AppState {
    auth: fromAuth.State;
    account: fromAccount.State;
    patient: fromPatient.State;
    bill: fromBill.State;
    medicine: fromMedicine.State;
    products: fromProducts.State;
    categories: fromCategories.State;
    checkout: fromCheckout.State;
    vendorCheckout: fromVendorCheckout.State;
    common: fromCommon.State;
    
    home: fromHome.State;
    tpo: fromTpo.State;
    campaign: fromCampaign.State;
    stylefeed: fromStyleFeed.State;
    brand: fromBrand.State;
    vendor: fromVendor.State;
    recharge: fromRecharge.State;
    bigbangv2:fromBigBangV2.State;
    pigv1:fromPigV1.State;
    anniversary:fromAnniversary.State;

}

export const reducers = {
    auth: fromAuth.reducer,
    account: fromAccount.reducer,
    patient: fromPatient.reducer,
    bill: fromBill.reducer,
    medicine: fromMedicine.reducer
    // products: fromProducts.reducer,
    // categories: fromCategories.reducer,
    // checkout: fromCheckout.reducer,
    // vendorCheckout: fromVendorCheckout.reducer,
    // common: fromCommon.reducer,
    
    // home: fromHome.reducer,
    // tpo: fromTpo.reducer,
    // campaign: fromCampaign.reducer,
    // stylefeed: fromStyleFeed.reducer,
    // brand: fromBrand.reducer,
    // vendor: fromVendor.reducer,
    // recharge: fromRecharge.reducer,
    // bigbangv2:fromBigBangV2.reducer,
    // pigv1:fromPigV1.reducer,
    // anniversary:fromAnniversary.reducer,
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
/*
Products
 */

export const productsGetState = (state: AppState) => state.products;

export const productsGetEntities = createSelector(productsGetState, fromProducts.getEntities);

export const productsGetRequestBody = createSelector(productsGetState, fromProducts.getRequestBody);

export const productsGetRecommend = createSelector(productsGetState, fromProducts.getRecommend);

export const productsGetLoadingState = createSelector(productsGetState, fromProducts.getLoadingState);

export const productsGetDetails = createSelector(productsGetState, fromProducts.getDetails);

export const productsGetRelatedProducts = createSelector(productsGetState, fromProducts.getRelatedProducts);

export const productsGetSearchResult = createSelector(productsGetState, fromProducts.getSearchResult);

export const productsGetSearchKeyword = createSelector(productsGetState, fromProducts.getSearchKeyword);

export const productsGetShippingRules = createSelector(productsGetState, fromProducts.getShippingRules);

export const productsGetExpressShippingRules = createSelector(productsGetState, fromProducts.getExpressShippingRules);

export const productsGetReviews = createSelector(productsGetState, fromProducts.getReviews);

export const productsGetSearchSuggestion = createSelector(productsGetState, fromProducts.getSearchSuggestion);

export const productsGetSearchCampaign = createSelector(productsGetState, fromProducts.getSearchCampaign);

export const productsGetSearchSuggestionAll = createSelector(productsGetState, fromProducts.getSearchSuggestionAll);

export const productsGetSearchPending = createSelector(productsGetState, fromProducts.getSearchPending);

export const productsHasOmni = createSelector(productsGetState, fromProducts.getHasOmni);

export const productsHasBlink = createSelector(productsGetState, fromProducts.getHasBlink);

/*
Categories
 */

export const categoriesGetState = (state: AppState) => state.categories;

export const categoriesGetEntities = createSelector(categoriesGetState, fromCategories.getEntities);

export const categoriesGetCount = createSelector(categoriesGetState, fromCategories.getCount);

export const categoriesGetSelectedStore = createSelector(categoriesGetState, fromCategories.getSelectedStore);

export const categoriesGetPage = createSelector(categoriesGetState, fromCategories.getPage);

export const categoriesGetLoadingState = createSelector(categoriesGetState, fromCategories.getLoadingState);

export const categoriesGetFacets = createSelector(categoriesGetState, fromCategories.getFacets);

/*
Checkout
 */
export const checkoutGetState = (state: AppState) => state.checkout;

export const checkoutGetCartInfo = createSelector(checkoutGetState, fromCheckout.getInfo);

export const checkoutGetCartTotal = createSelector(checkoutGetState, fromCheckout.getTotal);

export const checkoutGetCartItems = createSelector(checkoutGetState, fromCheckout.getItems);

export const checkoutGetCartRequestCount = createSelector(checkoutGetState, fromCheckout.getRequestCount);

export const checkoutGetCartItemsCount = createSelector(checkoutGetState, fromCheckout.getItemsCount);

export const checkoutGetLoadingState = createSelector(checkoutGetState, fromCheckout.getLoadingState);

export const checkoutGetCurrentStep = createSelector(checkoutGetState, fromCheckout.getCurrentStep);

export const checkoutGetErrorMessage = createSelector(checkoutGetState, fromCheckout.getErrorMessage);

export const checkoutGetSuccessMessage = createSelector(checkoutGetState, fromCheckout.getSuccessMessage);

export const checkoutGetCoupon = createSelector(checkoutGetState, fromCheckout.getCouponCode);

export const checkoutGetShippingVendors = createSelector(checkoutGetState, fromCheckout.getShippingVendors);

export const checkoutGetFreeshippingHtml = createSelector(checkoutGetState, fromCheckout.getFreeshippingHtml);

export const checkoutGetShippingFee = createSelector(checkoutGetState, fromCheckout.getShippingFee);

export const checkoutGetPaymentRules = createSelector(checkoutGetState, fromCheckout.getPaymentRules);

export const checkoutGetPaymentMethods = createSelector(checkoutGetState, fromCheckout.getPaymentMethods);

export const checkoutGetCartLater = createSelector(checkoutGetState, fromCheckout.getCartLater);

export const checkoutCartLaterCreate = createSelector(checkoutGetState, fromCheckout.createCartLater);

export const checkoutCartLaterAddItem = createSelector(checkoutGetState, fromCheckout.cartLaterAddItem);

export const checkoutGetCouponStatusMessage = createSelector(checkoutGetState, fromCheckout.getCouponStatusMessage);

export const checkoutGetCardNoValid = createSelector(checkoutGetState, fromCheckout.getCardNoValid);

/*
* Vendor Checkout
*/

export const vendorCheckoutGetState = (state: AppState) => state.vendorCheckout;

export const vendorCheckoutGetCartInfo = createSelector(vendorCheckoutGetState, fromVendorCheckout.getInfo);

export const vendorCheckoutGetCartTotal = createSelector(vendorCheckoutGetState, fromVendorCheckout.getTotal);

export const vendorCheckoutGetCartItems = createSelector(vendorCheckoutGetState, fromVendorCheckout.getItems);

export const vendorCheckoutGetCartRequestCount = createSelector(vendorCheckoutGetState, fromVendorCheckout.getRequestCount);

export const vendorCheckoutGetCartItemsCount = createSelector(vendorCheckoutGetState, fromVendorCheckout.getItemsCount);

export const vendorCheckoutGetLoadingState = createSelector(vendorCheckoutGetState, fromVendorCheckout.getLoadingState);

export const vendorCheckoutGetCurrentStep = createSelector(vendorCheckoutGetState, fromVendorCheckout.getCurrentStep);

export const vendorCheckoutGetErrorMessage = createSelector(vendorCheckoutGetState, fromVendorCheckout.getErrorMessage);

export const vendorCheckoutGetSuccessMessage = createSelector(vendorCheckoutGetState, fromVendorCheckout.getSuccessMessage);

export const vendorCheckoutGetCoupon = createSelector(vendorCheckoutGetState, fromVendorCheckout.getCouponCode);

export const vendorCheckoutGetShippingVendors = createSelector(vendorCheckoutGetState, fromVendorCheckout.getShippingVendors);

export const vendorCheckoutGetFreeshippingHtml = createSelector(vendorCheckoutGetState, fromVendorCheckout.getFreeshippingHtml);

export const vendorCheckoutGetShippingFee = createSelector(vendorCheckoutGetState, fromVendorCheckout.getShippingFee);

export const vendorCheckoutGetPaymentRules = createSelector(vendorCheckoutGetState, fromVendorCheckout.getPaymentRules);

export const vendorCheckoutGetPaymentMethods = createSelector(vendorCheckoutGetState, fromVendorCheckout.getPaymentMethods);

export const vendorCheckoutGetCartLater = createSelector(vendorCheckoutGetState, fromVendorCheckout.getCartLater);

export const vendorCheckoutCartLaterCreate = createSelector(vendorCheckoutGetState, fromVendorCheckout.createCartLater);

export const vendorCheckoutCartLaterAddItem = createSelector(vendorCheckoutGetState, fromVendorCheckout.cartLaterAddItem);

export const vendorCheckoutGetCouponStatusMessage = createSelector(vendorCheckoutGetState, fromVendorCheckout.getCouponStatusMessage);

/*
Home
 */
export const homeGetState = (state: AppState) => state.home;

export const homeGetCmsBlock = createSelector(homeGetState, fromHome.getHomeCmsBlock);

export const homeGetIsHomePageState = createSelector(homeGetState, fromHome.getIsHomePageState);

export const homeGetIsLoadingState = createSelector(homeGetState, fromHome.getIsLoadingState);

// tpo
export const tpoGroupGetState = (state: AppState) => state.tpo;

export const tpoCmsBlockGetContent = createSelector(tpoGroupGetState, fromTpo.getContent);

export const tpoGroupGetGroups = createSelector(tpoGroupGetState, fromTpo.getTpoGroups);

export const tpoGroupGetTpoDetail = createSelector(tpoGroupGetState, fromTpo.getTpoDetail);

export const tpoGroupGetTpoProducts = createSelector(tpoGroupGetState, fromTpo.getTpoProducts);

export const tpoGroupGetTpoDashboardProducts = createSelector(tpoGroupGetState, fromTpo.getTpoDashboardProducts);

export const tpoGroupGetTpoProductsAlsoLike = createSelector(tpoGroupGetState, fromTpo.getTpoProductsAlsoLike);

export const tpoGetSearchTpo = createSelector(tpoGroupGetState, fromTpo.getSearchTpo);


// campaign
export const campaignGetState = (state: AppState) => state.campaign;

export const campaignGetCampaign = createSelector(campaignGetState, fromCampaign.getCampaign);

export const campaignGetPromotions = createSelector(campaignGetState, fromCampaign.getPromotions);

/*
stylefeed
 */
export const stylefeedGetSate = (state: AppState) => state.stylefeed;

export const styleFeedGetAllPosts = createSelector(stylefeedGetSate, fromStyleFeed.getAllPosts);

export const styleFeedGetMorePostsHome = createSelector(stylefeedGetSate, fromStyleFeed.getMorePostsHome);

export const styleFeedGetMorePostsCategory = createSelector(stylefeedGetSate, fromStyleFeed.getMorePostsCategory);

export const styleFeedGetPostsHighlightCategory = createSelector(stylefeedGetSate, fromStyleFeed.getPostsHighlightCategory);

export const styleFeedGetMenu = createSelector(stylefeedGetSate, fromStyleFeed.getMenu);

export const styleFeedGetPostContent = createSelector(stylefeedGetSate, fromStyleFeed.getPostContent);

export const styleFeedGetPostRelated = createSelector(stylefeedGetSate, fromStyleFeed.getPostRelated);

export const stylefeedGetIsLoadingState  = createSelector(stylefeedGetSate, fromStyleFeed.getIsLoadingState);

export const stylefeedGetIsLoadedState  = createSelector(stylefeedGetSate, fromStyleFeed.getIsLoadedState);

export const styleFeedGetPostComments = createSelector(stylefeedGetSate, fromStyleFeed.getPostComments);

export const styleFeedGetPostCommentsInfo = createSelector(stylefeedGetSate, fromStyleFeed.getPostCommentsInfo);

export const styleFeedPostComment = createSelector(stylefeedGetSate, fromStyleFeed.postPostComment);
//Game Bigbang V2
export const bigbangv2GetState          = (state: AppState) => state.bigbangv2;
export const bigbangv2GetHistory        = createSelector(bigbangv2GetState, fromBigBangV2.getBigBangV2History);
export const bigbangv2GetPlayerProfile  = createSelector(bigbangv2GetState, fromBigBangV2.getBigBangV2PlayerProfile);
export const bigbangv2GetGameData       = createSelector(bigbangv2GetState, fromBigBangV2.getBigBangV2GameData);
export const bigbangv2GetGameDataStart  = createSelector(bigbangv2GetState, fromBigBangV2.getBigBangV2GameDataStart);
export const bigbangv2GetGameDataFinish = createSelector(bigbangv2GetState, fromBigBangV2.getBigBangV2GameDataFinish);
export const bigbangv2GetGameSetting    = createSelector(bigbangv2GetState, fromBigBangV2.getBigBangV2GameSettings);
export const bigbangv2GetGifts          = createSelector(bigbangv2GetState, fromBigBangV2.getBigBangV2Gifts);
export const bigbangv2GetResults        = createSelector(bigbangv2GetState, fromBigBangV2.getBigBangV2Results);
export const bigbangv2ShareFB           = createSelector(bigbangv2GetState, fromBigBangV2.getBigBangV2ShareFB);

//Game Pig V1
export const pigv1GetState          = (state: AppState) => state.pigv1;
export const pigv1GetHistory        = createSelector(pigv1GetState, fromPigV1.getPigV1History);
export const pigv1GetPlayerProfile  = createSelector(pigv1GetState, fromPigV1.getPigV1PlayerProfile);
export const pigv1GetGameData       = createSelector(pigv1GetState, fromPigV1.getPigV1GameData);
export const pigv1GetGameDataStart  = createSelector(pigv1GetState, fromPigV1.getPigV1GameDataStart);
export const pigv1GetGameDataFinish = createSelector(pigv1GetState, fromPigV1.getPigV1GameDataFinish);
export const pigv1GetGameSetting    = createSelector(pigv1GetState, fromPigV1.getPigV1GameSettings);
export const pigv1GetGifts          = createSelector(pigv1GetState, fromPigV1.getPigV1Gifts);
export const pigv1GetResults        = createSelector(pigv1GetState, fromPigV1.getPigV1Results);
export const pigv1GetRanking        = createSelector(pigv1GetState, fromPigV1.getPigV1Ranking);
export const pigv1GetMineRanking    = createSelector(pigv1GetState, fromPigV1.getPigV1MineRanking);
export const pigv1ShareFB           = createSelector(pigv1GetState, fromPigV1.getPigV1ShareFB);
export const pigv1Login             = createSelector(pigv1GetState, fromPigV1.getPigV1Login);

export const anniversaryGetState  = (state: AppState) => state.anniversary;
export const anniversaryResults   = createSelector(anniversaryGetState, fromAnniversary.getAnniversary);

// brand
export const brandGetState = (state: AppState) => state.brand;
export const brandGetEntity = createSelector(brandGetState, fromBrand.getEntity);

// vendor

export const vendorGetState = (state: AppState) => state.vendor;

export const vendorGetEntity = createSelector(vendorGetState, fromVendor.getEntity);
export const vendorGetLandingSetting = createSelector(vendorGetState, fromVendor.getLandingSetting);


// recharge

export const rechargeGetState = (state: AppState) => state.recharge;
export const rechargeGetErrorMessage = createSelector(rechargeGetState, fromRecharge.getErrorMessage);
export const rechargeGetConfigs = createSelector(rechargeGetState, fromRecharge.getConfigs);
export const rechargeGetProvider = createSelector(rechargeGetState, fromRecharge.getProviders);
export const rechargeGetRechargeProduct = createSelector(rechargeGetState, fromRecharge.getProducts);
export const rechargeSelectType = createSelector(rechargeGetState, fromRecharge.getSelectedType);
export const rechargeSelectProvider = createSelector(rechargeGetState, fromRecharge.getSelectedProvider);
export const rechargeSelectProduct = createSelector(rechargeGetState, fromRecharge.getSelectedProduct);
export const rechargeGetCreateCart = createSelector(rechargeGetState, fromRecharge.createCart);
export const rechargeGetCartInfo = createSelector(rechargeGetState, fromRecharge.getCartInfo);
export const rechargeGetCartRequest = createSelector(rechargeGetState, fromRecharge.getCartRequest);
export const rechargeGetCartTotal = createSelector(rechargeGetState, fromRecharge.getCartTotal);
export const rechargeSelectPayment = createSelector(rechargeGetState, fromRecharge.getSelectedPayment);
export const rechargeGetPaymentMethods = createSelector(rechargeGetState, fromRecharge.getPaymentMethods);

