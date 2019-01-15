import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";
import * as fromRoot from '../../../../store/index';
import { Dispatcher, Store } from '@ngrx/store';
import { AppConstants } from '../../../../app.constant';
import * as BigBangV2Actions from '../../../../store/game/bigbangv2/bigbangv2.actions';
import { BigBangV2Service } from '../../../../store/game/bigbangv2/bigbangv2.service';
import { DatePipe } from '@angular/common';

declare var $;

@Component({
    selector: 'lt-bigbangv2-history-modal',
    templateUrl: 'history.html'
})

export class BigbangV2HistoryModal extends DialogComponent<null, boolean> implements OnDestroy, OnInit {

    historySub: any;
    history: any;


    constructor(dialogService: DialogService,private store: Store<fromRoot.AppState>) {
        super(dialogService);
        document.body.classList.add('body--block-scroll');
    }

    ngOnInit(){
        const token = localStorage.getItem('gameToken');
        this.historySub = this.store.select(fromRoot.bigbangv2GetHistory).subscribe(state => {
            this.history = state;
        });this.store.dispatch(new BigBangV2Actions.LoadHistory(token));
    }

    closeModal() {
        document.body.classList.remove('body--block-scroll');
        this.close();
    }

    formatDate(unixTime){
        return new DatePipe('vi-VN').transform( new Date(unixTime), 'dd/MM/yyyy H:s');
    }
}
