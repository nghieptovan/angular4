import { Component } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';

@Component({
    selector: 'lt-register-success-modal',
    templateUrl: './success.html',
    styleUrls: ['./success.less']
})
export class RegisterSuccessModal extends DialogComponent<null, boolean> {
    constructor(dialogService: DialogService) {
        super(dialogService);
        document.body.classList.add('body--block-scroll');
    }

    closeModal() {
        document.body.classList.remove('body--block-scroll');
        this.close();
    }
}
