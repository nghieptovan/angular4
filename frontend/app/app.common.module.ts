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
import { MasonryModule } from 'angular2-masonry';
import { TextMaskModule } from 'angular2-text-mask';
import { ClickOutsideModule } from 'ng-click-outside';

import { AppLoader } from './layout/loader/loader';
// import { AppModalsModule } from './modals/modals.module';
import { AppPipesModule } from './pipes/pipes.module';
import { RunScriptsDirective } from './directives/RunScript';
import {EqualValidatorDirective} from "./directives/EqualValidator";
import {ExpiredDateValidatorDirective} from "./directives/ExpiredDateValidator";
import {CardNoLuhnValidatorDirective} from "./directives/CardNoLuhnValidator";
import {EditUpdateMedicine} from "./components/drug/danhsachthuoc/form/form";


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
        MasonryModule,
        TextMaskModule,
        ClickOutsideModule
    ],
    providers: [
    ],
    declarations: [
        AppLoader,
     
        RunScriptsDirective,

        EditUpdateMedicine,

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
        MasonryModule,
        TextMaskModule,
        ClickOutsideModule,
        AppLoader,     
        RunScriptsDirective,       
     
        EditUpdateMedicine,
        // Directives
        EqualValidatorDirective,
        ExpiredDateValidatorDirective,
        RunScriptsDirective,
        CardNoLuhnValidatorDirective
    ]
})
export class AppCommonModule { }
