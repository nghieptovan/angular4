import { Component } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';

@Component({
    selector: 'modal-rma-express',
    templateUrl: './rma-express.html'
})
export class RMAExpressModal extends DialogComponent<null, boolean> {
    vendorSetting: any;

    constructor(dialogService: DialogService) {
        super(dialogService);
        // document.body.classList.add('body--block-scroll');
    }

    ngOnInit(){
        document.querySelector('modal-rma-express').parentElement.classList.add('modal-sidebar-popup');
        document.querySelector('.modal-sidebar-popup').classList.remove('fade');
    }

    closeModal() {
        // document.body.classList.remove('body--block-scroll');
        this.close();
        // window.location.replace('https://lotte.vn');
    }

    confirm() {
        // this.result = true;
        // document.body.classList.remove('body--block-scroll');
        this.close();
    }
}
