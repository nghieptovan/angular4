import { Action } from '@ngrx/store';

export const LOAD_BIGBANGV2_HISTORY = '[Bigbangv2] load HISTORY';
export const LOAD_BIGBANGV2_HISTORY_SUCCESS = '[Bigbangv2] load HISTORY successfully';
export const LOAD_BIGBANGV2_HISTORY_FAILED = '[Bigbangv2] load HISTORY failed';

export const LOAD_BIGBANGV2_LOGIN = '[Bigbangv2] login';
export const LOAD_BIGBANGV2_LOGIN_SUCCESS = '[Bigbangv2] login successfully';
export const LOAD_BIGBANGV2_LOGIN_FAILED = '[Bigbangv2] login failed';

export const LOAD_BIGBANGV2_OTP = '[Bigbangv2] otp';
export const LOAD_BIGBANGV2_OTP_SUCCESS = '[Bigbangv2] otp successfully';
export const LOAD_BIGBANGV2_OTP_FAILED = '[Bigbangv2] otp failed';

export const LOAD_BIGBANGV2_SETTINGS = '[Bigbangv2] load settings';
export const LOAD_BIGBANGV2_SETTINGS_SUCCESS = '[Bigbangv2] load settings successfully';
export const LOAD_BIGBANGV2_SETTINGS_FAILED = '[Bigbangv2] load settings failed';

export const LOAD_BIGBANGV2_PLAYER_PROFILE = '[Bigbangv2] load player profile';
export const LOAD_BIGBANGV2_PLAYER_PROFILE_SUCCESS = '[Bigbangv2] load player profile successfully';
export const LOAD_BIGBANGV2_PLAYER_PROFILE_FAILED = '[Bigbangv2] load player profile failed';

export const BIGBANGV2_PLAY = '[Bigbangv2] play';
export const BIGBANGV2_PLAY_SUCCESS = '[Bigbangv2] play successfully';
export const BIGBANGV2_PLAY_FAILED = '[Bigbangv2] play failed';

export const BIGBANGV2_START = '[Bigbangv2] start';
export const BIGBANGV2_START_SUCCESS = '[Bigbangv2] start successfully';
export const BIGBANGV2_START_FAILED = '[Bigbangv2] start failed';

export const BIGBANGV2_FINISH = '[Bigbangv2] finish';
export const BIGBANGV2_FINISH_SUCCESS = '[Bigbangv2] finish successfully';
export const BIGBANGV2_FINISH_FAILED = '[Bigbangv2] finish failed';

export const LOAD_BIGBANGV2_GIFTS = '[Bigbangv2] load GIFTS';
export const LOAD_BIGBANGV2_GIFTS_SUCCESS = '[Bigbangv2] load GIFTS successfully';
export const LOAD_BIGBANGV2_GIFTS_FAILED = '[Bigbangv2] load GIFTS failed';

export const LOAD_BIGBANGV2_RESULTS = '[Bigbangv2] load RESULTS';
export const LOAD_BIGBANGV2_RESULTS_SUCCESS = '[Bigbangv2] load RESULTS successfully';
export const LOAD_BIGBANGV2_RESULTS_FAILED = '[Bigbangv2] load RESULTS failed';

export const BIGBANGV2_SHARE_FB = '[Bigbangv2] share fb';
export const BIGBANGV2_SHARE_FB_SUCCESS = '[Bigbangv2] share fb successfully';
export const BIGBANGV2_SHARE_FB_FAILED = '[Bigbangv2] share fb failed';


export class LoadHistory implements Action {
    readonly type = LOAD_BIGBANGV2_HISTORY;
    constructor(public payload: any) { }
}

export class LoadHistoryFailed implements Action {
    readonly type = LOAD_BIGBANGV2_HISTORY_FAILED;
    constructor(public payload: any) {
    }
}

export class LoadHistorySuccess implements Action {
    readonly type = LOAD_BIGBANGV2_HISTORY_SUCCESS;
    constructor(public payload: any) {
    }
}

export class LoadLogin implements Action {
    readonly type = LOAD_BIGBANGV2_LOGIN;
    constructor(public payload: any) { }
}

export class LoadLoginFailed implements Action {
    readonly type = LOAD_BIGBANGV2_LOGIN_FAILED;
    constructor(public payload: any) {
    }
}

export class LoadLoginSuccess implements Action {
    readonly type = LOAD_BIGBANGV2_LOGIN_SUCCESS;
    constructor(public payload: any) {
    }
}

export class LoadOtp implements Action {
    readonly type = LOAD_BIGBANGV2_OTP;
    constructor(public payload: any) { }
}

export class LoadOtpFailed implements Action {
    readonly type = LOAD_BIGBANGV2_OTP_FAILED;
    constructor(public payload: any) {
    }
}

