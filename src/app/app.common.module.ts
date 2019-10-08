import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { NouisliderModule } from 'ng2-nouislider/src/nouislider';
import { BarRatingModule } from 'ngx-bar-rating';
import { LazyLoadImagesModule } from 'ngx-lazy-load-images';
import { OwlModule } from 'ngx-owl-carousel';
import { TextMaskModule } from 'angular2-text-mask';
import { ClickOutsideModule } from 'ng-click-outside';
import { AppLoader } from './layout/loader/loader';
// import { AppModalsModule } from './modals/modals.module';
import { AppPipesModule } from './pipes/pipes.module';
import { RunScriptsDirective } from './directives/RunScript';
import {EqualValidatorDirective} from "./directives/EqualValidator";
import {ExpiredDateValidatorDirective} from "./directives/ExpiredDateValidator";
import {CardNoLuhnValidatorDirective} from "./directives/CardNoLuhnValidator";
import {EditUpdateMedicine} from "./components/medicine/danhsachthuoc/form/form";

import {EditUpdatePatient} from "./components/patient/form/form";

import {EditUpdatePatent} from "./components/patent/form/form";
import {EditUpdateDrug} from "./components/drug/form/form";
import {EditUpdateUnit} from "./components/unit/form/form";
import {EditUpdateType} from "./components/type/form/form";
import {EditUpdateBehaviour} from "./components/behaviour/form/form";


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        LazyLoadImagesModule,
        FormsModule,
        BarRatingModule,
        AppPipesModule,
        // AppModalsModule,
        OwlModule,
        NouisliderModule,
        CurrencyMaskModule,
        BootstrapModalModule,
        TextMaskModule,
        ClickOutsideModule
    ],
    providers: [
    ],
    declarations: [
        AppLoader,
     
        RunScriptsDirective,

        EditUpdateMedicine,
        EditUpdatePatient,
        EditUpdatePatent,
        EditUpdateDrug,
        EditUpdateUnit,
        EditUpdateType,
        EditUpdateBehaviour,
        // Directives
        EqualValidatorDirective,
        ExpiredDateValidatorDirective,
        RunScriptsDirective,
        CardNoLuhnValidatorDirective
    ],
    exports: [
        LazyLoadImagesModule,
        FormsModule,
        BarRatingModule,
        AppPipesModule,
        // AppModalsModule,
        OwlModule,
        NouisliderModule,
        CurrencyMaskModule,
        BootstrapModalModule,
        TextMaskModule,
        ClickOutsideModule,
        AppLoader,     
        RunScriptsDirective,       
     
        EditUpdateMedicine,
        EditUpdatePatient,
        EditUpdatePatent,
        EditUpdateDrug,
        EditUpdateUnit,
        EditUpdateType,
        EditUpdateBehaviour,
        // Directives
        EqualValidatorDirective,
        ExpiredDateValidatorDirective,
        RunScriptsDirective,
        CardNoLuhnValidatorDirective
    ]
})
export class AppCommonModule { }
