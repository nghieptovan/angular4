import * as _ from 'lodash';

import { AppConstants } from '../../app.constant';
import * as anniversary from './anniversary.actions';

declare var $;
export interface State {
    loading: Boolean;
    results:any;
}

const initialState: State = {
    loading: false,
    results:{},
};

export function reducer(state = initialState, action: anniversary.AnniversaryActions): State {
    switch (action.type) {
        case anniversary.LOAD: {
            return Object.assign({}, state, {
                loading: true,

            });
        }
        case anniversary.LOAD_SUCCESS: {
            return Object.assign({}, state, {
                loading: false,
                results:action.payload
            });
        }
        case anniversary.LOAD_FAILED: {
            return Object.assign({}, state, {
                loading: false,

            });
        }

        default:
            return state;
    }
}

export const getAnniversary  = (state: State) => state.results;
