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
    selector: 'edit-update-drug',
    templateUrl: './form.html',
    styleUrls: ['./form.less']
})
export class EditUpdateDrug implements OnInit {

    @Input() uid: any;
    @ViewChild('updateForm') updateForm: NgForm;
    @Output('validationChange') validationChange = new EventEmitter<Boolean>();
    @Input() isEdit: boolean;
    @Input() drug: any;
    @Input() drugId: any = 0;
    minLenght: any;
    fieldLabel: any;
    textLabel: any;
    loadJsonConfigSub: any;
    getCurrentPatentMedicineSub: any;
    medStatusCreateOrUpdateSub: any;
    listDrugMedicineSub: any;
    listDrugMedicine: any;
    loadedPatent: boolean = false;
    isUpdateDrug: boolean = false;

    
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
                this.fieldLabel = config.DRUG_MEDICINE;
            }            
        });

        this.medStatusCreateOrUpdateSub = this.store.select(fromRoot.medStatusCreateOrUpdate).subscribe((status) => {
            if(status == 2 && this.isUpdateDrug){
                this.toastr.success(this.isEdit ? "Cập nhật dược chất "+this.drug.name+" thành công.": "Thêm dược chất "+this.drug.name+" thành công");
                this.isUpdateDrug = false;
                this.router.navigateByUrl('duoc-chat');
            }
            if(status == 3 && this.isUpdateDrug){
                this.toastr.error("Có lỗi xảy ra vui lòng thử lại");
                this.isUpdateDrug = false;
            }
        });

        
    }
    ngOnInit() {     
        this.listDrugMedicineSub = this.store.select(fromRoot.getListDrugMedicine).subscribe((drugMedicines) => {
            if(drugMedicines){
                this.listDrugMedicine = drugMedicines;
            }else{
                this.loadList();
            }  
        });
    }

    loadList(){
        this.globalService.loadList('drug');
    }


    update(form){
        let { value } = form;       
        if(form.valid && this.checkDataExist(value)){
            const data = {
                name: value.name,
                code: value.code,
                id: this.drugId || 0
            }
            this.store.dispatch(new medicine.UpdateDataMedicine({
                type: 'drug', 
                data: data
            }));
            this.isUpdateDrug = true;
        }
    }


    ngOnDestroy() {
        this.medStatusCreateOrUpdateSub.unsubscribe();
        this.listDrugMedicineSub.unsubscribe();
    }

    checkDataExist(value){
        let checkList = this.listDrugMedicine;
        let currentDrugtId = this.drugId;
        checkList = _.filter(checkList, function(o) { return o.id != currentDrugtId; });        
        if(_.findIndex(checkList, { 'name': value.name }) != -1){
            this.toastr.error('Tên dược chất đã tồn tại');
            return false;
        }
        if(_.findIndex(checkList, { 'code': value.code }) != -1){
            this.toastr.error('Mã dược chất đã tồn tại');
            return false;
        }
        return true;
        
    }

}


