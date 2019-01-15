import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import * as _ from 'lodash';

import * as fromRoot from '../../../store';
import {LoginModal} from '../../../modals/login/login';
import {DialogService} from 'ng2-bootstrap-modal';
import {ToastrService} from 'ngx-toastr';

import * as rechargeAction from '../../../store/recharge/recharge.actions';

const MIN_L_POINT_APPLY = 100;


@Component({
    selector: 'app-recharge-promotion',
    templateUrl: './promotion.html'
})
export class PromotionRechargeComponent {


    authIsLoggedIn$: Observable<any>;

    cartTotalSub: any
    cartTotal: any

    inputCouponCode: string;
    couponCode: string;

    showCoupon: boolean = false;
    showLpoint: boolean = true;

    canApplyLPoint: boolean = true;
    currentLpointAmount: number = 0;
    inputLpoint: any = 0;
    usedLPoint: number = 0;

    constructor(private store: Store<fromRoot.AppState>,
                private dialogService: DialogService,
                private toastr: ToastrService) {
        this.authIsLoggedIn$ = this.store.select(fromRoot.authGetLoggedInState);

        this.cartTotalSub = this.store.select(fromRoot.rechargeGetCartTotal).subscribe(rechargeCartTotal => {
            this.cartTotal = rechargeCartTotal;
            /*for coupon*/
            this.inputCouponCode = this.couponCode = this.cartTotal.coupon_code;
            /*for lpoint*/
            this.inputLpoint = this.usedLPoint = -parseInt(this.cartTotal.lpoint_amount, 10);
            this.currentLpointAmount = parseInt(this.cartTotal.current_lpoint_available, 10);
        });
    }

    applyCoupon() {
        this.store.dispatch(new rechargeAction.CartAddCoupon(this.inputCouponCode));
    }

    removeCoupon() {
        this.inputCouponCode = this.couponCode = '';
        this.store.dispatch(new rechargeAction.CartDeleteCoupon());
    }

    isAppliedCoupon() {
        return !(this.couponCode == null || this.couponCode === '');
    }

    updateLPoint() {
        if (!this.inputLpoint) {
            return;
        }
        if (parseInt(this.inputLpoint.toString(), 10) > this.currentLpointAmount) {
            this.toastr.error('Bạn đã nhập quá số LPoint hiện có', 'Lỗi');
            this.inputLpoint = this.currentLpointAmount;
        } else {
            if (parseInt(this.inputLpoint.toString(), 10) < MIN_L_POINT_APPLY && this.inputLpoint !== 0) {
                this.toastr.error('Số L-Point tối thiểu là ' + MIN_L_POINT_APPLY);
                this.inputLpoint = MIN_L_POINT_APPLY;
            } else {
                this.inputLpoint = this.inputLpoint ? Math.floor(this.inputLpoint / MIN_L_POINT_APPLY) * MIN_L_POINT_APPLY : this.inputLpoint;
                const grandTotal = this.cartTotal.grand_total - parseInt(this.usedLPoint.toString(), 10);
                this.inputLpoint = this.inputLpoint > grandTotal ? grandTotal : this.inputLpoint;
                this.store.dispatch(new rechargeAction.CartApplyLPoint(this.inputLpoint));
            }
        }
    }

    removeLPoint() {
        this.store.dispatch(new rechargeAction.CartApplyLPoint(0));
    }

    showLoginModal(isRegisterTab = false) {
        this.dialogService.addDialog(LoginModal, {
            isRegisterTab: isRegisterTab
        });
    }

}

