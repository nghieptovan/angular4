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
    statusCreateOrUpdate: number;
    statusLoad: number;

    listUnitMedicine: any;
    currentUnitMedicine: any;

    listBehaviourMedicine: any;
    listDiagnosis: any;
    currentBehaviourMedicine: any;

    typeMedDelete: any;
    dataMedDelete: any;
    typeMedUpdate: any;
    dataMedUpdate: any;
    typeMedLoad: any;
    dataMedLoad: any;
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
    statusCreateOrUpdate: 0,
    statusLoad: 0,
    listUnitMedicine: null,
    currentUnitMedicine: null,
    listBehaviourMedicine: null,
    listDiagnosis: null,
    currentBehaviourMedicine: null,
    typeMedDelete: null,
    dataMedDelete: null,
    typeMedUpdate: null,
    dataMedUpdate: null,
    typeMedLoad: null,
    dataMedLoad: null
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
                let defaultMed = getDefaultMedicine();
                let { data } = action.payload.data;
                for (var property in data) {
                    if (data.hasOwnProperty(property)) {
                        if(data[property]){
                            // console.log(property,data[property]);
                            
                            defaultMed[property] = data[property]
                        }  
                    }
                }
                console.log(data);
                console.log(defaultMed);
                
                data = defaultMed;
                console.log(data);
                
                return Object.assign({}, state, {
                    loaded: true,
                    loading: false,
                    currentMedicine: data
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

        //data medicine

        case medicine.DELETE_DATA_MEDICINE: {
            let { type } = action.payload;
            return Object.assign({}, state, {
                typeMedDelete: type
            });
        }
        case medicine.DELETE_DATA_MEDICINE_SUCCESS: {
            let { data, payload } = action.payload;
            let keyData = '';
            let { listPatentMedicine, listDrugMedicine, listUnitMedicine, listTypeMedicine, listBehaviourMedicine, listDiagnosis } = state;
            switch (payload.type) {
                case 'patent':
                    keyData = 'listPatentMedicine';
                    break;        
                case 'unit':
                    keyData = 'listUnitMedicine';
                    break;        
                case 'drug':
                    keyData = 'listDrugMedicine';
                    break;        
                case 'type':
                    keyData = 'listTypeMedicine';
                    break;        
                case 'behaviour':
                    keyData = 'listBehaviourMedicine';
                    break;        
                case 'diagnosis':
                    keyData = 'listDiagnosis';
                    break;        
                default:
                    break;
            }
            let listDataMedicine = [];
            if(getSessionData(keyData)){
                listDataMedicine = getSessionData(keyData);
                _.remove(listDataMedicine, (med) => {
                    return med.id == payload.data
                });
                setSessionData(keyData, listDataMedicine);
            }

            return Object.assign({}, state, {
                typeMedDelete: payload.type +'_success',
                listPatentMedicine: keyData == 'listPatentMedicine' ? listDataMedicine : listPatentMedicine,
                listDrugMedicine: keyData == 'listDrugMedicine' ? listDataMedicine : listDrugMedicine,
                listUnitMedicine: keyData == 'listUnitMedicine' ? listDataMedicine : listUnitMedicine,
                listTypeMedicine: keyData == 'listTypeMedicine' ? listDataMedicine : listTypeMedicine,
                listBehaviourMedicine: keyData == 'listBehaviourMedicine' ? listDataMedicine : listBehaviourMedicine,
                listDiagnosis: keyData == 'listDiagnosis' ? listDataMedicine : listDiagnosis
            });
        }

        case medicine.DELETE_DATA_MEDICINE_FAILED: {
            let { data, payload } = action.payload;
            return Object.assign({}, state, {
                typeMedDelete: payload.type+'_failed',
                dataMedDelete: data
            });
        }

        case medicine.UPDATE_DATA_MEDICINE: {
            let { type } = action.payload;
            return Object.assign({}, state, {
                typeMedUpdate: '',
                statusCreateOrUpdate: 1
            });
        }
        case medicine.UPDATE_DATA_MEDICINE_SUCCESS: {
            let { data, payload } = action.payload;
            let keyData = '';
            let { listPatentMedicine, listDrugMedicine, listUnitMedicine, listTypeMedicine, listBehaviourMedicine, listDiagnosis} = state;
            switch (payload.type) {
                case 'patent':
                    keyData = 'listPatentMedicine';
                    break;   
                case 'drug':
                    keyData = 'listDrugMedicine';
                    break;
                case 'unit':
                    keyData = 'listUnitMedicine';
                    break;   
                case 'type':
                    keyData = 'listTypeMedicine';
                    break;           
                case 'behaviour':
                    keyData = 'listBehaviourMedicine';
                    break;           
                case 'diagnosis':
                    keyData = 'listDiagnosis';
                    break;           
                default:
                    break;
            }
            let listDataMedicine = [];
            if(getSessionData(keyData)){
                listDataMedicine = getSessionData(keyData);
                if(payload.data.id == 0){
                    listDataMedicine = [...listDataMedicine, data.data];
                }else{
                    let findIndex = _.findIndex(listDataMedicine, (dat) => {
                        return dat.id == payload.data.id;
                    })
                    if(findIndex >= 0){
                        listDataMedicine[findIndex] = data.data;
                    }
                }
                
                setSessionData(keyData, listDataMedicine);
            }

            return Object.assign({}, state, {
                typeMedUpdate: payload.type +'_success',
                statusCreateOrUpdate: 2,
                listPatentMedicine: keyData == 'listPatentMedicine' ? listDataMedicine : listPatentMedicine,
                listDrugMedicine: keyData == 'listDrugMedicine' ? listDataMedicine : listDrugMedicine,
                listUnitMedicine: keyData == 'listUnitMedicine' ? listDataMedicine : listUnitMedicine,
                listTypeMedicine: keyData == 'listTypeMedicine' ? listDataMedicine : listTypeMedicine,
                listBehaviourMedicine: keyData == 'listBehaviourMedicine' ? listDataMedicine : listBehaviourMedicine,
                listDiagnosis: keyData == 'listDiagnosis' ? listDataMedicine : listDiagnosis
            });
        }

        case medicine.UPDATE_DATA_MEDICINE_FAILED: {
            let { data, payload } = action.payload;
            return Object.assign({}, state, {
                typeMedUpdate: payload.type+'_failed',
                dataMedUpdate: data,
                statusCreateOrUpdate: 3
            });
        }

        case medicine.LOAD_DATA_MEDICINE: {
            // let { type } = action.payload;
            return Object.assign({}, state, {
                typeMedLoad: '',
                statusLoad: 1
            });
        }
        case medicine.LOAD_DATA_MEDICINE_SUCCESS: {
            let { data, payload } = action.payload;
            let keyData = '';
            let { listPatentMedicine, listDrugMedicine, listUnitMedicine, listTypeMedicine, listBehaviourMedicine, listDiagnosis} = state;
            switch (payload.type) {
                case 'patent':
                    keyData = 'listPatentMedicine';
                    break;   
                case 'drug':
                    keyData = 'listDrugMedicine';
                    break;
                case 'unit':
                    keyData = 'listUnitMedicine';
                    break;   
                case 'type':
                    keyData = 'listTypeMedicine';
                    break;           
                case 'behaviour':
                    keyData = 'listBehaviourMedicine';
                    break;           
                case 'diagnosis':
                    keyData = 'listDiagnosis';
                    break;           
                default:
                    break;
            }
            return Object.assign({}, state, {
                typeMedUpdate: payload.type +'_success',
                statusLoad: 2,
                listPatentMedicine: keyData == 'listPatentMedicine' ? data : listPatentMedicine,
                listDrugMedicine: keyData == 'listDrugMedicine' ? data : listDrugMedicine,
                listUnitMedicine: keyData == 'listUnitMedicine' ? data : listUnitMedicine,
                listTypeMedicine: keyData == 'listTypeMedicine' ? data : listTypeMedicine,
                listBehaviourMedicine: keyData == 'listBehaviourMedicine' ? data : listBehaviourMedicine,
                listDiagnosis: keyData == 'listDiagnosis' ? data : listDiagnosis
            });
        }

        case medicine.LOAD_DATA_MEDICINE_FAILED: {
            let { data, payload } = action.payload;
            return Object.assign({}, state, {
                typeMedLoad: payload.type+'_failed',
                dataMedLoad: data,
                statusLoad: 3
            });
        }
       
        default:
            return state;
    }
}

