import * as auth from './auth.actions';
import {LocalStorageManagement} from "../../components/base/LocalStorageManagement";
import {LocalStorageConstants} from "../../components/base/constants/LocalStorageConstants";

export interface State {
    loaded: boolean;
    loading: boolean;
    isLoggedIn: boolean;
    errorMessage: any;
}

const initialState: State = {
    loaded: false,
    loading: false,
    isLoggedIn: false,
    errorMessage: null
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

        case auth.LOGIN: {
            return Object.assign({}, state, {
                errorMessage: null,
                loading: true
            });
        }

        case auth.LOGIN_SUCCESS: {
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

        case auth.LOGIN_FAILED: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                isLoggedIn: false,
                errorMessage: action.payload.message
            });
        }

        case auth.LOGOUT: {
            return Object.assign({}, state, {
                loading: true
            });
        }

        case auth.LOGOUT_SUCCESS: {
            clearLocalStorage();
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                isLoggedIn: false
            });
        }

        case auth.LOGOUT_FAILED: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                isLoggedIn: true
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
    LocalStorageManagement.getInstance().clearExclude([LocalStorageConstants.KEY_USER_SHIPPING_ADDRESS, 'rememberEmail']);
}

/*
 Selectors for the state that will be later
 used in the categories-list component
 */
export const getLoadingState = (state: State) => state.loading;
export const getLoggedInState = (state: State) => state.isLoggedIn;
export const getErrorMessage = (state: State) => state.errorMessage;
