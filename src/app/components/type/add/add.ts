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
    selector: 'add-type',
    templateUrl: './add.html',
    styleUrls: ['./add.less']
})
export class AddType {
    type: any = {
        'code': "",
        'created_at': "",
        'id': 0,
        'name': "",
        'updated_at': ""
    };
    unitId: any = 0;
    textLabel: any;
    fieldLabel: any;

    constructor(
        private store: Store<fromRoot.AppState>,                
        private elementRef: ElementRef,
        private router: Router,
        private toastr: ToastrService,
        private activatedRoute: ActivatedRoute,
        ) {
            this.store.select(fromRoot.accountGetConfigJSON).subscribe((config) =>{
                if(config) {
                    this.textLabel = config.TEXT_LABEL;
                    this.fieldLabel = config.TYPE_MEDICINE;
                }            
            });
      
    }

}
