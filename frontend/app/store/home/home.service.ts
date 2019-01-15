import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AppConstants } from '../../app.constant';
import { HttpService } from '../../services/http.service';

@Injectable()
export class HomeService {
    constructor(private httpService: HttpService) {

    }

    getHomeCmsBlocks() {
        return this.httpService.getAnonymous('fashion-homepage').map(data => data.json());
    }

    getMoreProductByProductionId(id) {
        return this.httpService.getAnonymous('fashion-homepages/new-arrived/1/' + id).map(data => data.json());
    }
}
