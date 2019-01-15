import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {DialogComponent, DialogService} from 'ng2-bootstrap-modal';
import * as _ from 'lodash';
import * as fromRoot from '../../store';

export interface IFSFreeshippingAreaModal {
    vendorFreeShippingRule: Array<any>;
}

@Component({
    selector: 'lt-fs-freeshipping-area-modal',
    templateUrl: './freeshipping-area.html'
})

export class FSFreeshippingAreaModal extends DialogComponent<null, boolean> implements IFSFreeshippingAreaModal {
    vendorFreeShippingRule: Array<any> = [];

    constructor(dialogService: DialogService, private store: Store<fromRoot.AppState>) {
        super(dialogService);
        document.body.classList.add('body--block-scroll');
    }

    ngOnInit() {
    }

    closeModal() {
        document.body.classList.remove('body--block-scroll');
        this.close();
    }

    ngOnDestroy() {
    }
}
