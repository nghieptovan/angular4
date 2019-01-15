import * as recharge from './recharge.actions';

declare var $;
import {AppHelpers} from '../../app.helpers';
import * as _ from 'lodash';

export interface State {
    loaded: boolean;
    loading: boolean;
    isCartLoading: boolean;
    errorMessage: string;
    configs: Array<any>;
    provider: Array<any>;
    products: Array<any>;
    selectedType: any;
    selectedProvider: any;
    selectedProduct: string;
    selectedPayment: any;
    cartCreate: any;
    cartRequest: any;
    cartInfo: any;
    cartTotal: any;
    paymentMethods: Array<any>;
}

const initialState: State = {
    loaded: false,
    loading: false,
    isCartLoading: false,
    errorMessage: '',
    configs: [],
    provider: [],
    products: [],
    selectedType: 'phonecard',
    selectedProvider: {
        'label': 'VinaPhone',
        'value': recharge.DEFAULT_PHONECARD_PROVIDER,
        'img': ''
    },
    selectedProduct: '',
    cartCreate: {
        'reason': 'for_loading',
        'result': false
    },
    cartRequest: {
        'product_id': 0,
        'product_name': '',
        'product_qty': 1,
        'user_email': '',
        'user_phone_number': ''
    },
    cartInfo: {
        'product_id': 0,
        'product_name': '',
        'product_qty': 1,
        'user_email': '',
        'user_phone_number': ''
    },
    cartTotal: {
        'subtotal': 0,
        'discount_amount': 0,
        'coupon_code': '',
        'lpoint_amount': 0,
        'current_lpoint_available': 0,
        'grand_total': 0,
    },
    selectedPayment: {
        'payment_method': 'local_atm',
        'additional_data': {
            'credit_card_number': '',
            'credit_card_owner': '',
            'credit_card_month': '',
            'credit_card_year': '',
            'credit_card_ccv': '',
            'local_atm_bank': ''
        }
    },
    paymentMethods: []
};

