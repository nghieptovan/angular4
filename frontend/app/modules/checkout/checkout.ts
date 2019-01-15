import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Dispatcher, Store, Action } from '@ngrx/store';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';

import { ConfirmModal } from '../../modals/confirm/confirm';
import { GlobalService } from '../../services/global.service';
import * as account from '../../store/account/account.actions';
import * as auth from '../../store/auth/auth.actions';
import * as checkout from '../../store/checkout/checkout.actions';
import * as common from '../../store/common/common.actions';
import * as categories from '../../store/categories/categories.actions';
import * as fromRoot from '../../store/index';
import * as _ from 'lodash';
import { DomSanitizer } from '@angular/platform-browser';
import {CART_TYPE, CartManagement} from "../../components/base/cart/CartManagement";
import {NormalPayment} from "../../components/base/payment/NormalPayment";
import {VendorService} from "../../store/vendor/vendor.service";
import * as vendor from "../../store/vendor/vendor.actions";

// Redux
@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.html',
    styleUrls: ['./checkout.less']
})

export class LotteCheckout {
    currentStep: any = 1;
    cartId: any = true;
    cartLaterId : any = true;
    cartItemCountSub: any;
    cartItemCount: any;
    cartIsLoadingSub: any;
    cartIsLoading: any;
    isLoggedIn$: Observable<any>;
    successMessage$: Observable<any>;
    errorMessage$: Observable<any>;
    commonStoreLogos$: Observable<any>;
    dispatcher: any;
    page: String = '';
    isViewLoaded: any = false;
    footerHtml: any;
    vendorId:number;
    vendorSub: any;
    vendorInfo: any;
    paymentFunction: any;

