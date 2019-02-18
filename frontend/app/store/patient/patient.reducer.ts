import { AppHelpers } from '../../app.helpers';
import * as patient from './patient.actions';
import * as _ from 'lodash';
import { GlobalService } from '../../services/global.service';

export interface State {
    loaded: boolean;
    loading: boolean;
    listPatient: any;
    updatePatient: any;
}

const initialState: State = {
    loaded: false,
    loading: false,
    listPatient: null,
    updatePatient: null
};

export function reducer(state = initialState, action: patient.PatientActions): State {
    switch (action.type) {
        case patient.LIST_PATIENT: {
            return Object.assign({}, state, {
                loading: true,
                loaded: false,
                listPatient: null
            });
        }

        case patient.LIST_PATIENT_SUCCESS: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                listPatient: action.payload
            });
        }

        case patient.LIST_PATIENT_FAILED: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                listPatient: null,
                errorMessage: AppHelpers.getErrorMessage(action.payload)
            });
        }

        case patient.UPDATE_PATIENT: {
            return Object.assign({}, state, {
                loading: true,
                loaded: false,
                updatePatient: null
            });
        }

        case patient.UPDATE_PATIENT_SUCCESS: {
            return Object.assign({}, state, {
                loaded: true,
                // loading: false,
                updatePatient: action.payload.data
            });
        }

        case patient.UPDATE_PATIENT_FAILED: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                updatePatient: null,
                errorMessage: AppHelpers.getErrorMessage(action.payload.message)
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
export const getListPatient = (state: State) => state.listPatient;


