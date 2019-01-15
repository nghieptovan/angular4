import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Store, Dispatcher } from '@ngrx/store';
import { AppConstants } from '../../../../app.constant';
import * as fromRoot from '../../../../store';
import * as account from '../../../../store/account/account.actions';

declare var $;
@Component({
    selector: 'app-account-wishlist-share',
    templateUrl: './share.html',
    styleUrls: ['./share.less']
})
export class LotteAccountWishlistShare {

    shareData: any = {};
    multipleEmailRegex: any = AppConstants.REGEX.MULTIPLE_EMAIL;

    dispatcherSub: any;
    constructor(private store: Store<fromRoot.AppState>, private router: Router,
        private toastrService: ToastrService, private dispatcher: Dispatcher) {
        this.dispatcherSub = this.dispatcher.subscribe((action) => {
            switch (action.type) {
                case account.WISHLIST_SHARE_EMAIL_FAILED:
                    if (action.payload && action.payload.message) {
                        this.toastrService.error(action.payload.message, 'Lỗi');
                    }
                    break;
                default:
                    break;
            }
        });
    }

    shareWishlistViaEmail(data) {
        this.store.dispatch(new account.ShareWishlistViaEmail(data));
    }

    ngOnInit() {
        $('body').addClass('wishlist-index-share');
    }

    ngOnDestroy() {
        this.dispatcherSub.unsubscribe();
        $('body').removeClass('wishlist-index-share');
    }
}
