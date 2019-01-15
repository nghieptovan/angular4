import {Component, OnDestroy} from '@angular/core';
import {Store} from '@ngrx/store';
import {DialogComponent, DialogService} from 'ng2-bootstrap-modal';
import * as _ from 'lodash';
import * as fromRoot from '../../store';

@Component({
    selector: 'lt-freeshipping-area-modal',
    templateUrl: './freeshipping-area.html',
    styleUrls: ['./freeshipping-area.less']
})
export class FreeshippingAreaModal extends DialogComponent<null, boolean> implements OnDestroy {
    vendorShipping: any;
    vendorSub: any;
    vendorId: any;
    freeShipPopup: any;

    constructor(dialogService: DialogService, private store: Store<fromRoot.AppState>) {
        super(dialogService);
        document.body.classList.add('body--block-scroll');
    }
    ngOnInit() {
        this.vendorSub = this.store.select(fromRoot.checkoutGetShippingVendors)
            .subscribe((vendors) => {
                this.vendorShipping = vendors;
                if (this.vendorShipping.by_group) {
                    _.map(this.vendorShipping.by_group, (vendor: any) => {
                        if (this.vendorId === vendor.vendor_id && !_.isEmpty(vendor.vendor_free_ship_popup)) {
                            this.freeShipPopup = vendor.vendor_free_ship_popup;
                        }
                    });
                }
            });
    }
    closeModal() {
        document.body.classList.remove('body--block-scroll');
        this.close();
    }

    ngOnDestroy() {
        this.vendorSub.unsubscribe();
    }
}