export function reducer(state = initialState, action: recharge.RechargeActions): State {

    state.errorMessage = '';

    switch (action.type) {
        case recharge.LOAD_RECHARGE_CONFIG: {
            return Object.assign({}, state, {
                loading: true,
                loaded: false
            });
        }
        case recharge.LOAD_RECHARGE_CONFIG_SUCCESS: {
            return Object.assign({}, state, {
                loading: false,
                loaded: true,
                configs: action.payload.configs
            });
        }
        case recharge.LOAD_RECHARGE_CONFIG_FAILED: {
            return Object.assign({}, state, {
                loading: false,
                loaded: true,
                errorMessage: AppHelpers.getErrorMessage(action.payload)
            });
        }
        /*load product phonecard*/
        case recharge.LOAD_PRODUCT_RECHARGE: {
            return Object.assign({}, state, {
                loading: true,
                loaded: false
            });
        }
        case recharge.LOAD_PRODUCT_RECHARGE_SUCCESS: {
            return Object.assign({}, state, {
                loading: false,
                loaded: true,
                products: action.payload.products
            });
        }
        case recharge.LOAD_PRODUCT_RECHARGE_FAILED: {
            return Object.assign({}, state, {
                loading: false,
                loaded: true,
                errorMessage: AppHelpers.getErrorMessage(action.payload)
            });
        }

        /*load provider phonecard*/
        case recharge.LOAD_PROVIDER_RECHARGE: {
            return Object.assign({}, state, {
                loading: true,
                loaded: false
            });
        }
        case recharge.LOAD_PROVIDER_RECHARGE_SUCCESS: {
            return Object.assign({}, state, {
                loading: false,
                loaded: true,
                provider: action.payload.provider
            });
        }
        case recharge.LOAD_PROVIDER_RECHARGE_FAILED: {
            return Object.assign({}, state, {
                loading: false,
                loaded: true,
                provider: {},
                errorMessage: AppHelpers.getErrorMessage(action.payload)
            });
        }
        case recharge.SELECT_RECHARGE_TYPE: {
            return Object.assign({}, state, {
                selectedType: action.payload.selectedRechargeType
            });
        }
        case recharge.SELECT_PROVIDER: {
            return Object.assign({}, selectProvider(action.payload, state), {
                selectedProvider: action.payload.selectedProvider
            });
        }
        case recharge.SELECT_PRODUCT: {
            return Object.assign({}, state, {
                product_id: action.payload.product_id
            });
        }
        case recharge.UPDATE_CART_PRODUCT: {
            return Object.assign({}, state, {
                loading: true,
                loaded: false,
                cartRequest: action.payload.cartRequest
            });
        }

        case recharge.UPDATE_CART_PRODUCT_SUCCESS: {
            return Object.assign({}, setCartInfoTotal(action.payload, state), {
                loading: false,
                loaded: true,
                cartRequest: action.payload.cartInfo,
                cartInfo: action.payload.cartInfo
            });
        }

        case recharge.UPDATE_CART_PRODUCT_FAILED: {

            return Object.assign({}, state, {
                loading: false,
                loaded: true,
                errorMessage: AppHelpers.getErrorMessage(action.payload.error),
                cartRequest: action.payload.cartRequest
            });
        }

        case recharge.GET_CART: {
            return Object.assign({}, state, {
                loading: true,
                loaded: false
            });
        }

        case recharge.GET_CART_SUCCESS: {
            return Object.assign({}, setCartInfoTotal(action.payload, state), {
                loading: false,
                loaded: true
            });
        }

        case recharge.GET_CART_FAILED: {
            return Object.assign({}, state, {
                loading: false,
                loaded: true,
                errorMessage: AppHelpers.getErrorMessage(action.payload)
            });
        }

        case recharge.CREATE_CART: {
            return Object.assign({}, state, {
                loading: true,
                loaded: false,
                cartCreate: {'reason': action.payload, 'result': state.cartCreate.result}
            });
        }

        case recharge.CREATE_CART_SUCCESS: {
            return Object.assign({}, state, {
                loading: false,
                loaded: true,
                cartCreate: {'reason': state.cartCreate.reason, 'result': true}
            });
        }

        case recharge.CREATE_CART_FAILED: {
            return Object.assign({}, state, {
                loading: false,
                loaded: true,
                errorMessage: AppHelpers.getErrorMessage(action.payload)
            });
        }

        case recharge.CART_ADD_COUPON: {
            return Object.assign({}, state, {
                loaded: false,
                loading: true,
                coupon: action.payload,
            });
        }

        case recharge.CART_ADD_COUPON_FAILED: {
            return Object.assign({}, state, {
                loading: false,
                loaded: true,
                errorMessage: AppHelpers.getErrorMessage(action.payload),
                coupon: null
            });
        }

        case recharge.CART_ADD_COUPON_SUCCESS: {
            return Object.assign({}, setCartInfoTotal(action.payload, state), {
                loaded: true,
                loading: false
            });
        }

        case recharge.CART_SET_PAYMENT_METHOD: {
            return Object.assign({}, state, {
                loaded: false,
                loading: true
            });
        }

        case recharge.CART_SET_PAYMENT_METHOD_FAILED: {
            return Object.assign({}, state, {
                loading: false,
                loaded: true,
                errorMessage: AppHelpers.getErrorMessage(action.payload),
                selectedPayment: {
                    'payment_method': 'vietin_gateway',
                    'additional_data': {
                        'credit_card_number': '',
                        'credit_card_owner': '',
                        'credit_card_month': '',
                        'credit_card_year': '',
                        'credit_card_ccv': '',
                        'local_atm_bank': ''
                    }
                }
            });
        }

        case recharge.CART_SET_PAYMENT_METHOD_SUCCESS: {
            return Object.assign({}, setCartInfoTotal(action.payload, state), {
                loaded: true,
                loading: false
            });
        }

        case recharge.CART_GET_LPOINT: {
            return Object.assign({}, state, {
                loaded: false,
                loading: true,
            });
        }
        case recharge.CART_GET_LPOINT_SUCCESS: {
            return Object.assign({}, setCartInfoTotal(action.payload, state), {
                loaded: true,
                loading: false
            });
        }
        case recharge.CART_GET_LPOINT_FAILED: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                errorMessage: AppHelpers.getErrorMessage(action.payload)
            });
        }

        case recharge.CART_APPLY_LPOINT: {
            return Object.assign({}, state, {
                loaded: false,
                loading: true,
            });
        }
        case recharge.CART_APPLY_LPOINT_SUCCESS: {
            return Object.assign({}, setCartInfoTotal(action.payload, state), {
                loaded: true,
                loading: false
            });
        }
        case recharge.CART_APPLY_LPOINT_FAILED: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                errorMessage: AppHelpers.getErrorMessage(action.payload)
            });
        }


        case recharge.CART_DELETE_COUPON: {
            return Object.assign({}, state, {
                loaded: false,
                loading: true,
            });
        }
        case recharge.CART_DELETE_COUPON_SUCCESS: {
            return Object.assign({}, setCartInfoTotal(action.payload, state), {
                loaded: true,
                loading: false
            });
        }
        case recharge.CART_DELETE_COUPON_FAILED: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
            });
        }

        case recharge.CART_GET_PAYMENT_METHODS: {
            return Object.assign({}, state, {
                loaded: false,
                loading: true
            });
        }
        case recharge.CART_GET_PAYMENT_METHOD_FAILED: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false
            });
        }
        case recharge.CART_GET_PAYMENT_METHODS_SUCCESS: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                paymentMethods: action.payload
            });
        }

        case recharge.PLACE_ORDER: {
            return Object.assign({}, state, {
                loading: true,
                loaded: false
            });
        }

        case recharge.PLACE_ORDER_SUCCESS: {
            return Object.assign({}, state, {
                loading: false,
                loaded: true
            });
        }

        case recharge.PLACE_ORDER_FAILED: {
            return Object.assign({}, state, {
                loading: false,
                loaded: true,
                errorMessage: AppHelpers.getErrorMessage(action.payload)
            });
        }
        default:
            return state;
    }
}


