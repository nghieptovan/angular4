import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppCommonModule } from '../../app.common.module';
import {BaseProductsComponent} from "../../components/base/products/products";
import {BaseListComponent} from "../../components/base/products/list/list";
import {BaseProcessFilterComponent} from "../../components/base/products/filter/process-filter";
import {BaseListItemComponent} from "../../components/base/products/list/item/item";

const routes: Routes = [

];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        AppCommonModule
    ],
    declarations: [
        BaseProductsComponent,
        BaseListComponent,
        BaseListItemComponent,
        BaseProcessFilterComponent
    ],
    exports: [
    ]
})
export class BaseModule { }
