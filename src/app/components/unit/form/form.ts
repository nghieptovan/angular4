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
    selector: 'edit-update-unit',
    templateUrl: './form.html',
    styleUrls: ['./form.less']
})
export class EditUpdateUnit implements OnInit {

    @Input() uid: any;
    @ViewChild('updateForm') updateForm: NgForm;
    @Output('validationChange') validationChange = new EventEmitter<Boolean>();
    @Input() isEdit: boolean;
    @Input() unit: any;
    @Input() unitId: any = 0;
    minLenght: any;
    fieldLabel: any;
    textLabel: any;
    loadJsonConfigSub: any;
    getCurrentPatentMedicineSub: any;
    medStatusCreateOrUpdateSub: any;
    listUnitMedicineSub: any;
    listUnitMedicine: any;
    isUpdateUnit: boolean = false;

    
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
                this.fieldLabel = config.UNIT_MEDICINE;
            }            
        });

        this.medStatusCreateOrUpdateSub = this.store.select(fromRoot.medStatusCreateOrUpdate).subscribe((status) => {
            if(status == 2 && this.isUpdateUnit){
                this.toastr.success(this.isEdit ? "Cập nhật dược chất "+this.unit.name+" thành công.": "Thêm dược chất "+this.unit.name+" thành công");
                this.isUpdateUnit = false;
                this.router.navigateByUrl('don-vi-thuoc');
            }
            if(status == 3 && this.isUpdateUnit){
                this.toastr.error("Có lỗi xảy ra vui lòng thử lại");
                this.isUpdateUnit = false;
            }
        });

        
    }
    ngOnInit() {     
        this.listUnitMedicineSub = this.store.select(fromRoot.getListUnitMedicine).subscribe((unitMedicines) => {
            if(unitMedicines){
                this.listUnitMedicine = unitMedicines;
            }else{
                this.store.dispatch(new medicine.LoadUnitMedicine(0));
            }  
        });
    }

    ngAfterContentInit() {
        
    }


    update(form){
        let { value } = form;       
        if(form.valid && this.checkDataExist(value, this.unitId)){
            const data = {
                name: value.name,
                code: value.code,
                id: this.unitId || 0
            }
            this.store.dispatch(new medicine.UpdateDataMedicine({
                type: 'unit', 
                data: data
            }));
            this.isUpdateUnit = true;
        }
    }


    ngOnDestroy() {
        this.medStatusCreateOrUpdateSub.unsubscribe();
        this.listUnitMedicineSub.unsubscribe();
    }

    checkDataExist(value, currentId){
        let checkList = this.listUnitMedicine;
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


