import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";
import * as fromRoot from '../../../../store/index';
import { Dispatcher, Store } from '@ngrx/store';
import { AppConstants } from '../../../../app.constant';
import * as PigV1Actions from '../../../../store/game/pigv1/pigv1.actions';
import { Pigv1Service } from '../../../../store/game/pigv1/pigv1.service';
import { PigV1ShareFBModal } from '../../../../modals/game/pigv1/shareFB/shareFB';
import { PigV1LpointMemberModal } from '../../../../modals/game/pigv1/lpoint/member/member';


declare var $;

@Component({
    selector: 'lt-pigv1-result-modal',
    templateUrl: 'result.html'
})

export class PigV1ResultModal extends DialogComponent<null, boolean> implements OnDestroy, OnInit {

    resultSub: any;
    result: any;
    userInfo:any;

    baseURL : any = '/game/pig-v1?mobile=no';
    playURL : any = '/game/pig-v1/play?mobile=no';
    gameName = 'pigv1';
    constructor(dialogService: DialogService,private store: Store<fromRoot.AppState>) {
        super(dialogService);
        document.body.classList.add('body--block-scroll');
    }

    ngOnInit(){
        this.result = JSON.parse(localStorage.getItem('game'+this.gameName+'DataFinish'));
        this.userInfo =  JSON.parse(localStorage.getItem('userInfo'));
        //localStorage.removeItem('gameDataFinish');
    }

    closeModal() {
        document.body.classList.remove('body--block-scroll');
        this.close();
        setTimeout(() => {
            location.replace(this.baseURL);
        },500)
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
            this.dialogService.addDialog(PigV1ShareFBModal);

        }else{
            const url = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(location.href);
            const intWidth = '500';
            const intHeight = '400';
            const strParam = 'width=' + intWidth + ',height=' + intHeight + ',resizable=no';
            window.open(url, 'LotteVN', strParam).focus();

            setTimeout(() => {
                const token = localStorage.getItem('gameToken_'+this.gameName);
                this.store.dispatch(new PigV1Actions.LoadShareFB(token));
            },2000)

        }
        setTimeout(() => {
            location.replace(this.baseURL);
        },12000)

    }

    lpointPopup(){
        this.close();
        this.dialogService.addDialog(PigV1LpointMemberModal);
    }
}
