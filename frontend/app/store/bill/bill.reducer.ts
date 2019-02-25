import { AppHelpers } from '../../app.helpers';
import * as bill from './bill.actions';
import * as _ from 'lodash';
import { GlobalService } from '../../services/global.service';

export interface State {
    loaded: boolean;
    loading: boolean;
    billByPatient: any;
}

const initialState: State = {
    loaded: false,
    loading: false,
    billByPatient: null
};

export function reducer(state = initialState, action: bill.BillActions): State {
    switch (action.type) {

        case bill.BILL_BY_PATIENT: {
            return Object.assign({}, state, {
                loading: true,
                loaded: false,
                billByPatient: null
            });
        }
        case bill.BILL_BY_PATIENT_SUCCESS: {
            return Object.assign({}, state, {
                loading: true,
                loaded: false,
                billByPatient: action.payload
            });
        }
        case bill.BILL_BY_PATIENT_FAILED: {
            return Object.assign({}, state, {
                loading: true,
                loaded: false,
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
export const getBillByPatient = (state: State) => state.billByPatient;


