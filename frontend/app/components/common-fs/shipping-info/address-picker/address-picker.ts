import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../../store/index';
import * as _ from 'lodash';
import {DialogService} from "ng2-bootstrap-modal";
import {RegionManagement} from "../../../base/RegionManagement";

@Component({
    selector: 'app-common-fs-shipping-ap',
    template: ''
})

export class CommonFSShippingAddressPickerComponent {
    toogleShip: boolean;
    selectedRegion: any = {
        city: null,
        district: null,
        ward: null,
        isOther: false
    };
    commonRegionsSub: any;
    regions: Array<any> = [];
    regionsSearch: Array<any> = [];
    districtsSearch: Array<any> = [];
    wardsSearch: Array<any> = [];
    tempRegion: any = {
        city: null,
        district: null,
        ward: null,
    };
    keyword: string;

    constructor(
        protected dialogService: DialogService,
        protected store: Store<fromRoot.AppState>
    ) {
        this.selectedRegion = RegionManagement.getInstance(this.store).getCurrentRegion();
        this.commonRegionsSub = this.store.select(fromRoot.commonGetRegions).subscribe(regions =>{
            this.regions = regions;
            this.regionsSearch = _.clone(this.regions);
        });
    }

    reloadShippingRule(){

    };

    searchRegion(){
        if (!this.tempRegion.city) {
            if(this.keyword === undefined || this.keyword === ''){
                this.regionsSearch = _.clone(this.regions);
            } else {
                this.regionsSearch = _.filter(this.regions, item => {

                    return item.name.toSlugify().indexOf(this.keyword.toSlugify()) >= 0;
                });
            }
        } else if(!this.tempRegion.district){
            if(this.keyword === undefined || this.keyword === ''){
                this.districtsSearch = _.clone(this.tempRegion.city.districts);
            } else {
                this.districtsSearch = _.filter(this.tempRegion.city.districts, item => {
                    return item.name.toSlugify().indexOf(this.keyword.toSlugify()) >= 0;
                });
            }
        } else {
            if(this.keyword === undefined || this.keyword === ''){
                this.wardsSearch = _.clone(this.tempRegion.district.wards);
            } else {
                this.wardsSearch = _.filter(this.tempRegion.district.wards, item => {
                    return item.name.toSlugify().indexOf(this.keyword.toSlugify()) >= 0;
                });
            }
        }
    }

    onChangeLocation(city, district, ward = null) {
        if (city && city.id) {
            // this.selectedDistrict = null;
            // this.selectedRegion.district = null;
            // this.store.dispatch(new checkout.CartLoadShippingRule({
            //     cityId: city.id,
            //     districtId: null
            // }));
            this.districtsSearch = _.clone(city.districts);
            this.tempRegion.city = city;
            this.tempRegion.district = null;
            this.tempRegion.ward = null;
        }

        if (district && district.id) {
            this.selectedRegion.city = _.clone(this.tempRegion.city);
            this.selectedRegion.district = _.clone(district);
            this.selectedRegion.ward = null;
            this.selectedRegion.isOther = true;
            this.wardsSearch = _.clone(district.wards);
            this.tempRegion.district = district;
            this.tempRegion.ward = null;
        }

        if (ward && ward.id) {
            this.selectedRegion.city = _.clone(this.tempRegion.city);
            this.selectedRegion.district = _.clone(this.tempRegion.district);
            this.selectedRegion.ward = _.clone(ward);
            this.selectedRegion.isOther = true;

            RegionManagement.getInstance(this.store).updateCurrentRegion(this.selectedRegion);
            this.reloadShippingRule();
            this.tempRegion.city = null;
            this.tempRegion.district = null;
            this.toogleShip = false;
        }

        this.keyword = '';
    }

    ngOnDestroy(){
        this.commonRegionsSub.unsubscribe();
    };
}
