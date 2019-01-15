import { Component, OnInit, AfterViewInit,ViewEncapsulation, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { DialogService } from 'ng2-bootstrap-modal';
import { PigV1ResultModal } from '../../../../modals/game/pigv1/result/result';

import * as fromRoot from '../../../../store';
import * as pigv1 from '../../../../store/game/pigv1/pigv1.actions';

//import * as Animation from '../animation.js';

declare var $;

@Component({
    selector: 'app-game-pigv1-play',
    templateUrl: './play.html',
    styleUrls: ['../style.css','../custom.css'],
    encapsulation: ViewEncapsulation.None

})
export class PigV1Play {

    baseURL : any = '/game/pig-v1?mobile=no';
    playURL : any = '/game/pig-v1/play?mobile=no';
    gameName = 'pigv1';

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

    ropeX: any = 0;
    ropeY: any = 0;
    pigX: any  = -96;
    pigY: any  = 110;
    countdown : any = 4;

    pigTransform : any = [
        'https://cdn.lotte.vn/media/wysiwyg/static/promotions/2018/12/conheo/conheo-1.png',
        'https://cdn.lotte.vn/media/wysiwyg/static/promotions/2018/12/conheo/conheo-2.png',
        'https://cdn.lotte.vn/media/wysiwyg/static/promotions/2018/12/conheo/conheo-3.png',
        'https://cdn.lotte.vn/media/wysiwyg/static/promotions/2018/12/conheo/conheo-4.png',
        'https://cdn.lotte.vn/media/wysiwyg/static/promotions/2018/12/conheo/conheo-5.png',
        'https://cdn.lotte.vn/media/wysiwyg/static/promotions/2018/12/conheo/conheo-6.png',
        'https://cdn.lotte.vn/media/wysiwyg/static/promotions/2018/12/conheo/conheo-7.png'
    ];
    pigImage:any;

    constructor(private store: Store<fromRoot.AppState>, private activatedRoute: ActivatedRoute,
        private dialogService: DialogService) {

        this.pigY = this.ropeY + 100;
        this.pigImage = this.pigTransform[0];

        this.Math = Math;

        this.activatedRoute.params.subscribe((params: any) => {
            if (this.currentParams !== params) {
                this.currentParams = params;
            }
        });

        this.settingsSub = this.store.select(fromRoot.pigv1GetGameSetting).subscribe(state => {
            this.settings  = state;
            this.timerLeft = this.settings.duration;
            this.totalTime = this.timerLeft + this.slideDown + this.bufferTime;
            this.levels    = this.settings.levels;

        }); this.store.dispatch(new pigv1.LoadSettings());

        this.gameToken = localStorage.getItem('gameToken_'+this.gameName);
        const userInfo = localStorage.getItem('userInfo');

        if(this.gameToken == null || userInfo == null){
            this.redirect(this.baseURL);
        }

        this.playSub = this.store.select(fromRoot.pigv1GetGameData).subscribe(state => {
            this.gameData = state;
            if(typeof this.gameData.error !== 'undefined'){
                if(this.gameData.error !== false){
                    this.redirect(this.baseURL);
                }
            }
        }); this.store.dispatch(new pigv1.Play(this.gameToken));

        setTimeout(() => {
            this.gameSession          = this.gameData.session;
            this.startSub = this.store.select(fromRoot.pigv1GetGameDataStart).subscribe(state => {
                this.gameDataStart         = state;
                this.gameResult.startedAt  = new Date(this.gameDataStart.startedAt).getTime();
            }); this.store.dispatch(new pigv1.Start({token:this.gameToken,session:this.gameSession}));
        },3000)


    }

    ngOnInit(){
        this.loadScript(this.detectDevTools());
        //this.loadScript(this.checkdevTools());
        setTimeout(() => {
            this.loadScript(this.animationByJquery());
        },1000)


    }

    ngAfterViewInit() {
        this.playGame();
        setTimeout(() => {
            this.animationGame();
        },3000)


    }

    ngOnDestroy(){
        this.settingsSub.unsubscribe();
        this.playSub.unsubscribe();
        this.startSub.unsubscribe();
    }

    playGame(){
        document.getElementsByTagName('body')[0].classList.add('game-mobile-page');
        document.getElementsByTagName('body')[0].classList.add('game-countdown-page');
        document.getElementsByClassName('light')[0].classList.add('blink-highlight');
        document.getElementsByClassName('light')[1].classList.add('blink-highlight');

        this.startGame = true;
        let slideDown = this.slideDown;

        let interval = setInterval(() => {

            this.totalTime  --;
            this.countDownLeft --;
            slideDown --;

            if(slideDown == 0){
                this.startGame = true;
                this.endGame   = false;
                document.getElementsByTagName('body')[0].classList.remove('game-countdown-page');
            }

            if(slideDown == -2){
                //document.getElementsByClassName('light')[0].classList.remove('blink-highlight');
                //document.getElementsByClassName('light')[1].classList.remove('blink-highlight');
            }

            //if(this.timerLeft < -1){
            if(this.totalTime  == 1){
                this.startGame = false;
                this.endGame   = true;
                //document.getElementById('clock').remove();
                const tempDateTime         =  new Date(this.gameResult.startedAt);
                this.gameResult.finishedAt =  new Date(tempDateTime.setSeconds(tempDateTime.getSeconds() + (this.slideDown+this.timerLeft-this.totalTime))).getTime();
                this.gameResult.session    =  this.gameSession;
                this.gameResult.score      =  this.coutClicked;
                this.gameResult.level      =  this.userLevel;

                this.finishSub    = this.store.select(fromRoot.pigv1GetGameDataFinish).subscribe(state => {
                    this.gameDataFinish = JSON.stringify(state);
                    localStorage.setItem('game'+this.gameName+'DataFinish',this.gameDataFinish);

                    if(typeof state.error !== 'undefined'){
                        this.popupResult();
                        document.getElementById('effect-click').remove();
                    }

                }); this.store.dispatch(new pigv1.Finish({token:this.gameToken,data:this.gameResult}));

                clearInterval(interval);
            }

            document.getElementById('effect-click').style.display = 'none';
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

    checkLevelUser(){
        for (var i in this.levels) {
            if(this.coutClicked == this.levels[i].score){
                this.userLevel = this.levels[i].level;
                if(this.userLevel > 0 && typeof this.levels[this.userLevel] != 'undefined'){
                    this.scorePerLevel =  this.levels[this.userLevel].score - this.levels[this.userLevel-1].score
                    this.pigImage = this.pigTransform[this.userLevel];
                }
                break;
            }
        }
    }

    startClick(event){
        this.clicking =  true;
        this.coutClicked++;
        this.checkLevelUser();
        let cursorX   = event.pageX;
        let cursorY   = event.pageY;
        let clickTime = new Date().getTime();
        let light = document.getElementById('effect-click');


        let position = event;

        //console.log(event)
        //console.log(event.target)
        //console.log(position)


        light.style.display = 'block';
        //light.style.top = position.top +'px';
        //light.style.left = position.left +'px';

        this.gameResult.actions.push({
            time:clickTime,x:cursorX,y:cursorY
        })
    }

    endClick(event){
        //this.clicking =  false;
    }

    popupResult(){
        this.dialogService.addDialog(PigV1ResultModal,{data:'111'});
    }

    animationGame(){
        /* timer in game */
        let timeElm = document.getElementById('timer-elem');
        let timeBar = document.getElementById('timer-bar');

        let timerIngame = function(x) {
            if(x === -1) {
                return;
            }

            timeElm.innerHTML = '00 : ' + x;
            timeBar.style.width = (x * 100 / 30) + '%';

            return setTimeout(() => {timerIngame(--x)}, 1000)
        }

        setTimeout(() => {timerIngame(30)}, 1000)

        /* animation pig */
        var amplitude=60, startAngle=0, wtime=60, timeout=10, second = 1, startSecond = 1, maxAngleInit = 45
        var animation,start,correction,running=false


        var checkMediaWidth = document.getElementsByTagName("body")[0].offsetWidth;
        if(checkMediaWidth < 768){
            amplitude = 25;
            var heo_1 = document.getElementById("heo_1").setAttribute("x","-49");
            var heo_1 = document.getElementById("heo_1").setAttribute("y","60");
            var heo_width = document.getElementById("heo_1").setAttribute("width","120");
        }

        var pendulum = document.getElementById("pendulum")
        pendulum.setAttribute("transform", "rotate(" + startAngle + ",0,0)")

        correction=2*Math.asin(startAngle/amplitude)
        start=(new Date()).getTime()
        movePendulum()

        var maxAngle = amplitude;
        var minAngle = amplitude;

        function movePendulum(){

            var angle

            maxAngle = maxAngleInit-(second-startSecond)* (maxAngleInit/2000*100);

            var pi=Math.PI,sin=Math.sin,asin=Math.asin,abs=Math.abs

            var now=(new Date()).getTime()

            var time=now-start
            time=time/wtime
            time=(time-correction)/2

            var easeVal=sin(time)
            angle=-amplitude*easeVal

            if(angle > 0 && angle >= maxAngle){
                // console.log('angle'+angle);
                // console.log('max'+maxAngle);
                // console.log('==========================================');
                amplitude = angle;

            }
            if(angle < 0 && angle <= maxAngle){

                amplitude = maxAngle;
            }
            if(second > 15.90){
                angle = 0;
            }

            var pendulum = document.getElementById("pendulum")
            pendulum.setAttribute("transform", "rotate(" + angle + ",0,0)")

            if(second < 16){
                animation=setTimeout(movePendulum,timeout)
            }
//console.log(second)
            second = second+0.005 ;


        }


    }

    returnHome(){
        location.replace(this.baseURL);
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

    animationByJquery(){
        return `




        `;
    }

    redirect(url){
        location.href = url;
    }

//$(myclass).fadeIn().delay(2800).fadeOut();
}



