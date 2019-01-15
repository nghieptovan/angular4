import * as _ from 'lodash';

import { AppConstants } from '../../../app.constant';
import * as pigv1 from './pigv1.actions';

declare var $;
export interface State {
    loading: Boolean;
    history: any;
    login:any;
    otp:any;
    data:any;
    dataStart:any;
    dataFinish:any;
    settings:any;
    profile:any;
    gifts:any;
    results:any;
    shareFB:any;
    rankings:any;
    mineRanking:any;
    lpointInfo:any;
    remind:any;
}

const initialState: State = {
    loading: false,
    history: {},
    login:{},
    otp:{},
    data:{},
    dataStart:{},
    dataFinish:{},
    settings:{},
    profile:{},
    gifts:{},
    results:{},
    shareFB:{},
    rankings:{},
    mineRanking:{},
    lpointInfo:{},
    remind:{}
};

export function reducer(state = initialState, action: pigv1.PIGV1Actions): State {
    switch (action.type) {
        case pigv1.LOAD_PIGV1_HISTORY: {
            return Object.assign({}, state, {
                loading: true,

            });
        }
        case pigv1.LOAD_PIGV1_HISTORY_SUCCESS: {
            return Object.assign({}, state, {
                loading: false,
                history:action.payload
            });
        }
        case pigv1.LOAD_PIGV1_HISTORY_FAILED: {
            return Object.assign({}, state, {
                loading: false
            });
        }

        case pigv1.LOAD_PIGV1_LOGIN: {
            return Object.assign({}, state, {
                loading: true,

            });
        }
        case pigv1.LOAD_PIGV1_LOGIN_SUCCESS: {
            return Object.assign({}, state, {
                loading: false,
                login:action.payload
            });
        }
        case pigv1.LOAD_PIGV1_LOGIN_FAILED: {
            return Object.assign({}, state, {
                loading: false
            });
        }

        case pigv1.LOAD_PIGV1_OTP: {
            return Object.assign({}, state, {
                loading: true,

            });
        }
        case pigv1.LOAD_PIGV1_OTP_SUCCESS: {
            return Object.assign({}, state, {
                loading: false,
                login:action.payload
            });
        }
        case pigv1.LOAD_PIGV1_OTP_FAILED: {
            return Object.assign({}, state, {
                loading: false
            });
        }

        case pigv1.LOAD_PIGV1_PLAYER_PROFILE: {
            return Object.assign({}, state, {
                loading: true,

            });
        }
        case pigv1.LOAD_PIGV1_PLAYER_PROFILE_SUCCESS: {
            return Object.assign({}, state, {
                loading: false,
                profile:action.payload
            });
        }
        case pigv1.LOAD_PIGV1_PLAYER_PROFILE_FAILED: {
            return Object.assign({}, state, {
                loading: false
            });
        }

        case pigv1.LOAD_PIGV1_SETTINGS: {
            return Object.assign({}, state, {
                loading: true,

            });
        }
        case pigv1.LOAD_PIGV1_SETTINGS_SUCCESS: {
            return Object.assign({}, state, {
                loading: false,
                settings:action.payload
            });
        }
        case pigv1.LOAD_PIGV1_SETTINGS_FAILED: {
            return Object.assign({}, state, {
                loading: false,
                settings:action.payload
            });
        }

        case pigv1.PIGV1_PLAY: {
            return Object.assign({}, state, {
                loading: true,

            });
        }
        case pigv1.PIGV1_PLAY_SUCCESS: {
            return Object.assign({}, state, {
                loading: false,
                data:action.payload
            });
        }
        case pigv1.PIGV1_PLAY_FAILED: {
            return Object.assign({}, state, {
                loading: false,
                data:action.payload
            });
        }

        case pigv1.PIGV1_START: {
            return Object.assign({}, state, {
                loading: true,

            });
        }
        case pigv1.PIGV1_START_SUCCESS: {
            return Object.assign({}, state, {
                loading: false,
                dataStart:action.payload
            });
        }
        case pigv1.PIGV1_START_FAILED: {
            return Object.assign({}, state, {
                loading: false,
                dataStart:action.payload
            });
        }

        case pigv1.PIGV1_FINISH: {
            return Object.assign({}, state, {
                loading: true,

            });
        }
        case pigv1.PIGV1_FINISH_SUCCESS: {
            return Object.assign({}, state, {
                loading: false,
                dataFinish:action.payload
            });
        }
        case pigv1.PIGV1_FINISH_FAILED: {
            return Object.assign({}, state, {
                loading: false,
                dataFinish:action.payload
            });
        }

        case pigv1.LOAD_PIGV1_GIFTS: {
            return Object.assign({}, state, {
                loading: true,

            });
        }
        case pigv1.LOAD_PIGV1_GIFTS_SUCCESS: {
            return Object.assign({}, state, {
                loading: false,
                gifts:action.payload
            });
        }
        case pigv1.LOAD_PIGV1_GIFTS_FAILED: {
            return Object.assign({}, state, {
                loading: false
            });
        }

        case pigv1.LOAD_PIGV1_RESULTS: {
            return Object.assign({}, state, {
                loading: true,

            });
        }
        case pigv1.LOAD_PIGV1_RESULTS_SUCCESS: {
            return Object.assign({}, state, {
                loading: false,
                results:action.payload
            });
        }
        case pigv1.LOAD_PIGV1_RESULTS_FAILED: {
            return Object.assign({}, state, {
                loading: false
            });
        }

        case pigv1.LOAD_PIGV1_RANKING: {
            return Object.assign({}, state, {
                loading: true,

            });
        }
        case pigv1.LOAD_PIGV1_RANKING_SUCCESS: {
            return Object.assign({}, state, {
                loading: false,
                rankings:action.payload
            });
        }
        case pigv1.LOAD_PIGV1_RANKING_FAILED: {
            return Object.assign({}, state, {
                loading: false
            });
        }

        case pigv1.LOAD_PIGV1_MINE_RANKING: {
            return Object.assign({}, state, {
                loading: true,

            });
        }
        case pigv1.LOAD_PIGV1_MINE_RANKING_SUCCESS: {
            return Object.assign({}, state, {
                loading: false,
                mineRanking:action.payload
            });
        }
        case pigv1.LOAD_PIGV1_MINE_RANKING_FAILED: {
            return Object.assign({}, state, {
                loading: false
            });
        }

        case pigv1.PIGV1_SHARE_FB: {
            return Object.assign({}, state, {
                loading: true,

            });
        }
        case pigv1.PIGV1_SHARE_FB_SUCCESS: {
            return Object.assign({}, state, {
                loading: false,
                profile:action.payload
            });
        }
        case pigv1.PIGV1_SHARE_FB_FAILED: {
            return Object.assign({}, state, {
                loading: false,
                profile:action.payload
            });
        }

        case pigv1.PIGV1_LPOINT_INFO: {
            return Object.assign({}, state, {
                loading: true,

            });
        }
        case pigv1.PIGV1_LPOINT_INFO_SUCCESS: {
            return Object.assign({}, state, {
                loading: false,
                lpointInfo:action.payload
            });
        }
        case pigv1.PIGV1_LPOINT_INFO_FAILED: {
            return Object.assign({}, state, {
                loading: false,
                lpointInfo:action.payload
            });
        }

        case pigv1.PIGV1_REMIND_LPOINT_REWARD: {
            return Object.assign({}, state, {
                loading: true,

            });
        }
        case pigv1.PIGV1_REMIND_LPOINT_REWARD_SUCCESS: {
            return Object.assign({}, state, {
                loading: false,
                remind:action.payload
            });
        }
        case pigv1.PIGV1_REMIND_LPOINT_REWARD_FAILED: {
            return Object.assign({}, state, {
                loading: false,
            });
        }

        default:
            return state;
    }
}

export const getPigV1History        = (state: State) => state.history;
export const getPigV1Login          = (state: State) => state.login;
export const getPigV1Otp            = (state: State) => state.otp;
export const getPigV1GameData       = (state: State) => state.data;
export const getPigV1GameDataStart  = (state: State) => state.dataStart;
export const getPigV1GameDataFinish = (state: State) => state.dataFinish;
export const getPigV1GameSettings   = (state: State) => state.settings;
export const getPigV1PlayerProfile  = (state: State) => state.profile;
export const getPigV1Gifts          = (state: State) => state.gifts;
export const getPigV1Results        = (state: State) => state.results;
export const getPigV1Ranking        = (state: State) => state.rankings;
export const getPigV1MineRanking    = (state: State) => state.mineRanking;
export const getPigV1ShareFB        = (state: State) => state.profile;
export const getPigV1LpointInfo     = (state: State) => state.lpointInfo;

