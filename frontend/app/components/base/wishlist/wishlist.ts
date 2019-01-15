import {Injectable} from '@angular/core';
import * as fromRoot from '../../../store';
import * as checkout from '../../../store/checkout/checkout.actions';
import * as account from '../../../store/account/account.actions';
import {Store} from "@ngrx/store";
import * as _ from 'lodash';


export interface IWishList {
    userWishlist: any;
}

@Injectable()
export class WishList implements IWishList {
    userWishlist: any = [];
    userWishlistSub: any;
    authSub: any;
    isLoggedIn: boolean = false;

    constructor(private store: Store<fromRoot.AppState>) {
        this.userWishlistSub = this.store.select(fromRoot.accountGetWishList)
            .subscribe((wishlist) => {
                this.userWishlist = wishlist;
                // this.isInUserWishlist = _.findIndex(this.userWishlist, item => item['product_id'] === productId) > -1;
            });

        this.authSub = this.store.select(fromRoot.authGetLoggedInState).subscribe((isLoggedIn) => {
            // if (!isLoggedIn) {
            //     this.router.navigate(['account/login'], { queryParams: { redirect: window.location.pathname } });
            // }
            this.isLoggedIn = isLoggedIn;
        });
    }

    ngOnDestroy(){
        this.userWishlistSub.unsubscribe();
    }

    isInUserWishlist(productId){
        return _.findIndex(this.userWishlist, item => item['product_id'] === productId) > -1
    }

    addOrRemoveWishlist(productId) {
        if (this.isLoggedIn) {
            const wishlist_item = _.find(this.userWishlist, item => item['product_id'] === productId);
            if(wishlist_item !== undefined){
                this.removeItem(wishlist_item);
            } else {
                this.store.dispatch(new account.AddProductToWishList(productId));
            }

        }
    }

    removeItem(item) {
        this.store.dispatch(new account.DeleteProductFromWishList(item.wishlist_item_id));
    }

}