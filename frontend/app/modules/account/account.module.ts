import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppCommonModule } from '../../app.common.module';
import { LtLpointPaginationComponent } from '../../components/account/l-point/pagination';
import { LotteAccountAddress } from './address/address';
import { LotteAccountAddressEdit } from './address/edit/edit';
import { LotteAccountAddressNew } from './address/new/new';
import { LotteAccountComment } from './comment/comment';
import { LotteAccountDetailComment } from './comment/detail/detail';
import { LotteAccountEdit } from './edit/edit';
import { LotteAccountInfo } from './info/info';
import { LotteAccountLPoint } from './l-point/l-point';
import { LotteAccountMyQa } from './myqa/myqa';
import { LotteAccountMySellerRating } from './myseller-rating/myseller-rating';
import { LotteAccountOrderDetail } from './orders/detail/detail';
import { LotteAccountOrders } from './orders/orders';
import { LotteAccountOrderTracking } from './orders/tracking/tracking';
import { LotteAccountPaymentMethod } from './payment-method/payment-method';
import { LotteAccountPendingSeller } from './pending-seller/pending-seller';
import { LotteAccountSubscribe } from './subscribe/subscribe';
import { LotteAccountWishlistShare } from './wishlist/share/share';
import { LotteAccountWishlist } from './wishlist/wishlist';

const routes: Routes = [
    {
        path: '',
        component: LotteAccountInfo
    },
    {
        path: 'edit',
        component: LotteAccountEdit
    },
    {
        path: 'payment-method',
        component: LotteAccountPaymentMethod
    },
    {
        path: 'orders',
        component: LotteAccountOrders
    },
    {
        path: 'orders/:id',
        component: LotteAccountOrderDetail
    },
    {
        path: 'orders/tracking/:id',
        component: LotteAccountOrderTracking
    },
    {
        path: 'lpoint',
        component: LotteAccountLPoint
    },
    {
        path: 'wishlist',
        component: LotteAccountWishlist
    },
    {
        path: 'wishlist/share/:id',
        component: LotteAccountWishlistShare
    },
    {
        path: 'address',
        component: LotteAccountAddress
    },
    {
        path: 'address/new',
        component: LotteAccountAddressNew
    },
    {
        path: 'address/edit/:id',
        component: LotteAccountAddressEdit
    },
    {
        path: 'subscribe',
        component: LotteAccountSubscribe
    },
    {
        path: 'pending-seller',
        component: LotteAccountPendingSeller
    },
    {
        path: 'myseller-rating',
        component: LotteAccountMySellerRating
    },
    {
        path: 'myqa',
        component: LotteAccountMyQa
    },
    {
        path: 'comment',
        component: LotteAccountComment
    },
    {
        path: 'comment/:customer_id/:id',
        component: LotteAccountDetailComment
    },
    {
        path: '**',
        redirectTo: ''
    }
];
@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        AppCommonModule
    ],
    declarations: [
        LotteAccountInfo,
        LotteAccountEdit,
        LotteAccountPaymentMethod,
        LotteAccountOrders,
        LotteAccountOrderDetail,
        LotteAccountOrderTracking,
        LotteAccountLPoint,
        LotteAccountWishlist,
        LotteAccountWishlistShare,
        LotteAccountAddress,
        LotteAccountAddressNew,
        LotteAccountAddressEdit,
        LotteAccountSubscribe,
        LotteAccountPendingSeller,
        LotteAccountMySellerRating,
        LotteAccountMyQa,
        LotteAccountComment,
        LotteAccountDetailComment,
        LtLpointPaginationComponent
    ],
    exports: [
    ]
})
export class AccountModule { }
