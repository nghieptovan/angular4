import { AppHelpers } from '../../app.helpers';
import * as patient from './patient.actions';
import * as _ from 'lodash';
import { GlobalService } from '../../services/global.service';

export interface State {
    loaded: boolean;
    loading: boolean;
    listPatient: any;
    updatePatient: any;
    currentPatient: any;
}

const initialState: State = {
    loaded: false,
    loading: false,
    listPatient: null,
    updatePatient: null,
    currentPatient: null
};

export function reducer(state = initialState, action: patient.PatientActions): State {
    switch (action.type) {
        case patient.LIST_PATIENT: {
            return Object.assign({}, state, {
                loading: true,
                loaded: false
            });
        }

        case patient.LIST_PATIENT_SUCCESS: {
            if(action.payload.id == 0){
                return Object.assign({}, state, {
                    loaded: true,
                    loading: false,
                    listPatient: action.payload.data
                });
            }else{
                return Object.assign({}, state, {
                    loaded: true,
                    loading: false,
                    currentPatient: action.payload.data
                });
            }
            
        }

        case patient.LIST_PATIENT_FAILED: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                listPatient: null,
                currentPatient: null,
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
            let { listPatient } = state;
            const updatedData = action.payload.data;
            const indexPatient = listPatient.data.findIndex((item) => {
                return item.id == updatedData.id;
            });
            Object.assign(listPatient.data[indexPatient], updatedData);
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                updatePatient: action.payload,
                listPatient: listPatient
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
export const getCurrentPatient = (state: State) => state.currentPatient;


