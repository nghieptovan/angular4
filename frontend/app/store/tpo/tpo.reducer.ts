import * as tpo from './tpo.actions';

import * as _ from 'lodash';

export interface State {
    loaded: boolean;
    loading: boolean;
    requestBody: any;
    tpoGroups: Array<any>;
    tpoDetail: any;
    tpoProducts: any;
    tpoDashboardProducts: any;
    tpoProductsAlsoLike: any;
    blockContent: any;
    searchTpo: any;
}

const initialState: State = {
    loaded: false,
    loading: false,
    requestBody: {},
    tpoGroups: [],
    tpoDetail: {},
    tpoProducts: {},
    tpoDashboardProducts: {},
    tpoProductsAlsoLike: {},
    blockContent: {},
    searchTpo: {}
};

export function reducer(state = initialState, action: tpo.TpoGroup): State {
    switch (action.type) {

        case tpo.LOAD: {
            return Object.assign({}, state, {
                loading: true,
                loaded: false
            });
        }

        case tpo.LOAD_FAILED: {
            return Object.assign({}, state, {
                loading: false,
                loaded: true,
                tpoGroups: []
            });
        }

        case tpo.LOAD_SUCCESS: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                tpoGroups: action.payload.tpoGroups.data
            });
        }

        case tpo.LOAD_TPO_DETAILS: {
            return Object.assign({}, state, {
                loading: true,
                loaded: false
            });
        }

        case tpo.LOAD_TPO_DETAILS_FAILED: {
            return Object.assign({}, state, {
                loading: false,
                loaded: true,
                tpoDetail: {}
            });
        }

        case tpo.LOAD_TPO_DETAILS_SUCCESS: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                tpoDetail: action.payload.tpoDetail
            });
        }

        case tpo.LOAD_TPO_PRODUCTS: {
            return Object.assign({}, state, {
                loading: true,
                loaded: false
            });
        }

        case tpo.LOAD_TPO_PRODUCTS_FAILED: {
            return Object.assign({}, state, {
                loading: false,
                loaded: true,
                tpoProducts: {}
            });
        }

        case tpo.LOAD_TPO_PRODUCTS_SUCCESS: {
            const tpoProducts = state.tpoProducts;
            //[LT-646] huytt: change to use api on els
            if (tpoProducts.hits !== undefined) {
                // action.payload.tpoProducts.count += tpoProducts.hits.size();
                action.payload.tpoProducts.hits = tpoProducts.hits.concat(action.payload.tpoProducts.hits);
            }

            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                tpoProducts: action.payload.tpoProducts,
                requestBody: action.payload.requestBody
            });
        }

        case tpo.LOAD_TPO_DASHBOARD_PRODUCTS: {
            return Object.assign({}, state, {
                loading: true,
                loaded: false
            });
        }

        case tpo.LOAD_TPO_DASHBOARD_PRODUCTS_FAILED: {
            return Object.assign({}, state, {
                loading: false,
                loaded: true,
                tpoDashboardProducts: {}
            });
        }

        case tpo.LOAD_TPO_DASHBOARD_PRODUCTS_SUCCESS: {
            const tpoProducts = state.tpoDashboardProducts;
            if (tpoProducts.products !== undefined) {
                action.payload.tpoProducts.count += tpoProducts.count;
                action.payload.tpoProducts.products = tpoProducts.products.concat(action.payload.tpoProducts.products);
            }

            // console.log(tpoProducts.products, action.payload.tpoProducts);

            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                tpoDashboardProducts: action.payload.tpoProducts,
                requestBody: action.payload.requestBody
            });
        }


        case tpo.UPDATE_TPO_DETAIL_SOCIAL: {
            return Object.assign({}, state, {
            });
        }

        case tpo.UPDATE_TPO_DETAIL_SOCIAL_FAILED: {
            return Object.assign({}, state, {
            });
        }

        case tpo.UPDATE_TPO_DETAIL_SOCIAL_SUCCESS: {
            return Object.assign({}, state, {
            });
        }

        case tpo.LOAD_BLOCK: {
            return Object.assign({}, state, {
                loading: true,
                loaded: false
            });
        }

        case tpo.LOAD_BLOCK_FAILED: {
            return Object.assign({}, state, {
                loading: false,
                loaded: true,
                blockContent: {}
            });
        }

        case tpo.LOAD_BLOCK_SUCCESS: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                blockContent: action.payload.blockContent
            });
        }

        case tpo.GET_SEARCH_TPO: {
            return Object.assign({}, state, {});
        }

        case tpo.GET_SEARCH_TPO_FAILED: {
            return Object.assign({}, state, {});
        }

        case tpo.GET_SEARCH_TPO_SUCCESS: {
            return Object.assign({}, state, {
                searchTpo: action.payload
            });
        }

        // case tpo.LOAD_TPO_PRODUCT_ALSOLIKE: {
        //     return Object.assign({}, state, {
        //         loading: true,
        //         loaded: false
        //     });
        // }
        //
        // case tpo.LOAD_TPO_PRODUCT_ALSOLIKE_FAILED: {
        //     return Object.assign({}, state, {
        //         loading: false,
        //         loaded: true,
        //         tpoProductsAlsoLike: {}
        //     });
        // }
        //
        // case tpo.LOAD_TPO_PRODUCT_ALSOLIKE_SUCCESS: {
        //     return Object.assign({}, state, {
        //         loaded: true,
        //         loading: false,
        //         tpoProductsAlsoLike: action.payload.tpoProductsAlsoLike
        //     });
        // }

        default:
            return state;
    }

}

/*
 Selectors for the state that will be later
 used in the products-list component
 */

export const getTpoGroups = (state: State) => state.tpoGroups;
export const getTpoDetail = (state: State) => state.tpoDetail;
export const getTpoProducts = (state: State) => state.tpoProducts;
export const getTpoDashboardProducts = (state: State) => state.tpoDashboardProducts;
export const getTpoProductsAlsoLike = (state: State) => state.tpoProductsAlsoLike;
export const getRequestBody = (state: State) => state.requestBody;
export const getLoadingState = (state: State) => state.loading;
export const getContent = (state: State) => state.blockContent;
export const getSearchTpo = (state: State) => state.searchTpo;
