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
    deletePatient: any;
}

const initialState: State = {
    loaded: false,
    loading: false,
    listPatient: null,
    updatePatient: null,
    currentPatient: null,
    deletePatient: null
};

export function reducer(state = initialState, action: patient.PatientActions): State {
    switch (action.type) {
        // case patient.LIST_PATIENT: {
        //     return Object.assign({}, state, {
        //         loading: true,
        //         loaded: false
        //     });
        // }

        // case patient.LIST_PATIENT_SUCCESS: {
        //     if(action.payload.id == 0){
        //         return Object.assign({}, state, {
        //             loaded: true,
        //             loading: false,
        //             listPatient: action.payload.data
        //         });
        //     }else{
        //         return Object.assign({}, state, {
        //             loaded: true,
        //             loading: false,
        //             currentPatient: action.payload.data
        //         });
        //     }
            
        // }

        // case patient.LIST_PATIENT_FAILED: {
        //     return Object.assign({}, state, {
        //         loaded: true,
        //         loading: false,
        //         listPatient: null,
        //         currentPatient: null,
        //         errorMessage: AppHelpers.getErrorMessage(action.payload)
        //     });
        // }

        // case patient.UPDATE_PATIENT: {
        //     return Object.assign({}, state, {
        //         loading: true,
        //         loaded: false
        //     });
        // }

        // case patient.UPDATE_PATIENT_SUCCESS: {
        //     let {currentPatient, listPatient} = state;

        //     if(action.payload.code == 200){
        //         const updatedData = action.payload;
        //         if(currentPatient){
        //             currentPatient.data = updatedData.data;
        //         }else{
        //             currentPatient = updatedData;
        //         }


        //         localStorage.setItem('currentPatient', JSON.stringify(currentPatient));

        //         if(listPatient && updatedData){
        //             const indexPatient = listPatient.data.findIndex((item) => {
        //                 return item.id == updatedData.data.id;
        //             });
        //             Object.assign(listPatient.data[indexPatient], updatedData.data);
        //         }
        //     }

        //     return Object.assign({}, state, {
        //         loaded: true,
        //         loading: false,
        //         currentPatient: currentPatient,
        //         updatePatient: action.payload,
        //         listPatient: listPatient
        //     });
        // }

        // case patient.UPDATE_PATIENT_FAILED: {
        //     return Object.assign({}, state, {
        //         loaded: true,
        //         loading: false,
        //         updatePatient: null,
        //         errorMessage: AppHelpers.getErrorMessage(action.payload.message)
        //     });
        // }

        case patient.LOAD_PATIENT_BY_ID: {
            return Object.assign({}, state, {
                loading: true,
                loaded: false              
            });
        }

        case patient.LOAD_PATIENT_BY_ID_SUCCESS: {
            let { type, data } = action.payload;
                           
            if(type == 0){
                return Object.assign({}, state, {
                    loaded: true,
                    loading: false,
                    listPatient: data
                });

            }else{
                let dataReturn = type != -1 ? data : {
                    code : 200,
                    data: getDefaultPatient()
                };      
                console.log(dataReturn);
                
                return Object.assign({}, state, {
                    loaded: true,
                    loading: false,
                    currentPatient: dataReturn
                });
            }            
        }

        case patient.LOAD_PATIENT_BY_ID_FAILED: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                currentPatient: null,
                errorMessage: AppHelpers.getErrorMessage(action.payload.message)
            });
        }

        case patient.DELETE_PATIENT: {
            return Object.assign({}, state, {
                loading: true,
                loaded: false,
                deletePatient: null
            });
        }

        case patient.DELETE_PATIENT_SUCCESS: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                deletePatient: action.payload
            });
        }

        case patient.DELETE_PATIENT_FAILED: {
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                deletePatient: null,
                errorMessage: AppHelpers.getErrorMessage(action.payload)
            });
        }
       
        default:
            return state;
    }
}

function getDefaultPatient(){
    return {
        "id": 0,
        "name": '',
        "phone": '',
        "address": '',
        "weight": '',
        "birthday": '01/01/1990',
        "diagnosis": '',
        "sex": 1,
        "status_id": 1,
        "employee_id": 0
    };
}
/*
Selectors for the state that will be later
used in the categories-list component
*/
export const getLoadingState = (state: State) => state.loading;
export const getListPatient = (state: State) => state.listPatient;
export const getCurrentPatient = (state: State) => state.currentPatient;
export const getUpdatePatient = (state: State) => state.updatePatient;
export const getDeletePatient = (state: State) => state.deletePatient;


