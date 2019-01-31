import { NgModule } from '@angular/core';
import { Http, HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';

import { reducer } from '.';
import { httpFactory } from '../services/http.factory';
import { HttpService } from '../services/http.service';
import { AccountEffects } from './account/account.effects';
import { AccountService } from './account/account.service';
import { AuthEffects } from './auth/auth.effects';
import { AuthService } from './auth/auth.service';
import { PatientEffects } from './patient/patient.effects';
import { PatientService } from './patient/patient.service';
import { PatientModel } from './patient/patient.model';



import { CategoryEffects } from './categories/categories.effects';
import { CategoryService } from './categories/categories.service';
import { CheckoutEffects } from './checkout/checkout.effects';
import { CheckoutService } from './checkout/checkout.service';
import { CommonEffects } from './common/common.effects';
import { CommonService } from './common/common.service';
import { HomeEffects } from './home/home.effects';
import { HomeService } from './home/home.service';
import { ProductEffects } from './products/products.effects';
import { ProductsService } from './products/products.service';
import { TpoEffects } from './tpo/tpo.effects';
import { TpoService } from './tpo/tpo.service';
import { CampaignEffects } from './campaign/campaign.effects';
import { CampaignService } from './campaign/campaign.service';
import { StyleFeedEffects } from './stylefeed/stylefeed.effects';
import { StyleFeedService } from './stylefeed/stylefeed.service';
import {BrandEffects} from "./brand/brand.effects";
import {BrandService} from "./brand/brand.service";
import { RechargeEffects } from './recharge/recharge.effects';
import { RechargeService } from './recharge/recharge.service';

import {VendorCheckoutEffects} from "./checkout/vendor-checkout/checkout.effects";
import {VendorCheckoutService} from "./checkout/vendor-checkout/checkout.service";
import {VendorEffects} from "./vendor/vendor.effects";
import {VendorService} from "./vendor/vendor.service";

import { BigBangV2Effects } from './game/bigbangv2/bigbangv2.effects';
import { BigBangV2Service } from './game/bigbangv2/bigbangv2.service';
import {Ship60Service} from "./shipping-service/ship60.service";

import { PigV1Effects } from './game/pigv1/pigv1.effects';
import { Pigv1Service } from './game/pigv1/pigv1.service';

import { AnniversaryEffects } from './anniversary/anniversary.effects';
import { AnniversaryService } from './anniversary/anniversary.service';

// Import services
// Define effects
const APP_EFFECTS = [    
    EffectsModule.run(AuthEffects),
    EffectsModule.run(AccountEffects),
    EffectsModule.run(PatientEffects)
];

@NgModule({
    imports: [
        ...APP_EFFECTS,
        HttpModule,
        StoreModule.provideStore(reducer),
    ],
    providers: [
        {
            provide: Http,
            useFactory: httpFactory,
            deps: [XHRBackend, RequestOptions, Store]
        },
        HttpService,
        AccountService,
        AuthService,
        PatientService,
        PatientModel
    ],
    declarations: [
    ],
    exports: [
    ]
})
export class AppStoreModule { }
