import {Component} from '@angular/core';
import {Store} from '@ngrx/store';

import * as fromRoot from '../../../../store';
import * as rechargeAction from '../../../../store/recharge/recharge.actions';
import {GeneralProvider} from '../../general/provider/provider';

@Component({
    selector: 'app-gamecard-provider',
    templateUrl: './provider.html'
})
export class GameCardProvider extends GeneralProvider {
    selectedProvider: any = {
        'label': 'FPT',
        'value': rechargeAction.DEFAULT_GAMECARD_PROVIDER
    };

    constructor(protected store: Store<fromRoot.AppState>) {
        super(store);
    }
}
