import {Injectable} from '@angular/core';
import {LocalStorageConstants} from "./constants/LocalStorageConstants";
import * as _ from 'lodash';
import {GlobalConstants} from "./constants/GlobalConstants";
import {IPickupInfoStorage} from "./pickup_in_store/IPickupInfoStorage";

@Injectable()
export class VendorPickupManagement{
    private static _instance:VendorPickupManagement = null;

    public static getInstance(): VendorPickupManagement {
        if (this._instance === null) {
            this._instance = new VendorPickupManagement();
        }
        return this._instance;
    }

    private constructor(){
    }

    private _checkOrInitStorage(cartId){
        let storage = this.getStorageVendorPickup();
        if(!storage) storage = {};
        if(!storage[cartId] && cartId){
            storage = {};
            storage[cartId] = [];
        }
        return storage;
    }

    private getStorageVendorPickup(){
        const storageJson = localStorage.getItem(LocalStorageConstants.VENDOR_PICKUP_INFO);
        if(storageJson){
            return JSON.parse(storageJson);
        }

        return null;
    }

    getVendorPickupInfo(){
        const cartId = localStorage.getItem('cartId');
        if(cartId){
            let storage = this._checkOrInitStorage(cartId);
            return storage[cartId];
        }
        return [];
    }

    storeStorageVendorPickup(vendorId, pickupInfo){
        if(Number.isInteger(vendorId)){
            vendorId = vendorId.toString();
        }

        const cartId = localStorage.getItem('cartId');
        if(cartId && vendorId){
            let storage = this._checkOrInitStorage(cartId);
            let idx = _.findIndex(storage[cartId], ['vendorId', vendorId]);
            let inital: IPickupInfoStorage = {
                isActive: false,
                customer_name: null,
                customer_email: null,
                customer_phone: null,
                vendorId: vendorId,
                vendor_location: null,
                vendor_name: null,
                duration_standard: null
            };

            if(idx === -1){
                inital = Object.assign({}, inital, pickupInfo);
                storage[cartId].push(inital);
            } else {
                storage[cartId][idx] = Object.assign({}, storage[cartId][idx], pickupInfo);
            }

            localStorage.setItem(LocalStorageConstants.VENDOR_PICKUP_INFO, JSON.stringify(storage));
            return true;
        }
        return false;

    }

    deleteStorageVendorPickup(vendorId){
        const cartId = localStorage.getItem('cartId');
        if(cartId){
            let storage = this._checkOrInitStorage(cartId);
            let idx = _.findIndex(storage[cartId], ['vendorId', vendorId]);
            if(idx !== -1){
                storage[cartId].splice(idx, 1);
            }

            localStorage.setItem(LocalStorageConstants.VENDOR_PICKUP_INFO, JSON.stringify(storage));
            return true;
        }
        return false;
    }

    loadSelectedShipType(cartVendors){
        const vendorPickup = this.getVendorPickupInfo();

        _.map(cartVendors.by_group, obj => {
            const idx = _.findIndex(vendorPickup, { vendorId: obj.vendor_id, isActive: true });
            const pickupInfoData = {
                selected_shipping_type:  idx !== -1?GlobalConstants.SHIP_TYPE_OPTIONS.pickup:GlobalConstants.SHIP_TYPE_OPTIONS.standard,
                pickupInfo:  idx !== -1?vendorPickup[idx]:{
                    isActive: false,
                    customer_name: null,
                    customer_email: null,
                    customer_phone: null,
                    vendorId: obj.vendor_id,
                }
            };

            return _.assign(obj, pickupInfoData);
        });

        return cartVendors;
    }

    storeStoragePickupInfo(pickupInfo: any){
        localStorage.setItem(LocalStorageConstants.VENDOR_PICKUP_INFO, JSON.stringify(pickupInfo));
    }

    date2String(date: Date){
        return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    }

    getShippingDuration(){
        const now = new Date();
        const day = now.getDay();
        const nowHour = now.getHours();
        let shippingDuration = {
            duration: 2,
            detail_text: 'Hàng sẵn sàng để nhận từ 1 pm ngày hôm nay ' + this.date2String(now),
            cart_text: 'Lấy hàng từ 1 pm ngày hôm nay ' + this.date2String(now),
        };
        let temp = 0;
        switch (day){
            // sunday
            case 0:
                temp = 37 - nowHour;
                now.setHours(now.getHours() + temp);
                Object.assign(shippingDuration, {
                    duration: temp,
                    detail_text: 'Hàng sẵn sàng để nhận từ 1 pm ngày mai ' + this.date2String(now),
                    cart_text: 'Lấy hàng từ 1 pm ngày mai nay ' + this.date2String(now),
                });
                break;
            // saturday
            case 6:
                temp = nowHour < 10? 13 - nowHour: 10 <= nowHour && nowHour < 14? 16 - nowHour:61-nowHour;
                now.setHours(now.getHours() + temp);
                Object.assign(shippingDuration, {
                    duration: temp,
                    detail_text: (nowHour < 10?'Hàng sẵn sàng để nhận từ 1 pm ngày hôm nay ':
                        10 <= nowHour && nowHour < 14?'Hàng sẵn sàng để nhận từ 4:30 pm ngày hôm nay ':
                            'Hàng sẵn sàng để nhận từ 1 pm Thứ hai ngày ')  + this.date2String(now),
                    cart_text: (nowHour < 10?'Lấy hàng từ 1 pm ngày hôm nay ':
                        10 <= nowHour && nowHour < 14?'Lấy hàng từ 4:30 pm ngày hôm nay ':
                            'Lấy hàng từ 1 pm Thứ hai ngày ')  + this.date2String(now),
                });
                break;
            default:
                temp = nowHour < 10? 13 - nowHour: 10 <= nowHour && nowHour < 14? 16 - nowHour:37-nowHour;
                now.setHours(now.getHours() + temp);
                Object.assign(shippingDuration, {
                    duration: temp,
                    detail_text: (nowHour < 10?'Hàng sẵn sàng để nhận từ 1 pm ngày hôm nay ':
                        10 <= nowHour && nowHour < 14?'Hàng sẵn sàng để nhận từ 4:30 pm ngày hôm nay ':
                            'Hàng sẵn sàng để nhận từ 1 pm ngày mai ')  + this.date2String(now),
                    cart_text: (nowHour < 10?'Lấy hàng từ 1 pm ngày hôm nay ':
                        10 <= nowHour && nowHour < 14?'Lấy hàng từ 4:30 pm ngày hôm nay ':
                            'Lấy hàng từ 1 pm ngày mai ')  + this.date2String(now),
                });
                break;
        }

        return shippingDuration;
    }
}