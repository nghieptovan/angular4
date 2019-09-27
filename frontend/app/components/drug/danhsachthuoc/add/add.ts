import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';

import { AppConstants } from '../../../../app.constant';
import * as fromRoot from '../../../../store';
import * as account from '../../../../store/account/account.actions';

declare var $;

// Redux
@Component({
    selector: 'them-thuoc',
    templateUrl: './add.html',
    styleUrls: ['./add.less']
})
export class ThemThuoc {
    isEdit: boolean = false;
    // @Output() isEditsssssssssss: boolean = false;
    constructor(private store: Store<fromRoot.AppState>,
                private elementRef: ElementRef,
                private router: Router,
                private toastr: ToastrService,
                private activatedRoute: ActivatedRoute) {
                      
    }

    goToList(){
        this.router.navigate(['/thuoc']);
    }


}
