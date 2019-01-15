import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppCommonModule } from '../../app.common.module';
import { LtSearchNoResults } from '../../components/search/noresults/noresults';
import { LotteSearch } from './search';

const routes: Routes = [
    {
        path: '',
        component: LotteSearch
    }
];
@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        AppCommonModule
    ],
    declarations: [
        LotteSearch,
        LtSearchNoResults
    ],
    exports: [
    ]
})
export class SearchModule { }