export class LoadOtpSuccess implements Action {
    readonly type = LOAD_BIGBANGV2_OTP_SUCCESS;
    constructor(public payload: any) {
    }
}

export class LoadPlayerProfile implements Action {
    readonly type = LOAD_BIGBANGV2_PLAYER_PROFILE;
    constructor(public payload: any) { }
}

export class LoadPlayerProfileFailed implements Action {
    readonly type = LOAD_BIGBANGV2_PLAYER_PROFILE_FAILED;
    constructor(public payload: any) {
    }
}

export class LoadPlayerProfileSuccess implements Action {
    readonly type = LOAD_BIGBANGV2_PLAYER_PROFILE_SUCCESS;
    constructor(public payload: any) {
    }
}
export class Play implements Action {
    readonly type = BIGBANGV2_PLAY;
    constructor(public payload: any) { }
}

export class PlayFailed implements Action {
    readonly type = BIGBANGV2_PLAY_FAILED;
    constructor(public payload: any) {
    }
}

export class PlaySuccess implements Action {
    readonly type = BIGBANGV2_PLAY_SUCCESS;
    constructor(public payload: any) {
    }
}

export class Start implements Action {
    readonly type = BIGBANGV2_START;
    constructor(public payload: any) { }
}

export class StartFailed implements Action {
    readonly type = BIGBANGV2_START_FAILED;
    constructor(public payload: any) {
    }
}

export class StartSuccess implements Action {
    readonly type = BIGBANGV2_START_SUCCESS;
    constructor(public payload: any) {
    }
}

export class Finish implements Action {
    readonly type = BIGBANGV2_FINISH;
    constructor(public payload: any) { }
}

export class FinishFailed implements Action {
    readonly type = BIGBANGV2_FINISH_FAILED;
    constructor(public payload: any) {
    }
}

export class FinishSuccess implements Action {
    readonly type = BIGBANGV2_FINISH_SUCCESS;
    constructor(public payload: any) {
    }
}

export class LoadSettings implements Action {
    readonly type = LOAD_BIGBANGV2_SETTINGS;
    constructor() { }
}

export class LoadSettingsFailed implements Action {
    readonly type = LOAD_BIGBANGV2_SETTINGS_FAILED;
    constructor(public payload: any) {
    }
}

export class LoadSettingsSuccess implements Action {
    readonly type = LOAD_BIGBANGV2_SETTINGS_SUCCESS;
    constructor(public payload: any) {
    }
}

export class LoadGifts implements Action {
    readonly type = LOAD_BIGBANGV2_GIFTS;
    constructor() { }
}

export class LoadGiftsFailed implements Action {
    readonly type = LOAD_BIGBANGV2_GIFTS_FAILED;
    constructor(public payload: any) {
    }
}

export class LoadGiftsSuccess implements Action {
    readonly type = LOAD_BIGBANGV2_GIFTS_SUCCESS;
    constructor(public payload: any) {
    }
}

export class LoadResults implements Action {
    readonly type = LOAD_BIGBANGV2_RESULTS;
    constructor(public payload: any) { }
}

export class LoadResultsFailed implements Action {
    readonly type = LOAD_BIGBANGV2_RESULTS_FAILED;
    constructor(public payload: any) {
    }
}

export class LoadResultsSuccess implements Action {
    readonly type = LOAD_BIGBANGV2_RESULTS_SUCCESS;
    constructor(public payload: any) {
    }
}

export class LoadShareFB implements Action {
    readonly type = BIGBANGV2_SHARE_FB;
    constructor(public payload: any) { }
}

export class LoadShareFBFailed implements Action {
    readonly type = BIGBANGV2_SHARE_FB_FAILED;
    constructor(public payload: any) {
    }
}

export class LoadShareFBSuccess implements Action {
    readonly type = BIGBANGV2_SHARE_FB_SUCCESS;
    constructor(public payload: any) {
    }
}
export type BigBangV2Actions =
    LoadHistory          | LoadHistoryFailed         | LoadHistorySuccess       |
    LoadLogin            | LoadLoginFailed           | LoadLoginSuccess         |
    LoadOtp              | LoadOtpFailed             | LoadOtpSuccess           |
    Play                 | PlayFailed                | PlaySuccess              |
    Start                | StartFailed               | StartSuccess             |
    Finish               | FinishFailed              | FinishSuccess            |
    LoadSettings         | LoadSettingsFailed        | LoadSettingsSuccess      |
    LoadPlayerProfile    | LoadPlayerProfileFailed   | LoadPlayerProfileSuccess |
    LoadGifts            | LoadGiftsFailed           | LoadGiftsSuccess         |
    LoadResults          | LoadResultsFailed         | LoadResultsSuccess       |
    LoadShareFB          | LoadShareFBFailed         | LoadShareFBSuccess

;
