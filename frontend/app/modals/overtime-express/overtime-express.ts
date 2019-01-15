import { Component } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';

@Component({
    selector: 'modal-overtime-express',
    templateUrl: './overtime-express.html'
})
export class OvertimeExpressModal extends DialogComponent<null, boolean> {
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

}
