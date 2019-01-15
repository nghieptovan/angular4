import {Component} from '@angular/core';
import {Store} from '@ngrx/store';

import * as fromRoot from '../../../store';
import {GeneralPage} from '../generalpage/generalpage';
import {DomSanitizer} from '@angular/platform-browser';
import * as _ from 'lodash';

declare var $;

@Component({
    selector: 'app-phonecard-page',
    templateUrl: './phonecard.html'
})
export class PhoneCardPage extends GeneralPage {

    constructor(protected store: Store<fromRoot.AppState>, protected domSanitizer: DomSanitizer) {
        super(store, domSanitizer);
    }
}