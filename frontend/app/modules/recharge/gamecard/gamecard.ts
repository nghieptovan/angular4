import {Component} from '@angular/core';
import {Store} from '@ngrx/store';

import {AppConstants} from '../../../app.constant';
import * as fromRoot from '../../../store';
import {GeneralPage} from '../generalpage/generalpage';
import {DomSanitizer} from '@angular/platform-browser';
import * as _ from 'lodash';

declare let FB: any;
declare var $;

@Component({
    selector: 'app-gamecard-page',
    templateUrl: './gamecard.html'
})
export class GameCardPage extends GeneralPage {


    constructor(protected store: Store<fromRoot.AppState>, protected domSanitizer: DomSanitizer) {
        super(store, domSanitizer);

    }

}