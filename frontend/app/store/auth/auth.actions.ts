import { Action } from '@ngrx/store';

/*
 Because the Categories collection is asynchronous, there need to be actions to handle
 each of the stages of the request.
 */
export const LOGIN = '[LOGIN] loging in';
export const LOGIN_FACEBOOK = '[LOGIN] logging in using facebook';
export const LOGIN_SUCCESS = '[LOGIN] successfully logged in';
export const LOGIN_FAILED = '[LOGIN] failed to login';

export const LOGOUT = '[LOGOUT] Logging out';
export const LOGOUT_SUCCESS = '[LOGOUT] successfully logged out';
export const LOGOUT_FAILED = '[LOGOUT] failed to log out';

export const FORGOT_PASSWORD = '[FORGOT PASSWORD] Forgot password';
export const FORGOT_PASSWORD_SUCCESS = '[FORGOT PASSWORD] successfully forgot password';
export const FORGOT_PASSWORD_FAILED = '[FORGOT PASSWORD] failed forgot password';

export const REFRESH_PAGE = '[AUTH] Refresh page';

export const RESET_AUTH_MSG_ERRORS = '[AUTH] Reset error messages';


export class Login implements Action {
    readonly type = LOGIN;
    constructor(public payload: any) { }
}

export class LoginFacebook implements Action {
    readonly type = LOGIN_FACEBOOK;
    constructor(public payload: any) { }
}

export class LoginFailed implements Action {
    readonly type = LOGIN_FAILED;

    constructor(public payload: any) {
    }
}
export class LoginSuccess implements Action {
    readonly type = LOGIN_SUCCESS;
    constructor(public payload: any) {
    }
}

export class Logout implements Action {
    readonly type = LOGOUT;
    constructor(public payload: any) { }
}

export class LogoutFailed implements Action {
    readonly type = LOGOUT_FAILED;
    constructor(public payload: any) {
    }
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
    LoginFacebook |
    Logout | LogoutFailed | LogoutSuccess |
    ForgotPassword | ForgotPasswordFailed | ForgotPasswordSuccess |
    RefreshPage | ResetAuthMsgErrors;