function getDefaultMedicine(){
    return {
        "id": 0,
        "name": "",
        "display_name": "",
        "description": "",
        "amount": 0,
        "typemedicine_id": 0,
        "behaviourmedicine_id": 0,
        "sellprice": 0,
        "importedprice": 0,
        "drug_id": 0,
        "patentmedicine_id": 0,
        "unit_id": 0,
        "type_medicine": {
          "name": "",
          "code": ""
        },
        "behaviour_medicine": {
          "name": "",
          "code": ""
        },
        "unit": {
          "name": "",
          "code": ""
        },
        "drug": {
          "code": "",
          "name": ""
        },
        "patent_medicine": {
          "name": "",
          "code": ""
        }
      };
}
function setSessionData(name, data){
    let dataSet;
    if(typeof data == 'object'){
        dataSet = JSON.stringify(data);
    }
    sessionStorage.setItem(name,dataSet);
}
function getSessionData(name){
    let dataReturn = sessionStorage.getItem(name);
    if(dataReturn){
        return JSON.parse(dataReturn);
    }else{
        return false;
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
export const getListDiagnosis = (state: State) => state.listDiagnosis;

export const getCurrentMedicine = (state: State) => state.currentMedicine;
export const getCurrentTypeMedicine = (state: State) => state.currentTypeMedicine;
export const getCurrentDrugMedicine = (state: State) => state.currentDrugMedicine;
export const getCurrentPatentMedicine = (state: State) => state.currentPatentMedicine;
export const getCurrentUnitMedicine = (state: State) => state.currentUnitMedicine;
export const getCurrentBehaviourMedicine = (state: State) => state.currentBehaviourMedicine;
export const medStatusCreateOrUpdate = (state: State) => state.statusCreateOrUpdate;
export const typeMedDelete = (state: State) => state.typeMedDelete;
export const dataMedDelete = (state: State) => state.dataMedDelete;
export const typeMedUpdate = (state: State) => state.typeMedUpdate;
export const dataMedUpdate = (state: State) => state.dataMedUpdate;


