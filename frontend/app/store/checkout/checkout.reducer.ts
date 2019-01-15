import * as _ from 'lodash';

import { AppHelpers } from '../../app.helpers';
import * as cart from './checkout.actions';
import {LocalStorageManagement} from "../../components/base/LocalStorageManagement";

export interface State {
    loaded: boolean;
    loading: boolean;
    isCartLoading: boolean;
    isShippingRuleLoading: boolean;
    count: number;
    requestCount: number;
    items: Array<any>;
    info: any;
    total: any;
    currentStep: number;
    shippingMethods: Array<any>;
    errorMessage: string;
    successMessage: string;
    coupon: string;
    paymentRules: any;
    cartRules: any;
    shippingVendors: Array<any>;
    freeshipping_html: string;
    shippingFee: Number;
    paymentMethods: Array<any>;
    cartLater:any;
    cartLaterId:any;
    cartLaterMessage:any;
    couponStatusMessage:any;
    cardNoValid: boolean
}

const initialState: State = {
    loaded: false,
    loading: false,
    isCartLoading: false,
    isShippingRuleLoading: false,
    count: 0,
    requestCount: 0,
    items: [],
    info: { items_count: 0, items_qty: 0 },
    total: { items_count: 0, items_qty: 0 },
    currentStep: 1,
    shippingMethods: [],
    errorMessage: '',
    successMessage: '',
    coupon: null,
    paymentRules: {
        bank_installment: [],
        banks: [],
        min_value: 3000000
    },
    cartRules: {
        shipping_data: {
            by_group: [],
            by_item: [],
        }
    },
    shippingVendors: [],
    freeshipping_html: '',
    shippingFee: 0,
    paymentMethods: [],
    cartLater:[],
    cartLaterId:'',
    cartLaterMessage:[],
    couponStatusMessage:'',
    cardNoValid: true
};

