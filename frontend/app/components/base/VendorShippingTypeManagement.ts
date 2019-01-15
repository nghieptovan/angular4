import {Injectable} from '@angular/core';
import {LocalStorageConstants} from "./constants/LocalStorageConstants";
import * as _ from 'lodash';
import {GlobalConstants} from "./constants/GlobalConstants";
import {IPickupInfoStorage} from "./pickup_in_store/IPickupInfoStorage";
import {IShippingTypeStorage} from "./shipping-type/IShippingTypeStorage";

@Injectable()
export class VendorShippingTypeManagement{
    private static _instance:VendorShippingTypeManagement = null;

    public static getInstance(): VendorShippingTypeManagement {
        if (this._instance === null) {
            this._instance = new VendorShippingTypeManagement();
        }
        return this._instance;
    }

    private constructor(){
    }

    private _checkOrInitStorage(cartId){
        let storage = this.getStorageVendorShippingType();
        if(!storage) storage = {};
        if(!storage[cartId] && cartId){
            storage = {};
            storage[cartId] = [];
        }
        return storage;
    }

    private getStorageVendorShippingType(){
        const storageJson = localStorage.getItem(LocalStorageConstants.VENDOR_SHIPPING_TYPE);
        if(storageJson){
            return JSON.parse(storageJson);
        }

        return null;
    }

    getVendorShippingType(){
        const cartId = localStorage.getItem('cartId');
        if(cartId){
            let storage = this._checkOrInitStorage(cartId);
            return storage[cartId];
        }
        return [];
    }

    storeStorageVendorShippingType(vendorId, data:any){
        if(Number.isInteger(vendorId)){
            vendorId = vendorId.toString();
        }

        const cartId = localStorage.getItem('cartId');
        if(cartId && vendorId){
            let storage = this._checkOrInitStorage(cartId);
            let idx = _.findIndex(storage[cartId], ['vendorId', vendorId]);
            let inital: IShippingTypeStorage = {
                vendorId: vendorId,
                shipping_type: null
            };

            if(idx === -1){
                inital = Object.assign({}, inital, data);
                storage[cartId].push(inital);
            } else {
                storage[cartId][idx] = Object.assign({}, storage[cartId][idx], data);
            }

            localStorage.setItem(LocalStorageConstants.VENDOR_SHIPPING_TYPE, JSON.stringify(storage));
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

            localStorage.setItem(LocalStorageConstants.VENDOR_SHIPPING_TYPE, JSON.stringify(storage));
            return true;
        }
        return false;
    }

    loadSelectedShipType(cartVendors){
        const vendorShippingType = this.getVendorShippingType();

        _.map(cartVendors.by_group, obj => {
            const idx = _.findIndex(vendorShippingType, { vendorId: obj.vendor_id, shipping_type: GlobalConstants.SHIP_TYPE_OPTIONS.express});
            let shipping_type = obj.selected_shipping_type;
            // fixme: remove check support express if support select option.
            if(idx !== -1 ||
                (obj.vendor_data && obj.vendor_data.carrier_code === GlobalConstants.SHIPPING_CARRIER.SIXTY
                    && obj.vendor_data.shipping_service === GlobalConstants.SHIP_TYPE_OPTIONS.express)){
                shipping_type = GlobalConstants.SHIP_TYPE_OPTIONS.express;
            } else if(!shipping_type){
                shipping_type = GlobalConstants.SHIP_TYPE_OPTIONS.standard;
            }

            return _.assign(obj, {
                selected_shipping_type: shipping_type
            });
        });

        return cartVendors;
    }

    storeStorageShippingType(data: any){
        localStorage.setItem(LocalStorageConstants.VENDOR_PICKUP_INFO, JSON.stringify(data));
    }

    date2String(date: Date){
        return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    }

    getShippingDuration(){
        const now = new Date();
        const fromTime = new Date();
        const toTime = new Date();
        const day = now.getDay();

        let shippingDuration = {
            detail_text: 'Giao hàng nhanh trong 4h sau khi xác nhận đơn hàng thành công',
            cart_text: 'Giao hàng nhanh trong 4h sau khi xác nhận đơn hàng thành công',
        };

        switch (day){
            // sunday
            case 0:
                now.setDate(now.getDate() + 1);
                Object.assign(shippingDuration, {
                    detail_text: 'Giao nhanh: từ 10 am - 1 pm ngày ' + this.date2String(now),
                    cart_text: 'Giao nhanh: từ 10 am - 1 pm ngày ' + this.date2String(now)
                });

                break;
            // saturday
            case 6:
                if(now.getHours() < 8){
                    Object.assign(shippingDuration, {
                        detail_text: 'Giao nhanh: từ 10 am - 1 pm ngày ' + this.date2String(now),
                        cart_text: 'Giao nhanh: từ 10 am - 1 pm ngày ' + this.date2String(now)
                    });
                } else if(now.getHours() < 12){
                    fromTime.setHours(now.getHours() + 2);
                    toTime.setHours(now.getHours() + 5);

                    Object.assign(shippingDuration, {
                        detail_text: 'Giao nhanh: từ ' + String.prototype.toStringTimeFormat(fromTime) + '-'
                        + String.prototype.toStringTimeFormat(toTime) + ' ngày ' + this.date2String(now),
                        cart_text: 'Giao nhanh: từ ' + String.prototype.toStringTimeFormat(fromTime) + '-'
                        + String.prototype.toStringTimeFormat(toTime) + ' ngày ' + this.date2String(now),
                    });
                } else {
                    now.setDate(now.getDate() + 2);
                    Object.assign(shippingDuration, {
                        detail_text: 'Giao nhanh: từ 10 am - 1 pm ngày ' + this.date2String(now),
                        cart_text: 'Giao nhanh: từ 10 am - 1 pm ngày ' + this.date2String(now)
                    });
                }
                break;
            default:
                if(now.getHours() < 8){
                    Object.assign(shippingDuration, {
                        detail_text: 'Giao nhanh: từ 10 am - 1 pm ngày ' + this.date2String(now),
                        cart_text: 'Giao nhanh: từ 10 am - 1 pm ngày ' + this.date2String(now)
                    });
                } else if(now.getHours() < 16){
                    fromTime.setHours(now.getHours() + 2);
                    toTime.setHours(now.getHours() + 5);

                    Object.assign(shippingDuration, {
                        detail_text: 'Giao nhanh: từ ' + String.prototype.toStringTimeFormat(fromTime) + ' - '
                        + String.prototype.toStringTimeFormat(toTime) + ' ngày ' + this.date2String(now),
                        cart_text: 'Giao nhanh: từ ' + String.prototype.toStringTimeFormat(fromTime) + ' - '
                        + String.prototype.toStringTimeFormat(toTime) + ' ngày ' + this.date2String(now),
                    });
                } else {
                    now.setDate(now.getDate() + 1);
                    Object.assign(shippingDuration, {
                        detail_text: 'Giao nhanh: từ 10 am - 1 pm ngày ' + this.date2String(now),
                        cart_text: 'Giao nhanh: từ 10 am - 1 pm ngày ' + this.date2String(now)
                    });
                }
                break;
        }

        return shippingDuration;
    }
}