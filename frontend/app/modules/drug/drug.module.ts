import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SlickModule } from 'ngx-slick';

import { AppCommonModule } from '../../app.common.module';
import { DanhSachThuoc } from './danhsachthuoc/danhsachthuoc';
import { ThemThuoc } from './danhsachthuoc/add/add';
import { CapNhatThuoc } from './danhsachthuoc/edit/edit';

const routes: Routes = [
    {
        path: '',
        component: DanhSachThuoc
    },
    {
        path: 'danh-sach-thuoc',
        component: DanhSachThuoc
    },
    {
        path: 'them-thuoc',
        component: ThemThuoc
    },
    {
        path: 'cap-nhat-thuoc/:id',
        component: CapNhatThuoc
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
        ThemThuoc,
        CapNhatThuoc
    ],
    exports: [
    ]
})
export class DrugModule { }
