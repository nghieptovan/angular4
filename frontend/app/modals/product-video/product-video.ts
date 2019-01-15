import { Component } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AppConstants } from '../../app.constant';
import * as fromRoot from '../../store';

import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { DomSanitizer } from '@angular/platform-browser';

export interface IProductVideoModal {
    videoContent: any;
}

@Component({
    selector: 'lt-product-video-modal',
    templateUrl: './product-video.html',
    styleUrls: ['./product-video.less']
})
export class ProductVideoModal extends DialogComponent<IProductVideoModal, boolean> implements IProductVideoModal {
    videoContent: any;
    constructor(dialogService: DialogService, private sanitizer: DomSanitizer ) {
        super(dialogService);
        document.body.classList.add('body--block-scroll');
    }

    closeModal() {
        document.body.classList.remove('body--block-scroll');
        this.close();
    }

    safehtml(html){
        return this.sanitizer.bypassSecurityTrustHtml(html);
    }
}
