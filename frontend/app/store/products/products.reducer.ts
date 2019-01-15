import * as _ from 'lodash';

import * as products from './products.actions';
import {FacetTypeConstants} from "../../components/base/products/constants/FacetTypeConstants";
import {GlobalConstants} from "../../components/base/constants/GlobalConstants";

declare var $;
export interface State {
    loaded: boolean;
    loading: boolean;
    products: any;
    requestBody: any;

    details: any;
    recommend: Array<any>;
    sortBy: any;
    relatedProducts: Array<any>;
    searchResult: any;
    searchKeyword: any;
    shippingRules: any;
    expressShippingRules: any;
    reviews: any;
    searchSuggestion: any;
    searchSuggestionAll: any;
    searchHistory: any;
    searchCampaign: any;
    searchPending: boolean;
    hasOmni: boolean;
    hasBlink: boolean;
}

const initialState: State = {
    loaded: false,
    loading: false,
    products: {},
    requestBody: {},

    details: {},
    recommend: [],
    sortBy: 1,
    relatedProducts: [],
    searchResult: {},
    searchKeyword: '',
    shippingRules: null,
    expressShippingRules: null,
    reviews: {},
    searchSuggestion: {},
    searchSuggestionAll: {},
    searchHistory: [],
    searchCampaign: {},
    searchPending: false,
    hasOmni: false,
    hasBlink: false
};

export function reducer(state = initialState, action: products.ProductActions): State {
    switch (action.type) {

        case products.LOAD: {
            return Object.assign({}, state, {
                loading: true,
                loaded: false,
                searchPending: true
            });
        }

        case products.LOAD_FAILED: {
            return Object.assign({}, state, {
                loading: false,
                loaded: true,
                products: {}
            });
        }

        case products.LOAD_SUCCESS: {
            const products = getPages(action.payload.products);
            const requestBody = action.payload.requestBody;
            const facets = products.facets ? parseFacetsToArray(products.facets, requestBody) : {};
            facets.price = products.facets_stats ? products.facets_stats.price_default : null;
            let searchKeyword = null;
            if (requestBody.type === 'search') {
                searchKeyword = products.query;
            }

            products.facets = facets;
            products.hits = requestBody.params && requestBody.params.isViewMore?state.products.hits.concat(products.hits):products.hits;

            if (!searchKeyword) {
                return Object.assign({}, state, {
                    loaded: true,
                    loading: false,
                    products: products,
                    requestBody: requestBody,
                    searchPending: false
                });
            } else {
                return Object.assign({}, state, {
                    loaded: true,
                    loading: false,
                    products: products,
                    requestBody: requestBody,
                    searchKeyword: searchKeyword,
                    searchPending: false
                });
            }

        }

        case products.LOAD_PRODUCT_DETAILS: {
            return Object.assign({}, state, {
                details: {},
                loading: true,
                loaded: false
            });
        }

        case products.LOAD_PRODUCT_DETAILS_FAILED: {
            return Object.assign({}, state, {
                details: {},
                loaded: true,
                loading: false,
                searchPending: false
            });
        }

        case products.LOAD_PRODUCT_DETAILS_SUCCESS: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                details: action.payload
            });
        }

        case products.LOAD_PRODUCT_RELATED: {
            return Object.assign({}, state, {
                loading: true,
                loaded: false,
            });
        }

        case products.LOAD_PRODUCT_RELATED_FAILED: {
            return Object.assign({}, state, {
                loading: false,
                loaded: true,
            });
        }

        case products.LOAD_PRODUCT_RELATED_SUCCESS: {
            return Object.assign({}, state, {
                loading: false,
                loaded: true,
                relatedProducts: action.payload
            });
        }

        case products.SEARCH_PRODUCT: {
            return Object.assign({}, state, {

            });
        }

        case products.SEARCH_PRODUCT_FAILED: {
            return Object.assign({}, state, {

            });
        }

        case products.SEARCH_PRODUCT_SUCCESS: {
            const searchResult = action.payload[0].json();
            const searchSuggestion = action.payload[1].json();

            return Object.assign({}, state, {
                searchResult: searchResult,
                searchSuggestion: searchSuggestion
            });
        }

        case products.GET_SEARCH_SUGGESTION: {
            return Object.assign({}, state, {});
        }

        case products.GET_SEARCH_SUGGESTION_FAILED: {
            return Object.assign({}, state, {});
        }

        case products.GET_SEARCH_SUGGESTION_SUCCESS: {
            return Object.assign({}, state, {
                searchSuggestionAll: action.payload
            });
        }

        case products.GET_SEARCH_CAMPAIGN: {
            return Object.assign({}, state, {});
        }

        case products.GET_SEARCH_CAMPAIGN_FAILED: {
            return Object.assign({}, state, {});
        }

        case products.GET_SEARCH_CAMPAIGN_SUCCESS: {
            return Object.assign({}, state, {
                searchCampaign: action.payload
            });
        }

        case products.PRODUCT_LOAD_SHIPPING_RULE: {
            return Object.assign({}, state, {

            });
        }
        case products.PRODUCT_LOAD_SHIPPING_RULE_FAILED: {
            return Object.assign({}, state, {
                shippingRules: null
            });
        }
        case products.PRODUCT_LOAD_SHIPPING_RULE_SUCCESS: {
            return Object.assign({}, state, {
                shippingRules: normalizeShippingRules(action.payload)
            });
        }
        case products.PRODUCT_LOAD_EXPRESS_SHIPPING_RULE: {
            return Object.assign({}, state, {

            });
        }
        case products.PRODUCT_LOAD_EXPRESS_SHIPPING_RULE_FAILED: {
            return Object.assign({}, state, {
                expressShippingRules: null
            });
        }
        case products.PRODUCT_LOAD_EXPRESS_SHIPPING_RULE_SUCCESS: {
            return Object.assign({}, state, {
                expressShippingRules: action.payload
            });
        }
        case products.GET_PRODUCT_REVIEWS: {
            return Object.assign({}, state, {

            });
        }
        case products.GET_PRODUCT_REVIEWS_FAILED: {
            return Object.assign({}, state, {

            });
        }
        case products.GET_PRODUCT_REVIEWS_SUCCESS: {
            return Object.assign({}, state, {
                reviews: action.payload
            });
        }

        case products.REGISTER_STOCK_ALERT: {
            return Object.assign({}, state, {

            });
        }
        case products.REGISTER_STOCK_ALERT_SUCCESS: {
            return Object.assign({}, state, {

            });
        }
        case products.REGISTER_STOCK_ALERT_FAILED: {
            return Object.assign({}, state, {

            });
        }

        case products.RESET_PRODUCT_STATE: {
            return Object.assign({}, state, {
                products: {},
                requestBody: {}
            });
        }

        case products.RESET_PRODUCT_DETAIL_STATE: {
            return Object.assign({}, state, {
                details: {},
                requestBody: {}
            });
        }

        case products.CHECK_OMNI_BLINK: {
            const page = action.payload;
            return Object.assign({}, state, {
                loading: true,
            });
        }

        case products.CHECK_OMNI_BLINK_SUCCESS: {
            const facets = action.payload.facets;
            let hasOmni = false;
            let hasBlink = false;
            if(facets){
                if(facets.memberships){
                    _.forOwn(facets.memberships, (value, key:string) => {
                        if(key.toLowerCase().includes('lotte')) {
                            hasOmni = true;
                            return false;
                        }
                    });
                }

                if(facets.mkt_delivery_time){
                    _.forOwn(facets.mkt_delivery_time, (value, key:string) => {
                        if(GlobalConstants.SHIPPING_BLINK.indexOf(key) !== -1) {
                            hasBlink = true;
                            return false;
                        }
                    });
                }

            }
            return Object.assign({}, state, {
                loading: false,
                hasOmni: hasOmni,
                hasBlink: hasBlink
            });
        }

        case products.CHECK_OMNI_BLINK_FAILED: {
            return Object.assign({}, state, {
                loading: false,
                hasOmni: false,
                hasBlink: false
            });
        }

        default:
            return state;
    }

}

