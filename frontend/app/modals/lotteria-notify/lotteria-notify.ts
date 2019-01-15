import { Component } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';

@Component({
    selector: 'modal-lotteria-notify',
    templateUrl: './lotteria-notify.html'
})
export class LotteriaNotifyModal extends DialogComponent<null, boolean> {
    openTime: any;
    closeTime: any;

    constructor(dialogService: DialogService) {
        super(dialogService);
        document.body.classList.add('body--block-scroll');
    }

    closeModal() {
        document.body.classList.remove('body--block-scroll');
        this.close();
        window.location.replace('https://lotte.vn');
    }

    confirm() {
        this.result = true;
        document.body.classList.remove('body--block-scroll');
        this.close();
    }

    getStringTime(date) {
        return String.prototype.toStringTimeFormat(date);
    }

}
