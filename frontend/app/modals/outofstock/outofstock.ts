import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';

import * as fromRoot from '../../store/index';

@Component({
    selector: 'lt-outofstock-modal',
    templateUrl: './outofstock.html',
    styleUrls: ['./outofstock.less']
})
export class OutOfStockModal extends DialogComponent<any, boolean> {

    orderItems: Array<any>;
    slimScrollOptions: any;
    constructor(dialogService: DialogService, store: Store<fromRoot.AppState>, private router: Router) {
        super(dialogService);
        document.body.classList.add('body--block-scroll');
        this.slimScrollOptions = {
            position: 'right',
            barOpacity: '0.5',
            barWidth: '7',
            gridBackground: 'transparent',
            barBackground: '#6e6e6e',
            alwaysVisible: false
        };
    }

    confirm() {
        this.result = true;
        document.body.classList.remove('body--block-scroll');
        this.close();
    }

    closeModal() {
        document.body.classList.remove('body--block-scroll');
        this.close();
    }

    gotoProductDetail(product) {
        const slug = product.product_path.replace('/', '');
        this.router.navigate(['product', product.product_id, slug]);
    }

    goToBrandPage(id, path) {
        this.router.navigate(['brand', id, path.replace('/brand/', '')]);
    }
}
