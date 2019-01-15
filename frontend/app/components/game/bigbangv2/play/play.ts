import { Component, OnInit, AfterViewInit,ViewEncapsulation, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { DialogService } from 'ng2-bootstrap-modal';
import { BigbangV2ResultModal } from '../../../../modals/game/bigbangv2/result/result';

import * as fromRoot from '../../../../store';
import * as bigbangv2 from '../../../../store/game/bigbangv2/bigbangv2.actions';

//import * as Animation from '../animation.js';

declare var $;

@Component({
    selector: 'app-game-bigbangv2-play',
    templateUrl: './play.html',
    styleUrls: ['../bigbang.css'],
    encapsulation: ViewEncapsulation.None

})
export class BigBangV2Play {

    baseURL : any = '/game/big-bang?mobile=no';
    playURL : any = '/game/big-bang/play?mobile=no';

    currentParams: any;
    Math: any;
    ngoiBomStyles:any;

    clicking: boolean = false;
    coutClicked : number = 0;

    startGame: any = false;
    endGame: any = false;

    timerLeft : any = 30;
    countDownLeft : any = 3; // second buffer before countdown
    slideDown : any = 4; // second buffer before load game
    totalTime: any ;
    bufferTime: any = 0;

    totalProgessBarHeight : any = 0;
    progessBarHeight: any = 0;
    perHeightLevel:any;
    scorePerLevel: any;

    userLevel:any = 0;
    levels : any = [];

    randomTop : any = 150;
    randomLeft : any = 450;
    randomTimeMoveX:any = 1.05;
    randomTimeMoveY:any = 1.4;

    playSub:any;
    play:any;
    startSub:any;
    start:any;
    finishSub:any;
    finish:any;
    settingsSub:any;
    settings:any;

    gameData        : any;
    gameDataStart   : any;
    gameDataFinish  : any;

    gameSession : any;
    gameId:any;

    gameToken:any = null;
    gameResult: any = {
        startedAt:null,
        finishedAt:null,
        session: null,
        score: null,
        level: null,
        actions : [
        ]
    };

    constructor(private store: Store<fromRoot.AppState>, private activatedRoute: ActivatedRoute,
        private dialogService: DialogService) {
        this.Math = Math;
        this.ngoiBomStyles = {
            'background-image': 'url(https://cdn.lotte.vn/media/gift/ngoibom.gif?c='+this.Math.floor(this.Math.random() * this.randomTop,1)+')'
        };
        this.activatedRoute.params.subscribe((params: any) => {
            if (this.currentParams !== params) {
                this.currentParams = params;
            }
        });

        this.settingsSub = this.store.select(fromRoot.bigbangv2GetGameSetting).subscribe(state => {
            this.settings  = state;
            this.timerLeft = this.settings.duration;
            this.totalTime = this.timerLeft + this.slideDown + this.bufferTime;
            this.levels    = this.settings.levels;
            if(typeof this.levels != 'undefined'){
                //this.totalProgessBarHeight = document.querySelector('.bar-inner').clientHeight == 0  ? 386 : document.querySelector('.bar-inner').clientHeight; // total height in px
                if(window.innerWidth <= 767){
                    this.totalProgessBarHeight = 217;
                }else{
                    this.totalProgessBarHeight = 386;
                }
                //console.log(window.innerWidth)
                //console.log(this.totalProgessBarHeight)
                this.perHeightLevel        = this.totalProgessBarHeight/(this.levels.length);
                this.scorePerLevel         = this.levels[0].score;
            }

        }); this.store.dispatch(new bigbangv2.LoadSettings());

        this.gameToken = localStorage.getItem('gameToken');
        if(this.gameToken == null){
            this.redirect(this.baseURL);
        }

        this.playSub = this.store.select(fromRoot.bigbangv2GetGameData).subscribe(state => {
            this.gameData = state;
            if(typeof this.gameData.error !== 'undefined'){
                if(this.gameData.error !== false){
                    this.redirect(this.baseURL);
                }
            }
        }); this.store.dispatch(new bigbangv2.Play(this.gameToken));

        setTimeout(() => {
            this.gameSession          = this.gameData.session;
            this.startSub = this.store.select(fromRoot.bigbangv2GetGameDataStart).subscribe(state => {
                this.gameDataStart         = state;
                this.gameResult.startedAt  = new Date(this.gameDataStart.startedAt).getTime();
            }); this.store.dispatch(new bigbangv2.Start({token:this.gameToken,session:this.gameSession}));
        },3000)


    }

    ngOnInit(){
        this.loadScript(this.detectDevTools());
        this.loadScript(this.checkdevTools());
        this.addScriptToBody();

    }

    ngAfterViewInit() {
        this.playGame();
    }

    ngOnDestroy(){
        this.settingsSub.unsubscribe();
        this.playSub.unsubscribe();
        this.startSub.unsubscribe();
    }

    playGame(){
        this.startGame = true;

        let slideDown = this.slideDown;
        let bomb      = document.querySelector('.lottie') as HTMLElement;;
        let wrapBomb  = document.querySelector('.bigbang-game');
        let explosion = document.querySelector('.explosion-img') as HTMLElement;

        let interval = setInterval(() => {

            this.totalTime  --;
            this.countDownLeft --;
            slideDown --;

            if(this.countDownLeft == 0){
                wrapBomb.classList.remove('bigbang-game-countdown');
            }

            if(slideDown == 0){
                bomb.classList.add('slideDown');
                this.startGame = true;
                this.endGame   = false;
            }

            if(slideDown == -1){
                bomb.style.top  = 0 + 'px';
                bomb.style.left = 0 + 'px';
                bomb.style.visibility = 'visible';
                bomb.classList.remove('slideDown');
                setTimeout(()=>{
                    bomb.classList.add('lottieAnimate');

                },500)
            }

            if(slideDown == -2){

            }

            if(this.totalTime  == 3){
                this.startGame = false;
                this.endGame   = true;
                setTimeout(()=>{
                    bomb.remove();
                },900)
            }

            if(this.totalTime  == -1){
            }
            //if(this.timerLeft < -1){
            if(this.totalTime  == 0){
                const tempDateTime         =  new Date(this.gameResult.startedAt);
                this.gameResult.finishedAt =  new Date(tempDateTime.setSeconds(tempDateTime.getSeconds() + (this.slideDown+this.timerLeft-this.totalTime))).getTime();
                this.gameResult.session    =  this.gameSession;
                this.gameResult.score      =  this.coutClicked;
                this.gameResult.level      =  this.userLevel;

                this.finishSub    = this.store.select(fromRoot.bigbangv2GetGameDataFinish).subscribe(state => {
                    this.gameDataFinish = JSON.stringify(state);
                    localStorage.setItem('gameDataFinish',this.gameDataFinish);

                    if(typeof state.error !== 'undefined'){
                        this.popupResult();
                    }

                }); this.store.dispatch(new bigbangv2.Finish({token:this.gameToken,data:this.gameResult}));

                clearInterval(interval);
            }
            this.clicking =  false;

        }, 1000);

    }

    loadScriptbyUrl(url: string) {
        const body = <HTMLDivElement> document.body;
        const script = document.createElement('script');
        script.innerHTML = '';
        script.src = url;
        script.async = false;
        script.defer = true;
        body.appendChild(script);
    }

    loadScript(content) {
        const body = <HTMLDivElement> document.body;
        const script = document.createElement('script');
        script.innerHTML = content;
        script.async = false;
        script.defer = true;
        body.appendChild(script);
    }

    loadStyles(content) {
        const body = <HTMLDivElement> document.body;
        const script = document.createElement('style');
        script.innerHTML = content;
        body.appendChild(script);
    }

    addScriptToBody(){
        const body = <HTMLDivElement> document.body;
        //body.setAttribute('oncontextmenu','return false');
        //body.setAttribute('onkeydown','return false');
        //body.setAttribute('onmousedown','return false');

    }

    checkLevelUser(){
        for (var i in this.levels) {
            if(this.coutClicked == this.levels[i].score){
                this.userLevel = this.levels[i].level;
                if(this.userLevel > 0 && typeof this.levels[this.userLevel] != 'undefined'){
                    this.scorePerLevel =  this.levels[this.userLevel].score - this.levels[this.userLevel-1].score
                }
                break;
            }
        }
    }

    checkProgessBar(){
        if(typeof this.levels[this.userLevel] == 'undefined') return 100;
        let heightPerClickInLevel = this.perHeightLevel/this.scorePerLevel
        this.progessBarHeight += heightPerClickInLevel;
    }

    startClickBomb(event){
        this.clicking =  true;
        this.coutClicked++;
        this.checkLevelUser();
        this.checkProgessBar();
        let cursorX   = event.pageX;
        let cursorY   = event.pageY;
        let clickTime = new Date().getTime();
        this.gameResult.actions.push({
            time:clickTime,x:cursorX,y:cursorY
        })
        //console.log(this.clicking)
    }

    endClickBomb(event){
        //this.clicking =  false;
    }

    animateDiv(bombClass){
        let animateBomb = 59;
        let bomb =  document.querySelector(bombClass);

        let intervalAnimate = setInterval(() => {
            animateBomb--;
            if(animateBomb <= 0){
                clearInterval(intervalAnimate);
            }
            let top  = this.Math.floor(this.Math.random() * this.randomTop,1); //height
            let left = this.Math.floor(this.Math.random() * this.randomLeft,1); //width

            bomb.style.top = top + 'px';
            bomb.style.left = left + 'px';
        }, 500);


    };

    popupResult(){
        this.dialogService.addDialog(BigbangV2ResultModal,{data:'111'});
    }

    detectDevTools(){
        return `
        (function () {
            'use strict';
            var devtools = {
                open: false,
                orientation: null
            };
            var threshold = 160;
            var emitEvent = function (state, orientation) {
                window.dispatchEvent(new CustomEvent('devtoolschange', {
                    detail: {
                        open: state,
                        orientation: orientation
                    }
                }));
            };

            setInterval(function () {
                var widthThreshold = window.outerWidth - window.innerWidth > threshold;
                var heightThreshold = window.outerHeight - window.innerHeight > threshold;
                var orientation = widthThreshold ? 'vertical' : 'horizontal';

                if (!(heightThreshold && widthThreshold) &&
                ((window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized) || widthThreshold || heightThreshold)) {
                    if (!devtools.open || devtools.orientation !== orientation) {
                        emitEvent(true, orientation);
                    }

                    devtools.open = true;
                    devtools.orientation = orientation;
                } else {
                    if (devtools.open) {
                        emitEvent(false, null);
                    }

                    devtools.open = false;
                    devtools.orientation = null;
                }
            }, 500);

            if (typeof module !== 'undefined' && module.exports) {
                module.exports = devtools;
            } else {
                window.devtools = devtools;
            }
        })();


        `;

    }

    checkdevTools(){
        return `
        // check if it's open
	//console.log('is DevTools1 open?', window.devtools.open);
	// check it's orientation, null if not open
	//console.log('and DevTools1 orientation?', window.devtools.orientation);


	// get notified when it's opened/closed or orientation changes
	window.addEventListener('devtoolschange', function (e) {
        //console.log('is DevTools open?', e.detail.open);
        if(e.detail.open){
            document.getElementById('maincontent').innerHTML = '<p>please close console</p>';
        }
		//console.log('and DevTools orientation?', e.detail.orientation);
	});
        `;
    }
    animationByStyle(){
        return `

        .lottieAnimate {
            -webkit-animation: moveX `+this.randomTimeMoveX+`s linear 0s infinite alternate, moveY `+this.randomTimeMoveY+`s linear 0s infinite alternate;
            -moz-animation: moveX `+this.randomTimeMoveX+`s linear 0s infinite alternate, moveY `+this.randomTimeMoveY+`s linear 0s infinite alternate;
            -o-animation: moveX `+this.randomTimeMoveX+`s linear 0s infinite alternate, moveY `+this.randomTimeMoveY+`s linear 0s infinite alternate;
            animation: moveX `+this.randomTimeMoveX+`s linear 0s infinite alternate, moveY `+this.randomTimeMoveY+`s linear 0s infinite alternate;
        }

        @-webkit-keyframes moveX {from { left: 0; } to { left:  `+this.randomLeft+`px; }}
        @-moz-keyframes moveX {from { left: 0; } to { left: `+this.randomLeft+`px; }}
        @-o-keyframes moveX {from { left: 0; } to { left: `+this.randomLeft+`px; }}
        @keyframes moveX {from { left: 0; } to { left: `+this.randomLeft+`px; }}

        @-webkit-keyframes moveY {from { top: 0; } to { top: `+this.randomTop+`px; }}
        @-moz-keyframes moveY {from { top: 0; } to { top: `+this.randomTop+`px; }}
        @-o-keyframes moveY {from { top: 0; } to { top: `+this.randomTop+`px; }}
        @keyframes moveY {from { top: 0; } to { top: `+this.randomTop+`px; }}
    `;
    }

    animationByJquery(){
        return `
        var bombClass      = '#lottie';
        var explosionClass = '.explosion-img';
        var displayClass   = 'slideDown';
        var coutDownTime   = 3000;
        var timeLeft       = 3;
        $(window).load(function(){
            setTimeout(function() {
                //animateDiv(bombClass);
            }, coutDownTime+1300);

        })

        function animateDiv(bombClass){
            var top  = Math.floor(Math.random() * 200,1); //height
            var left = Math.floor(Math.random() * 400,1); //width
            $(bombClass).animate({ top: top, left: left }, 500, function(){
                animateDiv(bombClass);
            });

        };

        `;
    }

    redirect(url){
        location.href = url;
    }

//$(myclass).fadeIn().delay(2800).fadeOut();
}



