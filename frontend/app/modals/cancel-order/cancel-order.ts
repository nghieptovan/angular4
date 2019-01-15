import { Component } from '@angular/core';
import { Store, Dispatcher } from '@ngrx/store';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../store/index';
import * as account from '../../store/account/account.actions';

export interface ICancelOrderModal {
    order: any;
}
@Component({
    selector: 'lt-cancelorder-modal',
    templateUrl: './cancel-order.html',
    styleUrls: ['./cancel-order.less']
})
export class CancelOrderModal extends DialogComponent<ICancelOrderModal, boolean> implements ICancelOrderModal {
    order: any;
    store: any;
    data: any = {
        cancellation_type: null
    };
    userInfo$: Observable<any>;

    dispatcherSub: any;
    constructor(dialogService: DialogService, store: Store<fromRoot.AppState>, private dispatcher: Dispatcher) {
        super(dialogService);
        this.store = store;
        document.body.classList.add('body--block-scroll');
    }

    closeModal() {
        document.body.classList.remove('body--block-scroll');
        this.close();
    }

    cancelOrder(form) {
        if (form.valid) {
            const actionPayload = {
                orderId: this.order.entity_id,
                data: form.value
            };

            this.store.dispatch(new account.CancelOrder(actionPayload));
        }
    }
}
