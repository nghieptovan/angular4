import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SlickModule } from 'ngx-slick';

import { AppCommonModule } from '../../app.common.module';
import { DanhSachThuoc } from './danhsachthuoc/danhsachthuoc';
import { ThemThuoc } from './danhsachthuoc/add/add';

const routes: Routes = [
    {
        path: '',
        component: DanhSachThuoc
    },
    {
        path: 'danh-sach-thuoc',
        component: DanhSachThuoc
    }
    ,
    {
        path: 'them-thuoc',
        component: ThemThuoc
    }
    // {
    //     path: 'cap-nhat/:id',
    //     component: EditPatient
    // },
    // {
    //     path: 'toa-thuoc/:id',
    //     component: DrugPatient
    // }
];
@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        AppCommonModule,
        SlickModule.forRoot()
    ],
    declarations: [
        DanhSachThuoc,
        ThemThuoc
    ],
    exports: [
    ]
})
export class DrugModule { }
