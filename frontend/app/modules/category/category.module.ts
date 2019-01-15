import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppCommonModule } from '../../app.common.module';
import { LotteCategory } from './category';

const routes: Routes = [
    {
        path: ':id/:slug',
        component: LotteCategory
    }
];
@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        AppCommonModule
    ],
    declarations: [
        LotteCategory
    ],
    exports: [
    ]
})
export class CategoryModule { }
