import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Headers, Http, Response } from '@angular/http';


@Injectable()
export class Ship60Service {
    constructor(private http: Http) {

    }

    getShippingRules(data){
        data = {
            pickup_address:{
                ward:{
                    name: 'Phường 14'
                },
                district:{
                    name: 'Quận 11'
                },
                city:{
                    name: 'Hồ Chí Minh'
                },
            },
            delivery_address:{
                ward:{
                    name: 'Phường Cô Giang'
                },
                district:{
                    name: 'Quận 1'
                },
                city:{
                    name: 'Hồ Chí Minh'
                },
            }
        };

        return this.http.post('http://test.api.Ship60.com/api/v0/lotte/shipments/checkcost',
            JSON.stringify({
                Dto: {
                    PickupAddress: {
                        RawAddress: "",
                        HouseNumber: "",
                        Street: "",
                        Ward: data.pickup_address.ward.name,
                        District: data.pickup_address.district.name,
                        City: data.pickup_address.city.name
                    },
                    DeliveryAddress: {
                        RawAddress: "",
                        HouseNumber: "",
                        Street: "",
                        Ward: data.delivery_address.ward.name,
                        District: data.delivery_address.district.name,
                        City: data.delivery_address.district.city
                    },
                    Weight: 0,
                    // Dimension: "20x30x40"
                    Dimension: ""
                }
            }), {
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1bmlxdWVfbmFtZSI6ImxvdHRldm50ZXN0IiwiaWF0IjoiMTU0MjM1OTgyMiIsImp0aSI6IjZjOTk3MTY4NDIyODQ3YzFiNTM1MjZjYTI4ZTcwZjM3IiwiaXNzIjoiaHR0cDovL3BpaXNoaXAuY29tLyIsImF1ZCI6Imh0dHA6Ly9waWlzaGlwLmNvbS8iLCJleHAiOjE1NDI0NDYyMjEsIm5iZiI6MTU0MjM1OTgyMX0.4nMbV5EAbEWUEhxv946_ePa0OYIUOC5vX9RAonF_ZPU'
                // 'Authorization': 'Bearer ' + config[1].elastic_access_token
            })
        });
    }

}
