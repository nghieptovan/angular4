import { DefaultUrlSerializer, Routes, UrlSerializer, UrlTree } from '@angular/router';

import { AppNotFound } from './layout/404/404';


const definedRoutes: Routes = [
    {
        path: '',
        loadChildren: './modules/home/home.module#HomeModule'
    },
    {
        path: 'dashboard',
        loadChildren: './modules/home/home.module#HomeModule'
    },
    {
        path: 'tai-khoan',
        loadChildren: './modules/accountnew/accountnew.module#AccountnewModule'
    },
    {
        path: 'login',
        loadChildren: './modules/login/login.module#LoginModule',
        data: { showHeader: false, showSidebar: false, showFooter: false }
    },
    {
        path: 'benh-nhan',
        loadChildren: './modules/patient/patient.module#PatientModule'
    },
    {
        path: 'thuoc',
        loadChildren: './modules/medicine/medicine.module#MedicineModule'
    },
    {
        path: 'biet-duoc',
        loadChildren: './modules/patent/patent.module#PatentModule'
    },
    {
        path: 'duoc-chat',
        loadChildren: './modules/drug/drug.module#DrugModule'
    },
    {
        path: 'don-vi-thuoc',
        loadChildren: './modules/unit/unit.module#UnitModule'
    },
    {
        path: 'phan-loai-thuoc',
        loadChildren: './modules/type/type.module#TypeModule'
    },
    {
        path: 'quy-cach-su-dung',
        loadChildren: './modules/behaviour/behaviour.module#BehaviourModule'
    },
    {
        path: '404',
        component: AppNotFound
    },
    // Set default route
    {
        path: '**',
        component: AppNotFound
    }
];

// Define routes
export const routes: Routes = definedRoutes;

export class CustomUrlSerializer implements UrlSerializer {
    parse(url: any): UrlTree {
        const dus = new DefaultUrlSerializer();
        return dus.parse(url ? url : '');
    }

    serialize(tree: UrlTree): any {
        const dus = new DefaultUrlSerializer(),
            path = dus.serialize(tree);
        // use your regex to replace as per your requirement.
        return path.replace(/%2F/g, '/');
    }
}
