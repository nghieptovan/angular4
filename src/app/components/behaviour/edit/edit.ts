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
    selector: 'edit-behaviour',
    templateUrl: './edit.html',
    styleUrls: ['./edit.less']
})
export class EditBehaviour {
    minLenght: any;
    fieldLabel: any;
    behaviourId: any = 0;
    textLabel: any;
    behaviour: any;
    listBehaviourMedicineSub: any;
    listBehaviourMedicine: any;
    constructor(
        private store: Store<fromRoot.AppState>,        
        private elementRef: ElementRef,
        private router: Router,
        private toastr: ToastrService,
        private activatedRoute: ActivatedRoute,
        private globalService: GlobalService,
        private patientModel: DataModel
    ) {        
        this.behaviourId = activatedRoute.params['value'].id;
        this.store.select(fromRoot.accountGetConfigJSON).subscribe((config) =>{
            if(config) {
                this.textLabel = config.TEXT_LABEL;
                this.fieldLabel = config.BEHAVIOUR_MEDICINE;
            }      
            this.listBehaviourMedicineSub = this.store.select(fromRoot.getListBehaviourMedicine).subscribe((behaviourMedicines) => {
                if(behaviourMedicines){
                    this.listBehaviourMedicine = behaviourMedicines;
                    if(this.behaviourId != 0){
                        this.behaviour = _.find(behaviourMedicines, (behaviour) => {
                            return behaviour.id == this.behaviourId;
                        })
                    }
                }else{
                    this.store.dispatch(new medicine.LoadBehaviourMedicine(0));
                }  
            });    
        });
                          
    }
    ngOnDestroy() {
        this.listBehaviourMedicineSub.unsubscribe();
    }

}
