import * as _ from 'lodash';

import { AppConstants } from '../../app.constant';
import * as brand from './brand.actions';
declare var $;

export interface State {
    loaded: boolean;
    loading: boolean;
    entity: any;

}

const initialState: State = {
    loaded: false,
    loading: false,
    entity: null,
};

export function reducer(state = initialState, action: brand.BrandActions): State {
    switch (action.type) {

        case brand.LOAD: {
            return Object.assign({}, state, {
                loading: true,
                loaded: false
            });
        }

        case brand.LOAD_SUCCESS: {
            return Object.assign({}, state, {
                loading: false,
                loaded: true,
                entity: action.payload.brand,
            });
        }

        case brand.LOAD_FAILED: {
            return Object.assign({}, state, {
                loading: false,
                loaded: false,
                entity: null
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
export const getEntity = (state: State) => state.entity
// export const getLoadingState = (state: State) => state.loading;
