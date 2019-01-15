import {Component} from '@angular/core';
import {Store} from '@ngrx/store';

import * as fromRoot from '../../../../store';
import * as rechargeAction from '../../../../store/recharge/recharge.actions';
import {GeneralProvider} from '../../general/provider/provider';

@Component({
    selector: 'app-topup-provider',
    templateUrl: './provider.html'
})
export class TopupProvider extends GeneralProvider {
    selectedProvider: any = {
        'label': 'VinaPhone',
        'value': rechargeAction.DEFAULT_TOPUP_PROVIDER
    };

    constructor(protected store: Store<fromRoot.AppState>) {
        super(store);
    }
}
