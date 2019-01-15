import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';

import { HttpService } from '../../services/http.service';

@Injectable()
export class AnniversaryService {
  constructor(private httpService: HttpService) {

  }

  loadAnniversary(year) {
      return this.httpService.get('anniversary');
  }
}