function setCartInfoTotal(payload, state) {
    const cartTotal = payload.cartTotal;
    let lpointSegment = null;
    let currentLpointSegment = null;
    if (cartTotal.totals && cartTotal.totals.total_segments && cartTotal.totals.total_segments.length) {
        lpointSegment = _.find(cartTotal.totals.total_segments, (segment: any) => {
            return segment.code === 'lpoint';
        });
        currentLpointSegment = _.find(cartTotal.totals.total_segments, (segment: any) => {
            return segment.code === 'current_lpoint';
        });
    }
    const cartTotalSuccess = {
        'subtotal': cartTotal.totals.subtotal,
        'discount_amount': cartTotal.totals.discount_amount,
        'coupon_code': cartTotal.totals.coupon_code,
        'lpoint_amount': lpointSegment ? lpointSegment.value : state.cartTotal.lpoint_amount,
        'current_lpoint_available': currentLpointSegment ? currentLpointSegment.value : state.cartTotal.current_lpoint_available,
        'grand_total': cartTotal.totals.grand_total
    };

    const selectedPayment = state.selectedPayment;
    if (payload.paymentInfo) {
        selectedPayment.payment_method = payload.paymentInfo.payment_method;
    }
    return Object.assign({}, state, {
        cartTotal: cartTotalSuccess,
        selectedPayment: selectedPayment
    });
}

function selectProvider(payload, state) {

    const cartRequest = state.cartRequest;

    cartRequest.product_id = 0;

    return Object.assign({}, state, {
        cartRequest: cartRequest
    });
}


export const getLoadingState = (state: State) => state.loading || state.isCartLoading;
export const getConfigs = (state: State) => state.configs;
export const getErrorMessage = (state: State) => state.errorMessage;
export const getProviders = (state: State) => state.provider;
export const getProducts = (state: State) => state.products;

export const getSelectedType = (state: State) => state.selectedType;
export const getSelectedProvider = (state: State) => state.selectedProvider;
export const getSelectedProduct = (state: State) => state.selectedProduct;
export const getSelectedPayment = (state: State) => state.selectedPayment;

export const createCart = (state: State) => state.cartCreate;
export const getCartInfo = (state: State) => state.cartInfo;
export const getCartRequest = (state: State) => state.cartRequest;

export const getCartTotal = (state: State) => state.cartTotal;
export const getPaymentMethods = (state: State) => state.paymentMethods;
