import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Dispatcher, Store } from '@ngrx/store';
import * as fromRoot from '../../../../store/index';
import * as _ from 'lodash';
import {DialogService} from "ng2-bootstrap-modal";
import {FSFreeshippingAreaModal} from "../../../../modals/freeshipping-area-fs/freeshipping-area";
import {FSDeliveryAreaModal} from "../../../../modals/delivery-area-fs/delivery-area";
import {Observable} from "rxjs/Observable";
import {RegionManagement} from "../../../base/RegionManagement";
import { Router } from '@angular/router';

@Component({
    selector: 'app-common-fs-shipping-sdd-info',
    template: ''
})
export class CommonFSShippingSDDInfoComponent {
    selectedRegion: any = {
        city: null,
        district: null,
        ward: null,
        isOther: false
    };
    commonRegionsSub: any;
    shippingRules$: Observable<any>;
    regions: Array<any> = [];
    isSupportSDD: boolean = false;
    _vendorInfo: any;
    // @Input() vendorInfo:any;
    @Input() blinkInfo:any;
    @Output() regionSupport = new EventEmitter<boolean>();
    @Input()
    get vendorInfo(): any {
        return this._vendorInfo;
    }

    set vendorInfo(value: any) {
        this._vendorInfo = value;
        this.isSupportSDD = this.sddRegionSupport();
    }

    constructor(
        protected dialogService: DialogService,
        protected router: Router,
        protected store: Store<fromRoot.AppState>
    ) {
        this.selectedRegion = RegionManagement.getInstance(this.store).getCurrentRegion();
        this.shippingRules$ = this.store.select(fromRoot.productsGetShippingRules);
        this.commonRegionsSub = this.store.select(fromRoot.commonGetRegions).subscribe(regions =>{
            this.regions = regions;
        });
    }

    validateSddRegionSupport(){
        let sddRegionSupport = this.sddRegionSupport();
        this.regionSupport.emit(sddRegionSupport);
        return sddRegionSupport;

    }

    sddRegionSupport(){
        let regionSupport = false;
        if(this._vendorInfo && this._vendorInfo.is_sdd){
            let temp = null;
            if(this.selectedRegion.city){
                temp = _.find(this._vendorInfo.sdd_shipping_area, city => {
                    return city.id === this.selectedRegion.city.id;
                });

                if(!temp){
                    return false;
                }
            }

            if(this.selectedRegion.district){
                temp = _.find(temp.districts, district => {
                    return district.id === '0' || district.id === this.selectedRegion.district.id;
                });

                if(!temp){
                    return false;
                }
            }

            if(!temp){
                return false;
            }

            return true;

        }
        return false;
    }

    showSDDShippingRuleModal() {
        this.dialogService.addDialog(FSFreeshippingAreaModal, {
            vendorFreeShippingRule: this.sddShippingFreeArea()
        });
    }

    openDeliveryAreaModal() {
        this.dialogService.addDialog(FSDeliveryAreaModal, {
            vendorShippingArea: this._vendorInfo.sdd_shipping_area
        });
    }

    updateMinPurchase(region, min_purchase){
        _.each(region.districts, district => {
            if(!district.min_purchase || district.min_purchase < min_purchase){
                district.min_purchase = min_purchase;
            }
        });
    }

    sddShippingFreeArea(){
        // const test = [
        //     {
        //         name: "Bắc Giang",
        //         districts: [
        //             {
        //                 name: "Huyện Lạng Giang",
        //                 id: "29",
        //                 wards: [
        //                     {
        //                         min_purchase: "[ANY]",
        //                         name: "Xã Đại Lâm",
        //                         id: "390"
        //                     }
        //                 ]
        //             }
        //         ],
        //         id: "1031"
        //     },
        //     {
        //         name: null,
        //         districts: [
        //             {
        //                 name: null,
        //                 id: "0",
        //                 wards: [
        //                     {
        //                         min_purchase: "100000",
        //                         name: "[All]",
        //                         id: "0"
        //                     }
        //                 ]
        //             }
        //         ],
        //         id: "0"
        //     },
        //
        // ];
        let res = [];
        if(this._vendorInfo && this._vendorInfo.is_sdd){
            const areas = _.sortBy(this._vendorInfo.sdd_shipping_free_area, area => {return area.id;});
            // const areas = _.sortBy(test, area => {return area.id;});
            _.each(areas, area => {
                // console.log(11111111, area);
                if(area.id === "0"){
                    res = _.clone(this.regions);
                    _.each(res, region => {
                        this.updateMinPurchase(region, area.districts[0].wards[0].min_purchase);
                    });
                } else {
                    let region = _.find(res, region => {return region.id === area.id});

                    if(!region){
                        region = _.find(this.regions, region => {return region.id === area.id});
                    }

                    if(region){
                        if(region.districts.length > 0 && region.districts[0].id !== '0'){
                            region.districts = _.filter(region.districts, district => {
                                return area.districts.findIndex(item => {
                                    return item.id === district.id;
                                }) !== -1;
                            });
                        }

                        res.push(region);

                        _.each(area.districts, district => {
                            _.each(district.wards, ward => {
                                this.updateMinPurchase(region, ward.min_purchase);
                            });
                        });
                    }
                }
            });

        }
        return res;
    }

    ngOnDestroy() {
        this.commonRegionsSub.unsubscribe();
    }
}
