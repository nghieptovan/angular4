import {Component} from '@angular/core';
import {Store} from '@ngrx/store';

import * as fromRoot from '../../../../store';
import * as rechargeAction from '../../../../store/recharge/recharge.actions';

@Component({
    selector: 'app-general-provider',
    templateUrl: './provider.html'
})
export class GeneralProvider {
    providerSub: any;
    providers: any;

    constructor(protected store: Store<fromRoot.AppState>) {
        this.providerSub = this.store.select(fromRoot.rechargeGetProvider).subscribe(state => {
            this.providers = state;
        });

        this.loadProvider();
    }

    ngOnDestroy() {
        this.providerSub.unsubscribe();
    }

    loadProvider() {
        this.store.dispatch(new rechargeAction.LoadProviderRecharge(null));
    }

    selectProvider(provider) {
        this.store.dispatch(new rechargeAction.SelectProvider({selectedProvider: provider}));
    }
}
