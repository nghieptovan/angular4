import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppCommonModule } from '../../app.common.module';
import { AddPatent } from '../../components/patent/add/add';
import { EditPatent } from '../../components/patent/edit/edit';
import { Patent } from '../../components/patent/list/patent';

const routes: Routes = [
    {
        path: 'them',
        component: AddPatent
    },
    {
        path: 'cap-nhat/:id',
        component: EditPatent
    },
{
        path: '',
        component: Patent
    }
];
@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        AppCommonModule
    ],
    declarations: [
        AddPatent,
        EditPatent,
        Patent
    ],
    exports: [
    ]
})
export class PatentModule { }
