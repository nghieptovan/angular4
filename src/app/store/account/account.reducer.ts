import { AppHelpers } from './../../app.helpers';
import * as account from './account.actions';
import * as _ from 'lodash';
import { LOAD_DETAIL_COMMENT_FAILED } from './account.actions';
import { GlobalService } from '../../services/global.service';
import { AppConstants } from '../../app.constant';

export interface State {
    loaded: boolean;
    loading: boolean;
    accountInfo: any;
    createAccount: any;
    deleteAccount: any;
    updateAccount: any;
    configJSON: any;
}

const initialState: State = {
    loaded: false,
    loading: false,
    accountInfo: null,
    createAccount: null,
    deleteAccount: null,
    updateAccount: null,
    configJSON: null
};

export function reducer(state = initialState, action: account.AccountActions): State {
    switch (action.type) {

        case account.LOAD_JSON_CONFIG_SUCCESS: {
            let useConfig = AppConstants.USE_CONFIG_TEXT;
            let config = action.payload;

            // console.log(action.payload);
            if(!useConfig){
                _.forOwn(config, (value, key) => {
                    _.forOwn(value, (val, k) => {
                        value[k] = k;
                    });
                });
            }
            //    console.log(config);
            AppConstants.CONFIG_DATA = config;
            return Object.assign({}, state, {
                configJSON: config
            });
        }


        case account.LIST_ACCOUNT: {
            return Object.assign({}, state, {
                loading: true,
                loaded: false,
                accountInfo: null
            });
        }

        case account.LIST_ACCOUNT_SUCCESS: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                accountInfo: action.payload
            });
        }

        case account.LIST_ACCOUNT_FAILED: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                accountInfo: null,
                errorMessage: AppHelpers.getErrorMessage(action.payload)
            });
        }

        case account.REGISTER: {
            return Object.assign({}, state, {
                loading: true,
                loaded: false,
                createAccount: null
            });
        }

        case account.REGISTER_SUCCESS: {
            let accountInfo = state.accountInfo;
            let newAccount = action.payload.data;
            newAccount.role = getRole(newAccount.role_id);

            if(action.payload.code == 200){
                
                accountInfo.data = [...accountInfo.data, newAccount];
            }
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                createAccount: action.payload,
                accountInfo: accountInfo,
                isLoggedIn: true
            });
        }

        case account.REGISTER_FAILED: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                createAccount: null,
                errorMessage: AppHelpers.getErrorMessage(action.payload)
            });
        }

        case account.DELETE_ACCOUNT: {
            return Object.assign({}, state, {
                loading: true,
                loaded: false,
                deleteAccount: null
            });
        }

        case account.DELETE_ACCOUNT_SUCCESS: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                deleteAccount: action.payload
            });
        }

        case account.DELETE_ACCOUNT_FAILED: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                deleteAccount: null,
                errorMessage: AppHelpers.getErrorMessage(action.payload)
            });
        }


        case account.UPDATE_INFO: {
            return Object.assign({}, state, {
                loading: true,
                updateAccount: null
            });
        }

        case account.UPDATE_INFO_SUCCESS: {
            let employeeInfo = JSON.parse(localStorage.getItem('employeeInfo'));
            let accountInfo = state.accountInfo;
            if(action.payload.code == 200){                
                accountInfo.data.forEach((item, index) => {
                    if(item.id == action.payload.data.id){
                        
                        accountInfo.data[index] = action.payload.data;
                        
                        accountInfo.data[index].role = getRole(action.payload.data.role_id);
                    }
                });    
                localStorage.setItem('employeeInfo', JSON.stringify(action.payload.data));

            }
            
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                accountInfo: accountInfo,
                updateAccount: action.payload
            });
        }

        case account.UPDATE_INFO_FAILED: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                updateAccount: null,
                errorMessage: AppHelpers.getErrorMessage(action.payload)
            });
        }

        //end of pm

        case account.RESET_PASSWORD: {
            return Object.assign({}, state, {
                loading: true,
                loaded: false
            });
        }

        case account.RESET_PASSWORD_SUCCESS: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
            });
        }

        case account.RESET_PASSWORD_FAILED: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                errorMessage: AppHelpers.getErrorMessage(action.payload)
            });
        }

        case account.LOAD_INFO: {
            return Object.assign({}, state, {
                // loading: true
            });
        }

        case account.LOAD_INFO_SUCCESS: {
            const info = action.payload;
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                info: info
            });
        }

        case account.LOAD_INFO_FAILED: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false
            });
        }

        case account.LOAD_ORDERS: {
            return Object.assign({}, state, {
                loaded: false,
                loading: true
            });
        }

        case account.LOAD_ORDERS_SUCCESS: {
            let orders = action.payload;
            orders = getPages(orders);
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                orders: orders
            });
        }

        case account.LOAD_ORDERS_FAILED: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false
            });
        }

        case account.LOAD_ORDER_BY_ID: {
            return Object.assign({}, state, {
                loaded: false,
                loading: true
            });
        }

        case account.LOAD_ORDER_BY_ID_SUCCESS: {
            const order = action.payload;
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                orderDetail: order
            });
        }

        case account.LOAD_ORDER_BY_ID_FAILED: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false
            });
        }

        case account.LOAD_ORDER_TRACKING: {
            return Object.assign({}, state, {
                orderTracking: {},
                loaded: false,
                loading: true
            });
        }

        case account.LOAD_ORDER_TRACKING_SUCCESS: {
            const order = action.payload;
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                orderTracking: order
            });
        }

        case account.LOAD_ORDER_TRACKING_FAILED: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                orderTracking: {}
            });
        }

        case account.CANCEL_ORDER: {
            return Object.assign({}, state, {
                loaded: false,
                loading: true
            });
        }

        case account.CANCEL_ORDER_SUCCESS: {
            const orders = action.payload;
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                orders: orders
            });
        }

        case account.CANCEL_ORDER_FAILED: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false
            });
        }

        case account.GET_LPOINT: {
            return Object.assign({}, state, {
                loaded: false,
                loading: true
            });
        }
        case account.GET_LPOINT_SUCCESS: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                lpoint: parseInt(action.payload, 10)
            });
        }
        case account.GET_LPOINT_FAILED: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
            });
        }

        case account.CHECK_SUBSCRIPTION_STATUS: {
            return Object.assign({}, state, {});
        }
        case account.CHECK_SUBSCRIPTION_STATUS_FAILED: {
            return Object.assign({}, state, {});
        }
        case account.CHECK_SUBSCRIPTION_STATUS_SUCCESS: {
            return Object.assign({}, state, {
                isSubscribed: action.payload
            });
        }

        case account.SUBSCRIBE: {
            return Object.assign({}, state, {});
        }
        case account.SUBSCRIBE_FAILED: {
            return Object.assign({}, state, {});
        }
        case account.SUBSCRIBE_SUCCESS: {
            return Object.assign({}, state, {
                isSubscribed: true
            });
        }

        case account.UNSUBSCRIBE: {
            return Object.assign({}, state, {});
        }
        case account.UNSUBSCRIBE_FAILED: {
            return Object.assign({}, state, {});
        }
        case account.UNSUBSCRIBE_SUCCESS: {
            return Object.assign({}, state, {
                isSubscribed: false
            });
        }
        case account.LOAD_RATING_SELLER_PENDING: {
            return Object.assign({}, state, {
                loaded: false,
                loading: true
            });
        }
        case account.LOAD_RATING_SELLER_PENDING_SUCCESS: {
            const ratings = action.payload;
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                pendingRatings: ratings
            });
        }
        case account.LOAD_RATING_SELLER_PENDING_FAILED: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false
            });
        }
        case account.LOAD_RATING_SELLER: {
            return Object.assign({}, state, {
                loaded: false,
                loading: true
            });
        }
        case account.LOAD_RATING_SELLER_SUCCESS: {
            const ratings = action.payload;
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                ratedSellers: ratings
            });
        }
        case account.LOAD_RATING_SELLER_FAILED: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false
            });
        }

        case account.SUBMIT_RATING_SELLER: {
            return Object.assign({}, state, {});
        }

        case account.SUBMIT_RATING_SELLER_FAILED: {
            return Object.assign({}, state, {});
        }

        case account.SUBMIT_RATING_SELLER_SUCCESS: {
            return Object.assign({}, state, {
                loaded: false,
                loading: true
            });
        }

        case account.LOAD_QA: {
            return Object.assign({}, state, {
                loaded: false,
                loading: true
            });
        }
        case account.LOAD_QA_SUCCESS: {
            const payload = action.payload;
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                QAs: payload
            });
        }
        case account.LOAD_QA_FAILED: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false
            });
        }

        case account.LOAD_DETAIL_COMMENT: {
            return Object.assign({}, state, {
                loaded: false,
                loading: true
            });
        }

        case account.LOAD_DETAIL_COMMENT_SUCCESS: {
            const result = action.payload;
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                detailComment: result.reviews[0]
            });
        }
        case account.LOAD_DETAIL_COMMENT_FAILED: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false
            });
        }

        case account.LOAD_LPOINT_HISTORY: {
            return Object.assign({}, state, {
                loaded: false,
                loading: true
            });
        }
        case account.LOAD_LPOINT_HISTORY_SUCCESS: {
            const result = action.payload;
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                historyLpoint: result
            });
        }
        case account.LOAD_LPOINT_HISTORY_FAILED: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false
            });
        }

        case account.LOAD_DETAIL_LPOINT_HISTORY: {
            return Object.assign({}, state, {
                loaded: false,
                loading: true
            });
        }
        case account.LOAD_DETAIL_LPOINT_HISTORY_SUCCESS: {
            const result = action.payload;
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                detailHistoryLpoint: result
            });
        }
        case account.LOAD_DETAIL_LPOINT_HISTORY_FAILED: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false
            });
        }
        case account.UPDATE_LPOINT: {
            return Object.assign({}, state, {
                loaded: false,
                loading: true
            });
        }
        case account.UPDATE_LPOINT_SUCCESS: {
            const result = action.payload;
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                updateLpoint: result
            });
        }
        case account.UPDATE_LPOINT_FAILED: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false
            });
        }

        case account.GUEST_ORDER_TRACKING: {
            return Object.assign({}, state, {
                loaded: false,
                loading: true
            });
        }

        case account.GUEST_ORDER_TRACKING_SUCCESS: {
            const order = action.payload;
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                guestOrderTracking: order
            });
        }

        case account.GUEST_ORDER_TRACKING_FAILED: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false
            });
        }

        case account.RESET_ACCOUNT_MSG_ERRORS: {
            return Object.assign({}, state, {
                errorMessage: null
            });
        }
        default:
            return state;
    }
}

