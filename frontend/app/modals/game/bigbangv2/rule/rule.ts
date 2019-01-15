import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";
import * as fromRoot from '../../../../store/index';
import { Dispatcher, Store } from '@ngrx/store';
import { AppConstants } from '../../../../app.constant';

declare var $;

@Component({
    selector: 'lt-bigbangv2-rule-modal',
    templateUrl: 'rule.html'
})

export class BigbangV2RuleModal extends DialogComponent<null, boolean> implements OnDestroy, OnInit {
    product: any;
    copied : any = false;
    shareUrl : any;


    constructor(dialogService: DialogService) {
        super(dialogService);
        document.body.classList.add('body--block-scroll');
    }

    closeModal() {
        document.body.classList.remove('body--block-scroll');
        this.close();
    }

    ngOnInit() {
    }



}
