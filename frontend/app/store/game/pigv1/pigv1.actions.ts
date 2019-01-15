import { Action } from '@ngrx/store';

export const LOAD_PIGV1_HISTORY = '[PIGV1] load HISTORY';
export const LOAD_PIGV1_HISTORY_SUCCESS = '[PIGV1] load HISTORY successfully';
export const LOAD_PIGV1_HISTORY_FAILED = '[PIGV1] load HISTORY failed';

export const LOAD_PIGV1_LOGIN = '[PIGV1] login';
export const LOAD_PIGV1_LOGIN_SUCCESS = '[PIGV1] login successfully';
export const LOAD_PIGV1_LOGIN_FAILED = '[PIGV1] login failed';

export const LOAD_PIGV1_OTP = '[PIGV1] otp';
export const LOAD_PIGV1_OTP_SUCCESS = '[PIGV1] otp successfully';
export const LOAD_PIGV1_OTP_FAILED = '[PIGV1] otp failed';

export const LOAD_PIGV1_SETTINGS = '[PIGV1] load settings';
export const LOAD_PIGV1_SETTINGS_SUCCESS = '[PIGV1] load settings successfully';
export const LOAD_PIGV1_SETTINGS_FAILED = '[PIGV1] load settings failed';

export const LOAD_PIGV1_PLAYER_PROFILE = '[PIGV1] load player profile';
export const LOAD_PIGV1_PLAYER_PROFILE_SUCCESS = '[PIGV1] load player profile successfully';
export const LOAD_PIGV1_PLAYER_PROFILE_FAILED = '[PIGV1] load player profile failed';

export const PIGV1_PLAY = '[PIGV1] play';
export const PIGV1_PLAY_SUCCESS = '[PIGV1] play successfully';
export const PIGV1_PLAY_FAILED = '[PIGV1] play failed';

export const PIGV1_START = '[PIGV1] start';
export const PIGV1_START_SUCCESS = '[PIGV1] start successfully';
export const PIGV1_START_FAILED = '[PIGV1] start failed';

export const PIGV1_FINISH = '[PIGV1] finish';
export const PIGV1_FINISH_SUCCESS = '[PIGV1] finish successfully';
export const PIGV1_FINISH_FAILED = '[PIGV1] finish failed';

export const LOAD_PIGV1_GIFTS = '[PIGV1] load GIFTS';
export const LOAD_PIGV1_GIFTS_SUCCESS = '[PIGV1] load GIFTS successfully';
export const LOAD_PIGV1_GIFTS_FAILED = '[PIGV1] load GIFTS failed';

export const LOAD_PIGV1_RESULTS = '[PIGV1] load RESULTS';
export const LOAD_PIGV1_RESULTS_SUCCESS = '[PIGV1] load RESULTS successfully';
export const LOAD_PIGV1_RESULTS_FAILED = '[PIGV1] load RESULTS failed';

export const LOAD_PIGV1_RANKING = '[PIGV1] load RANKING';
export const LOAD_PIGV1_RANKING_SUCCESS = '[PIGV1] load RANKING successfully';
export const LOAD_PIGV1_RANKING_FAILED = '[PIGV1] load RANKING failed';

export const LOAD_PIGV1_MINE_RANKING = '[PIGV1] load MINE RANKING';
export const LOAD_PIGV1_MINE_RANKING_SUCCESS = '[PIGV1] load MINE RANKING successfully';
export const LOAD_PIGV1_MINE_RANKING_FAILED = '[PIGV1] load MINE RANKING failed';

export const PIGV1_SHARE_FB = '[PIGV1] share fb';
export const PIGV1_SHARE_FB_SUCCESS = '[PIGV1] share fb successfully';
export const PIGV1_SHARE_FB_FAILED = '[PIGV1] share fb failed';

export const PIGV1_LPOINT_INFO = '[PIGV1] lpoint info';
export const PIGV1_LPOINT_INFO_SUCCESS = '[PIGV1] lpoint info successfully';
export const PIGV1_LPOINT_INFO_FAILED = '[PIGV1] lpoint info failed';

