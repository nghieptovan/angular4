import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";
import * as fromRoot from '../../../../store/index';
import { Dispatcher, Store } from '@ngrx/store';
import { AppConstants } from '../../../../app.constant';
import * as BigBangV2Actions from '../../../../store/game/bigbangv2/bigbangv2.actions';
import { BigBangV2Service } from '../../../../store/game/bigbangv2/bigbangv2.service';
import { BigbangV2ShareFBModal } from '../../../../modals/game/bigbangv2/shareFB/shareFB';

declare var $;

@Component({
    selector: 'lt-bigbangv2-result-modal',
    templateUrl: 'result.html'
})

export class BigbangV2ResultModal extends DialogComponent<null, boolean> implements OnDestroy, OnInit {

    resultSub: any;
    result: any;

    baseURL : any = '/game/big-bang?mobile=no';
    playURL : any = '/game/big-bang/play?mobile=no';

    constructor(dialogService: DialogService,private store: Store<fromRoot.AppState>) {
        super(dialogService);
        document.body.classList.add('body--block-scroll');
    }

    ngOnInit(){
        this.result = JSON.parse(localStorage.getItem('gameDataFinish'));
        //localStorage.removeItem('gameDataFinish');
    }

    closeModal() {
        document.body.classList.remove('body--block-scroll');
        this.close();
    }

    returnHome(){
        location.replace(this.baseURL);
    }

    continuePlay(){
        location.reload(true);
    }

    bigbangClass(){
        if(this.result.prize.id){
            return 'bigbang-game-luotchoi-popup';
        }else{
            return 'bigbang-game-message-popup';
        }
    }

    shareFB() {
        if(this.result.player.facebookShared){
            this.close();
            this.dialogService.addDialog(BigbangV2ShareFBModal);

        }else{
            const url = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(location.href);
            const intWidth = '500';
            const intHeight = '400';
            const strParam = 'width=' + intWidth + ',height=' + intHeight + ',resizable=no';
            window.open(url, 'LotteVN', strParam).focus();

            setTimeout(() => {
                const token = localStorage.getItem('gameToken');
                this.store.dispatch(new BigBangV2Actions.LoadShareFB(token));
            },3000)

        }
        setTimeout(() => {
            location.replace(this.baseURL);
        },60000)

    }

}
