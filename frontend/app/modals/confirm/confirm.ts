import { Component } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';

@Component({
    selector: 'lt-confirm-modal',
    templateUrl: './confirm.html',
    styleUrls: ['./confirm.less']
})
export class ConfirmModal extends DialogComponent<null, boolean> {
    constructor(dialogService: DialogService) {
        super(dialogService);
        document.body.classList.add('body--block-scroll');
    }

    closeModal() {
        document.body.classList.remove('body--block-scroll');
        this.close();
    }

    confirm() {
        this.result = true;
        document.body.classList.remove('body--block-scroll');
        this.close();
    }
}
