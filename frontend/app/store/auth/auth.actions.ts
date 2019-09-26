import { Action } from '@ngrx/store';

/*
 Because the Categories collection is asynchronous, there need to be actions to handle
 each of the stages of the request.
 */
export const LOGIN = '[LOGIN] loging in';
export const LOGIN_SUCCESS = '[LOGIN] successfully logged in';
export const LOGIN_FAILED = '[LOGIN] failed to login';

export const CURRENT_USER = '[USER] get current user';
export const CURRENT_USER_SUCCESS = '[USER] successfully get current user';

export const LOGOUT = '[LOGOUT] Logging out';
export const LOGOUT_SUCCESS = '[LOGOUT] successfully logged out';

export const FORGOT_PASSWORD = '[FORGOT PASSWORD] Forgot password';
export const FORGOT_PASSWORD_SUCCESS = '[FORGOT PASSWORD] successfully forgot password';
export const FORGOT_PASSWORD_FAILED = '[FORGOT PASSWORD] failed forgot password';

export const REFRESH_PAGE = '[AUTH] Refresh page';

export const RESET_AUTH_MSG_ERRORS = '[AUTH] Reset error messages';

export const GET_ACCOUNT_BY_ID = '[LOGIN] load account by Id';
export const GET_ACCOUNT_BY_ID_SUCCESS = '[LOGIN] successfully loaded account by Id';
export const GET_ACCOUNT_BY_ID_FAILED = '[LOGIN] failed to load account by Id';


export class GetCurrentUser implements Action {
    readonly type = CURRENT_USER;
    constructor() { }
}
export class GetCurrentUserSuccess implements Action {
    readonly type = CURRENT_USER_SUCCESS;
    constructor(public payload: any) {
    }
}

export class Login implements Action {
    readonly type = LOGIN;
    constructor(public payload: any) { }
}
export class LoginSuccess implements Action {
    readonly type = LOGIN_SUCCESS;
    constructor(public payload: any) {
    }
}
export class LoginFailed implements Action {
    readonly type = LOGIN_FAILED;

    constructor(public payload: any) {
    }
}



export class LoadAccountById implements Action {
    readonly type = GET_ACCOUNT_BY_ID;
    constructor(public payload: any) { }
}

export class LoadAccountByIdSuccess implements Action {
    readonly type = GET_ACCOUNT_BY_ID_SUCCESS;
    constructor(public payload: any) { }
}

export class LoadAccountByIdFailed implements Action {
    readonly type = GET_ACCOUNT_BY_ID_FAILED;

    constructor(public payload: any) {
    }
}


export class Logout implements Action {
    readonly type = LOGOUT;
    constructor() { }
}

export class LogoutSuccess implements Action {
    readonly type = LOGOUT_SUCCESS;
    constructor(public payload: any) {
    }
}

export class ForgotPassword implements Action {
    readonly type = FORGOT_PASSWORD;
    constructor(public payload: any) { }
}

export class ForgotPasswordFailed implements Action {
    readonly type = FORGOT_PASSWORD_FAILED;
    constructor(public payload: any) {
    }
}

export class ForgotPasswordSuccess implements Action {
    readonly type = FORGOT_PASSWORD_SUCCESS;
    constructor(public payload: any) {
    }
}

export class RefreshPage implements Action {
    readonly type = REFRESH_PAGE;
}

export class ResetAuthMsgErrors implements Action {
    readonly type = RESET_AUTH_MSG_ERRORS;
    constructor() {

    }
}

export type AuthActions =
    Login | LoginFailed | LoginSuccess |
    LoadAccountById | LoadAccountByIdFailed | LoadAccountByIdSuccess |
    Logout | LogoutSuccess |
    ForgotPassword | ForgotPasswordFailed | ForgotPasswordSuccess |
    RefreshPage | ResetAuthMsgErrors
     | GetCurrentUser | GetCurrentUserSuccess;

