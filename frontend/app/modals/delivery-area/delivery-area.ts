import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';

import * as fromRoot from '../../store';

export interface IDeliveryAreaModal {
    isDeliveryCondition: Boolean;
}
@Component({
    selector: 'lt-delivery-area-modal',
    templateUrl: './delivery-area.html',
    styleUrls: ['./delivery-area.less']
})
export class DeliveryAreaModal extends DialogComponent<IDeliveryAreaModal, boolean> implements IDeliveryAreaModal {
    vendorAreaShipPopup: any;
    vendorShippingArea: any;
    freeShipPopup: any;
    isDeliveryCondition: Boolean;

    productDetailSub: any;
    constructor(dialogService: DialogService, private store: Store<fromRoot.AppState>) {
        super(dialogService);
        document.body.classList.add('body--block-scroll');
        this.productDetailSub = this.store.select(fromRoot.productsGetDetails)
            .subscribe((detail) => {
                this.vendorAreaShipPopup = detail.extension_attributes.vendor_area_ship_popup;
                this.vendorShippingArea = detail.extension_attributes.vendor_shipping_area_full;
                this.freeShipPopup = detail.extension_attributes.vendor_free_ship_popup;
                if (this.freeShipPopup) {
                    this.freeShipPopup = JSON.parse(this.freeShipPopup);
                }
            });
    }

    closeModal() {
        document.body.classList.remove('body--block-scroll');
        this.close();
    }

    ngOnDestroy() {
        this.productDetailSub.unsubscribe();
    }
}
