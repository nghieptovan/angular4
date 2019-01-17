import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SlickModule } from 'ngx-slick';

import { AppCommonModule } from '../../app.common.module';
import { AccountNew } from './accountnew';
import { AddAccountNew } from './add/add';
import { EditAccountNew } from './edit/edit';

const routes: Routes = [
    {
        path: '',
        component: AccountNew
    },
    {
        path: 'cap-nhat/:id',
        component: EditAccountNew
    },
    {
        path: 'them-tai-khoan',
        component: AddAccountNew
    }
];
@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        AppCommonModule,
        SlickModule.forRoot()
    ],
    declarations: [
        AccountNew,
        EditAccountNew,
        AddAccountNew
    ],
    exports: [
    ]
})
export class AccountnewModule { }