    cmsContentSub: any;
    constructor(
        protected store: Store<fromRoot.AppState>, private dialogService: DialogService,
        protected activatedRoute: ActivatedRoute, dispatcher: Dispatcher,
        protected vendorService: VendorService,
        protected globalService: GlobalService, protected router: Router,
        private toastr: ToastrService, private domSanitizer: DomSanitizer
    ) {
        this.vendorId = this.activatedRoute.params['value'].vendorId;
        if(this.vendorId){
            this.store.dispatch(new vendor.Load({ id: this.vendorId }));
        }
        this.vendorSub = this.store.select(fromRoot.vendorGetEntity).subscribe(vendorInfo => {
            this.vendorInfo = vendorInfo;
        });

        this.loadPaymentFunction(this.vendorId);

        this.commonStoreLogos$ = this.store.select(fromRoot.commonGetStoreLogos);
        this.cmsContentSub = this.store.select(fromRoot.commonGetCmsContents)
            .subscribe((cms) => {
                this.footerHtml = null;
                _.each(cms, (block: any) => {
                    if (block.identifier === 'shopping_cart_footer_checkout_method') {
                        this.footerHtml = this.domSanitizer.bypassSecurityTrustHtml(block.content);
                    }
                });
            });

        this.page = this.activatedRoute.snapshot.paramMap.get('page');
        if (this.page && this.page === 'failure') {
            this.currentStep = -1;
            // go to failure if not normal payment
            if(!(this.paymentFunction instanceof NormalPayment)){
                this.goToFailure();
            }
        } else if (this.page && this.page === 'success') {
            // Check order payment status
            this.currentStep = -2;
            const paymentMethod = JSON.parse(this.paymentFunction.getStorage('paymentMethod'));
            if (paymentMethod && paymentMethod.method && paymentMethod.method.indexOf('vietin_gateway') > -1) {
                // this.router.navigate(['checkout'], { queryParams: { step: 4 } });
                this.goToStep4();
            } else if(this.paymentFunction instanceof NormalPayment) {
                // check order status if not normal payment
                this.store.dispatch(this.paymentFunction.getCartCheckOrderStatusAction());
            }
        } else {
            const stepParams = Number.parseInt(this.activatedRoute.queryParams['value'].step);
            if (stepParams && stepParams !== this.currentStep) {
                if (stepParams > 4) {
                    this.store.dispatch(this.paymentFunction.getUpdateCurrentStepAction(1));
                } else {
                    this.store.dispatch(this.paymentFunction.getUpdateCurrentStepAction(stepParams));
                    this.currentStep = stepParams;
                }
            }

            if (!stepParams) {
                this.store.dispatch(this.paymentFunction.getUpdateCurrentStepAction(1));
            }

            this.store.select(this.paymentFunction.getRootCheckoutGetCurrentStep())
                .subscribe((currentStep) => {
                    this.currentStep = currentStep;
                });
        }

        this.cartId = localStorage.getItem('cartId');
        this.cartLaterId = localStorage.getItem('cartLaterId');

        this.successMessage$ = this.store.select(this.paymentFunction.getRootCheckoutGetSuccessMessage());

        this.dispatcher = dispatcher.subscribe((action) => {
            switch (action.type) {
                case auth.LOGIN_SUCCESS:
                    this.store.dispatch(new account.LoadInfo());
                    this.store.dispatch(new account.LoadWishList(0));
                    break;
                case this.paymentFunction.getCART_MERGE_SUCCESSConst():
                    if (action.payload.customer_items) {
                        this.store.dispatch(this.paymentFunction.getUpdateCurrentStepAction(1));
                        setTimeout(() => {
                            this.toastr.success('Đã cập nhật thêm sản phẩm vào giỏ hàng của bạn.', 'Gộp giỏ hàng');
                        }, 1000);
                    }
                    break;
                case this.paymentFunction.getCART_CHECK_ORDER_STATUS_FAILEDConst():
                    this.goToFailure();
                    break;
                case this.paymentFunction.getCART_CHECK_ORDER_STATUS_SUCCESSConst():
                    this.goToStep4();
                    break;
                case this.paymentFunction.getCART_UPDATE_SHIPPING_INFO_SUCCESSConst():
                    localStorage.setItem('allowedPaymentMethods', JSON.stringify(action.payload.payment_methods));
                    break;
                case this.paymentFunction.getCART_UPDATE_PAYMENT_INFORMATION_FAILEDConst():
                    let response = action.payload._body;
                    if (response) {
                        response = JSON.parse(response);
                    }

                    if (action.payload && action.payload.message === 'Một số sản phẩm trong giỏ hàng không còn đủ số lượng yêu cầu.') {
                        this.store.dispatch(this.paymentFunction.getUpdateCurrentStepAction(1));
                        this.store.dispatch(this.paymentFunction.getCartLoadAction());
                    }
                    break;

                case common.LOAD_TRACKING_CODE_SUCCESS:
                    this.isViewLoaded = true;
                    break;
                case common.LOAD_TRACKING_CODE_FAILED:
                    this.isViewLoaded = true;
                    break;
                case this.paymentFunction.getCART_LOAD_SUCCESSConst():
                    this.isViewLoaded = true;
                    break;

                case this.paymentFunction.getCART_LOAD_FAILEDConst():
                    this.isViewLoaded = true;
                    break;
                case this.paymentFunction.getCART_DELETE_ITEM_SUCCESSConst():
                    this.isViewLoaded = true;
                    break;
                default:
                    break;
            }
        });

        if (this.currentStep > 0) {
            // fixme: workaround for bug of angular core 4.2
            // ref: https://github.com/angular/angular/issues/17572#issuecomment-309229619
            this.cartItemCountSub = this.store.select(this.paymentFunction.getRootCheckoutGetCartItemsCount()).subscribe(count => {
                setTimeout(() => {
                    this.cartItemCount = count;
                    if(this.currentStep == 2 && this.vendorId == null){
                        window.location.href = '/checkout?step=1';
                    }
                },0);
            });
            this.isLoggedIn$ = this.store.select(fromRoot.authGetLoggedInState);
            this.globalService.loadShippingRuleForCurrentLocation(this.paymentFunction.getCartType());

        }
        this.cartIsLoadingSub = this.store.select(this.paymentFunction.getRootCheckoutGetLoadingState()).subscribe(loading => {
            setTimeout(() => {
                this.cartIsLoading = loading;
            },0);
        });

        this.activatedRoute.queryParams.subscribe((params) => {
            if (params.step && this.currentStep.toString() !== params.step) {
                this.store.dispatch(this.paymentFunction.getUpdateCurrentStepAction(Number.parseInt(params.step)));

                this.currentStep = Number.parseInt(params.step);
            }
        });

        setTimeout(() => {
            if(this.vendorId == null){
                if((this.cartId == null || this.cartId == ''|| this.cartItemCount < 1 || this.cartItemCount == null)
                && this.currentStep > 1 && this.currentStep < 4){
                    console.log('cartItem = 0');
                    window.location.href = '/checkout?step=1';
                }

                if(this.currentStep == 2){
                    let cartTotalSub = this.store.select(this.paymentFunction.getRootCheckoutGetCartTotal()).subscribe(total => {
                        this.cartTotal =   total;
                        if(typeof this.cartTotal.items_qty !== 'undefined' && this.cartTotal.items_qty < 1){
                            console.log('out of stock all items');
                            window.location.href = '/checkout?step=1';

                        }

                    });
                }
            }
        },20);




    }
    cartTotal:any = {item_qty : 0};
    ngOnDestroy() {
        this.dispatcher.unsubscribe();
        this.cmsContentSub.unsubscribe();
        this.vendorSub.unsubscribe();
    }

    ngAfterViewInit() {
    }

    selectCheckoutStep(step) {
        if (step >= this.currentStep) {
            return;
        }

        this.dialogService.addDialog(ConfirmModal)
            .subscribe((isConfirm) => {
                if (isConfirm) {
                    this.store.dispatch(this.paymentFunction.getUpdateCurrentStepAction(step));
                }
            });
    }

    backToHome() {
        this.store.dispatch(new categories.SetSelectedStore(''));
        this.router.navigate(['/']);
        return false;
    }

    // must implement if extends
    loadPaymentFunction(vendorId = null){
        this.paymentFunction = new NormalPayment(this.store);
    }

    goToFailure(){
        this.router.navigate(['checkout/onepage', 'failure']);
    }

    goToStep4(){
        this.router.navigate(['checkout'], { queryParams: { step: 4 } });
    }

    isNoItem(cartItemCount, cartLoading){
        if(!cartItemCount && !cartLoading && this.currentStep > 1 && this.currentStep !== 4){
            return true;
        }

        return false;
    }
}
