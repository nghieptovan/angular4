import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";
import {WishList} from "../../components/base/wishlist/wishlist";
import * as _ from 'lodash';

@Component({
    selector: 'modal-lotteria-config-addcart',
    templateUrl: 'lotteria-config-addcart.html'
})

export class LotteriaConfigAddcartModal extends DialogComponent<null, any> implements OnDestroy, OnInit {
    product: any;
    attributeIds: Array<any> = [];
    configurableAttributes: Array<any> = [];
    selectedOptions: any = {};
    curSelected: any;
    addedQty: number = 1;
    timeoutId: any;

    private _productChildren: Array<any> = [];
    set productChildren(value){
        this._productChildren = value;
        if(!this.curSelected){
            this.curSelected = this._productChildren[0];
        }
    }

    // set configurableAttributes(value){
    //     this._configurableAttributes = value;
    //     console.log(4444444, value);
    // }

    constructor(dialogService: DialogService, private wishlist: WishList) {
        super(dialogService);
        document.body.classList.add('body--block-scroll');
    }

    closeModal() {
        document.body.classList.remove('body--block-scroll');
        this.close();
    }

    changeQty(qty) {
        if (this.addedQty === 1 && qty === -1) {
            return;
        }
        this.addedQty += qty;
    }

    validateProductQty(ev) {
        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(() => {
            if(this.addedQty < 1) {
                this.addedQty = 1;
            }
        }, 500);
    }

    addToCart() {
        this.result = {
            selectedProduct:this.curSelected,
            qty: this.addedQty
        };
        document.body.classList.remove('body--block-scroll');
        this.close();
    }

    selectOption(attribute, value, isHover:boolean = false){
        this.selectedOptions[attribute.attr_id] = value;
        let resFilter = _.filter(this._productChildren, this.selectedOptions);
        if(!resFilter.length){
            delete this.selectedOptions;
            this.selectedOptions = {};
            this.selectedOptions[attribute.attr_id] = value;
            resFilter = _.filter(this._productChildren, this.selectedOptions);
        }

        // find options not exist in selected options
        // const dependOption = attribute.isColor?_.filter(this.attributeIds, item => _.keys(this.selectedOptions).indexOf(item) === -1):[];
        const dependOption = _.filter(this.attributeIds, item => _.keys(this.selectedOptions).indexOf(item) === -1);

        if(resFilter[0]){
            this.curSelected = resFilter[0];

            const params = {
                simple: this.curSelected.id
            };
        }
        // update values of depend option
        let temp = _.find(this.configurableAttributes, {'attr_id': parseInt(dependOption[0])});
        if(temp){
            temp['values'] = resFilter.map(value => value[dependOption[0]]);
        }
    }

    ngOnInit() {
    }

}