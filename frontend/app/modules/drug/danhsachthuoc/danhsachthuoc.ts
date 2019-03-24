import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Dispatcher, Store } from '@ngrx/store';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';

import { AppConstants } from '../../../app.constant';
import * as fromRoot from '../../../store';
import * as account from '../../../store/account/account.actions';
import * as medicine from '../../../store/medicine/medicine.actions';
import * as bill from '../../../store/bill/bill.actions';
import { DataModel } from '../../../store/data';
import { GlobalService } from '../../../services/global.service';
import {inboxGrid} from '../../../../assets/js/inbox';
import { datatablessources } from '../../../../assets/js/data-tables/datatables-sources'; 
declare var $;

// Redux
@Component({
    selector: 'danhsachthuoc',
    templateUrl: './danhsachthuoc.html',
    styleUrls: ['./danhsachthuoc.less']
})
export class DanhSachThuoc {
    medicine: any;
    loadMedicineSub: any;
    errorMessage: any;

    constructor(private store: Store<fromRoot.AppState>,
                private dispatcher: Dispatcher,
                private elementRef: ElementRef,
                private router: Router,
                private toastr: ToastrService,
                private activatedRoute: ActivatedRoute,
                private globalService: GlobalService,
                private patientModel: DataModel) {
      
       
        this.loadMedicineSub = this.store.select(fromRoot.getListMedicine).subscribe((medicines) =>{            
            if(!medicines){
                this.store.dispatch(new medicine.ListMedicine(0));
            }else{
                if(medicines && medicines.code == 200){
                    this.medicine = medicines.data;
                    datatablessources();
                }
                // else{
                //     this.errorMessage = medicines.message;
                // }
            }
        });

        
    }
    ngOnDestroy(){
        this.loadMedicineSub.unsubscribe();
    }

}
