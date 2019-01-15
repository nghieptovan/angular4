import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { HttpService } from '../../services/http.service';

@Injectable()
export class CampaignService {

    constructor(private httpService: HttpService) {

    }

    getCampaign(urlKey) {
        return this.httpService.getAnonymous(`campaign-promotion?url=` + urlKey + `&type=campaign`).map(data => data.json());
    }

    getPromotions(urlKey) {
        return this.httpService.getAnonymous(`promotion-page-details/` + urlKey).map(data => data.json());
    }

    loadProductsByPromotion(promotionId, params) {
        return this.httpService.postElastic(`promotion-category/` + promotionId + `/products`, { params: params });
    }
}
