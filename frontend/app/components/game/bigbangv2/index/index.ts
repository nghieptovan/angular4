import { Component, OnInit, AfterViewInit,ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { DialogService } from 'ng2-bootstrap-modal';

import { Bigbangv2LoginModal } from '../../../../modals/game/bigbangv2/login/login';
import { BigbangV2RuleModal } from '../../../../modals/game/bigbangv2/rule/rule';
import { BigbangV2ShareFBModal } from '../../../../modals/game/bigbangv2/shareFB/shareFB';
import { BigbangV2HistoryModal } from '../../../../modals/game/bigbangv2/history/history';

import * as fromRoot from '../../../../store';
import * as bigbangv2 from '../../../../store/game/bigbangv2/bigbangv2.actions';

declare var $;

@Component({
    selector: 'app-game-bigbangv2-index',
    templateUrl: './index.html',
    styleUrls: ['../bigbang.css'],
    encapsulation: ViewEncapsulation.None

})
export class BigBangV2Index {

    baseURL : any = '/game/big-bang?mobile=no';
    playURL : any = '/game/big-bang/play?mobile=no';

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

    constructor(private store: Store<fromRoot.AppState>, private activatedRoute: ActivatedRoute,
        private dialogService: DialogService
    ) {

        this.activatedRoute.params.subscribe((params: any) => {
            if (this.currentParams !== params) {
                this.currentParams = params;
            }
        });

        const token = localStorage.getItem('gameToken');
        this.profileSub = this.store.select(fromRoot.bigbangv2GetPlayerProfile).subscribe(state => {
            this.profile = state;
            if(this.profile.isActive != null ){
                this.isLogged = true;
            }
        });
        if(token != null){
            this.store.dispatch(new bigbangv2.LoadPlayerProfile(token));
            // this.resultsSub = this.store.select(fromRoot.bigbangv2GetHistory).subscribe(state => {
            //     this.results = state;
            //     console.log(state)
            // });this.store.dispatch(new bigbangv2.LoadHistory(token));
        }



        this.resultsSub = this.store.select(fromRoot.bigbangv2GetResults).subscribe(state => {
            this.results = state;
        });this.store.dispatch(new bigbangv2.LoadResults(this.LIMIT_RESULTS));

    }

    ngOnInit() {
        this.giftsSub = this.store.select(fromRoot.bigbangv2GetGifts).subscribe(state => {
            this.gifts = state;
        });this.store.dispatch(new bigbangv2.LoadGifts());

        this.loadScriptbyUrl('https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.4.1/js/swiper.min.js');

        setTimeout(() => {
            this.loadScript(this.sliderScript());
        },2000)

    }

    ngAfterViewInit(){
        let interval = setInterval(() => {
            this.store.dispatch(new bigbangv2.LoadResults(this.LIMIT_RESULTS));
        }, 10000);
        //clearInterval(interval);

    }

    ngOnDestroy(){

    }

    loginPopup(){
        if(this.isLogged){
            location.href = this.playURL;
        }else{
            this.dialogService.addDialog(Bigbangv2LoginModal);
        }
    }

    rulePopup(){
        this.dialogService.addDialog(BigbangV2RuleModal);
    }

    historyPopup(){
        this.dialogService.addDialog(BigbangV2HistoryModal);
    }

    shareFB() {
        if(!this.profile.facebookShared){
            const url = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(location.href);
            const intWidth = '500';
            const intHeight = '400';
            const strParam = 'width=' + intWidth + ',height=' + intHeight + ',resizable=no';
            window.open(url, 'LotteVN', strParam).focus();

            setTimeout(() => {
                const token = localStorage.getItem('gameToken');
                this.store.dispatch(new bigbangv2.LoadShareFB(token));
            },3000)
        }else{
            this.dialogService.addDialog(BigbangV2ShareFBModal);
        }
        return false;
    }

    logOut(){
        localStorage.removeItem('gameToken');
        location.reload();
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
            $(document).ready(function () {
                setTimeout(function(){
                    $('.swiper-button-next').trigger('click');
                },1100)
            });

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

                $('.slider-game .swiper-wrapper .swiper-slide').on('click', function (e) {
                    e.preventDefault();
                    swiper.slideTo($(this).index());
                    return false;
                });

                $('.swiper-button-next').on('click',function(){
                    swiper.slideNext();
                });
                $('.swiper-button-prev').on('click',function(){
                    swiper.slidePrev();
                });

            },1000)

        `;
    }
}



