import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';

import { HttpService } from '../../services/http.service';

@Injectable()
export class BrandService {
  constructor(private httpService: HttpService) {

  }

  loadBrandById(brandId) {
      return this.httpService.getElastic(`/brand/` + brandId);
  }
}
