import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../store/index';

@Component({
    selector: 'lt-addressbook-modal',
    templateUrl: './addressbook.html',
    styleUrls: ['./addressbook.less']
})
export class AddressBookModal extends DialogComponent<null, boolean> {

    userInfo$: Observable<any>;
    constructor(dialogService: DialogService, store: Store<fromRoot.AppState>) {
        super(dialogService);
        this.userInfo$ = store.select(fromRoot.accountGetInfo);
        document.body.classList.add('body--block-scroll');
    }

    closeModal() {
        document.body.classList.remove('body--block-scroll');
        this.close();
    }

    selectAddress(address) {
        this.result = address;
        document.body.classList.remove('body--block-scroll');
        this.close();
    }
}
