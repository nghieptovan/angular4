import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";
import * as fromRoot from '../../../../store/index';
import { Dispatcher, Store } from '@ngrx/store';
import { AppConstants } from '../../../../app.constant';
import * as Pigv1Actions from '../../../../store/game/pigv1/pigv1.actions';
import { Pigv1Service } from '../../../../store/game/pigv1/pigv1.service';
import * as moment from 'moment';

declare var $;

@Component({
    selector: 'lt-pigv1-history-modal',
    templateUrl: 'history.html'
})

export class PigV1HistoryModal extends DialogComponent<null, boolean> implements OnDestroy, OnInit {

    historySub: any;
    history: any;
    gameName = 'pigv1';


    constructor(dialogService: DialogService,private store: Store<fromRoot.AppState>) {
        super(dialogService);
        document.body.classList.add('body--block-scroll');
    }

    ngOnInit(){
        const token = localStorage.getItem('gameToken_'+this.gameName);
        this.historySub = this.store.select(fromRoot.pigv1GetHistory).subscribe(state => {
            this.history = state;
        });this.store.dispatch(new Pigv1Actions.LoadHistory(token));
    }

    closeModal() {
        document.body.classList.remove('body--block-scroll');
        this.close();
    }

    formatDate(unixTime){
        moment.locale('vi');
        return moment(unixTime).fromNow();

    }
}
