import * as auth from './auth.actions';
// import {LocalStorageManagement} from "../../components/base/LocalStorageManagement";
// import {LocalStorageConstants} from "../../components/base/constants/LocalStorageConstants";

export interface State {
    loaded: boolean;
    loading: boolean;
    isLoggedIn: boolean;
    errorMessage: any;
    loginUser: any;
    loggedOut: number; 
    loggedIn: number; 
}

const initialState: State = {
    loaded: false,
    loading: false,
    isLoggedIn: false,
    errorMessage: null,
    loginUser: null,
    loggedOut: 0,
    loggedIn: 0
};

export function reducer(state = initialState, action: auth.AuthActions): State {
    switch (action.type) {

        case auth.GET_ACCOUNT_BY_ID: {
            return Object.assign({}, state, {
                errorMessage: null,
                loading: true
            });
        }

        case auth.GET_ACCOUNT_BY_ID_SUCCESS: {
            if(action.payload.code == 200)
                localStorage.setItem('employeeInfo', JSON.stringify(action.payload.data));
            else{
                localStorage.removeItem('employeeInfo');
            }
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                isLoggedIn: action.payload.code == 200 ? true : false,
                errorMessage: action.payload.message
            });
        }

        case auth.GET_ACCOUNT_BY_ID_FAILED: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                isLoggedIn: false,
                errorMessage: action.payload.message
            });
        }

        case auth.CURRENT_USER: {
            return Object.assign({}, state, {
                errorMessage: null,
                loading: true,
                loggedIn: 1
            });
        }

        case auth.CURRENT_USER_SUCCESS: {
            let { data, status } = action.payload;
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                isLoggedIn: status,
                loginUser: status ? data : null,
                loggedIn: status ? 2 : 3,
                errorMessage: null
            });
        }

        case auth.LOGIN: {
            return Object.assign({}, state, {
                errorMessage: null,
                loading: true,
                loggedIn: 1
            });
        }

        case auth.LOGOUT: {
            return Object.assign({}, state, {
                loggedOut: 1
            });
        }

        case auth.LOGIN_SUCCESS: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                isLoggedIn: true,
                loginUser: action.payload,
                errorMessage: null,
                loggedOut: 2,
                loggedIn: 2
            });
        }

        case auth.LOGIN_FAILED: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                isLoggedIn: false,
                loggedIn: 3,
                errorMessage: action.payload.message
            });
        }

        case auth.LOGOUT_SUCCESS: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                loginUser: null,
                isLoggedIn: false,
                loggedIn: 3
            });
        }

        case auth.FORGOT_PASSWORD: {
            return Object.assign( {}, state, {
                loading: false
            });
        }

        case auth.FORGOT_PASSWORD_SUCCESS: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                isLoggedIn: false
            });
        }

        case auth.FORGOT_PASSWORD_FAILED: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                isLoggedIn: false
            });
        }

        case auth.REFRESH_PAGE: {
            const token = localStorage.getItem('token');
            return Object.assign({}, state, {
                isLoggedIn: token ? true : false
            });
        }

        case auth.FORGOT_PASSWORD: {
            return Object.assign( {}, state, {
                loading: false
            });
        }

        case auth.FORGOT_PASSWORD_SUCCESS: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                isLoggedIn: false
            });
        }

        case auth.FORGOT_PASSWORD_FAILED: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                isLoggedIn: false
            });
        }

        case auth.RESET_AUTH_MSG_ERRORS: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                errorMessage: null
            });
        }
        default:
            return state;
    }
}

function clearLocalStorage() {
    // Keep local strorage save ship info.
    // LocalStorageManagement.getInstance().clearExclude([LocalStorageConstants.KEY_USER_SHIPPING_ADDRESS, 'rememberEmail']);
}

/*
 Selectors for the state that will be later
 used in the categories-list component
 */
export const getLoadingState = (state: State) => state.loading;
export const getLoggedInState = (state: State) => state.isLoggedIn;
export const getErrorMessage = (state: State) => state.errorMessage;
export const getLoginUser = (state: State) => state.loginUser;
export const getLoggedOut = (state: State) => state.loggedOut;
export const getLoggedIn = (state: State) => state.loggedIn;
