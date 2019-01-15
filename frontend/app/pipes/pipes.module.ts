import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DiscountPercentagePipe } from './DiscountPercentage';
import { FilterAttributePipe } from './FilterAttribute';
import { KeepHtmlPipe } from './KeepHtml';
import { KeepUrlPipe } from './KeepUrl';
import { OrderTransformerPipe } from './OrderTransformer';
import { SafeHtmlPipe } from './SafeHtml';
import { SelectedFacetsPipe } from './SelectedFacets';
import { ToJsonPipe } from './ToJson';
import {SelectedFacetsPipeType} from "./SelectedFacetsType";
import {ArraySortPipe} from "./ArraySortPipe";
import {ViewMorePercentagePipe} from "./ViewMorePercentage";
import {Arrange2Item1Line} from "./Arrange2Item1Line";
import {ShippingRule} from "./ShippingRule";
import {SafeResourceHtmlPipe} from "./SafeResourceHtml";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        KeepHtmlPipe,
        KeepUrlPipe,
        DiscountPercentagePipe,
        OrderTransformerPipe,
        FilterAttributePipe,
        SelectedFacetsPipe,
        SelectedFacetsPipeType,
        ToJsonPipe,
        SafeHtmlPipe,
        SafeResourceHtmlPipe,
        ArraySortPipe,
        Arrange2Item1Line,
        ViewMorePercentagePipe,
        ShippingRule
    ],
    exports: [
        KeepHtmlPipe,
        KeepUrlPipe,
        DiscountPercentagePipe,
        OrderTransformerPipe,
        FilterAttributePipe,
        SelectedFacetsPipe,
        SelectedFacetsPipeType,
        ToJsonPipe,
        SafeHtmlPipe,
        SafeResourceHtmlPipe,
        ArraySortPipe,
        Arrange2Item1Line,
        ViewMorePercentagePipe,
        ShippingRule
    ]
})
export class AppPipesModule { }
