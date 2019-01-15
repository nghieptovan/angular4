import { Component } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';

@Component({
    selector: 'lt-comment-modal',
    templateUrl: './comment.html',
    styleUrls: ['./comment.less']
})
export class CommentModal extends DialogComponent<null, boolean> {

    constructor(dialogService: DialogService) {
        super(dialogService);
        document.body.classList.add('body--block-scroll');
    }

    closeModal() {
        document.body.classList.remove('body--block-scroll');
        this.close();
    }

}
