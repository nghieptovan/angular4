import * as _ from 'lodash';

import { AppConstants } from '../../app.constant';
import * as common from './common.actions';

declare var $;
export interface State {
    loaded: boolean;
    loading: boolean;
    cities: Array<any>;
    districts: Array<any>;
    wards: Array<any>;
    configs: any;
    nsoUrl: any;
    storeLogos: any;
    cmsContents: any;
    currencySymbol: any;
    urlInfo: any;
    static404Page: any;
    productBaseUrl: any;
    staticBaseUrl: String;
    linkBaseUrl: String;
    regions: Array<any>;
    sharedSession: any;
    currentLocation: any;
    recentProducts: any;
    isTopBanner: any;
    isProductPage: any;
    preventScrollTop: boolean;
}

const initialState: State = {
    loaded: false,
    loading: false,
    cities: [],
    districts: [],
    wards: [],
    urlInfo: {},
    static404Page: {},
    configs: {},
    nsoUrl: '',
    storeLogos: '',
    cmsContents: [],
    currencySymbol: '₫',
    productBaseUrl: '',
    staticBaseUrl: '',
    linkBaseUrl: '',
    regions: [],
    sharedSession: {},
    currentLocation: {},
    recentProducts: [],
    isTopBanner: false,
    isProductPage: false,
    preventScrollTop: false
};

export function reducer(state = initialState, action: common.CommonActions): State {
    switch (action.type) {

        case common.LOAD_APPCONFIGS: {
            return Object.assign({}, state, {
                loading: true
            });
        }

        case common.LOAD_APPCONFIGS_SUCCESS: {
            const storeConfigs = action.payload[0];
            const cmsContents = action.payload[1];
            localStorage.setItem('vietin_gateway_url', storeConfigs[1].vietin_gateway_url);
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                configs: storeConfigs,
                nsoUrl: storeConfigs[1].register_seller_url,
                storeLogos: storeConfigs ? _.get(action, 'payload[0][1].vendor_logos.lotte', '') : '',
                cmsContents: cmsContents ? cmsContents.blocks : [],
                currencySymbol: storeConfigs[1].currency_symbol,
                productBaseUrl: storeConfigs[1].base_media_url + 'catalog/product/',
                staticBaseUrl: storeConfigs[1].base_static_url,
                linkBaseUrl: storeConfigs[1].base_link_url,
                isTopBanner: storeConfigs[1].is_top_banner_position
            });
        }

        case common.LOAD_APPCONFIGS_FAILED: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                cities: []
            });
        }

        case common.RESET_URL_INFO: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                urlInfo: {}
            });
        }

        case common.LOAD_URL_INFO: {
            return Object.assign({}, state, {
                loaded: false,
                loading: true,
            });
        }

        case common.LOAD_URL_INFO_SUCCESS: {
            _.each(action.payload.breadcrumbs, (item: any) => {
                if (item.categories) {
                    item.categories = parseCategoriesToArray(item.categories);
                }
            });
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                urlInfo: action.payload
            });
        }

        case common.LOAD_URL_INFO_FAILED: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                urlInfo: {}
            });
        }

        case common.LOAD_COUNTRY_INFORMATION: {
            return Object.assign({}, state, {
                loading: true,
                loaded: false
            });
        }

        case common.LOAD_COUNTRY_INFORMATION_SUCCESS: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                regions: action.payload
            });
        }

        case common.LOAD_COUNTRY_INFORMATION_FAILED: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                regions: []
            });
        }

        case common.LOAD_SHARED_SESSION: {
            return Object.assign({}, state, {
                loading: true,
                loaded: false
            });
        }

        case common.LOAD_SHARED_SESSION_SUCCESS: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                sharedSession: action.payload
            });
        }

        case common.LOAD_SHARED_SESSION_FAILED: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false
            });
        }

        case common.DETECT_CURRENT_LOCATION: {
            return Object.assign({}, state, {
            });
        }

        case common.DETECT_CURRENT_LOCATION_SUCCESS: {
            return Object.assign({}, state, {
                currentLocation: action.payload
            });
        }

        case common.DETECT_CURRENT_LOCATION_FAILED: {
            return Object.assign({}, state, {
            });
        }

        case common.LOAD_TRACKING_CODE: {
            return Object.assign({}, state, {
            });
        }

        case common.LOAD_TRACKING_CODE_SUCCESS: {
            return Object.assign({}, state, {
            });
        }

        case common.LOAD_TRACKING_CODE_FAILED: {
            return Object.assign({}, state, {
            });
        }

        case common.SUBSCRIBE_NEWSLETTER: {
            return Object.assign({}, state, {
                loaded: false,
                loading: true
            });
        }
        case common.SUBSCRIBE_NEWSLETTER_FAILED: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false
            });
        }
        case common.SUBSCRIBE_NEWSLETTER_SUCCESS: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false
            });
        }

        case common.LOAD_RECENT_PRODUCTS: {
            return Object.assign({}, state, {
                loaded: false,
                loading: true
            });
        }
        case common.LOAD_RECENT_PRODUCTS_FAILED: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false
            });
        }
        case common.LOAD_RECENT_PRODUCTS_SUCCESS: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                recentProducts: action.payload
            });
        }

        case common.SET_LOADING_STATE: {
            return Object.assign({}, state, {
                loaded: !action.payload,
                loading: action.payload
            });
        }

        case common.LOAD_404_PAGE: {
            return Object.assign({}, state, {
                loaded: false,
                loading: true,
            });
        }

        case common.LOAD_404_PAGE_SUCCESS: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                static404Page: action.payload
            });
        }

        case common.LOAD_404_PAGE_FAILED: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                static404Page: {}
            });
        }

        case common.SET_SEARCH_PAGE: {
            return Object.assign({}, state, {
                urlInfo: {
                    type: 'search'
                }
            });
        }

        case common.SET_PRODUCT_PAGE: {
            $('body').addClass('scroll-detail');
            return Object.assign({}, state, {
                isProductPage: true
            });
        }

        case common.RESET_PRODUCT_PAGE: {
            $('body').removeClass('scroll-detail');
            return Object.assign({}, state, {
                isProductPage: false
            });
        }

        case common.PREVENT_SCROLL_TOP: {
            return Object.assign({}, state, {
                preventScrollTop: action.prevent
            });
        }
        default:
            return state;
    }
}

