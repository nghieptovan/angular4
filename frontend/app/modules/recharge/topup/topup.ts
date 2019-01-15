import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';

import {AppConstants} from '../../../app.constant';
import * as fromRoot from '../../../store';
import {GeneralPage} from '../generalpage/generalpage';
import {DomSanitizer} from '@angular/platform-browser';
import * as _ from 'lodash';

declare let FB: any;
declare var $;

@Component({
    selector: 'app-topup-page',
    templateUrl: './topup.html'
})
export class TopupPage extends GeneralPage {

    userPhoneNumber: string;
    userPhoneNumberSub: any;

    constructor(protected store: Store<fromRoot.AppState>, protected domSanitizer: DomSanitizer) {
        super(store, domSanitizer);
        this.userPhoneNumberSub = this.store.select(fromRoot.rechargeGetCartRequest).subscribe(state => {
            this.userPhoneNumber = state.user_phone_number;
        });
    }
}