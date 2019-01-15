import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {DomSanitizer} from '@angular/platform-browser';
import * as _ from 'lodash';

import * as fromRoot from '../../../store';


declare var $;

@Component({
    selector: 'app-general-page',
    templateUrl: './generalpage.html'
})
export class GeneralPage {

    cartRequestSub: any
    cartRequest: any

    bannerTopHtmlSub: any;
    bannerTopHtml: any;

    bannerBottomHtmlSub: any;
    bannerBottomHtml: any;

    warningActiveHtmlSub: any;
    warningActiveHtml: any;

    sminInner: any = 0;
    smaxInner: any = 0;

    configsSub: any;
    configs: any;

    leftSecond: any;
    leftMinute: any;

    constructor(protected store: Store<fromRoot.AppState>, protected domSanitizer: DomSanitizer) {

        this.bannerTopHtmlSub = this.store.select(fromRoot.commonGetCmsContents)
            .subscribe((cms) => {
                this.bannerTopHtml = null;
                _.each(cms, (block: any) => {
                    if (block.identifier === 'mobilerecharge_top_banner_block') {
                        this.bannerTopHtml = this.domSanitizer.bypassSecurityTrustHtml(block.content);
                    }
                });
            });

        this.bannerBottomHtmlSub = this.store.select(fromRoot.commonGetCmsContents)
            .subscribe((cms) => {
                this.bannerBottomHtml = null;
                _.each(cms, (block: any) => {
                    if (block.identifier === 'mobilerecharge_bottom_banner_block') {
                        this.bannerBottomHtml = this.domSanitizer.bypassSecurityTrustHtml(block.content);
                    }
                });
            });

        this.warningActiveHtmlSub = this.store.select(fromRoot.commonGetCmsContents)
            .subscribe((cms) => {
                this.warningActiveHtml = null;
                _.each(cms, (block: any) => {
                    if (block.identifier === 'mobilerecharge_warning_active') {
                        this.warningActiveHtml = this.domSanitizer.bypassSecurityTrustHtml(block.content);
                    }
                });
            });

        this.cartRequestSub = this.store.select(fromRoot.rechargeGetCartRequest).subscribe(cartRequest => {
            this.cartRequest = cartRequest;
        });


        this.configsSub = this.store.select(fromRoot.rechargeGetConfigs).subscribe((configs) => {
            this.configs = configs;
        });
    }

    ngOnInit() {
        window.addEventListener('scroll', this.scroll, true);
    }


    ngAfterViewInit() {

        const _second = 1000;
        const _minute = _second * 60;

        let now = new Date();
        const end = new Date();
        end.setDate(now.getDate() + 1);
        end.setHours(0);
        end.setMinutes(5);
        end.setSeconds(0);


        const intervalPaymentFail = setInterval(function () {
            now = new Date();

            const distance = end.getTime() - now.getTime();

            if (distance <= 0) {
                clearInterval(intervalPaymentFail);
                $('.phonecard-note-popup').parent().remove();
                $('.modal-backdrop-lt').remove();
            }

            this.leftMinute = Math.floor((distance) / (_minute));
            this.leftSecond = Math.floor((distance % _minute) / (_second));

        }.bind(this), 1000);

        if (this.configs && this.configs.recharge_active === 0) {

            $('.phonecard-note-popup').css('display', 'block');
        }
    }

    initScroll() {
        if (this.sminInner === this.smaxInner) {

            const inner = $('.phonecart-block');
            const summary = $('.phonecard-content .right-content-outner');
            if (inner.position() != null && this.sminInner === 0) {
                this.sminInner = inner.position().top;
            }
            if (inner.height() !== 0 && summary.height() !== 0) {
                this.smaxInner = this.sminInner + inner.height() - summary.height();
            }
        }
    }

    scroll = (): void => {
        const scrollTop = $(window).scrollTop() + 110;
        const summary = $('.phonecard-content .right-content-outner');

        this.initScroll();
        const inner = $('.phonecart-block');
        this.smaxInner = this.sminInner + inner.height() - summary.height();
        if (scrollTop > this.smaxInner) {
            summary.css({
                position: 'relative',
                top: this.smaxInner - this.sminInner - 10,
            });
        } else if (scrollTop > this.sminInner) {
            summary.css({
                position: 'relative',
                top: Math.min(scrollTop - this.sminInner, this.smaxInner - this.sminInner - 10)
            });
        } else if (scrollTop < this.sminInner) {

            summary.css({
                position: 0,
                top: 0
            });
        }
    }

    ngOnDestroy() {
        window.removeEventListener('scroll', this.scroll, true);

        this.bannerTopHtmlSub.unsubscribe();
        this.bannerBottomHtmlSub.unsubscribe();
        this.configsSub.unsubscribe();
    }

}