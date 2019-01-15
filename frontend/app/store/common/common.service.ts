import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';

import { HttpService } from '../../services/http.service';

@Injectable()
export class CommonService {
    constructor(private httpService: HttpService) {

    }

    getStoreConfigs() {
        return this.httpService.getAnonymous('store/configs');
    }

    getCmsContent() {
        return this.httpService.getAnonymous('lotte_cms/contents');
    }

    getUrlInformation(slug, type, id, pathname = 0) {
        if (pathname) {
            return this.httpService.getAnonymous(`integration/url-information?type=${type}&slug=${slug}&id=${id}&top_content=1&pathname=${pathname}`);
        }
        return this.httpService.getAnonymous('integration/url-information?type=' + type + '&slug=' + slug
            + '&id=' + id + '&top_content=1');
    }

    getCountryInformation() {
        return this.httpService.getAnonymous('directory/country-information');
    }

    getSharedSession() {
        return this.httpService.getAnonymous('lotte_carts/checkout-information');
    }

    getCurrentLocation(latitude, longitude) {
        return this.httpService.getAnonymous('current-location?latitude=' + latitude + '&longitude=' + longitude);
    }

    loadTrackingCode(type, id, q = null) {
        if (q) {
            return this.httpService.getAnonymous('integration/tracking-code?type=' + type + '&id=' + id + '&q=' + q);
        } else {
            return this.httpService.getAnonymous('integration/tracking-code?type=' + type + '&id=' + id);
        }

    }

    getRecentProducts() {
        return this.httpService.getAnonymous('lotte_product/recently_viewed').map((data) => data.json());
    }

    get404Page() {
        return this.httpService.getAnonymous('lotte-cms-page/no-route');
    }
}
