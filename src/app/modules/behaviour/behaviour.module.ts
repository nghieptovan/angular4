import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppCommonModule } from '../../app.common.module';
import { AddBehaviour } from '../../components/behaviour/add/add';
import { EditBehaviour } from '../../components/behaviour/edit/edit';
import { Behaviour } from '../../components/behaviour/list/behaviour';


const routes: Routes = [
    {
        path: 'them',
        component: AddBehaviour
    },
    {
        path: 'cap-nhat/:id',
        component: EditBehaviour
    },
{
        path: '',
        component: Behaviour
    }
];
@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        AppCommonModule
    ],
    declarations: [
        AddBehaviour,
        EditBehaviour,
        Behaviour
    ],
    exports: [
    ]
})
export class BehaviourModule { }
