import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import * as moment from 'moment';
import * as fromRoot from '../../../../store';

declare var $;

@Component({
    selector: 'lt-home-fashion-deal-zone',
    templateUrl: './deal-zone.html',
    styleUrls: ['./deal-zone.less']
})
export class LtHomeFashionDealZone {
    dealZones: any = [];
    static isViewLoaded: any;
    homeCmsBlockSub: any;
    selectedSlide: any = {};
    isImgLoaded: any = {};

    slideConfigNav: any = {
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: false,
        speed: 500,
        dots: true,
        arrows: true,
        loop: true,
        draggable: false,
        centerMode: true,
        infinite: true,
        focusOnSelect: true,
        slide: 'div'
    };
    constructor(private store: Store<fromRoot.AppState>, private domSanitizer: DomSanitizer, private router: Router) {
        this.homeCmsBlockSub = this.store.select(fromRoot.homeGetCmsBlock)
            .subscribe((cmsBlock) => {
                if (cmsBlock.dealZones) {
                    if (cmsBlock.dealZones && cmsBlock.dealZones.length) {
                        this.dealZones = this.calculatePercentage(cmsBlock.dealZones);
                        this.selectedSlide = _.cloneDeep(this.dealZones[this.dealZones.length - 1]);
                    }
                }
            });
    }

    calculatePercentage(dealZones) {
        _.each(dealZones, (deal: any) => {
            const dealOptions = deal.deal_options;
            const startDate = moment(_.get(dealOptions, 'start_date'));
            const endDate = moment(_.get(dealOptions, 'end_date'));
            const today = moment();

            const totalHours = endDate.diff(startDate, 'hours');
            let completeHours = today.diff(startDate, 'hours');

            if (completeHours > totalHours) {
                completeHours = totalHours;
            }

            _.set(deal, 'deal_options.percent', (totalHours - completeHours) / totalHours * 100);

            _.set(deal, 'deal_options.pendingQty', Math.round((totalHours - completeHours) / totalHours * Number.parseInt(dealOptions.qty)));
        });

        return dealZones;
    }

    slickChanged(e) {
        if (e.currentSlide) {
            this.selectedSlide = _.cloneDeep(this.dealZones[e.currentSlide - 1]);
        } else {
            this.selectedSlide = _.cloneDeep(this.dealZones[this.dealZones.length - 1]);
        }
    }

    ngAfterViewInit() {
        if (!LtHomeFashionDealZone.isViewLoaded) {
            setTimeout(() => {
                LtHomeFashionDealZone.isViewLoaded = true;
            }, 700);
        }
    }

    getIsViewLoaded() {
        return LtHomeFashionDealZone.isViewLoaded;
    }

    ngOnDestroy() {
        this.homeCmsBlockSub.unsubscribe();
    }
}