function parseCategoriesToArray(categories) {
    const results = [];
    for (const cat in categories) {
        results.push(categories[cat]);
    }
    return results;
}

/*
Selectors for the state that will be later
used in the common-list component
*/

export const getCmsContents = (state: State) => state.cmsContents;
export const getCurrentSymbol = (state: State) => state.currencySymbol;
export const getConfigs = (state: State) => state.configs;
export const getNsoBaseUrl = (state: State) => state.nsoUrl;
export const getStoreLogos = (state: State) => state.storeLogos;
export const getUrlInfo = (state: State) => state.urlInfo;
export const getProductBaseUrl = (state: State) => state.productBaseUrl;
export const getStaticBaseUrl = (state: State) => state.staticBaseUrl;
export const getLinkBaseUrl = (state: State) => state.linkBaseUrl;
export const getLoadingState = (state: State) => state.loading;
export const getRegions = (state: State) => state.regions;
export const getCurrentLocation = (state: State) => state.currentLocation;
export const getSharedSession = (state: State) => state.sharedSession;
export const getRecentProducts = (state: State) => state.recentProducts;
export const get404Page = (state: State) => state.static404Page;
export const getIsTopBanner = (state: State) => state.isTopBanner;
export const getIsProductPage = (state: State) => state.isProductPage;
export const getPreventScrollTop = (state: State) => state.preventScrollTop;
