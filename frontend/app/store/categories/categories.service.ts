import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';

import { HttpService } from '../../services/http.service';

@Injectable()
export class CategoryService {
  constructor(private httpService: HttpService) {

  }

  loadCategoryById(categoryId) {
      return this.httpService.getElastic(`categories/tree?filter={"where": {"path": "` + categoryId + `", "product_count": {"gt": 0}}}`);
  }

  getElsCategory(categoryId){
      return this.httpService.getElastic(`categories/`+categoryId+`/detail`);
  }

  checkOmniBlink(categoryId){
      const data = {
          page: 0,
          hitsPerPage:1,
          facets: [
              {
                  "type":"mkt_delivery_time",
                  "limit":50
              },
              {
                  "type":"memberships",
                  "limit":50
              }
          ]
      };
      return this.httpService.postElastic(`categories/` + categoryId + `/products`, { params: data });
  }
}
