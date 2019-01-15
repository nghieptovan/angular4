import {Component} from '@angular/core';
import {GeneralProductList} from '../../general/product-list/product-list';

@Component({
    selector: 'app-topup-product-list',
    templateUrl: './product-list.html'
})
export class TopupProductList extends GeneralProductList {
}
