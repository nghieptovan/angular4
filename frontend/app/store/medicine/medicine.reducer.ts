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

    listDrugMedicine: any;
    currentDrugMedicine: any;

    listPatentMedicine: any;
    currentPatentMedicine: any;

    listUnitMedicine: any;
    currentUnitMedicine: any;

    listBehaviourMedicine: any;
    currentBehaviourMedicine: any;
}

const initialState: State = {
    loaded: false,
    loading: false,
    listMedicine: null,
    currentMedicine: null,
    errorMessage: null,
    listTypeMedicine: null,
    currentTypeMedicine: null,
    listDrugMedicine: null,
    currentDrugMedicine: null,
    listPatentMedicine: null,
    currentPatentMedicine: null,
    listUnitMedicine: null,
    currentUnitMedicine: null,
    listBehaviourMedicine: null,
    currentBehaviourMedicine: null
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

        case medicine.LOAD_DRUG_MEDICINE: {
            return Object.assign({}, state, {
                loading: true,
                loaded: false
            });
        }

        case medicine.LOAD_DRUG_MEDICINE_SUCCESS: {
            if(action.payload.id == 0){
                return Object.assign({}, state, {
                    loaded: true,
                    loading: false,
                    listDrugMedicine: action.payload.data
                });
            }else{
                return Object.assign({}, state, {
                    loaded: true,
                    loading: false,
                    currentDrugMedicine: action.payload.data
                });
            }
            
        }

        case medicine.LOAD_DRUG_MEDICINE_FAILED: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                listDrugMedicine: null,
                currentDrugMedicine: null,
                errorMessage: AppHelpers.getErrorMessage(action.payload)
            });
        }

        case medicine.LOAD_PATENT_MEDICINE: {
            return Object.assign({}, state, {
                loading: true,
                loaded: false
            });
        }

        case medicine.LOAD_PATENT_MEDICINE_SUCCESS: {
            if(action.payload.id == 0){
                return Object.assign({}, state, {
                    loaded: true,
                    loading: false,
                    listPatentMedicine: action.payload.data
                });
            }else{
                return Object.assign({}, state, {
                    loaded: true,
                    loading: false,
                    currentPatentMedicine: action.payload.data
                });
            }
            
        }

        case medicine.LOAD_PATENT_MEDICINE_FAILED: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                listPatentMedicine: null,
                currentPatentMedicine: null,
                errorMessage: AppHelpers.getErrorMessage(action.payload)
            });
        }

        case medicine.LOAD_UNIT_MEDICINE: {
            return Object.assign({}, state, {
                loading: true,
                loaded: false
            });
        }

        case medicine.LOAD_UNIT_MEDICINE_SUCCESS: {
            if(action.payload.id == 0){
                return Object.assign({}, state, {
                    loaded: true,
                    loading: false,
                    listUnitMedicine: action.payload.data
                });
            }else{
                return Object.assign({}, state, {
                    loaded: true,
                    loading: false,
                    currentUnitMedicine: action.payload.data
                });
            }
            
        }

        case medicine.LOAD_UNIT_MEDICINE_FAILED: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                listUnitMedicine: null,
                currentUnitMedicine: null,
                errorMessage: AppHelpers.getErrorMessage(action.payload)
            });
        }

        case medicine.LOAD_BEHAVIOUR_MEDICINE: {
            return Object.assign({}, state, {
                loading: true,
                loaded: false
            });
        }

        case medicine.LOAD_BEHAVIOUR_MEDICINE_SUCCESS: {
            if(action.payload.id == 0){
                return Object.assign({}, state, {
                    loaded: true,
                    loading: false,
                    listBehaviourMedicine: action.payload.data
                });
            }else{
                return Object.assign({}, state, {
                    loaded: true,
                    loading: false,
                    currentBehaviourMedicine: action.payload.data
                });
            }
            
        }

        case medicine.LOAD_BEHAVIOUR_MEDICINE_FAILED: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                listBehaviourMedicine: null,
                currentBehaviourMedicine: null,
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
export const getErrorMessage = (state: State) => state.errorMessage;

export const getListMedicine = (state: State) => state.listMedicine;
export const getListTypeMedicine = (state: State) => state.listTypeMedicine;
export const getListDrugMedicine = (state: State) => state.listDrugMedicine;
export const getListPatentMedicine = (state: State) => state.listPatentMedicine;
export const getListUnitMedicine = (state: State) => state.listUnitMedicine;
export const getListBehaviourMedicine = (state: State) => state.listBehaviourMedicine;

export const getCurrentMedicine = (state: State) => state.currentMedicine;
export const getCurrentTypeMedicine = (state: State) => state.currentTypeMedicine;
export const getCurrentDrugMedicine = (state: State) => state.currentDrugMedicine;
export const getCurrentPatentMedicine = (state: State) => state.currentPatentMedicine;
export const getCurrentUnitMedicine = (state: State) => state.currentUnitMedicine;
export const getCurrentBehaviourMedicine = (state: State) => state.currentBehaviourMedicine;


