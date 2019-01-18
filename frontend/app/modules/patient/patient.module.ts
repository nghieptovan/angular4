import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SlickModule } from 'ngx-slick';

import { AppCommonModule } from '../../app.common.module';
import { Patient } from './patient';
import { AddPatient } from './add/add';

const routes: Routes = [
    {
        path: '',
        component: Patient
    },
    {
        path: 'them',
        component: AddPatient
    },
    {
        path: 'cap-nhat',
        component: Patient
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
        Patient,
        AddPatient
    ],
    exports: [
    ]
})
export class PatientModule { }
