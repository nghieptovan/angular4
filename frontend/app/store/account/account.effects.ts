import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { GlobalService } from '../../services/global.service';
import * as fromRoot from '../../store';
import * as account from './account.actions';
import { AccountService } from './account.service';

@Injectable()
export class AccountEffects {
    page: any;
    currentOrder: any;

    constructor(private _actions: Actions,
        private store: Store<fromRoot.AppState>,
        private router: Router,
        private accountService: AccountService,
        private globalService: GlobalService) {

    }

    // Register
    @Effect()
    register$ = this._actions.ofType(account.REGISTER)
        .switchMap((action) => {
            return this.accountService.register(action.payload)
                .map((resp) => {
                    const data = resp.json();
                    if (data.token) {
                        localStorage.setItem('userInfo', JSON.stringify(data.customer));
                        this.globalService.syncCustomerCookies();
                        return new account.RegisterSuccess(data);
                    } else {
                        return Observable.of(new account.RegisterFailed(data.message));
                    }
                }).catch((error) => {
                    return Observable.of(new account.RegisterFailed(error));
                });
        });

    // Reset password
    @Effect()
    resetPassword$ = this._actions.ofType(account.RESET_PASSWORD)
        .switchMap((action) => {
            return this.accountService.resetPassword(action.payload)
                .map((data) => {
                    this.router.navigate(['account/resetpassword-success']);
                    return new account.ResetPasswordSuccess(data.json());
                }).catch((error) => {
                    return Observable.of(new account.ResetPasswordFailed(error.json()));
                });
        });

    @Effect()
    getUserInfo$ = this._actions.ofType(account.LOAD_INFO)
        .switchMap((action) => {
            return this.accountService.getCustomerInfo()
                .map((info) => {
                    localStorage.setItem('userInfo', JSON.stringify(info.json()));
                    return new account.LoadInfoSuccess(info.json());
                }).catch((error) => {
                    return Observable.of(new account.LoadInfoFailed(error));
                });
        });

    @Effect()
    getUserWishlist$ = this._actions.ofType(account.LOAD_WISHLIST)
        .mergeMap((action) => {
            return this.accountService.getWishlist(action.payload)
                .map((wishlist) => {
                    return new account.LoadWishListSuccess({ id: action.payload, wishlist: wishlist.json() });
                }).catch((error) => {
                    return Observable.of(new account.LoadWishListFailed(error));
                });
        });

    @Effect()
    updateUserWishlist$ = this._actions.ofType(account.UPDATE_WISHLIST)
        .switchMap((action) => {
            return this.accountService.updateWishlist(action.payload)
                .map((wishlist) => {
                    return new account.UpdateWishListSuccess(action.payload);
                }).catch((error) => {
                    return Observable.of(new account.UpdateWishListFailed(error));
                });
        });

    @Effect()
    shareWishlistViaEmail$ = this._actions.ofType(account.WISHLIST_SHARE_EMAIL)
        .switchMap((action) => {
            return this.accountService.shareWishlistViaMail(action.payload)
                .map((wishlist) => {
                    this.router.navigate(['account/wishlist']);
                    return new account.ShareWishlistViaEmailSuccess(action.payload);
                }).catch((error) => {
                    return Observable.of(new account.ShareWishlistViaEmailFailed(error.json()));
                });
        });

    @Effect()
    updateUser$ = this._actions.ofType(account.UPDATE_INFO)
        .switchMap((action) => {
            return this.accountService.updateCustomerInfo(action.payload)
                .map(info => info.json())
                .map(info => {
                    return new account.UpdateInfoSuccess(info);
                }).catch((error) => {
                    try {
                        return Observable.of(new account.UpdateInfoFailed(error.json()));
                    } catch (e) {
                        return Observable.of(new account.UpdateInfoFailed(error));
                    }
                });
        });

    @Effect()
    addProductToWishlist$ = this._actions.ofType(account.WISHLIST_ADD_PRODUCT)
        .switchMap((action) => {
            return this.accountService.addProductToWishlist(action.payload)
                .map(resp => {
                    this.store.dispatch(new account.LoadWishList(0));
                    return new account.AddProductToWishListSuccess(resp);
                }).catch((error) => {
                    return Observable.of(new account.AddProductToWishListFailed(error));
                });
        });

    @Effect()
    deleteProductFromWishlist$ = this._actions.ofType(account.WISHLIST_DELETE_PRODUCT)
        .switchMap((action) => {
            return this.accountService.deleteProductInWishlist(action.payload)
                .map(resp => {
                    return new account.DeleteProductFromWishListSuccess(action.payload);
                }).catch((error) => {
                    return Observable.of(new account.DeleteProductFromWishListFailed(error));
                });
        });

    @Effect()
    loadOrders$ = this._actions.ofType(account.LOAD_ORDERS)
        .withLatestFrom(this.store.select(fromRoot.accountGetOrders))
        .switchMap(([action, orders]) => {
            return this.accountService.getCustomerOrders(action.payload)
                .map(resp => {
                    this.currentOrder = action.payload;
                    return new account.LoadOrdersSuccess(resp.json());
                }).catch((error) => {
                    return Observable.of(new account.LoadOrdersFailed(error));
                });
        });

    @Effect()
    loadOrderById$ = this._actions.ofType(account.LOAD_ORDER_BY_ID)
        .switchMap((action) => {
            return this.accountService.getCustomerOrderById(action.payload)
                .map(resp => {
                    return new account.LoadOrderByIdSuccess(resp.json());
                }).catch((error) => {
                    return Observable.of(new account.LoadOrderByIdFailed(error));
                });
        });

