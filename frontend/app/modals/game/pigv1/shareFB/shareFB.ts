import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";
import * as fromRoot from '../../../../store/index';
import { Dispatcher, Store } from '@ngrx/store';
import { AppConstants } from '../../../../app.constant';

declare var $;

@Component({
    selector: 'lt-pigv1-shareFB-modal',
    templateUrl: 'shareFB.html'
})

export class PigV1ShareFBModal extends DialogComponent<null, boolean> implements OnDestroy, OnInit {
    product: any;
    copied : any = false;
    shareUrl : any;

    baseURL : any = '/game/pig-v1?mobile=no';
    playURL : any = '/game/pig-v1/play?mobile=no';
    gameName = 'pigv1';

    constructor(dialogService: DialogService) {
        super(dialogService);
        document.body.classList.add('body--block-scroll');
    }

    closeModal() {
        document.body.classList.remove('body--block-scroll');
        this.close();
        setTimeout(() => {
            location.replace(this.baseURL);
        },500)
    }

    ngOnInit() {
    }



}
