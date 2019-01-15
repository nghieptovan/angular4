import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Dispatcher, Store } from '@ngrx/store';
import { DialogService } from 'ng2-bootstrap-modal/dist/dialog.service';
import { Subscription } from 'rxjs/Subscription';

import { AppConstants } from '../../../app.constant';
import { ReviewRulesModal } from '../../../modals/review-rules/review-rules';
import * as fromRoot from '../../../store';
import * as products from '../../../store/products/products.actions';
import { ReviewSuccessModal } from './../../../modals/review-success/review-success';
import * as _ from 'lodash';

@Component({
    selector: 'app-fs-product-review',
    templateUrl: './review.html'
})

export class FSProductReview {
    product: any;
    reviews$: any;
    authIsLoggedIn: any;
    userInfo: any;
    isEditNickname: Boolean = false;
    isInfoTab: boolean;
    isFormShown: boolean;

    REGEX_EMAIL = AppConstants.REGEX.EMAIL;
    // Map rate option_id with rating value
    ratings = [
        32,
        34,
        36,
        38,
        40
    ];
    newReview: any;
    subscriber: Subscription;
    productSub: any;
    bannerAttributes: any;
    constructor(private store: Store<fromRoot.AppState>, private dispatcher: Dispatcher, private domSanitizer: DomSanitizer,
        private dialogService: DialogService) {
        this.productSub = this.store.select(fromRoot.productsGetDetails)
            .subscribe((product) => {
                this.product = product;
                if (this.product.extension_attributes) {
                    this.product.extension_attributes.description = this.domSanitizer.bypassSecurityTrustHtml(this.product.extension_attributes.description);
                }
            });
        this.store.select(fromRoot.commonGetCmsContents)
            .subscribe((cms) => {
                this.bannerAttributes = null;
                _.each(cms, (block: any) => {
                    if (block.identifier === 'banner_attributes') {
                        this.bannerAttributes = this.domSanitizer.bypassSecurityTrustHtml(block.content);
                    }
                });
            });
        this.reviews$ = this.store.select(fromRoot.productsGetReviews);

        this._initModels();
    }

    ngAfterViewInit() {
        this.store.select(fromRoot.productsGetDetails).subscribe((product) => {
            this.newReview.product_id = product.id;
        });
        this.store.select(fromRoot.authGetLoggedInState).subscribe((loggedIn) => {
            this.authIsLoggedIn = loggedIn;
        });
        this.store.select(fromRoot.accountGetInfo).subscribe((userInfo) => {
            this.userInfo = userInfo;
            this.newReview.nickname = this.userInfo.firstname;
            this.newReview.email = this.userInfo.email;
            this.newReview.phone = this.userInfo.phone_number;
        });
        this.subscriber = this.dispatcher.subscribe((action) => {
            switch (action.type) {
                case products.POST_PRODUCT_REVIEW_SUCCESS:
                    this.dialogService.addDialog(ReviewSuccessModal).subscribe((result) => {
                        this._initModels();
                    });
                    break;
                default:
                    break;
            }
        });
    }

    ngOnDestroy() {
        if (this.subscriber) {
            this.subscriber.unsubscribe();
        }
        this.productSub.unsubscribe();
    }

    openReviewRulesDialog() {
        this.dialogService.addDialog(ReviewRulesModal);
    }

    submitReview(form) {
        if (form.valid && this.newReview.validate_rating) {
            this.newReview.option_id = this.ratings[this.newReview.validate_rating - 1];
            if (this.authIsLoggedIn && this.userInfo) {
                this.newReview.customer_id = this.userInfo.id;
            }
            this.store.dispatch(new products.PostProductReview({
                review: this.newReview
            }));
        }
    }

    _initModels() {
        this.isFormShown = false;
        this.isInfoTab = true;
        this.newReview = {
            validate_rating: 0,
            option_id: 32,
            email: '',
            product_id: 0,
            nickname: '',
            phone: '',
            title: '',
            detail: '',
            zendesk_ticket: '',
            customer_id: ''
        };
    }

    editNickname() {
        this.isEditNickname = true;
    }
}