export function reducer(state = initialState, action: cart.CartActions): State {
    state.errorMessage = '';
    state.successMessage = '';

    switch (action.type) {

        // LOAD CART INFO
        case cart.CART_LOAD: {
            return Object.assign({}, state, {
                loading: true,
                isCartLoading: true,
                loaded: false
            });
        }

        case cart.CART_LOAD_SUCCESS: {
            const cartInfo = action.payload.cart_info;
            const cartTotal = action.payload.cart_totals;
            storeCartInfo(cartInfo, cartTotal);
            return Object.assign({}, state, {
                info: cartInfo,
                total: cartTotal,
                items: _.reverse(cartTotal.items),
                count: cartInfo.items_qty,
                requestCount: cartInfo.items_qty,
                shippingVendors: parseShippingVendors(state.cartRules, _.cloneDeep(cartTotal.items)),
                loading: false,
                isCartLoading: false,
                loaded: true
            });
        }

        case cart.CART_LOAD_FAILED: {
            return Object.assign({}, state, {
                count: 0,
                requestCount: 0,
                items: [],
                info: { items_count: 0, items_qty: 0 },
                total: { items_count: 0, items_qty: 0 },
                shippingMethods: [],
                loaded: true,
                isCartLoading: false,
                loading: state.isShippingRuleLoading
            });
        }

        // LOAD SHIPPING RULE
        case cart.CART_LOAD_SHIPPING_RULE: {
            return Object.assign({}, state, {
                loading: true,
                loaded: false,
                isShippingRuleLoading: true
            });
        }

        case cart.CART_LOAD_SHIPPING_RULE_SUCCESS: {
            if (action.payload.shipping_data && action.payload.shipping_data.by_group && action.payload.shipping_data.by_group.length) {
                localStorage.setItem('shipping_method_code', action.payload.shipping_data.by_group[0].rule);
                const maxShippingDuration = _.maxBy(action.payload.shipping_data.by_group, function (rule: any) {
                    return rule.duration_standard;
                });
                if (maxShippingDuration) {
                    localStorage.setItem('shipping_duration', maxShippingDuration.duration_standard);
                }
            }

            const shippingRules = {
                cartRules: action.payload,
                shippingVendors: parseShippingVendors(action.payload, _.cloneDeep(state.items)),
                shippingHtml: action.payload.freeshipping_update,
                shippingFee: action.payload.shipping_data.total_cart + action.payload.shipping_data.total_sdd_fee
            };

            storeCartShippingRule(shippingRules);

            return Object.assign({}, state, {
                cartRules: shippingRules.cartRules,
                shippingVendors: shippingRules.shippingVendors,
                freeshipping_html: shippingRules.shippingHtml,
                shippingFee: shippingRules.shippingFee,
                loading: state.isCartLoading,
                loaded: true,
                isShippingRuleLoading: false
            });
        }

        case cart.CART_LOAD_SHIPPING_RULE_FAILED: {
            return Object.assign({}, state, {
                loading: state.isCartLoading,
                loaded: true,
            });
        }

        // ADD A ITEM TO CART
        case cart.CART_ADD_ITEMS: {
            const requestCount = _.clone(state.requestCount) + 1;
            return Object.assign({}, state, {
                loading: true,
                loaded: false,
                requestCount: requestCount
            });
        }

        case cart.CART_ADD_ITEMS_SUCCESS: {
            const cartTotal = action.payload.cart_totals;
            const cartInfo = action.payload.cart_info;
            const items = cartTotal ? cartTotal.items : [];
            storeCartInfo(cartInfo, cartTotal);
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                items: _.reverse(items),
                info: cartInfo,
                total: cartTotal,
                count: cartInfo.items_qty,
                successMessage: 'successfully',
                shippingVendors: parseShippingVendors(state.cartRules, _.cloneDeep(items))
            });
        }

        case cart.CART_ADD_ITEMS_FAILED: {
            const requestCount = _.clone(state.requestCount) - 1;
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                errorMessage: AppHelpers.getErrorMessage(action.payload),
                requestCount: requestCount
            });
        }

        // CREATE EMPTY CART
        case cart.CART_CREATE: {
            return Object.assign({}, state, {
                loading: true,
                loaded: false,
                items: [],
            });
        }

        case cart.CART_CREATE_SUCCESS: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
            });
        }

        case cart.CART_CREATE_FAILED: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                items: [],
            });
        }

        // MERGE CART WHEN LOGGING IN
        case cart.CART_MERGE: {
            return Object.assign({}, state, {
                loading: true,
                loaded: false,
            });
        }

        case cart.CART_MERGE_SUCCESS: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false
            });
        }

        case cart.CART_MERGE_FAILED: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                errorMessage: action.payload
            });
        }

        case cart.CART_GET_SHIPPING_METHODS: {
            return Object.assign({}, state, {
                loading: true,
                loaded: false,
            });
        }

        case cart.CART_GET_SHIPPING_METHODS_SUCCESS: {
            return Object.assign({}, state, {
                loading: false,
                loaded: true,
            });
        }

        case cart.CART_GET_SHIPPING_METHODS_FAILED: {
            return Object.assign({}, state, {
                loading: false,
                loaded: true,
            });
        }

        // UPDATE CART SHIPPING INFO
        case cart.CART_UPDATE_SHIPPING_INFO: {
            return Object.assign({}, state, {
                loaded: false,
                loading: true,
            });
        }

        case cart.CART_UPDATE_SHIPPING_INFO_SUCCESS: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                paymentRules: {
                    bank_installment: [],
                    banks: [],
                    min_value: 3000000
                }
            });
        }

        case cart.CART_UPDATE_SHIPPING_INFO_FAILED: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                errorMessage: AppHelpers.getErrorMessage(action.payload)
            });
        }

        // UPDATE CART PAYMENT INFORMATION
        case cart.CART_UPDATE_PAYMENT_INFORMATION: {
            return Object.assign({}, state, {
                loaded: false,
                loading: true,
            });
        }

        case cart.CART_UPDATE_PAYMENT_INFORMATION_SUCCESS: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
            });
        }

        case cart.CART_UPDATE_PAYMENT_INFORMATION_FAILED: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                errorMessage: AppHelpers.getErrorMessage(action.payload)
            });
        }

        // UPDATE ITEM
        case cart.CART_UPDATE_ITEM: {
            return Object.assign({}, state, {
                loaded: false,
                loading: true,
            });
        }

        case cart.CART_UPDATE_ITEM_SUCCESS: {
            return Object.assign({}, setCartInfoTotal(action.payload, state), {
                loaded: true,
                loading: false
            });
        }

        case cart.CART_UPDATE_ITEM_FAILED: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                errorMessage: AppHelpers.getErrorMessage(action.payload)
            });
        }

        case cart.CART_DELETE_ITEM: {
            return Object.assign({}, state, {
                loaded: false,
                loading: true,
            });
        }

        case cart.CART_DELETE_ITEM_SUCCESS: {
            return Object.assign({}, setCartInfoTotal(action.payload, state), {
                loaded: true,
                loading: false
            });
        }

        case cart.CART_DELETE_ITEM_FAILED: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
            });
        }

        case cart.CART_DELETE_MULTIPLE_ITEMS: {
            return Object.assign({}, state, {
                loaded: false,
                loading: true,
            });
        }

        case cart.CART_DELETE_MULTIPLE_ITEMS_SUCCESS: {
            return Object.assign({}, setCartInfoTotal(action.payload, state), {
                loaded: true,
                loading: false
            });
        }

        case cart.CART_DELETE_MULTIPLE_ITEMS_FAILED: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
            });
        }

        // REFRESH CART
        case cart.CART_REFRESH: {
            const cart = JSON.parse(localStorage.getItem('cart'));
            const shippingRules = JSON.parse(localStorage.getItem('shippingRules'));

            if (cart) {
                const cartInfo = cart.info;
                const cartTotal = cart.total;
                const items = cartTotal.items;

                if (shippingRules) {
                    return Object.assign({}, state, {
                        info: cartInfo,
                        total: cartTotal,
                        items: _.reverse(items),
                        cartRules: shippingRules.cartRules,
                        shippingVendors: shippingRules.shippingVendors,
                        freeshipping_html: shippingRules.shippingHtml,
                        shippingFee: shippingRules.shippingFee,
                        count: cartInfo.items_qty,
                        requestCount: cartInfo.items_qty,
                    });
                } else {
                    return Object.assign({}, state, {
                        info: cartInfo,
                        total: cartTotal,
                        items: _.reverse(items),
                        count: cartInfo.items_qty,
                        requestCount: cartInfo.items_qty,
                    });
                }
            }

            return Object.assign({}, state, {
                count: 0,
                requestCount: 0,
                items: [],
                info: { items_count: 0, items_qty: 0 },
                total: { items_count: 0, items_qty: 0 },
                currentStep: 1
            });
        }

        case cart.CART_ADD_COUPON: {
            return Object.assign({}, state, {
                loaded: false,
                loading: true,
                coupon: action.payload,
            });
        }

        case cart.CART_ADD_COUPON_FAILED: {
            return Object.assign({}, state, {
                loading: false,
                loaded: true,
                errorMessage: AppHelpers.getErrorMessage(action.payload),
                couponStatusMessage:AppHelpers.getErrorMessage(action.payload),
                coupon: null
            });
        }

        case cart.CART_ADD_COUPON_SUCCESS: {
            return Object.assign({}, setCartInfoTotal(action.payload, state), {
                loaded: true,
                loading: false,
                couponStatusMessage:AppHelpers.getErrorMessage(action.payload.action),
            });
        }

        case cart.CART_GET_COUPON: {
            return Object.assign({}, state, {
                loaded: false,
                loading: true,
            });
        }
        case cart.CART_GET_COUPON_SUCCESS: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                coupon: action.payload,
            });
        }
        case cart.CART_GET_COUPON_FAILED: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
            });
        }

        case cart.CART_DELETE_COUPON: {
            return Object.assign({}, state, {
                loaded: false,
                loading: true,
            });
        }
        case cart.CART_DELETE_COUPON_SUCCESS: {
            return Object.assign({}, setCartInfoTotal(action.payload, state), {
                loaded: true,
                loading: false,
                coupon: null
            });
        }
        case cart.CART_DELETE_COUPON_FAILED: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
            });
        }

        // UPDATE CURRENT STEP IN CHECKOUT
        case cart.UPDATE_CURRENT_STEP: {
            state.currentStep = action.payload;
            return _.cloneDeep(state);
        }

        case cart.CART_GET_PAYMENT_RULES: {
            return Object.assign({}, state, {
                loaded: false,
                loading: true,
            });
        }

        case cart.CART_GET_PAYMENT_RULES_SUCCESS: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                paymentRules: action.payload
            });
        }

        case cart.CART_GET_PAYMENT_RULES_FAILED: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false
            });
        }

        case cart.SET_ERROR_MESSAGE: {
            state.errorMessage = action.payload;
            return _.cloneDeep(state);
        }

        case cart.CART_APPLY_LPOINT: {
            return Object.assign({}, state, {
                loaded: false,
                loading: true
            });
        }
        case cart.CART_APPLY_LPOINT_SUCCESS: {
            return Object.assign({}, setCartInfoTotal(action.payload, state), {
                loaded: true,
                loading: false
            });
        }
        case cart.CART_APPLY_LPOINT_FAILED: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                errorMessage: AppHelpers.getErrorMessage(action.payload)
            });
        }
        case cart.CART_CHECK_ORDER_STATUS: {
            return Object.assign({}, state, {
                loaded: false,
                loading: true
            });
        }
        case cart.CART_CHECK_ORDER_STATUS_SUCCESS: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false
            });
        }
        case cart.CART_CHECK_ORDER_STATUS_FAILED: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false
            });
        }

        case cart.CART_RECREATE: {
            return Object.assign({}, state, {
                loaded: false,
                loading: true
            });
        }
        case cart.CART_RECREATE_SUCCESS: {
            if (action.payload.guest_cart_id) {
                localStorage.setItem('cartId', action.payload.guest_cart_id);
            }

            return Object.assign({}, setCartInfoTotal(action.payload, state), {
                loaded: true,
                loading: false
            });
        }
        case cart.CART_RECREATE_FAILED: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false
            });
        }

        case cart.CART_SET_PAYMENT_METHOD: {
            return Object.assign({}, state, {
                loaded: false,
                loading: true
            });
        }
        case cart.CART_SET_PAYMENT_METHOD_SUCCESS: {
            return Object.assign({}, setCartInfoTotal(action.payload, state), {
                loaded: true,
                loading: false
            });
        }
        case cart.CART_SET_PAYMENT_METHOD_FAILED: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false
            });
        }

        case cart.CART_GET_PAYMENT_METHODS: {
            return Object.assign({}, state, {
                loaded: false,
                loading: true
            });
        }
        case cart.CART_GET_PAYMENT_METHOD_FAILED: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false
            });
        }
        case cart.CART_GET_PAYMENT_METHODS_SUCCESS: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                paymentMethods: action.payload
            });
        }

        case cart.CART_ADD_WISHLIST: {
            return Object.assign({}, state, {
                loaded: false,
                loading: true
            });
        }
        case cart.CART_ADD_WISHLIST_FAILED: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false
            });
        }
        case cart.CART_ADD_WISHLIST_SUCCESS: {
            return Object.assign({}, setCartInfoTotal(action.payload, state), {
                loaded: true,
                loading: false
            });
        }

        // CREATE EMPTY CART
        case cart.CART_LATER_CREATE: {
            return Object.assign({}, state, {
                loading: true,
                loaded: false
            });
        }
        case cart.CART_LATER_CREATE_SUCCESS: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                cartLaterId:action.payload
            });
        }
        case cart.CART_LATER_CREATE_FAILED: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false
            });
        }

        // Cart Later Load
        case cart.CART_LATER_LOAD: {
            return Object.assign({}, state, {
                loading: true,
                loaded: false
            });
        }
        case cart.CART_LATER_LOAD_SUCCESS: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                cartLater:action.payload
            });
        }
        case cart.CART_LATER_LOAD_FAILED: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false
            });
        }

        // ADD A ITEM TO CART
        case cart.CART_LATER_ADD_ITEM: {
            const requestCount = _.clone(state.requestCount) + 1;
            return Object.assign({}, state, {
                loading: true,
                loaded: false,
                requestCount: requestCount,
                cartLaterMessage:action.payload,
                cartLaterId:action.payload
            });
        }

        case cart.CART_LATER_ADD_ITEM_SUCCESS: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                cartLaterMessage:action.payload
            });
        }

        case cart.CART_LATER_ADD_ITEM_FAILED: {
            const requestCount = _.clone(state.requestCount) - 1;
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                cartLaterMessage:action.payload,
                errorMessage: AppHelpers.getErrorMessage(action.payload.message),
                requestCount: requestCount
            });
        }

        case cart.CART_VALIDATE_CARD_NO: {
            return Object.assign({}, state, {
                loading: true,
                loaded: false,
                cardNoValid:action.payload
            });
        }

        case cart.CART_VALIDATE_CARD_NO_SUCCESS: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                cardNoValid:action.payload
            });
        }

        case cart.CART_VALIDATE_CARD_NO_FAILED: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                cardNoValid:true
            });
        }

        case cart.CART_CLEAR_VALIDATE_CARD_NO: {
            return Object.assign({}, state, {
                cardNoValid:true
            });
        }

        default:
            return state;
    }

}

