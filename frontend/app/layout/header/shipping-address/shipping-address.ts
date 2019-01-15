import { Component, HostListener, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { NavigationStart, Router, ActivatedRoute } from '@angular/router';
import { Dispatcher, Store } from '@ngrx/store';
import * as _ from 'lodash';
import { DialogService } from 'ng2-bootstrap-modal';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs/Observable';
import { DomSanitizer } from '@angular/platform-browser';
import { GlobalService } from '../../../services/global.service';
import * as fromRoot from '../../../store';
import * as account from '../../../store/account/account.actions';
import {LocalStorageConstants} from "../../../components/base/constants/LocalStorageConstants";
import {RegionManagement} from "../../../components/base/RegionManagement";
import {LoginModal} from "../../../modals/login/login";


declare var $;

@Component({
    selector: 'app-header-shipping-address',
    templateUrl: './shipping-address.html'
})

export class AppHeaderShippingAddress {
    authSub: any;
    productDetailSub: any;
    commonRegionsSub: any;
    accountInfoSub: any;
    userInfo: any;
    userAddresses: Array<any> = [];

    curUserAddressId: number;
    isShowPopup: boolean = false;
    isShowPopupInfo: boolean = false;

    regions:any;
    curRegion: any = {
        city: null,
        district: null,
        ward: null,
        isOther: true
    };
    productId:any = null;
    @Input() showBackDrop: any = true;
    @Output() reloadCartShippingRuleEvent = new EventEmitter();

    constructor(private store: Store<fromRoot.AppState>,
                private activatedRoute: ActivatedRoute,
                private dialogService: DialogService,
                protected _elementRef : ElementRef
    ) {
        this.commonRegionsSub = this.store.select(fromRoot.commonGetRegions).subscribe((regions: Array<any>) => {
            this.regions = regions;
            if(RegionManagement.getInstance(this.store).getCurrentRegion()){
                this.curRegion = RegionManagement.getInstance(this.store).getCurrentRegion();
            }

            this.accountInfoSub = this.store.select(fromRoot.accountGetInfo)
                .subscribe((userInfo) => {
                    this.userInfo = userInfo;

                    this.userAddresses = [];
                    // const regionInfo = localStorage.getItem(LocalStorageConstants.KEY_USER_SHIPPING_ADDRESS);
                    // console.log(4444444444, regionInfo);
                    // if(regionInfo){
                    //     const data = JSON.parse(regionInfo);
                    //     if(data && data.city){
                    //         this.curRegion = data;
                    //     }
                    // }

                    if(this.curRegion && !this.curRegion.city){
                        this.curUserAddressId = parseInt(userInfo.default_shipping);
                        this.loadCurRegion();
                    }

                    // this.userAddresses = userInfo.addresses;
                    this.getDisplayedAddresses();
                });
        });

        this.productDetailSub = this.store.select(fromRoot.productsGetDetails).subscribe((product) => {
            this.productId = product.id;
        });

        $(document).mouseup(function(e)
        {
            var container = $(".delivery-to-dropdown");

            // if the target of the click isn't the container nor a descendant of the container
            if (!container.is(e.target) && container.has(e.target).length === 0)
            {
                container.hide();
                $('body').removeClass('css-backdrop-lt');
                $('.backdrop-lt').remove();
            }
        });
    }

    ngOnDestroy() {
        this.isShowPopup = false;
        this.isShowPopupInfo = false;
        this.commonRegionsSub.unsubscribe();
        this.accountInfoSub.unsubscribe();
    }

    ngOnInit() {
    }

    ngAfterViewInit(){
    }

    @ViewChild('deliveryBlock') deliveryBlock: ElementRef;

    // @HostListener('document:click', ['$event.target'])
    // public onClick(targetElement) {
    //     const clickedInsideDeliveryBlock = this.deliveryBlock.nativeElement.contains(targetElement);
    //     const clickedInsideSelectBtn = targetElement.classList.contains('button-bg');
    //     clickedInsideDeliveryBlock?this.isShowPopup = !clickedInsideSelectBtn:this.isShowPopup = false;
    //
    //     this.showOrHideShadow();
    // }

    updateDefaultShipping(){
        // update default shipping address
        const cloneUserInfo = _.cloneDeep(this.userInfo);
        cloneUserInfo.default_shipping = this.curUserAddressId.toString();
        delete cloneUserInfo.addresses;
        delete cloneUserInfo.custom_attributes;
        delete cloneUserInfo.phone_number;
        delete cloneUserInfo.number_orders;
        delete cloneUserInfo.number_product_wishlist;
        delete cloneUserInfo.is_subscribed;
        delete cloneUserInfo.district;
        delete cloneUserInfo.ward;
        delete cloneUserInfo.marital_status;
        delete cloneUserInfo.anniversary_date;
        delete cloneUserInfo.street;
        delete cloneUserInfo.city;

        this.store.dispatch(new account.UpdateInfo({ customer: cloneUserInfo }));
    }

    selectUserAddress() {
        this.loadCurRegion();
        this.togglePopup();
        this.updateDefaultShipping();
    }

    selectArea(type: string = 'city'){
        switch (type){
            case 'city':
                if(this.curRegion.city === 'null') this.curRegion.city = null;
                this.curRegion.district = null;
                this.curRegion.ward = null;
                break;
            case 'district':
                if(this.curRegion.district === 'null') this.curRegion.district = null;
                this.curRegion.ward = null;
                break;
            case 'ward':
                if(this.curRegion.ward === 'null') this.curRegion.ward = null;
                break;
        }
        this.curUserAddressId = -1;
    }

    storeLSAddress(){
        if(this.curRegion.city){
            this.curRegion.isOther = true;
            this.saveCurrentRegion();
            // RegionManagement.getInstance(this.store).updateCurrentRegion(this.curRegion);
            // localStorage.setItem(LocalStorageConstants.KEY_USER_SHIPPING_ADDRESS, JSON.stringify(this.curRegion));
        }
        this.togglePopup();
    }

    togglePopup(){
        if(this.isShowPopupInfo){
            this.isShowPopupInfo = false;
        }

        this.isShowPopup = !this.isShowPopup;
        if(this.showBackDrop){
            this.showOrHideShadow();
        }
    }

    showOrHideShadow(){
        if(!this.isShowPopupInfo && this.isShowPopup){
            if (!$('body').hasClass('css-backdrhop-lt') && !$('body div').hasClass('backdrop-lt')) {
                $('body').addClass('css-backdrop-lt');
                $('body').prepend(`<div class='backdrop-lt'> </div>`);
            }
        } else {
            $('body').removeClass('css-backdrop-lt');
            $('.backdrop-lt').remove();
        }
    }

    equals(item1: any, item2: any) {
        return item1 && item2 ? item1.id === item2.id : item1 === item2;
    }

    loadCurRegion(){
        const userAddress = _.find(this.userInfo.addresses, (address: any) => address.id.toString() === this.curUserAddressId.toString());
        if(userAddress){
            this.curRegion.city = _.find(this.regions, region => { return region.id == userAddress.region.region_id});
            if(this.curRegion.city){
                this.curRegion.district = _.find(this.curRegion.city.districts, district => district.id == userAddress.extension_attributes.district_id);
            }
            if(this.curRegion.district){
                this.curRegion.ward = _.find(this.curRegion.district.wards, district => district.id == userAddress.extension_attributes.ward_id);
            }
            this.curRegion.isOther = false;

            this.saveCurrentRegion();
            // localStorage.setItem(LocalStorageConstants.KEY_USER_SHIPPING_ADDRESS, JSON.stringify(this.curRegion));
        }
    }

    getDisplayedAddresses() {
        const addresses = _.reverse(_.cloneDeep(this.userInfo.addresses));
        this.userAddresses = [];
        const defaultShipping = _.find(addresses, (address : any) => {
              return address.id
                && this.userInfo.default_shipping
                && address.id.toString() === this.userInfo.default_shipping.toString();
        });
        if (defaultShipping) {
            this.userAddresses.push(defaultShipping);
        }

        _.each(addresses, (address: any) => {
            if (this.userAddresses.length < 3 && _.findIndex(this.userAddresses, (item) => item.id === address.id) === -1) {
                this.userAddresses.push(address);
            }
        });
    }

    saveCurrentRegion(){
        RegionManagement.getInstance(this.store).updateCurrentRegion(this.curRegion);
        this.reloadCartShippingRuleEvent.emit();
        // this.reloadShippingRule();
    }

    // reloadShippingRule(){
    //     if(this.productId){
    //         RegionManagement.getInstance(this.store).loadProductShippingRule(this.productId);
    //     }
    // }

    showLoginModal(isRegisterTab = false) {
        this.dialogService.addDialog(LoginModal, {
            isRegisterTab: isRegisterTab
        });
    }

    showNoInfoShip(isEnter){
        this.isShowPopupInfo = this.isShowPopup? false: isEnter;
    }
}
