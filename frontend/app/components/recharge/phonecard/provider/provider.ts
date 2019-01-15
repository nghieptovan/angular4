import {Component} from '@angular/core';
import {Store} from '@ngrx/store';

import * as fromRoot from '../../../../store';
import * as rechargeAction from '../../../../store/recharge/recharge.actions';
import {GeneralProvider} from '../../general/provider/provider';

@Component({
    selector: 'app-phonecard-provider',
    templateUrl: './provider.html'
})

export class PhoneCardProvider extends GeneralProvider {
    selectedProvider: any = {
        'label': 'VinaPhone',
        'value': rechargeAction.DEFAULT_PHONECARD_PROVIDER
    };

    constructor(protected store: Store<fromRoot.AppState>) {
        super(store);
    }
}
