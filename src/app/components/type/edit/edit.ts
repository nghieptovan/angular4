import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import * as fromRoot from '../../../store';
import * as medicine from '../../../store/medicine/medicine.actions';
import { DataModel } from '../../../store/data';
import { GlobalService } from '../../../services/global.service';
declare var $;

// Redux
@Component({
    selector: 'edit-type',
    templateUrl: './edit.html',
    styleUrls: ['./edit.less']
})
export class EditType {
    minLenght: any;
    fieldLabel: any;
    typeId: any = 0;
    textLabel: any;
    type: any;
    listTypeMedicineSub: any;
    listTypeMedicine: any;
    constructor(
        private store: Store<fromRoot.AppState>,        
        private elementRef: ElementRef,
        private router: Router,
        private toastr: ToastrService,
        private activatedRoute: ActivatedRoute,
        private globalService: GlobalService,
        private patientModel: DataModel
    ) {        
        this.typeId = activatedRoute.params['value'].id;
        this.store.select(fromRoot.accountGetConfigJSON).subscribe((config) =>{
            if(config) {
                this.textLabel = config.TEXT_LABEL;
                this.fieldLabel = config.TYPE_MEDICINE;
            }      
            this.listTypeMedicineSub = this.store.select(fromRoot.getListTypeMedicine).subscribe((typeMedicines) => {
                if(typeMedicines){
                    this.listTypeMedicine = typeMedicines;
                    if(this.typeId != 0){
                        this.type = _.find(typeMedicines, (type) => {
                            return type.id == this.typeId;
                        })
                    }
                }else{
                    this.store.dispatch(new medicine.LoadTypeMedicine(0));
                }  
            });    
        });
                          
    }
    ngOnDestroy() {
        this.listTypeMedicineSub.unsubscribe();
    }

}
