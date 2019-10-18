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
    selector: 'edit-update-type',
    templateUrl: './form.html',
    styleUrls: ['./form.less']
})
export class EditUpdateType implements OnInit {

    @Input() uid: any;
    @ViewChild('updateForm') updateForm: NgForm;
    @Output('validationChange') validationChange = new EventEmitter<Boolean>();
    @Input() isEdit: boolean;
    @Input() type: any;
    @Input() typeId: any = 0;
    minLenght: any;
    fieldLabel: any;
    textLabel: any;
    loadJsonConfigSub: any;
    getCurrentPatentMedicineSub: any;
    medStatusCreateOrUpdateSub: any;
    listTypeMedicineSub: any;
    listTypeMedicine: any;
    isUpdateType: boolean = false;

    
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
                this.fieldLabel = config.TYPE_MEDICINE;
            }            
        });

        this.medStatusCreateOrUpdateSub = this.store.select(fromRoot.medStatusCreateOrUpdate).subscribe((status) => {
            if(status == 2 && this.isUpdateType){
                this.toastr.success(this.isEdit ? "Cập nhật phân loại thuốc "+this.type.name+" thành công.": "Thêm phân loại thuốc "+this.type.name+" thành công");
                this.isUpdateType = false;
                this.router.navigateByUrl('phan-loai-thuoc');
            }
            if(status == 3 && this.isUpdateType){
                this.toastr.error("Có lỗi xảy ra vui lòng thử lại");
                this.isUpdateType = false;
            }
        });

        
    }
    ngOnInit() {     
        this.listTypeMedicineSub = this.store.select(fromRoot.getListTypeMedicine).subscribe((typeMedicines) => {
            if(typeMedicines){
                this.listTypeMedicine = typeMedicines;
            }else{
                this.globalService.loadList('type');
            }  
        });
    }

    ngAfterContentInit() {
        
    }


    update(form){
        let { value } = form;       
        if(form.valid && this.checkDataExist(value, this.typeId)){
            const data = {
                name: value.name,
                code: value.code,
                id: this.typeId || 0
            }
            this.store.dispatch(new medicine.UpdateDataMedicine({
                type: 'type', 
                data: data
            }));
            this.isUpdateType = true;
        }
    }


    ngOnDestroy() {
        this.medStatusCreateOrUpdateSub.unsubscribe();
        this.listTypeMedicineSub.unsubscribe();
    }

    checkDataExist(value, currentId){
        let checkList = this.listTypeMedicine;
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


