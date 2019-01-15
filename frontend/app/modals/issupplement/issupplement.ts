import { Component } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';

@Component({
    selector: 'lt-issupplement-modal',
    templateUrl: './issupplement.html',
    styleUrls: ['./issupplement.less']
})
export class IsSupplementModal extends DialogComponent<null, boolean> {

    notShowAgain: Boolean = true;

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
        if (this.notShowAgain) {
            localStorage.setItem('supplementNotShowAgain', 'yes');
        }
        this.result = true;
        document.body.classList.remove('body--block-scroll');
        this.close();
    }
}
