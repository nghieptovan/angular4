import * as _ from 'lodash';

import { AppConstants } from '../../app.constant';
import * as vendor from './vendor.actions';
declare var $;

export interface State {
    loaded: boolean;
    loading: boolean;
    entity: any;
    landing_setting: any;

}

const initialState: State = {
    loaded: false,
    loading: false,
    entity: null,
    landing_setting: null
};

export function reducer(state = initialState, action: vendor.VendorActions): State {
    switch (action.type) {

        case vendor.LOAD: {
            return Object.assign({}, state, {
                loading: true,
                loaded: false
            });
        }

        case vendor.LOAD_SUCCESS: {
            return Object.assign({}, state, {
                loading: false,
                loaded: true,
                entity: action.payload.vendor,
            });
        }

        case vendor.LOAD_FAILED: {
            return Object.assign({}, state, {
                loading: false,
                loaded: false,
                entity: null
            });
        }

        case vendor.LOAD_LANDING_SETTING: {
            return Object.assign({}, state, {
                loading: true,
                loaded: false
            });
        }

        case vendor.LOAD_LANDING_SETTING_SUCCESS: {
            return Object.assign({}, state, {
                loading: false,
                loaded: true,
                landing_setting: action.payload.landing_setting,
            });
        }

        case vendor.LOAD_LANDING_SETTING_FAILED: {
            return Object.assign({}, state, {
                loading: false,
                loaded: false,
                entity: null
            });
        }

        case vendor.CLEAR_STAGE: {
            return Object.assign({}, state, {
                loading: false,
                loaded: false,
                entity: null,
                landing_setting: null
            });
        }

        default:
            return state;
    }
}

/*
 Selectors for the state that will be later
 used in the categories-list component
 */
export const getEntity = (state: State) => state.entity;
export const getLandingSetting = (state: State) => state.landing_setting;
// export const getLoadingState = (state: State) => state.loading;
