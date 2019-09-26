import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Dispatcher, Store } from '@ngrx/store';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';
import { AppConstants } from '../../../../app.constant';
import * as fromRoot from '../../../../store';
import * as medicine from '../../../../store/medicine/medicine.actions';

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
    currentMedicine: any;

    constructor(private store: Store<fromRoot.AppState>,
                private dispatcher: Dispatcher,
                private elementRef: ElementRef,
                private router: Router,
                private toastr: ToastrService,
                private activatedRoute: ActivatedRoute) {

            this.activatedRoute.params.subscribe(routeParams => {
                if(routeParams.id){
                    this.store.dispatch(new medicine.ListMedicine(routeParams.id));        
                }                
            });

            this.currentMedicineSub = this.store.select(fromRoot.getCurrentMedicine).subscribe((medicine) => {
                if(medicine && medicine.code == 200 && medicine.data){               
                    this.currentMedicine = medicine.data;
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
