import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';

import { HttpService } from '../../services/http.service';

@Injectable()
export class VendorService {
  constructor(private httpService: HttpService) {

  }

  loadVendorById(vendorId) {
      return this.httpService.getElastic(`vendors/` + vendorId);
  }

  loadLandingSetting(vendorId){
      return this.httpService.getElastic(`vendors/` + vendorId + '/setting/');
  }
}
