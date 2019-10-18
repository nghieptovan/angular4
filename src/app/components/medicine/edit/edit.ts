import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';
import { AppConstants } from '../../../app.constant';
import * as fromRoot from '../../../store';
import * as medicine from '../../../store/medicine/medicine.actions';
import { GlobalService } from '../../../services/global.service';
declare var $;
// Redux
@Component({
    selector: 'cap-nhat-thuoc',
    templateUrl: './edit.html',
    styleUrls: ['./edit.less']
})
export class CapNhatThuoc {
    @Input() uid: any;
    @ViewChild('updateForm') updateForm: NgForm;
    @Output('validationChange') validationChange = new EventEmitter<Boolean>();
    customers: any = {};

    currentMedicineSub: any;
    loadJsonConfigSub: any;
    currentMedicine: any;
    minLenght: any;
    textLabel: any;
    fieldLabel: any;
    medicineId: any = 0;

    constructor(private store: Store<fromRoot.AppState>,
        private elementRef: ElementRef,
        private router: Router,
        private toastr: ToastrService,
        private globalService: GlobalService,
        private activatedRoute: ActivatedRoute) {

        this.medicineId = activatedRoute.params['value'].id;

        this.loadJsonConfigSub = this.store.select(fromRoot.accountGetConfigJSON).subscribe((config) =>{
            if(config) {
                this.minLenght = config.MIN_LENGTH_6;
                this.textLabel = config.TEXT_LABEL;
                this.fieldLabel = config.MEDICINE_LABEL;
            }            
        });
        this.activatedRoute.params.subscribe(routeParams => {
            if(routeParams.id){
                this.store.dispatch(new medicine.ListMedicine(routeParams.id));        
            }                
        });

        this.currentMedicineSub = this.store.select(fromRoot.getCurrentMedicine).subscribe((medicine) => {
            if(medicine){               
                this.currentMedicine = medicine;
            }else{
                this.globalService.loadList('medicine', this.medicineId);
            }
        });
      
    }

    ngOnDestroy() {
        this.currentMedicineSub.unsubcribe();
    }
    goToList(){
        this.router.navigate(['/thuoc']);
    }


}
