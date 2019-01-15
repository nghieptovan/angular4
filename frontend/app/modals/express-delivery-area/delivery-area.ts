import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';

import * as fromRoot from '../../store';

export interface IDeliveryAreaModal {
    // isDeliveryCondition: Boolean;
    vendorShippingArea: any;
}
@Component({
    selector: 'lt-express-delivery-area-modal',
    templateUrl: './delivery-area.html'
})
export class ExpressDeliveryAreaModal extends DialogComponent<IDeliveryAreaModal, boolean> implements IDeliveryAreaModal {
    vendorShippingArea: any;

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
