import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppCommonModule } from '../../app.common.module';

import { BigBangV2Index } from '../../components/game/bigbangv2/index/index';
import { BigBangV2Play } from '../../components/game/bigbangv2/play/play';

import { PigV1Index } from '../../components/game/pigv1/index/index';
import { PigV1Play } from '../../components/game/pigv1/play/play';

const routes: Routes = [
    {
        path: 'big-bang',
        component: BigBangV2Index
    },
    {
        path: 'big-bang/play',
        component: BigBangV2Play
    },

    {
        path: 'pig-v1',
        component: PigV1Index
    },
    {
        path: 'pig-v1/play',
        component: PigV1Play
    }
];
@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        AppCommonModule
    ],
    declarations: [
        BigBangV2Index,
        BigBangV2Play,
        PigV1Index,
        PigV1Play,

    ],
    exports: [
    ]
})
export class GameLTModule { }
