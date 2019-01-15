import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AppCommonModule} from '../../app.common.module';

import {SidebarRechargeComponent} from '../../components/recharge/sidebar/sidebar';
import {GeneralPage} from './generalpage/generalpage';
import {GeneralProvider} from '../../components/recharge/general/provider/provider';
import {GeneralProductList} from '../../components/recharge/general/product-list/product-list';

import {PhoneCardPage} from './phonecard/phonecard';
import {PhoneCardProvider} from '../../components/recharge/phonecard/provider/provider';
import {PhoneCardProductList} from '../../components/recharge/phonecard/product-list/product-list';

import {GameCardPage} from './gamecard/gamecard';
import {GameCardProvider} from '../../components/recharge/gamecard/provider/provider';
import {GameCardProductList} from '../../components/recharge/gamecard/product-list/product-list';

import {TopupPage} from './topup/topup';
import {TopupProvider} from '../../components/recharge/topup/provider/provider';
import {TopupProductList} from '../../components/recharge/topup/product-list/product-list';
import {TopupSummaryComponent} from '../../components/recharge/topup/summary/summary';
import {TopupInputPhoneComponent} from '../../components/recharge/topup/input-phone/input-phone';

import {PaymentRechargeComponent} from '../../components/recharge/payment/payment';
import {PaymentCardRechargeComponent} from '../../components/recharge/payment/card/card';
import {PaymentAtmRechargeComponent} from '../../components/recharge/payment/atm/atm';

import {PromotionRechargeComponent} from '../../components/recharge/promotion/promotion';
import {SummaryRechargeComponent} from '../../components/recharge/summary/summary';

import {RechargeCheckoutSuccessComponent} from '../../components/recharge/success/success';
import {RechargeCheckoutFailureComponent} from '../../components/recharge/failure/failure';

import {TermCondition} from './generalpage/termcondition/termcondition';

import {ResultPage} from './resultpage/resultpage';

const routes: Routes = [
    {
        path: '',
        component: PhoneCardPage
    },
    {
        path: 'phonecard',
        component: PhoneCardPage
    },
    {
        path: 'gamecard',
        component: GameCardPage
    },
    {
        path: 'topup',
        component: TopupPage
    },
    {
        path: 'result/:resultPage',
        component: ResultPage
    },
    {
        path: 'success',
        component: RechargeCheckoutSuccessComponent
    },
    {
        path: 'failure',
        component: RechargeCheckoutFailureComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        AppCommonModule
    ],
    declarations: [
        SidebarRechargeComponent,
        GeneralPage,
        GeneralProvider,
        GeneralProductList,
        PhoneCardPage,
        PhoneCardProvider,
        PhoneCardProductList,
        GameCardPage,
        GameCardProvider,
        GameCardProductList,
        TopupPage,
        TopupProvider,
        TopupProductList,
        PaymentRechargeComponent,
        PaymentCardRechargeComponent,
        PaymentAtmRechargeComponent,
        PromotionRechargeComponent,
        SummaryRechargeComponent,
        TopupSummaryComponent,
        TopupInputPhoneComponent,
        RechargeCheckoutSuccessComponent,
        RechargeCheckoutFailureComponent,
        TermCondition,
        ResultPage
    ],
    exports: []
})
export class RechargeModule {
}
