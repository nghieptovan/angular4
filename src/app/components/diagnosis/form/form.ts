import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import { AppConstants } from '../../../app.constant';
import * as fromRoot from '../../../store';
import * as account from '../../../store/account/account.actions';
import * as medicine from '../../../store/medicine/medicine.actions';
import { DataModel } from '../../../store/data';
import { GlobalService } from '../../../services/global.service';
import {formvalidation } from '../../../../assets/js/form-validation';
declare var $;

// Redux
@Component({
    selector: 'edit-update-diagnosis',
    templateUrl: './form.html',
    styleUrls: ['./form.less']
})
export class EditUpdateDiagnosis implements OnInit {

    @Input() uid: any;
    @ViewChild('updateForm') updateForm: NgForm;
    @Output('validationChange') validationChange = new EventEmitter<Boolean>();
    @Input() isEdit: boolean;
    @Input() diagnosis: any;
    @Input() diagnosisId: any = 0;
    minLenght: any;
    fieldLabel: any;
    textLabel: any;
    loadJsonConfigSub: any;
    getCurrentPatentMedicineSub: any;
    medStatusCreateOrUpdateSub: any;
    listDiagnosisSub: any;
    listDiagnosis: any;
    loadedPatent: boolean = false;
    isUpdateDiagnosis: boolean = false;

    
    constructor(private store: Store<fromRoot.AppState>,        
        private elementRef: ElementRef,
        private router: Router,
        private toastr: ToastrService,
        private activatedRoute: ActivatedRoute,
        private globalService: GlobalService,
        private patientModel: DataModel) {       
        formvalidation();
        this.store.select(fromRoot.accountGetConfigJSON).subscribe((config) => {
            if(config) {
                this.textLabel = config.TEXT_LABEL;
                this.fieldLabel = config.DIAGNOSIS;
            }            
        });

        this.medStatusCreateOrUpdateSub = this.store.select(fromRoot.medStatusCreateOrUpdate).subscribe((status) => {
            if(status == 2 && this.isUpdateDiagnosis){
                this.toastr.success(this.isEdit ? "Cập nhật chẩn đoán "+this.diagnosis.name+" thành công.": "Thêm chẩn đoán "+this.diagnosis.name+" thành công");
                this.isUpdateDiagnosis = false;
                this.router.navigateByUrl('chan-doan');
            }
            if(status == 3 && this.isUpdateDiagnosis){
                this.toastr.error("Có lỗi xảy ra vui lòng thử lại");
                this.isUpdateDiagnosis = false;
            }
        });

        
    }
    ngOnInit() {     
        this.listDiagnosisSub = this.store.select(fromRoot.getListDiagnosis).subscribe((listDiagnosis) => {
            if(listDiagnosis){
                this.listDiagnosis = listDiagnosis;
            }else{
                this.globalService.loadList('diagnosis');
            }  
        });
    }

    update(form){
        let { value } = form;       
        if(form.valid && this.checkDataExist(value, this.diagnosisId)){
            const data = {
                name: value.name,
                code: value.code,
                short_name: value.short_name,
                id: this.diagnosisId || 0
            }
            this.store.dispatch(new medicine.UpdateDataMedicine({
                type: 'diagnosis', 
                data: data
            }));
            this.isUpdateDiagnosis = true;
        }
    }


    ngOnDestroy() {
        this.medStatusCreateOrUpdateSub.unsubscribe();
        this.listDiagnosisSub.unsubscribe();
    }

    checkDataExist(value, currentId){
        let checkList = this.listDiagnosis;
        checkList = _.filter(checkList, function(o) { return o.id != currentId; });        
        if(_.findIndex(checkList, { 'name': value.name }) != -1){
            this.toastr.error(this.fieldLabel.lbl_name_exist);
            return false;
        }
        if(_.findIndex(checkList, { 'code': value.code }) != -1){
            this.toastr.error(this.fieldLabel.lbl_code_exist);
            return false;
        }
        return true;
        
    }

}


