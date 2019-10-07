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
    selector: 'edit-update-patent',
    templateUrl: './form.html',
    styleUrls: ['./form.less']
})
export class EditUpdatePatent implements OnInit {

    @Input() uid: any;
    @ViewChild('updateForm') updateForm: NgForm;
    @Output('validationChange') validationChange = new EventEmitter<Boolean>();
    @Input() isEdit: boolean;
    @Input() patent: any;
    patentId: any;
    minLenght: any;
    fieldLabel: any;
    textLabel: any;
    loadJsonConfigSub: any;
    getCurrentPatentMedicineSub: any;
    medStatusCreateOrUpdateSub: any;
    loadedPatent: boolean = false;
    isUpdatePatient: boolean = false;

    
    constructor(private store: Store<fromRoot.AppState>,        
        private elementRef: ElementRef,
        private router: Router,
        private toastr: ToastrService,
        private activatedRoute: ActivatedRoute,
        private globalService: GlobalService,
        private patientModel: DataModel) {
        this.patentId = activatedRoute.params['value'].id;
        formvalidation();
        this.store.select(fromRoot.accountGetConfigJSON).subscribe((config) => {
            if(config) {
                this.textLabel = config.TEXT_LABEL;
                this.fieldLabel = config.PATENT_MEDICINE;
            }            
        });

        this.getCurrentPatentMedicineSub = this.store.select(fromRoot.getCurrentPatentMedicine).subscribe((patent) => {
            if(patent && patent.id > 0){
                this.patent = patent;
            }
            if(patent && patent.id == -1){
                this.toastr.error('Không tìm thấy biệt dược, vui lòng thử lại');
                this.router.navigateByUrl('biet-duoc');
            }
        });

        this.medStatusCreateOrUpdateSub = this.store.select(fromRoot.medStatusCreateOrUpdate).subscribe((status) => {
            if(status == 2 && this.isUpdatePatient){
                this.toastr.success(this.isEdit ? "Cập nhật biệt dược "+this.patent.name+" thành công.": "Thêm biệt dược "+this.patent.name+" thành công");
                this.isUpdatePatient = false;
                this.router.navigateByUrl('biet-duoc');
            }
            if(status == 3 && this.isUpdatePatient){
                this.toastr.error("Có lỗi xảy ra vui lòng thử lại");
                this.isUpdatePatient = false;
            }
        });
    }
    ngOnInit() {        
        if(this.isEdit){
            this.store.dispatch(new medicine.LoadPatentMedicine(this.patentId));
        }  
    }


    update(form){
        let { value } = form;       
        if(form.valid){
            const data = {
                name: value.name,
                code: value.code,
                patentId: this.patentId || 0
            }
            this.store.dispatch(new medicine.UpdatePatentMedicine(data));
            this.isUpdatePatient = true;
        }
    }


    ngOnDestroy() {
        this.getCurrentPatentMedicineSub.unsubscribe();
        this.medStatusCreateOrUpdateSub.unsubscribe();
    }

}


