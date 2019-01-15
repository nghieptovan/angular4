import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppCommonModule } from '../../app.common.module';

import { Anniversary } from '../../components/anniversary/anniversary';

const routes: Routes = [
    {
        path: 'one-year-look-back',
        component: Anniversary
    }
];
@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        AppCommonModule
    ],
    declarations: [
        Anniversary,

    ],
    exports: [
    ]
})
export class AnniversaryModule { }
