import * as campaign from './campaign.actions';

export interface State {
    loading: boolean;
    campaign: any;
    promotions: any;
    products: any;
}

const initialState: State = {
    loading: false,
    campaign: {},
    promotions: {},
    products: []
};

export function reducer(state = initialState, action: campaign.CampaignActions): State {
    switch (action.type) {

        case campaign.LOAD: {
            return Object.assign({}, state, {
                loading: true,
                campaign: {}
            });
        }

        case campaign.LOAD_FAILED: {
            return Object.assign({}, state, {
                loading: false
            });
        }

        case campaign.LOAD_SUCCESS: {
            return Object.assign({}, state, {
                loading: false,
                campaign: action.payload
            });
        }

        case campaign.LOAD_PRODUCTS: {
            return Object.assign({}, state, {
                loading: true
            });
        }

        case campaign.LOAD_PRODUCTS_FAILED: {
            return Object.assign({}, state, {
                loading: false
            });
        }

        case campaign.LOAD_PRODUCTS_SUCCESS: {
            return Object.assign({}, state, {
                loading: false,
                products: action.payload
            });
        }

        case campaign.LOAD_PROMOTIONS: {
            return Object.assign({}, state, {
                loading: true,
                promotions: {}
            });
        }

        case campaign.LOAD_PROMOTIONS_FAILED: {
            return Object.assign({}, state, {
                loading: false
            });
        }

        case campaign.LOAD_PROMOTIONS_SUCCESS: {
            return Object.assign({}, state, {
                loading: false,
                promotions: action.payload
            });
        }
        default:
            return state;
    }

}

/*
 Selectors for the state that will be later
 used in the products-list component
 */
export const getLoadingState = (state: State) => state.loading;
export const getCampaign = (state: State) => state.campaign;
export const getPromotions = (state: State) => state.promotions;
