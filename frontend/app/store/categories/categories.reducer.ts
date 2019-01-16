import * as _ from 'lodash';

import { AppConstants } from '../../app.constant';
import * as categories from './categories.actions';
import {GlobalConstants} from "../../components/base/constants/GlobalConstants";
declare var $;

export interface State {
    loaded: boolean;
    loading: boolean;
    entities: Array<any>;
    facets: Array<any>;
    selectedStore: any;
    count: number;
    page: number;
    hasOmni: boolean;
    hasBlink: boolean;
}

const initialState: State = {
    loaded: false,
    loading: false,
    entities: [],
    facets: [],
    selectedStore: '',
    count: 0,
    page: 1,
    hasOmni: false,
    hasBlink: false
};

export function reducer(state = initialState, action: categories.CategoriesActions): State {
    switch (action.type) {

        case categories.LOAD: {
            const page = action.payload;
            return Object.assign({}, state, {
                loading: true,
                page: page == null ? state.page : page
            });
        }

        case categories.LOAD_SUCCESS: {
            let categories = action.payload.categories;
            categories = setSelectedCategory(categories, action.payload.selectedId);

            return Object.assign({}, state, {
                loading: false,
                entities: categories,
                selectedStore: ''
            });
        }

        case categories.LOAD_FAILED: {
            return Object.assign({}, state, {
                loading: false,
                entities: []
            });
        }

        case categories.LOAD_FACETS: {
            const page = action.payload;
            return Object.assign({}, state, {
                loading: true,
            });
        }

        case categories.LOAD_FACETS_SUCCESS: {
            let facets = action.payload.facets;
            return Object.assign({}, state, {
                loading: false,
                facets: facets,
            });
        }

        case categories.LOAD_FACETS_FAILED: {
            return Object.assign({}, state, {
                loading: false,
                facets: []
            });
        }

        case categories.UPDATE: {
            const categories = setSelectedCategory(state.entities, action.payload);
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                entities: categories
            });
        }

        case categories.SET_SELECTED_STORE: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                selectedStore: ''
            });
        }

        default:
            return state;
    }
}

function setSelectedCategory(categories, id) {
    if (categories.id === id.toString()) {
        categories.level2 = null;
        categories.level1 = null;

        _.each(categories.child, (cat: any) => {
            cat.isSelected = false;
            _.each(cat.child, (sub: any) => {
                sub.isSelected = false;
            });
        });

        return categories;
    }
    _.each(categories.child, (level1: any) => {
        level1.isSelected = false;
        if (level1.id === id.toString()) {
            level1.isSelected = true;
            _.each(level1.child, (subcat: any) => {
                subcat.isSelected = false;
            });
            categories.level1 = level1;
            categories.level2 = null;
            categories.level3 = null;
            categories.level4 = null;
        }

        _.each(level1.child, (level2: any) => {
            level2.isSelected = false;
            if (level2.id === id.toString()) {
                level1.isSelected = true;
                level2.isSelected = true;
                categories.level1 = level1;
                categories.level2 = level2;
                categories.level3 = null;
                categories.level4 = null;
            }
            _.each(level2.child, (level3: any) => {
                level3.isSelected = false;
                if (level3.id === id.toString()) {
                    level1.isSelected = true;
                    level2.isSelected = true;
                    level3.isSelected = true;
                    categories.level1 = level1;
                    categories.level2 = level2;
                    categories.level3 = level3;
                    categories.level4 = null;
                }

                _.each(level3.child, (level4: any) => {
                    level4.isSelected = false;
                    if (level4.id === id.toString()) {
                        level1.isSelected = true;
                        level2.isSelected = true;
                        level3.isSelected = true;
                        level4.isSelected = true;
                        categories.level1 = level1;
                        categories.level2 = level2;
                        categories.level3 = level3;
                        categories.level4 = level4;
                    }
                });
            });
        });
    });

    return categories;
}





/*
 Selectors for the state that will be later
 used in the categories-list component
 */
export const getEntities = (state: State) => state.entities;
export const getPage = (state: State) => state.page;
export const getCount = (state: State) => state.count;
export const getSelectedStore = (state: State) => state.selectedStore;
export const getLoadingState = (state: State) => state.loading;
export const getFacets = (state: State) => state.facets;