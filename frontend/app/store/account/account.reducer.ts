import { AppHelpers } from './../../app.helpers';
import * as account from './account.actions';
import * as _ from 'lodash';
import { LOAD_DETAIL_COMMENT_FAILED } from './account.actions';

export interface State {
    loaded: boolean;
    loading: boolean;
    info: any;
    wishlist: any;
    sharedWishlist: any;
    orders: any;
    orderDetail: any;
    orderTracking: any;
    lpoint: Number;
    errorMessage: String;
    isSubscribed: boolean;
    pendingRatings: any;
    ratedSellers: any;
    QAs: any;
    detailComment: any;
    historyLpoint: any;
    detailHistoryLpoint: any;
    updateLpoint: any;
    guestOrderTracking: any;
    updateInfoError: any;
}

const initialState: State = {
    loaded: false,
    loading: false,
    info: {},
    wishlist: [],
    sharedWishlist: [],
    orders: [],
    orderDetail: {},
    orderTracking: {},
    lpoint: 0,
    errorMessage: null,
    isSubscribed: false,
    pendingRatings: [],
    ratedSellers: [],
    QAs: [],
    detailComment: {},
    historyLpoint: {},
    detailHistoryLpoint: {},
    updateLpoint: {},
    guestOrderTracking: {},
    updateInfoError: null
};

export function reducer(state = initialState, action: account.AccountActions): State {
    switch (action.type) {

        case account.REGISTER: {
            return Object.assign({}, state, {
                loading: true,
                loaded: false
            });
        }

        case account.REGISTER_SUCCESS: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                isLoggedIn: true
            });
        }

        case account.REGISTER_FAILED: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                errorMessage: AppHelpers.getErrorMessage(action.payload)
            });
        }

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

        case account.LOAD_WISHLIST: {
            return Object.assign({}, state, {
                loading: true
            });
        }

        case account.LOAD_WISHLIST_SUCCESS: {
            const payload = action.payload;
            if (payload.id) {
                return Object.assign({}, state, {
                    loaded: true,
                    loading: false,
                    sharedWishlist: payload.wishlist
                });
            } else {
                return Object.assign({}, state, {
                    loaded: true,
                    loading: false,
                    wishlist: payload.wishlist
                });
            }

        }

        case account.LOAD_WISHLIST_FAILED: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false
            });
        }

        case account.UPDATE_WISHLIST: {
            return Object.assign({}, state, {
                loading: true
            });
        }

        case account.UPDATE_WISHLIST_SUCCESS: {
            const wishlist = action.payload;
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                wishlist: wishlist
            });
        }

        case account.UPDATE_WISHLIST_FAILED: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false
            });
        }

        case account.UPDATE_INFO: {
            return Object.assign({}, state, {
                loading: true
            });
        }

        case account.UPDATE_INFO_SUCCESS: {
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
            localStorage.removeItem('updatedUserInfo');
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                info: action.payload
            });
        }

        case account.UPDATE_INFO_FAILED: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                updateInfoError: action.payload
            });
        }

        case account.REFRESH_PAGE: {
            const info = JSON.parse(localStorage.getItem('userInfo'));
            return Object.assign({}, state, {
                info: info ? info : {},
                wishlist: []
            });
        }

        case account.WISHLIST_ADD_PRODUCT: {
            return Object.assign({}, state, {
                loaded: false,
                loading: true
            });
        }
        case account.WISHLIST_ADD_PRODUCT_FAILED: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false
            });
        }
        case account.WISHLIST_ADD_PRODUCT_SUCCESS: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false
            });
        }

        case account.WISHLIST_DELETE_PRODUCT: {
            return Object.assign({}, state, {
                loaded: false,
                loading: true
            });
        }
        case account.WISHLIST_DELETE_PRODUCT_FAILED: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false
            });
        }
        case account.WISHLIST_DELETE_PRODUCT_SUCCESS: {
            const wishlistProductId = action.payload;
            const wishlist = _.filter(state.wishlist, (item: any) => {
                return item.wishlist_item_id !== action.payload;
            });

            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                wishlist: wishlist
            });
        }

        case account.WISHLIST_SHARE_EMAIL: {
            return Object.assign({}, state, {
                loaded: false,
                loading: true
            });
        }
        case account.WISHLIST_SHARE_EMAIL_FAILED: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false
            });
        }
        case account.WISHLIST_SHARE_EMAIL_SUCCESS: {
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
export const getInfo = (state: State) => state.info;
export const getWishList = (state: State) => state.wishlist;
export const getSharedWishlist = (state: State) => state.sharedWishlist;
export const getOrders = (state: State) => state.orders;
export const getOrderDetail = (state: State) => state.orderDetail;
export const getOrderTracking = (state: State) => state.orderTracking;
export const getLPoint = (state: State) => state.lpoint;
export const getIsSubscribed = (state: State) => state.isSubscribed;
export const getRatingSellerPending = (state: State) => state.pendingRatings;
export const getRatedSeller = (state: State) => state.ratedSellers;
export const getQA = (state: State) => state.QAs;
export const getDetailComment = (state: State) => state.detailComment;
export const getLpointHistory = (state: State) => state.historyLpoint;
export const getDetailsLpointHistory = (state: State) => state.detailHistoryLpoint;
export const updateLpoint = (state: State) => state.updateLpoint;
export const getErrorMessage = (state: State) => state.errorMessage;
export const getGuestOrderTracking = (state: State) => state.guestOrderTracking;
