import * as _ from 'lodash';
import * as moment from 'moment';
export class DataModel {
    patient: any = {
        id: '',
        name: '',
        sex: '',
        weight: '',
        birthday: '',
        address: '',
        phone: '',
        diagnosis: '',
        employee_id: '',
        status_id: ''
    };

    public setPatientObject(){

    }
    public getPatientObject(obj = null){
        let patient = this.patient;
        if(obj){        
           patient.id = obj.id;
           patient.name = obj.name;
           patient.sex = obj.sex;
           patient.weight = obj.weight;
           patient.birthday = this.dateString(obj.birthday);
           patient.address = obj.address;
           patient.phone = obj.phone;
           patient.diagnosis = obj.diagnosis;
           patient.employee_id = obj.employee_id;
           patient.status_id = obj.status_id;
        }
        return patient;
    }
    private dateString(data){
        if(data.includes(' ')){
            return data.split(' ')[0];
        }else{
            return data;
        }
        
    }
}

