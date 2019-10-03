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
    selector: 'add-patent',
    templateUrl: './add.html',
    styleUrls: ['./add.less']
})
export class AddPatent {
    @Input() uid: any;
    @ViewChild('updateForm') updateForm: NgForm;
    @Output('validationChange') validationChange = new EventEmitter<Boolean>();
    customers: any = {};
    

    dispatcherSub: any;
    createAccountSub: any;
    roleSet: any;
    usernameMessage: any;
    passwordMessage: any;
    roleMessage: any;
    fullnameMessage: any;
    roleId: any;
    textLabel: any;
    showRole: boolean = false;
    constructor(private store: Store<fromRoot.AppState>,
                
                private elementRef: ElementRef,
                private router: Router,
                private toastr: ToastrService,
                private activatedRoute: ActivatedRoute,
                ) {
                    this.store.select(fromRoot.accountGetConfigJSON).subscribe((config) =>{
                        if(config) {
                            this.textLabel = config.TEXT_LABEL;
                        }            
                    });
      console.log('add patient');
      
    }




}