function getRole(id) {
    switch (id) {
        case 1:
            return {
                code: "adm",
                created_at: null,
                id: 1,
                name: "Admin",
                updated_at: null
            };
        case 2:
            return {
                code: "tt",
                created_at: null,
                id: 2,
                name: "Tiếp tân",
                updated_at: null
            };
        case 3:
            return {
                code: "bs",
                created_at: null,
                id: 3,
                name: "Bác sỹ",
                updated_at: null
            };
        case 4:
            return {
                code: "bs",
                created_at: null,
                id: 4,
                name: "Phát thuốc",
                updated_at: null
            };
        default:
            break;
    }
    return;
}

const getPages = (orders) => {
    const setPages = (min, max) => {
        const res = [];
        for (let i = min; i <= max; i++) {
            res.push(i);
        }
        return res;
    };

    orders.pagesArray = [];
    if (!orders.page_count) {
        return orders;
    }
    if (orders.current_page < 3) {
        orders.pagesArray = setPages(1, orders.page_count <= 5 ? orders.page_count : 5);
        return orders;
    }
    if (orders.current_page >= orders.page_count - 2) {
        if (orders.page_count >= 5) {
            orders.pagesArray = setPages(orders.page_count - 4, orders.page_count);
        } else {
            orders.pagesArray = setPages(1, orders.page_count);
        }
        return orders;
    }
    orders.pagesArray = setPages(orders.current_page - 1, orders.current_page + 3);
    return orders;
};

/*
Selectors for the state that will be later
used in the categories-list component
*/
export const getLoadingState = (state: State) => state.loading;
export const getAccountInfo = (state: State) => state.accountInfo;
export const getCreateAccount = (state: State) => state.createAccount;
export const getDeleteAccount = (state: State) => state.deleteAccount;
export const getUpdateAccount = (state: State) => state.updateAccount;
export const getConfigJSON = (state: State) => state.configJSON;


