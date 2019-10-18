import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';

import { AppConstants } from '../../../app.constant';
import * as fromRoot from '../../../store';
import * as account from '../../../store/account/account.actions';

declare var $;

// Redux
@Component({
    selector: 'them-thuoc',
    templateUrl: './add.html',
    styleUrls: ['./add.less']
})
export class ThemThuoc {
    isEdit: boolean = false;
    currentMedicine: any = {
        "id": 0,
        "name": "",
        "display_name": "",
        "description": "",
        "patent_medicine_name":"",
        "drug_name":"",
        "amount": 0,
        "typemedicine_id": 0,
        "behaviourmedicine_id": 0,
        "sellprice": 0,
        "importedprice": 0,
        "drug_id": 0,
        "patentmedicine_id": 0,
        "unit_id": 0,
        "type_medicine": {
          "name": "",
          "code": ""
        },
        "behaviour_medicine": {
          "name": "",
          "code": ""
        },
        "unit": {
          "name": "",
          "code": ""
        },
        "drug": {
          "code": "",
          "name": ""
        },
        "patent_medicine": {
          "name": "",
          "code": ""
        }
    };
    minLenght: any;
    textLabel: any;
    fieldLabel: any;
    loadJsonConfigSub: any;
    constructor(private store: Store<fromRoot.AppState>,
        private elementRef: ElementRef,
        private router: Router,
        private toastr: ToastrService,
        private activatedRoute: ActivatedRoute) {
        this.loadJsonConfigSub = this.store.select(fromRoot.accountGetConfigJSON).subscribe((config) =>{
            if(config) {
                this.minLenght = config.MIN_LENGTH_6;
                this.textLabel = config.TEXT_LABEL;
                this.fieldLabel = config.MEDICINE_LABEL;
            }            
        });        
    }

    goToList(){
        this.router.navigate(['/thuoc']);
    }


}