function parseShippingVendors(payload, items) {
    _.forEach(payload.shipping_data.by_group, (rule: any) => {
        rule.products = items.filter((p) => {
            // return rule.items.indexOf(p.item_id.toString()) > -1;
            return rule.items.find((item) => {
                return item.toString() === p.item_id.toString();
            });
        });
    });
    return payload.shipping_data;
}

function setCartInfoTotal(payload, state) {
    const cartTotal = payload.cart_totals;
    const cartInfo = payload.cart_info;
    const items = cartTotal ? cartTotal.items : [];
    storeCartInfo(cartInfo, cartTotal);
    return Object.assign({}, state, {
        items: _.reverse(items),
        info: cartInfo,
        total: cartTotal,
        count: cartInfo.items_qty,
        shippingVendors: parseShippingVendors(state.cartRules, _.cloneDeep(items)),
        requestCount: cartInfo.items_qty
    });
}
function storeCartInfo(cartInfo, cartTotal) {
    const cart = {
        info: cartInfo,
        total: cartTotal
    };
    localStorage.setItem('cart', JSON.stringify(cart));
}

function storeCartShippingRule(shippingRule) {
    localStorage.setItem('shippingRules', JSON.stringify(shippingRule));
}

export const getItems = (state: State) => state.items;
export const getItemsCount = (state: State) => state.count;
export const getRequestCount = (state: State) => state.requestCount;
export const getInfo = (state: State) => state.info;
export const getTotal = (state: State) => state.total;
export const getLoadingState = (state: State) => state.loading || state.isCartLoading;
export const getCurrentStep = (state: State) => state.currentStep;
export const getErrorMessage = (state: State) => state.errorMessage;
export const getSuccessMessage = (state: State) => state.successMessage;
export const getCouponCode = (state: State) => state.coupon;
export const getShippingVendors = (state: State) => state.shippingVendors;
export const getFreeshippingHtml = (state: State) => state.freeshipping_html;
export const getShippingFee = (state: State) => state.shippingFee;
export const getPaymentRules = (state: State) => state.paymentRules;
export const getPaymentMethods = (state: State) => state.paymentMethods;
export const getCartLater = (state: State) => state.cartLater;
export const createCartLater = (state: State) => state.cartLaterId;
export const cartLaterAddItem = (state: State) => state.cartLaterMessage;
export const getCouponStatusMessage = (state: State) => state.couponStatusMessage;
export const getCardNoValid = (state: State) => state.cardNoValid;
