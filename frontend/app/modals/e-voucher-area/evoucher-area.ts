import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';

import * as fromRoot from '../../store';

export interface IEVoucherAreaModal {
    storeArea: any;
    locationSelected: any;
}
@Component({
    selector: 'lt-evoucher-area-modal',
    templateUrl: './evoucher-area.html'
})
export class EVoucherAreaModal extends DialogComponent<IEVoucherAreaModal, boolean> implements IEVoucherAreaModal {
    storeArea: any;
    locationSelected: any;

    constructor(dialogService: DialogService, private store: Store<fromRoot.AppState>) {
        super(dialogService);

    }

    closeModal() {
        document.body.classList.remove('body--block-scroll');
        this.close();
    }

    ngOnDestroy() {
    }
}
