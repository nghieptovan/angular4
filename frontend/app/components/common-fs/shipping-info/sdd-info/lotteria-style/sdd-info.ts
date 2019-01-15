import { Component, Input } from '@angular/core';
import {CommonFSShippingSDDInfoComponent} from "../sdd-info";
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../../../store/index';
import * as _ from 'lodash';
import {DialogService} from "ng2-bootstrap-modal";
import {LotteriaNotifyModal} from "../../../../../modals/lotteria-notify/lotteria-notify";
import { Router } from '@angular/router';


@Component({
    selector: 'app-common-fs-shipping-sdd-lotteria',
    templateUrl: './sdd-info.html'
})
export class CommonFSShippingSDDLotteriaComponent extends CommonFSShippingSDDInfoComponent{
    openTime: Date;
    closeTime: Date;
    validTime: Date;
    isValidTime: boolean;
    delivery_note: string;
    policy_note: string;
    vendorLandingSettingSub: any;
    vendorLandingSetting: any;
    checkTimeId: any;
    isShowingPopup: boolean = false;

    set vendorInfo(value: any) {
        this._vendorInfo = value;
    }

    constructor(
        dialogService: DialogService,
        router: Router,
        store: Store<fromRoot.AppState>
    ) {
        super(dialogService, router, store);

        this.vendorLandingSettingSub = this.store.select(fromRoot.vendorGetLandingSetting).subscribe(setting => {
            this.vendorLandingSetting = setting;
            if(setting && setting.open_time && setting.close_time){
                const opentimeConf = this.vendorLandingSetting.open_time.split(':');
                const closetimeConf = this.vendorLandingSetting.close_time.split(':');
                this.openTime = new Date();
                this.openTime.setHours(parseInt(opentimeConf[0]));
                this.openTime.setMinutes(parseInt(opentimeConf[1]));

                this.closeTime = new Date();
                this.closeTime.setHours(parseInt(closetimeConf[0]));
                this.closeTime.setMinutes(parseInt(closetimeConf[1]));
                this.loopCheckTime();
            } else {
                this.openTime = new Date();
                this.openTime.setHours(8);
                this.openTime.setMinutes(30);

                this.closeTime = new Date();
                this.closeTime.setHours(20);
                this.closeTime.setMinutes(30);
            }

            this.delivery_note = this.getDurationDeliveryNote();
            this.policy_note = this.getPolicyNote();
        });
    }

    loopCheckTime(){
        if(!this.isShowingPopup){
            // stop old loop.
            if(this.checkTimeId){
                clearTimeout(this.checkTimeId);
            }

            this.isValidTime = this.validateTime();
            if(this.isValidTime){
                this.checkTimeId = setTimeout(() => {
                    this.loopCheckTime();
                }, 600000);
            } else if(this.router.url.includes('seller')){
                this.isShowingPopup = true;
                this.dialogService.addDialog(LotteriaNotifyModal, {
                    openTime: this.openTime,
                    closeTime: this.closeTime
                }).subscribe(confirm => {
                    if(!confirm) {
                        window.location.href = '/';
                    }
                });
            }
        }
    }

    validateTime(){
        this.validTime = new Date();
        this.validTime.setMinutes(this.validTime.getMinutes() + this.getDurationDelivery() * 60);

        if(this.validTime > this.openTime && this.validTime < this.closeTime){
            // return 'Thời gian giao hàng dự kiến:  <strong>15:00 pm hôm nay</strong>';
            return true;
        }

        return false;
        // return 'Lotteria không giao hàng cho đơn hàng đặt từ 8:30pm. Quý khách vui lòng đặt hàng từ hôm sau.';
    }

    getStringTime(date) {
        return String.prototype.toStringTimeFormat(date);
    }

    getDurationDelivery(){
        if(this.vendorLandingSetting && this.vendorLandingSetting.duration_delivery){
            return this.vendorLandingSetting.duration_delivery;
        }
        return 1;
    }

    getDurationDeliveryNote(){
        let delivery_note = this.vendorLandingSetting && this.vendorLandingSetting.delivery_note
            ?this.vendorLandingSetting.delivery_note:'Giao hàng trong {duration_delivery} giờ kể từ khi xác nhận đơn hàng.';

        return delivery_note.replace('{duration_delivery}', this.getDurationDelivery());
    }

    getPolicyNote(){
        let policy_note = this.vendorLandingSetting && this.vendorLandingSetting.delivery_note
            ?this.vendorLandingSetting.policy_note:'Thời gian giao hàng trong ngày {start_time} - {end_time}.';

        return policy_note.replace('{start_time}', this.getStringTime(this.openTime))
            .replace('{end_time}',this.getStringTime(this.closeTime));
    }

    //fixme: only support validate reach ward on lotteria style (Should support for whole site)
    // sddRegionSupport(){
    //     let regionSupport = false;
    //     if(this.vendorInfo && this.vendorInfo.is_sdd){
    //         let temp = null;
    //         if(this.selectedRegion.city){
    //             temp = _.find(this.vendorInfo.sdd_shipping_area, city => {
    //                 return city.id === this.selectedRegion.city.id;
    //             });
    //
    //             if(!temp){
    //                 return false;
    //             } else if(this.selectedRegion.district){
    //                 temp = _.find(temp.districts, district => {
    //                     return district.id === this.selectedRegion.district.id;
    //                 });
    //
    //                 if(!temp){
    //                     return false;
    //                 } else if(this.selectedRegion.ward){
    //                     temp = _.find(temp.wards, ward => {
    //                         return ward.id === "0" || ward.id === this.selectedRegion.ward.id;
    //                     });
    //
    //                     if(!temp){
    //                         return false;
    //                     }
    //                 } else {
    //                     return false;
    //                 }
    //             } else {
    //                 return false;
    //             }
    //         }
    //
    //         if(!temp){
    //             return false;
    //         }
    //
    //         return true;
    //
    //     }
    //     return false;
    // }
}