const normalizeShippingRules = (resp) => {
    const dom = $(resp.shipping_fee);
    dom.remove('script');
    resp.shipping_fee = dom.html();
    return resp;
};

const getPages = (products) => {
    const setPages = (min, max) => {
        const res = [];
        for (let i = min; i <= max; i++) {
            res.push(i);
        }
        return res;
    };

    products.pagesArray = [];
    if (!products.nbPages) {
        return products;
    }
    if (products.page < 3) {
        products.pagesArray = setPages(1, products.nbPages <= 5 ? products.nbPages : 5);
        return products;
    }
    if (products.page >= products.nbPages - 2) {
        if (products.nbPages >= 5) {
            products.pagesArray = setPages(products.nbPages - 4, products.nbPages);
        } else {
            products.pagesArray = setPages(1, products.nbPages);
        }
        return products;
    }
    products.pagesArray = setPages(products.page - 1, products.page + 3);
    return products;
};

const parseFacetsToArray = (facets, requestBody) => {

    const isInRqBody = (objValue, objKey) => {
        let result = false;
        if (!requestBody.params.facetFilters) {
            result = false;
            return result;
        }
        _.each(requestBody.params.facetFilters, (val) => {
            if (_.includes(val[Object.getOwnPropertyNames(val)[0]], objKey) && objValue === Object.getOwnPropertyNames(val)[0]) {
                result = true;
            }
        });

        return result;
    };

    _.forOwn(facets, (facetVal, facetKey) => {
        const arr = [];
        _.forOwn(facetVal, (value, key) => {
            let id = key;
            let name = value;
            // Array use for category, otherwise, use for brand, seller, search ...
            if(facetKey === FacetTypeConstants.FACET_TYPE_LEAF_CATEGORY){
                id = value.id;
                name = value.name;
            }
            const item = {
                name: id,
                value: name,
                isChecked: isInRqBody(facetKey, id)
            };
            arr.push(item);
        });

        facets[facetKey] = arr;
    });

    return facets;
};

/*
 Selectors for the state that will be later
 used in the products-list component
 */

export const getEntities = (state: State) => state.products;
export const getRequestBody = (state: State) => state.requestBody;
export const getRecommend = (state: State) => state.recommend;
export const getLoadingState = (state: State) => state.loading;
export const getDetails = (state: State) => state.details;
export const getRelatedProducts = (state: State) => state.relatedProducts;
export const getSearchResult = (state: State) => state.searchResult;
export const getSearchKeyword = (state: State) => state.searchKeyword;
export const getShippingRules = (state: State) => state.shippingRules;
export const getExpressShippingRules = (state: State) => state.expressShippingRules;
export const getReviews = (state: State) => state.reviews;
export const getSearchSuggestion = (state: State) => state.searchSuggestion;
export const getSearchCampaign = (state: State) => state.searchCampaign;
export const getSearchSuggestionAll = (state: State) => state.searchSuggestionAll;
export const getSearchPending = (state: State) => state.searchPending;
export const getHasOmni = (state: State) => state.hasOmni;
export const getHasBlink = (state: State) => state.hasBlink;
