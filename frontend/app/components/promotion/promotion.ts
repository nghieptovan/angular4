import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';

import * as fromRoot from '../../store/index';

@Component({
    selector: 'lt-left-promotion',
    templateUrl: './promotion.html',
    styleUrls: ['./promotion.less']
})
export class LtLeftPromotion {

    leftPromotion: any;

    leftPromotionSub: any;
    constructor(private store: Store<fromRoot.AppState>, private domSanitizer: DomSanitizer) {
        this.leftPromotionSub = this.store.select(fromRoot.commonGetCmsContents)
            .subscribe((cms) => {
                this.leftPromotion = _.find(cms, (block: any) => block.identifier === 'left_block');
                if (this.leftPromotion) {
                    this.leftPromotion = this.domSanitizer.bypassSecurityTrustHtml(this.leftPromotion.content);
                } else {
                    this.leftPromotion = null;
                }
            });
    }

    ngOnDestroy() {
        this.leftPromotionSub.unsubscribe();
    }
}
