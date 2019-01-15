import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import * as fromRoot from '../../../../../store';
import {WishList} from "../../../wishlist/wishlist";
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
    selector: 'app-base-product-list-item',
    template: ''
})

export class BaseListItemComponent implements OnInit {
    _Product: any;
    authSub: any;
    color:string;
    isLoggedIn: boolean = false;
    wishListSaved: boolean = false;
    isNew: boolean = false;

    productChildren: Array<any> = [];
    configurableAttributes: Array<any> = [];
    attributeIds: Array<any> = [];
    selectedOptions: any = {};
    curHover: any;

    curImgUrl: string;
    curPrice: any;
    curPromotion: any;

    @Input()
    get product(): any {
        return this._Product;
    }

    set product(value: any) {
        this._Product = value;
        this.curImgUrl = this._Product.image_url;
        this.curPrice = this._Product.price;
        //this.curPromotion = this._Product.promotion;
        this.curPromotion = this.getProductPromotion();


        // load config info
        if(this._Product.type_id === 'configurable'){
            let childrenPrice = _.get(this._Product, 'child_price', []);
            let childrenStock = _.get(this._Product, 'child_stock', [])
            // merge price, stock and filter only in stock
            this.productChildren = _.filter(
                _.map(
                    _.map(_.get(this._Product, 'configurable_children', []), obj => {
                        const childPrice = {
                            price: _.find(childrenPrice, child => {
                                const id = _.isNumber(child.id)?child.id:parseInt(child.id);
                                if(id === obj.id) return child;
                            })
                        };

                        return _.assign(obj, childPrice);
                    }), obj => {
                        const in_stock = _.find(childrenStock, child => {
                            const id = _.isNumber(child.id)?child.id:parseInt(child.id);
                            if(id === obj.id) return child;
                        });

                        return _.assign(obj, in_stock);
                    })
                , 'in_stock'
            );

            // get options in stock
            let options = _.flatMap(this.productChildren, 'options');

            options = _.unionWith(options, _.isEqual);

            this.attributeIds = _.keys(_.groupBy(options, 'attribute_id'));

            _.each(_.get(this._Product, 'configurable_attributes', []), (attr) => {
                const values = _.filter(options, {attribute_id:attr.attribute_id}).map(value => value.label);
                if(values.length > 0){
                    this.configurableAttributes.push({
                        position: attr.position,
                        attr_id: attr.attribute_id,
                        name: attr.label,
                        isColor: attr.attribute_code.indexOf('color') !== -1,
                        values: values
                    });

                }
            });
            _.sortBy(this.configurableAttributes, ['position']);

            _.each(this.productChildren, child => {
                _.each(child.options, option => {
                    child[option.attribute_id] = option.label;
                    return child;
                });
                // delete child['options'];
            });
        }

        // load wishlist
        this.wishListSaved = this.isInUserWishlist(this._Product.id);

        // load new label
        let last60Day = new Date();
        last60Day.setDate(last60Day.getDate() - 60);
        this.isNew = last60Day < new Date(this._Product.created_at);
    }

    // Declare event so that list component can bind and handle
    @Output() addToCartEvent = new EventEmitter();

    constructor(protected store: Store<fromRoot.AppState>, protected router: Router, protected wishlist: WishList
    ) {
        this.authSub = this.store.select(fromRoot.authGetLoggedInState).subscribe((isLoggedIn) => {
            this.isLoggedIn = isLoggedIn;
        });

    }

    ngOnInit() {
    }

    ngOnDestroy(){
        this.authSub.unsubscribe();
    }

    isExpiredProductLabel(label) {
        if (label.label_to_date && label.label_from_date) {
            const now = moment();
            const toDate = moment(label.label_to_date);
            const fromDate = moment(label.label_from_date);

            if (now.isAfter(toDate) || now.isBefore(fromDate)) {
                return true;
            }
        }

        return false;
    }

    isInUserWishlist(productId){
        return this.wishlist.isInUserWishlist(productId);
    }

    addOrRemoveWishlist(productId) {
        this.wishlist.addOrRemoveWishlist(productId);
    }

    addToCart(product, ev) {
        // emit event with data for list component
        this.addToCartEvent.emit({
            product: product,
            ev: ev
        });
    }

    selectOption(attribute, value, isHover:boolean = false){
        // prevent reload depend option if hover same parent option
        if(isHover && this.curHover === value){
            return;
        }

        this.curHover = value;

        this.selectedOptions[attribute.attr_id] = value;
        let resFilter = _.filter(this.productChildren, this.selectedOptions);

        // find options not exist in selected options
        const dependOption = _.filter(this.attributeIds, item => _.keys(this.selectedOptions).indexOf(item) === -1);

        if(!isHover){
            const slug = this._Product.url.toUrlKey();
            // this.router.navigate(['product/', resFilter[0].id, slug]);
            const params = {
                simple: resFilter[0].id
            };
            this.router.navigate(['product/', this._Product.id, slug],{ queryParams: params });
        } else {
            if(resFilter[0]){
                if(resFilter[0].media_gallery.medium && resFilter[0].media_gallery.medium.length > 0){
                    this.curImgUrl = resFilter[0].media_gallery.medium[0];
                }

                if(resFilter[0].price){
                    this.curPrice = resFilter[0].price;
                }

                if(resFilter[0].promotion){
                    this.curPromotion = resFilter[0].promotion;
                }

            }
            // update values of depend option
            let temp = _.find(this.configurableAttributes, {'attr_id': parseInt(dependOption[0])});
            if(temp){
                temp['values'] = resFilter.map(value => value[dependOption[0]]);
            }
        }
    }

    getProductPromotion() {
        let allPromotions = [];

        if(typeof this._Product.promotion !== 'undefined' && this._Product.promotion != null){
            allPromotions.push(this._Product.promotion);
        }

        if(typeof this._Product.promotions_seller !== 'undefined'
            && this._Product.promotions_seller.length > 0
            && this._Product.promotions_seller != null
        ) {
            _.each(this._Product.promotions_seller, function (value) {
                allPromotions.push(value);
            });
        }

        if (allPromotions.length > 0) {
            _.each(allPromotions, function (value) {
                value.price_sort = parseInt(value.final_price.replace(/\.|₫|\s/g, ''));
            });
        }

        if(allPromotions.length > 0){
            allPromotions = _.orderBy(allPromotions, ['price_sort'], ['asc']);
        }

        return allPromotions.length > 0 ? allPromotions[0] : this._Product.promotion;

    }
}
