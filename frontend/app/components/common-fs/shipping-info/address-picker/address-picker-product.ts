import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../../store/index';
import * as _ from 'lodash';
import {DialogService} from "ng2-bootstrap-modal";
import {RegionManagement} from "../../../base/RegionManagement";
import {CommonFSShippingAddressPickerComponent} from "./address-picker";

@Component({
    selector: 'app-common-fs-shipping-ap-product',
    templateUrl: 'address-picker.html'
})
export class CommonFSShippingAPProductComponent extends CommonFSShippingAddressPickerComponent{
    @Input() product: any;

    reloadShippingRule() {
        if(this.product){
            RegionManagement.getInstance(this.store).loadProductShippingRule(this.product.id);
        }
    }
}