export const PIGV1_REMIND_LPOINT_REWARD = '[PIGV1] remind lpoint reward';
export const PIGV1_REMIND_LPOINT_REWARD_SUCCESS = '[PIGV1] remind lpoint reward successfully';
export const PIGV1_REMIND_LPOINT_REWARD_FAILED = '[PIGV1] remind lpoint reward failed';

export class LoadHistory implements Action {
    readonly type = LOAD_PIGV1_HISTORY;
    constructor(public payload: any) { }
}

export class LoadHistoryFailed implements Action {
    readonly type = LOAD_PIGV1_HISTORY_FAILED;
    constructor(public payload: any) {
    }
}

export class LoadHistorySuccess implements Action {
    readonly type = LOAD_PIGV1_HISTORY_SUCCESS;
    constructor(public payload: any) {
    }
}

export class LoadLogin implements Action {
    readonly type = LOAD_PIGV1_LOGIN;
    constructor(public payload: any) { }
}

export class LoadLoginFailed implements Action {
    readonly type = LOAD_PIGV1_LOGIN_FAILED;
    constructor(public payload: any) {
    }
}

export class LoadLoginSuccess implements Action {
    readonly type = LOAD_PIGV1_LOGIN_SUCCESS;
    constructor(public payload: any) {
    }
}

export class LoadOtp implements Action {
    readonly type = LOAD_PIGV1_OTP;
    constructor(public payload: any) { }
}

export class LoadOtpFailed implements Action {
    readonly type = LOAD_PIGV1_OTP_FAILED;
    constructor(public payload: any) {
    }
}

export class LoadOtpSuccess implements Action {
    readonly type = LOAD_PIGV1_OTP_SUCCESS;
    constructor(public payload: any) {
    }
}

export class LoadPlayerProfile implements Action {
    readonly type = LOAD_PIGV1_PLAYER_PROFILE;
    constructor(public payload: any) { }
}

export class LoadPlayerProfileFailed implements Action {
    readonly type = LOAD_PIGV1_PLAYER_PROFILE_FAILED;
    constructor(public payload: any) {
    }
}

export class LoadPlayerProfileSuccess implements Action {
    readonly type = LOAD_PIGV1_PLAYER_PROFILE_SUCCESS;
    constructor(public payload: any) {
    }
}
export class Play implements Action {
    readonly type = PIGV1_PLAY;
    constructor(public payload: any) { }
}

export class PlayFailed implements Action {
    readonly type = PIGV1_PLAY_FAILED;
    constructor(public payload: any) {
    }
}

export class PlaySuccess implements Action {
    readonly type = PIGV1_PLAY_SUCCESS;
    constructor(public payload: any) {
    }
}

export class Start implements Action {
    readonly type = PIGV1_START;
    constructor(public payload: any) { }
}

export class StartFailed implements Action {
    readonly type = PIGV1_START_FAILED;
    constructor(public payload: any) {
    }
}

export class StartSuccess implements Action {
    readonly type = PIGV1_START_SUCCESS;
    constructor(public payload: any) {
    }
}

export class Finish implements Action {
    readonly type = PIGV1_FINISH;
    constructor(public payload: any) { }
}

export class FinishFailed implements Action {
    readonly type = PIGV1_FINISH_FAILED;
    constructor(public payload: any) {
    }
}

export class FinishSuccess implements Action {
    readonly type = PIGV1_FINISH_SUCCESS;
    constructor(public payload: any) {
    }
}

export class LoadSettings implements Action {
    readonly type = LOAD_PIGV1_SETTINGS;
    constructor() { }
}

export class LoadSettingsFailed implements Action {
    readonly type = LOAD_PIGV1_SETTINGS_FAILED;
    constructor(public payload: any) {
    }
}

