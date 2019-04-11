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

import { LtProductsListComponent } from './components/category/products/list/list';
import { LtProductsPaginationComponent } from './components/category/products/pagination/pagination';
import { LtProductsComponent } from './components/category/products/products';
import { LtSidebarFilterComponent } from './components/category/sidebar/filter/filter';
import { LtSidebarComponent } from './components/category/sidebar/sidebar';
import { LtSidebarTreeComponent } from './components/category/sidebar/tree/tree';
import { LtRecentProducts } from './components/recent-products/recent-products';
import { AppLoader } from './layout/loader/loader';
import { AppModalsModule } from './modals/modals.module';
import { LotteAccount } from './modules/account/account';
import { AppPipesModule } from './pipes/pipes.module';
import { RunScriptsDirective } from './directives/RunScript';
import {CommonFSFilterComponent} from "./components/common-fs/products/filter/filter";
import {CommonFSFilterSortByComponent} from "./components/common-fs/products/filter/cretiria/sort-by/sort-by";
import {CommonFSFilterVendorComponent} from "./components/common-fs/products/filter/cretiria/vendor/vendor";
import {CommonFSFilterBrandComponent} from "./components/common-fs/products/filter/cretiria/brand/brand";
import {CommonFSFilterColorComponent} from "./components/common-fs/products/filter/cretiria/color/color";
import {CommonFSFilterSizeComponent} from "./components/common-fs/products/filter/cretiria/size/size";
import {CommonFSFilterPriceComponent} from "./components/common-fs/products/filter/cretiria/price/price";
import {CommonFSFilterCretiriaComponent} from "./components/common-fs/products/filter/cretiria/cretiria";
import {CommonFSListComponent} from "./components/common-fs/products/list/list";
import {CommonFSProductsComponent} from "./components/common-fs/products/products";
import {CommonFSCategoryTreeComponent} from "./components/common-fs/category-tree/tree";
import {CommonFSFilterCategoryComponent} from "./components/common-fs/products/filter/cretiria/category/category";
import {CommonFSTpoComponent} from "./components/common-fs/tpo/tpo";
import {WishList} from "./components/base/wishlist/wishlist";
import {CommonFSListItemComponent} from "./components/common-fs/products/list/item/item";
import {CommonFSFilterDynamicComponent} from "./components/common-fs/products/filter/cretiria/dynamic/dynamic";
import {AppHeaderShippingAddress} from "./layout/header/shipping-address/shipping-address";
import {CommonFSShippingSDDLotteriaComponent} from "./components/common-fs/shipping-info/sdd-info/lotteria-style/sdd-info";
import {CommonFSShippingSDDInfoComponent} from "./components/common-fs/shipping-info/sdd-info/sdd-info";
import {CommonFSShippingSDDProductComponent} from "./components/common-fs/shipping-info/sdd-info/product-detail/sdd-info";
import {CommonFSShippingAPCartComponent} from "./components/common-fs/shipping-info/address-picker/address-picker-cart";
import {CommonFSShippingAPProductComponent} from "./components/common-fs/shipping-info/address-picker/address-picker-product";
import {CommonFSShippingAddressPickerComponent} from "./components/common-fs/shipping-info/address-picker/address-picker";
import {CommonFSFilterOmniComponent} from "./components/common-fs/products/filter/cretiria/omni/omni";
import {CommonFSFilterBlinkComponent} from "./components/common-fs/products/filter/cretiria/blink/blink";
import {EqualValidatorDirective} from "./directives/EqualValidator";
import {ExpiredDateValidatorDirective} from "./directives/ExpiredDateValidator";
import {CardNoLuhnValidatorDirective} from "./directives/CardNoLuhnValidator";
import {LtVendorCheckoutCreditCardComponent} from "./components/checkout/vendor-checkout/credit-card/credit-card";
import {LtHomeFashionCountDown} from "./components/home/countdown/countdown";
import {EditUpdateMedicine} from "./modules/drug/danhsachthuoc/form/form";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        LazyLoadImagesModule,
        FormsModule,
        BarRatingModule,
        AppPipesModule,
        AppModalsModule,
        OwlModule,
        NouisliderModule,
        CurrencyMaskModule,
        BootstrapModalModule,
        MasonryModule,
        TextMaskModule,
        ClickOutsideModule
    ],
    providers: [
        WishList
    ],
    declarations: [
        AppLoader,
        LotteAccount,
        LtRecentProducts,
        LtSidebarComponent,
        LtSidebarTreeComponent,
        LtSidebarFilterComponent,
        LtProductsComponent,
        LtProductsPaginationComponent,
        LtProductsListComponent,
        LtHomeFashionCountDown,
        RunScriptsDirective,
        AppHeaderShippingAddress,

        CommonFSFilterComponent,
        CommonFSFilterSortByComponent,
        CommonFSFilterVendorComponent,
        CommonFSFilterBrandComponent,
        CommonFSFilterColorComponent,
        CommonFSFilterSizeComponent,
        CommonFSFilterPriceComponent,
        CommonFSFilterCategoryComponent,
        CommonFSFilterDynamicComponent,
        CommonFSFilterCretiriaComponent,
        CommonFSListComponent,
        CommonFSListItemComponent,
        CommonFSProductsComponent,
        CommonFSCategoryTreeComponent,
        CommonFSTpoComponent,
        CommonFSShippingAPCartComponent,
        CommonFSShippingAddressPickerComponent,
        CommonFSShippingAPProductComponent,
        CommonFSShippingSDDInfoComponent,
        CommonFSShippingSDDProductComponent,
        CommonFSShippingSDDLotteriaComponent,
        CommonFSFilterOmniComponent,
        CommonFSFilterBlinkComponent,
        LtVendorCheckoutCreditCardComponent,

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
        AppModalsModule,
        OwlModule,
        NouisliderModule,
        CurrencyMaskModule,
        BootstrapModalModule,
        MasonryModule,
        TextMaskModule,
        ClickOutsideModule,

        AppLoader,
        LotteAccount,
        LtRecentProducts,
        LtSidebarComponent,
        LtSidebarTreeComponent,
        LtSidebarFilterComponent,
        LtProductsComponent,
        LtProductsPaginationComponent,
        LtProductsListComponent,
        LtHomeFashionCountDown,
        RunScriptsDirective,
        AppHeaderShippingAddress,

        CommonFSFilterComponent,
        CommonFSFilterSortByComponent,
        CommonFSFilterVendorComponent,
        CommonFSFilterBrandComponent,
        CommonFSFilterColorComponent,
        CommonFSFilterSizeComponent,
        CommonFSFilterPriceComponent,
        CommonFSFilterCategoryComponent,
        CommonFSFilterDynamicComponent,
        CommonFSFilterCretiriaComponent,
        CommonFSListComponent,
        CommonFSListItemComponent,
        CommonFSProductsComponent,
        CommonFSCategoryTreeComponent,
        CommonFSTpoComponent,
        CommonFSShippingAddressPickerComponent,
        CommonFSShippingAPCartComponent,
        CommonFSShippingAPProductComponent,
        CommonFSShippingSDDInfoComponent,
        CommonFSShippingSDDProductComponent,
        CommonFSShippingSDDLotteriaComponent,
        CommonFSFilterOmniComponent,
        CommonFSFilterBlinkComponent,
        LtVendorCheckoutCreditCardComponent,
        EditUpdateMedicine,
        // Directives
        EqualValidatorDirective,
        ExpiredDateValidatorDirective,
        RunScriptsDirective,
        CardNoLuhnValidatorDirective
    ]
})
export class AppCommonModule { }
