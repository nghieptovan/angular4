import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppCommonModule } from '../../app.common.module';
import { LtCheckoutCartComponent } from '../../components/checkout/cart/cart';
import { LtCheckoutFailureComponent } from '../../components/checkout/failure/failure';
import { LtCheckoutNoItemComponent } from '../../components/checkout/noitem/noitem';
import { LtCheckoutPaymentByAtmComponent } from '../../components/checkout/payment/atm/atm';
import { LtCheckoutPaymentByCardComponent } from '../../components/checkout/payment/card/card';
import { LtCheckoutPaymentByCashComponent } from '../../components/checkout/payment/cash/cash';
import { LtCheckoutCreditCardComponent } from '../../components/checkout/payment/credit-card/credit-card';
import { LtCheckoutPaymentByInstallmentComponent } from '../../components/checkout/payment/installment/installment';
import { LtCheckoutPaymentByMomoComponent } from '../../components/checkout/payment/momo/momo';
import { LtCheckoutPaymentByZaloComponent } from '../../components/checkout/payment/zalopay/zalopay';
import { LtCheckoutPaymentComponent } from '../../components/checkout/payment/payment';
import { LtCheckoutAddressFormComponent } from '../../components/checkout/shipping/address-form/address-form';
import { LtCheckoutShippingComponent } from '../../components/checkout/shipping/shipping';
import { LtCheckoutSidebarComponent } from '../../components/checkout/sidebar/sidebar';
import { LtCheckoutSuccessComponent } from '../../components/checkout/success/success';
import { LotteCheckout } from './checkout';


import { LtCheckoutCartLaterComponent } from '../../components/checkout/cart-later/cart-later';
import {LotteVendorCheckout} from "./vendor-checkout/checkout";
import {LtVendorCheckoutShippingComponent} from "../../components/checkout/vendor-checkout/shipping/shipping";
import {LtVendorCheckoutSidebarComponent} from "../../components/checkout/vendor-checkout/sidebar/sidebar";
import {LtVendorCheckoutPaymentComponent} from "../../components/checkout/vendor-checkout/payment/payment";
import {LtVendorCheckoutPaymentByCashComponent} from "../../components/checkout/vendor-checkout/payment/cash/cash";
import {LtVendorCheckoutPaymentByAtmComponent} from "../../components/checkout/vendor-checkout/payment/atm/atm";
import {LtVendorCheckoutAddressFormComponent} from "../../components/checkout/vendor-checkout/shipping/address-form/address-form";
import {LtVendorCheckoutPaymentByCardComponent} from "../../components/checkout/vendor-checkout/payment/card/card";
import {LtVendorCheckoutPaymentByMomoComponent} from "../../components/checkout/vendor-checkout/payment/momo/momo";
import {LtVendorCheckoutFailureComponent} from "../../components/checkout/vendor-checkout/failure/failure";
import {LtVendorCheckoutSuccessComponent} from "../../components/checkout/vendor-checkout/success/success";

const routes: Routes = [
    {
        path: ':vendorId',
        component: LotteVendorCheckout,
    },
    {
        path: ':vendorId/onepage/:page',
        component: LotteVendorCheckout,
        children: [
            {
                path: '**',
                component: LotteVendorCheckout
            }
        ]
    },
    {
        path: 'cart',
        redirectTo: '?step=1'
    },
    {
        path: 'onepage/:page',
        component: LotteCheckout,
        children: [
            {
                path: '**',
                component: LotteCheckout
            }
        ]
    },
    {
        path: '**',
        component: LotteCheckout
    }
];
@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        AppCommonModule
    ],
    declarations: [
        LotteCheckout,
        LotteVendorCheckout,
        LtCheckoutCartComponent,
        LtCheckoutNoItemComponent,
        LtCheckoutAddressFormComponent,
        LtCheckoutShippingComponent,
        LtCheckoutFailureComponent,
        LtCheckoutSuccessComponent,
        LtCheckoutPaymentComponent,
        LtCheckoutPaymentByCashComponent,
        LtCheckoutPaymentByCardComponent,
        LtCheckoutPaymentByAtmComponent,
        LtCheckoutPaymentByInstallmentComponent,
        LtCheckoutPaymentByMomoComponent,
        LtCheckoutPaymentByZaloComponent,
        LtCheckoutSidebarComponent,
        LtCheckoutCreditCardComponent,
        LtCheckoutCartLaterComponent,
        LtVendorCheckoutShippingComponent,
        LtVendorCheckoutSidebarComponent,
        LtVendorCheckoutPaymentComponent,
        LtVendorCheckoutPaymentByCashComponent,
        LtVendorCheckoutPaymentByAtmComponent,
        LtVendorCheckoutAddressFormComponent,
        LtVendorCheckoutPaymentByCardComponent,
        LtVendorCheckoutPaymentByMomoComponent,
        LtVendorCheckoutSuccessComponent,
        LtVendorCheckoutFailureComponent
    ],
    exports: [
    ]
})
export class CheckoutModule { }