export class LoadSettingsSuccess implements Action {
    readonly type = LOAD_PIGV1_SETTINGS_SUCCESS;
    constructor(public payload: any) {
    }
}

export class LoadGifts implements Action {
    readonly type = LOAD_PIGV1_GIFTS;
    constructor() { }
}

export class LoadGiftsFailed implements Action {
    readonly type = LOAD_PIGV1_GIFTS_FAILED;
    constructor(public payload: any) {
    }
}

export class LoadGiftsSuccess implements Action {
    readonly type = LOAD_PIGV1_GIFTS_SUCCESS;
    constructor(public payload: any) {
    }
}

export class LoadResults implements Action {
    readonly type = LOAD_PIGV1_RESULTS;
    constructor(public payload: any) { }
}

export class LoadResultsFailed implements Action {
    readonly type = LOAD_PIGV1_RESULTS_FAILED;
    constructor(public payload: any) {
    }
}

export class LoadResultsSuccess implements Action {
    readonly type = LOAD_PIGV1_RESULTS_SUCCESS;
    constructor(public payload: any) {
    }
}

export class LoadRanking implements Action {
    readonly type = LOAD_PIGV1_RANKING;
    constructor(public payload: any) { }
}

export class LoadRankingFailed implements Action {
    readonly type = LOAD_PIGV1_RANKING_FAILED;
    constructor(public payload: any) {
    }
}

export class LoadRankingSuccess implements Action {
    readonly type = LOAD_PIGV1_RANKING_SUCCESS;
    constructor(public payload: any) {
    }
}

export class LoadMineRanking implements Action {
    readonly type = LOAD_PIGV1_MINE_RANKING;
    constructor(public payload: any) { }
}

export class LoadMineRankingFailed implements Action {
    readonly type = LOAD_PIGV1_MINE_RANKING_FAILED;
    constructor(public payload: any) {
    }
}

export class LoadMineRankingSuccess implements Action {
    readonly type = LOAD_PIGV1_MINE_RANKING_SUCCESS;
    constructor(public payload: any) {
    }
}

export class LoadShareFB implements Action {
    readonly type = PIGV1_SHARE_FB;
    constructor(public payload: any) { }
}

export class LoadShareFBFailed implements Action {
    readonly type = PIGV1_SHARE_FB_FAILED;
    constructor(public payload: any) {
    }
}

export class LoadShareFBSuccess implements Action {
    readonly type = PIGV1_SHARE_FB_SUCCESS;
    constructor(public payload: any) {
    }
}


export class LoadLpointInfo implements Action {
    readonly type = PIGV1_LPOINT_INFO;
    constructor(public payload: any) { }
}

export class LoadLpointInfoFailed implements Action {
    readonly type = PIGV1_LPOINT_INFO_FAILED;
    constructor(public payload: any) {
    }
}

export class LoadLpointInfoSuccess implements Action {
    readonly type = PIGV1_LPOINT_INFO_SUCCESS;
    constructor(public payload: any) {
    }
}


export class RemindLpointReward implements Action {
    readonly type = PIGV1_REMIND_LPOINT_REWARD;
    constructor(public payload: any) { }
}

export class RemindLpointRewardFailed implements Action {
    readonly type = PIGV1_REMIND_LPOINT_REWARD_FAILED;
    constructor(public payload: any) {
    }
}

export class RemindLpointRewardSuccess implements Action {
    readonly type = PIGV1_REMIND_LPOINT_REWARD_SUCCESS;
    constructor(public payload: any) {
    }
}
export type PIGV1Actions =
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
    LoadRanking          | LoadRankingFailed         | LoadRankingSuccess       |
    LoadMineRanking      | LoadMineRankingFailed     | LoadMineRankingSuccess   |
    LoadLpointInfo       | LoadLpointInfoFailed      | LoadLpointInfoSuccess    |
    RemindLpointReward   | RemindLpointRewardFailed  | RemindLpointRewardSuccess|
    LoadShareFB          | LoadShareFBFailed         | LoadShareFBSuccess

;
