import { Component } from '@angular/core';
import { Store, Dispatcher } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DialogService } from 'ng2-bootstrap-modal';
import { CancelOrderModal } from '../../../modals/cancel-order/cancel-order';
import * as fromRoot from '../../../store/index';
import * as account from '../../../store/account/account.actions';
import { CancelOrder } from '../../../store/account/account.actions';
import * as _ from 'lodash';
declare var $;
@Component({
    selector: 'app-account-orders',
    templateUrl: './orders.html',
    styleUrls: ['./orders.less']
})

export class LotteAccountOrders {
    userInfo$: Observable<any>;
    accountOrder: any;
    accountOrderLoading$: Observable<any>;
    isShowOrderDetail: any = {};
    selectedPeriod: any = 1;
    selectedLimit: any = 10;
    msgError: any;
    fromDate: any;
    toDate: any;

    accountOrderSub: any;
    dispatcherSub: any;
    constructor(private store: Store<fromRoot.AppState>, private router: Router, private dialogService: DialogService, private activatedRoute: ActivatedRoute,
        dispatcher: Dispatcher) {
        this.accountOrderSub = this.store.select(fromRoot.accountGetOrders)
            .subscribe((orders) => {
                this.accountOrder = orders;
            });
        this.accountOrderLoading$ = this.store.select(fromRoot.accountGetLoadingState);
        this.userInfo$ = this.store.select(fromRoot.accountGetInfo);
        const queryParams = this.activatedRoute.queryParams['value'];

        if (_.isEmpty(queryParams)) {
            this.store.dispatch(new account.LoadOrders(null));
        } else {
            this._initSearchParams(queryParams);
        }

        this.dispatcherSub = dispatcher.subscribe((action) => {
            switch (action.type) {
                case account.CANCEL_ORDER_SUCCESS:
                    document.body.classList.remove('body--block-scroll');
                    this.dialogService.removeAll();
                    break;
            }
        });
    }

    ngOnDestroy() {
        this.accountOrderSub.unsubscribe();
    }

    _initSearchParams(queryParams) {
        const params = [];
        _.forOwn(queryParams, (value, key) => {
            params.push(key + '=' + value);
        });

        this.selectedLimit = queryParams.limit;
        this.selectedPeriod = queryParams.m;
        this.fromDate = queryParams.f;
        this.toDate = queryParams.t;
        this.store.dispatch(new account.LoadOrders(_.join(params, '&')));
    }

    toggleViewListProduct(incrementId) {
        if (this.isShowOrderDetail[incrementId]) {
            this.isShowOrderDetail[incrementId] = false;
        } else {
            this.isShowOrderDetail[incrementId] = true;
        }
    }

    trackOrders(order) {
        this.router.navigate(['account/orders/tracking/' + order.increment_id]);
    }

    cancelOrder(order) {
        this.dialogService.addDialog(CancelOrderModal, {
            order: order
        });
    }

    searchOrder(currentPage = 0) {
        if (currentPage < 0 || (this.accountOrder.total && currentPage > this.accountOrder.page_count)) {
            return;
        }
        let params = null;
        const queryParams = {};
        if (Number.parseInt(this.selectedPeriod)) {
            params = 'm=' + this.selectedPeriod;
            queryParams['m'] = this.selectedPeriod;
        } else {

            if (!this.fromDate || !this.toDate) {
                return;
            }
            if (this.isFromDateAfterToDate()) {
                this.msgError = true;
                return;
            }
            params = 'm=0&f=' + this.fromDate + '&t=' + this.toDate;
            queryParams['m'] = 0;
            queryParams['f'] = this.fromDate;
            queryParams['t'] = this.toDate;
        }
        this.msgError = false;
        params += '&p=' + this.selectedLimit;
        params += '&c=' + currentPage;
        queryParams['p'] = this.selectedLimit;
        queryParams['c'] = currentPage;

        this.router.navigate(['account/orders'], { queryParams: queryParams });
        this.store.dispatch(new account.LoadOrders(params));
    }

    isFromDateAfterToDate() {
        const splitFromDate = _.split(this.fromDate, '/');
        const splitToDate = _.split(this.toDate, '/');
        const fromDate = new Date(splitFromDate[1] + '/' + splitFromDate[0] + '/' + splitFromDate[2]).getTime();
        const toDate = new Date(splitToDate[1] + '/' + splitToDate[0] + '/' + splitToDate[2]).getTime();
        return fromDate > toDate;
    }

    goToProductDetail(product) {
        this.router.navigate(['product', product.product_id, product.url_key]);
        return false;
    }

    goToBrand(product) {
        this.router.navigate(['brand', product.brand_id, product.brand_path.replace('/brand/', '')]);
        return false;
    }

    openDatePicker(id, isFromDate) {
        const self = this;
        if (!Number.parseInt(this.selectedPeriod)) {
            const datepicker = $(id).datepicker({
                prevText: 'Previous', prevStatus: '',
                prevJumpText: 'Previous', prevJumpStatus: '',
                nextText: 'Next', nextStatus: '',
                nextJumpText: 'Next', nextJumpStatus: '',
                monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                showMonthAfterYear: true,
                dateFormat: 'dd/mm/yy',
                changeMonth: true,
                changeYear: true,
                showOn: 'button',
                buttonImageOnly: true,
                buttonText: '',
                showButtonPanel: true,
                yearRange: '-100:+0',
                onSelect: function (dateText, inst) {
                    if (isFromDate) {
                        self.fromDate = dateText;
                    } else {
                        self.toDate = dateText;
                    }
                }
            });
            datepicker.datepicker('show');
        }
    }

    onSelectPeriod(selectedPeriod) {
        this.msgError = null;
        if (Number.parseInt(selectedPeriod)) {
            $('#date_f').datepicker('setDate', null);
            $('#date_t').datepicker('setDate', null);
        }
    }
}
