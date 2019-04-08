import { AppHelpers } from '../../app.helpers';
import * as medicine from './medicine.actions';
import * as _ from 'lodash';
import { GlobalService } from '../../services/global.service';

export interface State {
    loaded: boolean;
    loading: boolean;
    listMedicine: any;
    // updatePatient: any;
    currentMedicine: any;
    errorMessage: any;
    listTypeMedicine: any;
    currentTypeMedicine: any;
}

const initialState: State = {
    loaded: false,
    loading: false,
    listMedicine: null,
    currentMedicine: null,
    errorMessage: null,
    listTypeMedicine: null,
    currentTypeMedicine: null
};

export function reducer(state = initialState, action: medicine.MedicineActions): State {
    switch (action.type) {
        case medicine.LIST_MEDICINE: {
            return Object.assign({}, state, {
                loading: true,
                loaded: false
            });
        }

        case medicine.LIST_MEDICINE_SUCCESS: {
            if(action.payload.id == 0){
                return Object.assign({}, state, {
                    loaded: true,
                    loading: false,
                    listMedicine: action.payload.data
                });
            }else{
                return Object.assign({}, state, {
                    loaded: true,
                    loading: false,
                    currentMedicine: action.payload.data
                });
            }
            
        }

        case medicine.LIST_MEDICINE_FAILED: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                listMedicine: null,
                currentMedicine: null,
                errorMessage: AppHelpers.getErrorMessage(action.payload)
            });
        }
        

        case medicine.LOAD_TYPE_MEDICINE: {
            return Object.assign({}, state, {
                loading: true,
                loaded: false
            });
        }

        case medicine.LOAD_TYPE_MEDICINE_SUCCESS: {
            if(action.payload.id == 0){
                return Object.assign({}, state, {
                    loaded: true,
                    loading: false,
                    listTypeMedicine: action.payload.data
                });
            }else{
                return Object.assign({}, state, {
                    loaded: true,
                    loading: false,
                    currentTypeMedicine: action.payload.data
                });
            }
            
        }

        case medicine.LOAD_TYPE_MEDICINE_FAILED: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                listTypeMedicine: null,
                currentTypeMedicine: null,
                errorMessage: AppHelpers.getErrorMessage(action.payload)
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
export const getLoadingState = (state: State) => state.loading;
export const getListMedicine = (state: State) => state.listMedicine;
export const getCurrentMedicine = (state: State) => state.currentMedicine;
export const getErrorMessage = (state: State) => state.errorMessage;
export const getListTypeMedicine = (state: State) => state.listTypeMedicine;
export const getCurrentTypeMedicinee = (state: State) => state.currentTypeMedicine;

