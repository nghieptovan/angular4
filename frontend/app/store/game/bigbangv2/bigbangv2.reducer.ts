import * as _ from 'lodash';

import { AppConstants } from '../../../app.constant';
import * as bigbangv2 from './bigbangv2.actions';

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
    shareFB:{}
};

export function reducer(state = initialState, action: bigbangv2.BigBangV2Actions): State {
    switch (action.type) {
        case bigbangv2.LOAD_BIGBANGV2_HISTORY: {
            return Object.assign({}, state, {
                loading: true,

            });
        }
        case bigbangv2.LOAD_BIGBANGV2_HISTORY_SUCCESS: {
            return Object.assign({}, state, {
                loading: false,
                history:action.payload
            });
        }
        case bigbangv2.LOAD_BIGBANGV2_HISTORY_FAILED: {
            return Object.assign({}, state, {
                loading: false
            });
        }

        case bigbangv2.LOAD_BIGBANGV2_LOGIN: {
            return Object.assign({}, state, {
                loading: true,

            });
        }
        case bigbangv2.LOAD_BIGBANGV2_LOGIN_SUCCESS: {
            return Object.assign({}, state, {
                loading: false,
                login:action.payload
            });
        }
        case bigbangv2.LOAD_BIGBANGV2_LOGIN_FAILED: {
            return Object.assign({}, state, {
                loading: false
            });
        }

        case bigbangv2.LOAD_BIGBANGV2_OTP: {
            return Object.assign({}, state, {
                loading: true,

            });
        }
        case bigbangv2.LOAD_BIGBANGV2_OTP_SUCCESS: {
            return Object.assign({}, state, {
                loading: false,
                login:action.payload
            });
        }
        case bigbangv2.LOAD_BIGBANGV2_OTP_FAILED: {
            return Object.assign({}, state, {
                loading: false
            });
        }

        case bigbangv2.LOAD_BIGBANGV2_PLAYER_PROFILE: {
            return Object.assign({}, state, {
                loading: true,

            });
        }
        case bigbangv2.LOAD_BIGBANGV2_PLAYER_PROFILE_SUCCESS: {
            return Object.assign({}, state, {
                loading: false,
                profile:action.payload
            });
        }
        case bigbangv2.LOAD_BIGBANGV2_PLAYER_PROFILE_FAILED: {
            return Object.assign({}, state, {
                loading: false
            });
        }

        case bigbangv2.LOAD_BIGBANGV2_SETTINGS: {
            return Object.assign({}, state, {
                loading: true,

            });
        }
        case bigbangv2.LOAD_BIGBANGV2_SETTINGS_SUCCESS: {
            return Object.assign({}, state, {
                loading: false,
                settings:action.payload
            });
        }
        case bigbangv2.LOAD_BIGBANGV2_SETTINGS_FAILED: {
            return Object.assign({}, state, {
                loading: false,
                settings:action.payload
            });
        }

        case bigbangv2.BIGBANGV2_PLAY: {
            return Object.assign({}, state, {
                loading: true,

            });
        }
        case bigbangv2.BIGBANGV2_PLAY_SUCCESS: {
            return Object.assign({}, state, {
                loading: false,
                data:action.payload
            });
        }
        case bigbangv2.BIGBANGV2_PLAY_FAILED: {
            return Object.assign({}, state, {
                loading: false,
                data:action.payload
            });
        }

        case bigbangv2.BIGBANGV2_START: {
            return Object.assign({}, state, {
                loading: true,

            });
        }
        case bigbangv2.BIGBANGV2_START_SUCCESS: {
            return Object.assign({}, state, {
                loading: false,
                dataStart:action.payload
            });
        }
        case bigbangv2.BIGBANGV2_START_FAILED: {
            return Object.assign({}, state, {
                loading: false,
                dataStart:action.payload
            });
        }

        case bigbangv2.BIGBANGV2_FINISH: {
            return Object.assign({}, state, {
                loading: true,

            });
        }
        case bigbangv2.BIGBANGV2_FINISH_SUCCESS: {
            return Object.assign({}, state, {
                loading: false,
                dataFinish:action.payload
            });
        }
        case bigbangv2.BIGBANGV2_FINISH_FAILED: {
            return Object.assign({}, state, {
                loading: false,
                dataFinish:action.payload
            });
        }

        case bigbangv2.LOAD_BIGBANGV2_GIFTS: {
            return Object.assign({}, state, {
                loading: true,

            });
        }
        case bigbangv2.LOAD_BIGBANGV2_GIFTS_SUCCESS: {
            return Object.assign({}, state, {
                loading: false,
                gifts:action.payload
            });
        }
        case bigbangv2.LOAD_BIGBANGV2_GIFTS_FAILED: {
            return Object.assign({}, state, {
                loading: false
            });
        }

        case bigbangv2.LOAD_BIGBANGV2_RESULTS: {
            return Object.assign({}, state, {
                loading: true,

            });
        }
        case bigbangv2.LOAD_BIGBANGV2_RESULTS_SUCCESS: {
            return Object.assign({}, state, {
                loading: false,
                results:action.payload
            });
        }
        case bigbangv2.LOAD_BIGBANGV2_RESULTS_FAILED: {
            return Object.assign({}, state, {
                loading: false
            });
        }

        case bigbangv2.BIGBANGV2_SHARE_FB: {
            return Object.assign({}, state, {
                loading: true,

            });
        }
        case bigbangv2.BIGBANGV2_SHARE_FB_SUCCESS: {
            return Object.assign({}, state, {
                loading: false,
                profile:action.payload
            });
        }
        case bigbangv2.BIGBANGV2_SHARE_FB_FAILED: {
            return Object.assign({}, state, {
                loading: false,
                profile:action.payload
            });
        }

        default:
            return state;
    }
}

export const getBigBangV2History        = (state: State) => state.history;
export const getBigBangV2Login          = (state: State) => state.login;
export const getBigBangV2Otp            = (state: State) => state.otp;
export const getBigBangV2GameData       = (state: State) => state.data;
export const getBigBangV2GameDataStart  = (state: State) => state.dataStart;
export const getBigBangV2GameDataFinish = (state: State) => state.dataFinish;
export const getBigBangV2GameSettings   = (state: State) => state.settings;
export const getBigBangV2PlayerProfile  = (state: State) => state.profile;
export const getBigBangV2Gifts          = (state: State) => state.gifts;
export const getBigBangV2Results        = (state: State) => state.results;
export const getBigBangV2ShareFB        = (state: State) => state.profile;