    @Effect()
    loadOrderTracking$ = this._actions.ofType(account.LOAD_ORDER_TRACKING)
        .switchMap((action) => {
            return this.accountService.getOrderTracking(action.payload)
                .map(resp => {
                    return new account.LoadOrderTrackingSuccess(resp.json());
                }).catch((error) => {
                    return Observable.of(new account.LoadOrderTrackingFailed(error));
                });
        });

    @Effect()
    cancelOrder$ = this._actions.ofType(account.CANCEL_ORDER)
        .switchMap((action) => {
            return this.accountService.cancelCustomerOrder(action.payload)
                .map(resp => {
                    return new account.CancelOrderSuccess(resp.json());
                }).catch((error) => {
                    return Observable.of(new account.CancelOrderFailed(error));
                });
        });

    @Effect()
    getLPoint$ = this._actions.ofType(account.GET_LPOINT)
        .switchMap((action) => {
            return this.accountService.getCustomerLPoint()
                .map(resp => {
                    return new account.GetLPointSuccess(resp.text());
                }).catch((error) => {
                    return Observable.of(new account.GetLPointFailed());
                });
        });

    @Effect()
    checkSubscriptionStatus$ = this._actions.ofType(account.CHECK_SUBSCRIPTION_STATUS)
        .switchMap((action) =>
            this.accountService.checkSubscriptionStatus()
                .map((resp) => {
                    return new account.CheckSubscriptionStatusSucccess(resp.json());
                }).catch((error) => {
                    return Observable.of(new account.CheckSubscriptionStatusFailed(error));
                }));

    @Effect()
    subscribe$ = this._actions.ofType(account.SUBSCRIBE)
        .switchMap((action) =>
            this.accountService.subscribe()
                .map((resp) => {
                    return new account.SubscribeSuccess(resp.json());
                }).catch((error) => {
                    return Observable.of(new account.SubscribeFailed(error));
                }));

    @Effect()
    unsubscribed$ = this._actions.ofType(account.UNSUBSCRIBE)
        .switchMap((action) =>
            this.accountService.unsubscribe()
                .map((resp) => {
                    return new account.UnsubscribeSuccess(resp.json());
                }).catch((error) => {
                    return Observable.of(new account.UnsubscribeFailed(error));
                }));

    @Effect()
    getRatingSellerPending$ = this._actions.ofType(account.LOAD_RATING_SELLER_PENDING)
        .switchMap((action) =>
            this.accountService.getRatingPending()
                .map((response) => {
                    return new account.LoadRatingPendingSuccess(response.json());
                }).catch((error) => {
                    return Observable.of(new account.LoadRatingPendingFailed(error));
                }));

    @Effect()
    getRatedSeller$ = this._actions.ofType(account.LOAD_RATING_SELLER)
        .switchMap((action) =>
            this.accountService.getRatedSeller()
                .map((response) => {
                    return new account.LoadRatedSellerSuccess(response.json());
                }).catch((error) => {
                    return Observable.of(new account.LoadRatedSellerFailed(error));
                }));

    @Effect()
    submitRating$ = this._actions.ofType(account.SUBMIT_RATING_SELLER)
        .switchMap((action) =>
            this.accountService.submitRating(action.payload)
                .map((resp) => {
                    return new account.SubmitRatingSuccess(resp.json());
                }).catch((error) => {
                    return Observable.of(new account.SubmitRatingFailed(error));
                }));
    @Effect()
    getQAs$ = this._actions.ofType(account.LOAD_QA)
        .switchMap((action) =>
            this.accountService.getQA(action.payload)
                .map((response) => {
                    return new account.LoadQASuccess(response.json());
                }).catch((error) => {
                    return Observable.of(new account.LoadQAFailed(error));
                }));

    @Effect()
    getDetailComment$ = this._actions.ofType(account.LOAD_DETAIL_COMMENT)
        .switchMap((action) =>
            this.accountService.getDetailComment(action.payload.id, action.payload.customer_id)
                .map((response) => {
                    return new account.LoadDetailCommentSuccess(response.json());
                }).catch((error) => {
                    return Observable.of(new account.LoadDetailCommentFailed(error));
                }));

    @Effect()
    getLpointHistory$ = this._actions.ofType(account.LOAD_LPOINT_HISTORY)
        .switchMap((action) =>
            this.accountService.getLpointHistory(action.payload.page)
                .map((response) => {
                    return new account.LoadLpointHistorySuccess(response.json());
                }).catch((error) => {
                    return Observable.of(new account.LoadLpointHistoryFailed(error));
                }));

    @Effect()
    getDetailLpointHistory$ = this._actions.ofType(account.LOAD_DETAIL_LPOINT_HISTORY)
        .switchMap((action) =>
            this.accountService.getDetailLpointHistory(action.payload.order_id)
                .map((response) => {
                    return new account.LoadDetailLpointHistorySuccess(response.json());
                }).catch((error) => {
                    return Observable.of(new account.LoadDetailLpointHistoryFailed(error));
                }));
    @Effect()
    updateLpoint = this._actions.ofType(account.UPDATE_LPOINT)
        .switchMap((action) =>
            this.accountService.updateLpoint()
                .map((response) => {
                    return new account.UpdateLPointSuccess(response.json());
                }).catch((error) => {
                    return Observable.of(new account.UpdateLPointFailed(error));
                }));
    @Effect()
    loadGuestOrderTracking$ = this._actions.ofType(account.GUEST_ORDER_TRACKING)
        .switchMap((action) => {
            return this.accountService.getGuestTrackingOrder(action.payload)
                .map(resp => {
                    return new account.LoadGuestTrackingOrderSuccess(resp.json());
                }).catch((error) => {
                    return Observable.of(new account.LoadGuestTrackingOrderFailed(error));
                });
        });

}
