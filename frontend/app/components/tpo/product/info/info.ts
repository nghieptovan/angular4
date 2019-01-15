import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-tpo-product-info',
    templateUrl: './info.html',
    styleUrls: ['./info.less']
})
export class TpoProductInfoComponent {
    private _product: any;

    @Input()
    get product(): any {
        return this._product;
    }

    set product(value: any) {
        this._product = value;
    }

    constructor() { }

}
