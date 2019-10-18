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
import * as patient from '../../../store/patient/patient.actions';
import { DataModel } from '../../../store/data';
import { GlobalService } from '../../../services/global.service';
import {formvalidation } from '../../../../assets/js/form-validation';
import * as medicine from '../../../store/medicine/medicine.actions';
declare var $;

// Redux
@Component({
    selector: 'edit-update-behaviour',
    templateUrl: './form.html',
    styleUrls: ['./form.less']
})
export class EditUpdateBehaviour implements OnInit {

    @Input() uid: any;
    @ViewChild('updateForm') updateForm: NgForm;
    @Output('validationChange') validationChange = new EventEmitter<Boolean>();
    @Input() isEdit: boolean;
    @Input() behaviour: any;
    @Input() behaviourId: any = 0;
    minLenght: any;
    fieldLabel: any;
    textLabel: any;
    loadJsonConfigSub: any;
    getCurrentPatentMedicineSub: any;
    medStatusCreateOrUpdateSub: any;
    listBehaviourMedicineSub: any;
    listBehaviourMedicine: any;
    isUpdateBehaviour: boolean = false;

    
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
                this.fieldLabel = config.BEHAVIOUR_MEDICINE;
            }            
        });

        this.medStatusCreateOrUpdateSub = this.store.select(fromRoot.medStatusCreateOrUpdate).subscribe((status) => {
            if(status == 2 && this.isUpdateBehaviour){
                this.toastr.success(this.isEdit ? "Cập nhật quy cách dử dụng "+this.behaviour.name+" thành công.": "Thêm quy cách dử dụng "+this.behaviour.name+" thành công");
                this.isUpdateBehaviour = false;
                this.router.navigateByUrl('quy-cach-su-dung');
            }
            if(status == 3 && this.isUpdateBehaviour){
                this.toastr.error("Có lỗi xảy ra vui lòng thử lại");
                this.isUpdateBehaviour = false;
            }
        });

        
    }
    ngOnInit() {     
        this.listBehaviourMedicineSub = this.store.select(fromRoot.getListBehaviourMedicine).subscribe((behaviourMedicines) => {
            if(behaviourMedicines){
                this.listBehaviourMedicine = behaviourMedicines;
            }else{
                this.loadData();
            }  
        });
    }

    loadData(){
        this.globalService.loadList('behaviour');
    }


    update(form){
        let { value } = form;       
        if(form.valid && this.checkDataExist(value, this.behaviourId)){
            const data = {
                name: value.name,
                code: value.code,
                id: this.behaviourId || 0
            }
            this.store.dispatch(new medicine.UpdateDataMedicine({
                type: 'behaviour', 
                data: data
            }));
            this.isUpdateBehaviour = true;
        }
    }


    ngOnDestroy() {
        this.medStatusCreateOrUpdateSub.unsubscribe();
        this.listBehaviourMedicineSub.unsubscribe();
    }

    checkDataExist(value, currentId){
        let checkList = this.listBehaviourMedicine;
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


