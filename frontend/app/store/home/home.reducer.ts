import * as _ from 'lodash';

import { AppConstants } from '../../app.constant';
import * as home from './home.actions';

declare var $;
export interface State {
    loading: Boolean;
    homeCmsBlock: any;
    isHomePage: any;
}

const initialState: State = {
    loading: false,
    homeCmsBlock: {},
    isHomePage: false
};

export function reducer(state = initialState, action: home.HomeActions): State {
    switch (action.type) {
        case home.LOAD_HOME_CMSBLOCK: {
            return Object.assign({}, state, {
                loading: true,
                isHomePage: true
            });
        }
        case home.LOAD_HOME_CMSBLOCK_SUCCESS: {
            return Object.assign({}, state, {
                loading: false,
                homeCmsBlock: action.payload
            });
        }
        case home.LOAD_HOME_CMSBLOCK_FAILED: {
            return Object.assign({}, state, {
                loading: false
            });
        }

        case home.LOAD_MORE_PRODUCTS: {
            return Object.assign({}, state, {
                loading: true,
            });
        }
        case home.LOAD_MORE_PRODUCTS_SUCCESS: {
            const homeCmsBlock = _.cloneDeep(state.homeCmsBlock);
            homeCmsBlock.highlightProducts.push({
                next_promotion: action.payload.next_promotion,
                products: action.payload.products,
                promotion: action.payload.promotion,
                total_product: action.payload.total_product,
                image: _.get(action.payload, 'promotion[0].image_thumbnail')
            });

            return Object.assign({}, state, {
                loading: false,
                homeCmsBlock: homeCmsBlock
            });
        }
        case home.LOAD_MORE_PRODUCTS_FAILED: {
            return Object.assign({}, state, {
                loading: false,
            });
        }

        case home.SET_HOME_STATE: {
            return Object.assign({}, state, {
                loading: false,
                isHomePage: true
            });
        }

        case home.RESET_HOME_STATE: {
            return Object.assign({}, state, {
                loading: false,
                isHomePage: false
            });
        }
        default:
            return state;
    }
}

export const getHomeCmsBlock = (state: State) => state.homeCmsBlock;
export const getIsLoadingState = (state: State) => state.loading;
export const getIsHomePageState = (state: State) => state.isHomePage;
