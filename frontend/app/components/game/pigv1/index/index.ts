import { Component, OnInit, AfterViewInit,ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { DialogService } from 'ng2-bootstrap-modal';

import { PigV1RuleModal } from '../../../../modals/game/pigv1/rule/rule';
import { PigV1ShareFBModal } from '../../../../modals/game/pigv1/shareFB/shareFB';
import { PigV1HistoryModal } from '../../../../modals/game/pigv1/history/history';
import { LoginModal } from '../../../../modals/login/login';
import { Observable } from 'rxjs/Observable';
import * as auth from '../../../../store/auth/auth.actions';

import * as fromRoot from '../../../../store';
import * as pigv1 from '../../../../store/game/pigv1/pigv1.actions';
import * as account from '../../../../store/account/account.actions';

import * as moment from 'moment';
import { sha256, sha224 } from 'js-sha256';

declare var $;

@Component({
    selector: 'app-game-pigv1-index',
    templateUrl: './index.html',
    styleUrls: ['../style.css','../custom.css'],
    encapsulation: ViewEncapsulation.None

})
export class PigV1Index {

    baseURL : any = '/game/pig-v1?mobile=no';
    playURL : any = '/game/pig-v1/play?mobile=no';

    gameName = 'pigv1';

    LIMIT_RESULTS: any = 10;

    currentParams: any;
    isLogged:any = false;

    profileSub:any;
    profile:any = {
        email:null,
        id:null,
        isActive:null,
        joinedAt:null,
        phone:null,
        remainSession:0,
        facebookShared:null
    }
    giftsSub:any;
    gifts:any;
    resultsSub:any;
    results:any;
    rankingSub:any;
    ranking:any;
    mineRankingSub:any;
    mineRanking:any

    slideResults:any = [];
    authIsLoggedIn$: Observable<any>;

    resultParams : any = {
        limit : this.LIMIT_RESULTS,
        orderby:'id',
        order:'desc'
    }

    rankingParams : any = {
        limit : this.LIMIT_RESULTS,
        orderby:'score,id',
        order:'desc'
    }

    gameToken :any = null;
    userInfo : any = null;

    secretKey = 'khUDUIhBMK';

    userLoggedByMobile = false;

    fromMobile = false;

    constructor(private store: Store<fromRoot.AppState>, private activatedRoute: ActivatedRoute,
        private dialogService: DialogService
    ) {


        this.activatedRoute.queryParams.subscribe((params: any) => {
            if (this.currentParams !== params) {
                this.currentParams = params;
            }

        });

        if(typeof this.currentParams.token !== 'undefined'
            && typeof this.currentParams.customerId !== 'undefined'
            && typeof this.currentParams.hash !== 'undefined'
            && typeof this.currentParams.email !== 'undefined'
        ){

            var hash = sha256(Math.round(this.currentParams.customerId/3)+this.currentParams.token+this.secretKey);
            if(hash == this.currentParams.hash){
                this.userLoggedByMobile = true;
                localStorage.setItem('token', this.currentParams.token);

            }
        }

        this.userInfo = localStorage.getItem('userInfo');
        this.gameToken = localStorage.getItem('gameToken_'+this.gameName);

        this.profileSub = this.store.select(fromRoot.pigv1GetPlayerProfile).subscribe(state => {
            this.profile = state;
            if(this.profile.isActive != null ){
                this.isLogged = true;
                if(this.userLoggedByMobile){
                    //localStorage.setItem('userInfo', this.currentParams);
                }
            }
        });
        if(this.gameToken != null && this.userInfo != null){
            this.store.dispatch(new pigv1.LoadPlayerProfile(this.gameToken));
        }

        this.resultsSub = this.store.select(fromRoot.pigv1GetResults).subscribe(state => {
            this.results = state;
            if(typeof state !== 'undefined' && state.length > 0){
                //this.slideResults = state.slice(-4).reverse();
                this.slideResults = state.slice(0,4);
            }
        });this.store.dispatch(new pigv1.LoadResults(this.resultParams));

        this.rankingSub = this.store.select(fromRoot.pigv1GetRanking).subscribe(state => {
            this.ranking = state;

        });this.store.dispatch(new pigv1.LoadRanking(this.rankingParams));

        this.mineRankingSub = this.store.select(fromRoot.pigv1GetMineRanking).subscribe(state => {
            this.mineRanking = state;
        });this.store.dispatch(new pigv1.LoadMineRanking(this.gameToken));

        this.authIsLoggedIn$ = this.store.select(fromRoot.authGetLoggedInState);

        this.store.select(fromRoot.pigv1Login).subscribe(state => {
            if(!state.error && state.token){
                const token = state.token;
                localStorage.setItem('gameToken_'+this.gameName, token);
                this.store.dispatch(new pigv1.LoadPlayerProfile(token));
                this.store.dispatch(new pigv1.LoadMineRanking(token));
            }
        });

        this.store.select(fromRoot.accountGetInfo).subscribe((info) => {
            setTimeout(() => {
                let data = {
                    customerId:info.id,
                    email:info.email,
                    token:null
                };
                if(typeof data.customerId !== 'undefined' && typeof data.email !== 'undefined' )
                this.store.dispatch(new pigv1.LoadLogin(data) );
            }, 100);
        });
    }

    ngOnInit() {


        this.giftsSub = this.store.select(fromRoot.pigv1GetGifts).subscribe(state => {
            this.gifts = state;
        });this.store.dispatch(new pigv1.LoadGifts());

        this.loadScriptbyUrl('https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.4.1/js/swiper.min.js');
        this.loadScriptbyUrl('https://cdnjs.cloudflare.com/ajax/libs/jquery-easy-ticker/2.0.0/jquery.easy-ticker.min.js');

        setTimeout(() => {
            this.loadScript(this.sliderScript());
        },2000)

    }

    ngAfterViewInit(){
        document.getElementsByTagName('body')[0].classList.add('game-login-page');
        //const token = localStorage.getItem('gameToken_'+this.gameName);
        //const userInfo = localStorage.getItem('userInfo');
        let interval = setInterval(() => {
            this.store.dispatch(new pigv1.LoadResults(this.resultParams));
            this.store.dispatch(new pigv1.LoadRanking(this.rankingParams));
            if(this.gameToken !== null && this.userInfo !== null){
                this.store.dispatch(new pigv1.LoadMineRanking(this.gameToken));
            }
        }, 30000);

        //clearInterval(interval);

        this.authIsLoggedIn$.subscribe((logged) => {
            if (logged) {
                this.store.dispatch(new account.LoadInfo() );
            }
        });

        if(this.userLoggedByMobile){
            this.store.dispatch(new account.LoadInfo() );
        }


    }

    ngOnDestroy(){

    }

    formatDate(unixTime){
        moment.locale('vi');
        return moment(unixTime).fromNow();

    }

    loginPopup(){
        if(this.isLogged){
            location.href = this.playURL;
        }else{
            this.dialogService.addDialog(LoginModal);
        }
    }

    rulePopup(){
        this.dialogService.addDialog(PigV1RuleModal);
    }

    historyPopup(){
        this.dialogService.addDialog(PigV1HistoryModal);
    }

    playGame(){
        if(this.profile.remainSession > 0) location.replace(this.playURL);
        return false;
    }

    shareFB() {
        if(!this.profile.facebookShared){
            const url = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(location.href);
            const intWidth = '500';
            const intHeight = '400';
            const strParam = 'width=' + intWidth + ',height=' + intHeight + ',resizable=no';
            window.open(url, 'LotteVN', strParam).focus();

            setTimeout(() => {
                const token = localStorage.getItem('gameToken_'+this.gameName);
                this.store.dispatch(new pigv1.LoadShareFB(token));
            },3000)
        }else{
            this.dialogService.addDialog(PigV1ShareFBModal);
        }
        return false;
    }

    logOut(){
        localStorage.removeItem('gameToken_'+this.gameName);
        localStorage.removeItem('userInfo');
        this.store.dispatch(new auth.Logout(1));
        setTimeout(() => {
            location.replace(this.baseURL);
        },1000)

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

    sliderScript(){
        return `


            setTimeout(function(){
                var swiper = new Swiper('.slider-game', {
                    effect: 'coverflow',
                    grabCursor: true,
                    centeredSlides: true,
                    slidesPerView: 3,
                    slidesOffsetBefore: 0,
                    speed: 800,
                    coverflowEffect: {
                        rotate: 0,
                        stretch: 100,
                        depth: 200,
                        modifier: 1,
                        slideShadows: false
                    },
                    pagination: {
                        el: '.swiper-pagination',
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                    simulateTouch: true,
                    breakpoints: {
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 30,
                        },
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        480: {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                        360: {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        }
                    }
                });

                var index_slides = $('.slider-game .swiper-wrapper .swiper-slide').length / 2;
                swiper.slideTo(Math.floor(index_slides - 1));

                $('.slider-game .swiper-wrapper .swiper-slide').on('click', function(e) {
                    e.preventDefault();
                    swiper.slideTo($(this).index());
                    return false;
                });


                /* tabs */
                $('.table-content-game').each(function(e) {
                    $(this).find('.tab-table a').click(function(e) {
                        e.preventDefault();
                    });
                    $(this).find('li').click(function(event) {
                        var _this = $(this);
                        event.preventDefault();
                        $(this).find('a').focus();
                        if (!_this.hasClass("active")) {
                            _this
                                .siblings(".active").removeClass("active").end()
                                .addClass("active");
                            var relatedTabContentID = _this.find("a").attr('href');
                            $(relatedTabContentID).siblings().removeClass('active').end().addClass('active');
                        }
                    });
                });
                /*******/

                //$('.ticker').easyTicker({
                    // list of properties
                //});

                function dp_scroll_text(){
                    $(".dp-animate-hide").appendTo(".dp-scroll-text").removeClass("dp-animate-hide");
                    $(".dp-scroll-text p:first-child").removeClass("dp-run-script dp-animate-1").addClass("dp-animate-hide");
                    $("p.dp-run-script.dp-animate-3").next().addClass("dp-run-script dp-animate-3");
                    $(".dp-run-script").removeClass("dp-animate-1 dp-animate-2 dp-animate-3");

                    $.each($('.dp-run-script'), function (index, runscript) {
                       index++;
                       $(runscript).addClass('dp-animate-' + index );
                    });
                }

                setInterval(function(){
                    dp_scroll_text()
                }, 2000);



            },1000)



        `;
    }
}



