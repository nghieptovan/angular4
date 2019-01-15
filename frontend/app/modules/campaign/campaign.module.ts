import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppCommonModule } from '../../app.common.module';
import { LotteCampaign } from './campaign';

const routes: Routes = [
    {
        path: ':id',
        component: LotteCampaign
    }
];
@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        AppCommonModule
    ],
    declarations: [
        LotteCampaign
    ],
    exports: [
    ]
})
export class CampaignModule { }
