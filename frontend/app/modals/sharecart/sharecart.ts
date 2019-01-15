import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";
import * as fromRoot from '../../store/index';
import { Dispatcher, Store } from '@ngrx/store';
import { AppConstants } from '../../app.constant';

declare var $;

@Component({
    selector: 'lt-sharecart-modal',
    templateUrl: 'sharecart.html'
})

export class ShareCartModal extends DialogComponent<null, boolean> implements OnDestroy, OnInit {
    product: any;
    copied : any = false;
    shareUrl : any;


    constructor(dialogService: DialogService) {
        super(dialogService);
        this.shareUrl = this.cartUrl();
        document.body.classList.add('body--block-scroll');
    }

    closeModal() {
        document.body.classList.remove('body--block-scroll');
        this.close();
    }

    ngOnInit() {
    }

    cartUrl(){
        const baseUrl = AppConstants.HOST_NAME;
        const cartId = localStorage.getItem('cartId');
        return baseUrl+'/sm_cartcustom/share/index/shared_id/' + cartId;
    }

    copyToClipboard(){
        const el = document.createElement('textarea');
        el.value = this.shareUrl;
        document.body.appendChild(el);
        el.select();
        var result = document.execCommand('copy');
        document.body.removeChild(el);
        this.copied = true;
    }

}
