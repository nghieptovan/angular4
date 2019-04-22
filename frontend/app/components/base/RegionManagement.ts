import {Injectable} from '@angular/core';
import {Store} from "@ngrx/store";
import * as fromRoot from '../../store';
import * as _ from 'lodash';
import {LocalStorageConstants} from "./constants/LocalStorageConstants";
import {AppConstants} from "../../app.constant";
import * as products from '../../store/products/products.actions';
import * as checkout from '../../store/checkout/checkout.actions';
import {CART_TYPE, CartManagement} from "./cart/CartManagement";

@Injectable()
export class RegionManagement{
    private static _instance:RegionManagement = null;
    private timeOutLoadShippingId: any;
    private timeOutLoadExpressShippingId: any;

    private curRegion: any = {
        city: null,
        district: null,
        ward: null,
        isOther: false
    };

    private currentStep: any = -2;

    // Return the instance
    public static getInstance(store): RegionManagement {
        if (this._instance === null) {
            this._instance = new RegionManagement(store);
        }
        return this._instance;
    }

    private constructor(private store: Store<fromRoot.AppState>){
        this._bindRegionData();
    }

    private _bindRegionData() {
        const lsUserShipInfo = localStorage.getItem(LocalStorageConstants.KEY_USER_SHIPPING_ADDRESS);

        if(lsUserShipInfo){
            this.curRegion = JSON.parse(lsUserShipInfo);
            // console.log(77777777, this.curRegion);
        }
        // else {
        //     // this.curRegion.city = this.regions.find((region) => {
        //     //     return region.id.toString() === AppConstants.DEFAULT_REGION.CITY_ID.toString();
        //     // });
        //
        //     // if (this.curRegion && this.curRegion.city) {
        //     //     this.curRegion.district = this.curRegion.city.districts.find((district) => {
        //     //         return AppConstants.DEFAULT_REGION.DISTRICT_ID && district.id.toString() === AppConstants.DEFAULT_REGION.DISTRICT_ID.toString();
        //     //     });
        //     // }
        // }

        if(!this.curRegion){
            this.curRegion = {
                city: null,
                district: null,
                ward: null,
                isOther: false
            }
        }
    }

    loadProductShippingRule(productId){
        clearTimeout(this.timeOutLoadShippingId);
        this.timeOutLoadShippingId = setTimeout(() => {
            if(this.curRegion && this.curRegion.city){
                const payload = {
                    productId: productId,
                    region: {
                        cityId: this.curRegion.city.id,
                        districtId: this.curRegion.district ? this.curRegion.district.id : 0,
                        wardId: this.curRegion.ward ? this.curRegion.ward.id : 0
                    }
                };
                this.store.dispatch(new products.ProductLoadShippingRule(payload));
            }
        }, 1000);
    }

    loadProductExpressShippingRule(vendorAddress: any){
        clearTimeout(this.timeOutLoadExpressShippingId);
        this.timeOutLoadExpressShippingId = setTimeout(() => {
            if(this.curRegion && this.curRegion.city){
                const payload = {
                    data: {

                    }
                };
                this.store.dispatch(new products.ProductLoadExpressShippingRule(payload));
            }
        }, 1000);
    }


    loadCartShippingRule(cart_type = {type:CART_TYPE.NORMAL_CART, id: null}) {
        if (this.getCheckoutStep() != 3 && this.curRegion && this.curRegion.city && this.curRegion.city.id) {
        }


    }

    getCurrentRegion(){
        return this.curRegion;
    }

    getDefaultRegion(regions: Array<any> = []){
        if(regions && regions.length > 0){
            this.curRegion.city = regions.find((region) => {
                return region.id.toString() === AppConstants.DEFAULT_REGION.CITY_ID.toString();
            });

            if (this.curRegion && this.curRegion.city) {
                const temp = this.curRegion.city.districts.find((district) => {
                    return AppConstants.DEFAULT_REGION.DISTRICT_ID && district.id.toString() === AppConstants.DEFAULT_REGION.DISTRICT_ID.toString();
                });

                if(temp){
                    this.curRegion.district = temp;
                }
            } else {
                this.curRegion.city = null;
            }
            localStorage.setItem(LocalStorageConstants.KEY_USER_SHIPPING_ADDRESS, JSON.stringify(this.curRegion));
        }
        return this.curRegion;
    }

    updateCurrentRegion(region){
        this.curRegion = region;
        localStorage.setItem(LocalStorageConstants.KEY_USER_SHIPPING_ADDRESS, JSON.stringify(this.curRegion));
    }

    ngOnDestroy(){
    }

    getCheckoutStep(){
        this.store.select(fromRoot.checkoutGetCurrentStep).subscribe((currentStep : any) => {
            this.currentStep = currentStep;
        });
        return this.currentStep;
    }
}
