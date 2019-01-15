import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { HttpService } from '../../services/http.service';

@Injectable()
export class TpoService {

    constructor(private httpService: HttpService) {

    }

    getTpoGroup() {
        return this.httpService.getAnonymous('tpo/group/');
    }

    //[LT-646] huytt: change to use api on els
    getTpoDetail(urlkey) {
        // return this.httpService.getAnonymous('tpo/detail/' + urlkey);
        return this.httpService.getElastic('hashtags/slug/'+ urlkey +'?filter[excludes][]=products&filter[excludes][]=*_ids');
    }

    //[LT-646] huytt: change to use api on els
    getTpoProducts(tpoId, page) {
        // return this.httpService.getAnonymous('tpo/detail/' + urlkey + '/products/' + page);
        return this.httpService.getElastic('hashtags/' + tpoId + '/products?hitsPerPage=20&page=' + page);
    }

    postTpoDashboardProducts(page) {
        return this.httpService.postAnonymous('tpo/widget/promotion', {page: page});
    }

    postSocialService(urlkey, method) {
        return this.httpService.postAnonymous('tpo/detail/' + urlkey + '/social', {method: method});
    }

    postTpoBlock() {
        return this.httpService.postAnonymous('tpo/block', {});
    }

    getSearchTpo(key) {
        return this.httpService.postElastic('hashtags/query', {
            params: {
                query:key,
                fields:["id","name","meaning","url","thumbnail"],
                hitsPerPage: 4
            }
        });
    }
}
