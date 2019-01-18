import { DefaultUrlSerializer, Routes, UrlSerializer, UrlTree } from '@angular/router';

import { AppNotFound } from './layout/404/404';
import { LotteAccount } from './modules/account/account';
import { LotteAccountLogin } from './modules/account/login/login';
import { LotteAccountLogoutSuccess } from './modules/account/logout-success/logout-success';
import { LotteAccountResetPassword } from './modules/account/resetpassword/resetpassword';
import { LotteAccountResetPasswordSuccess } from './modules/account/resetpassword/success/success';
import { LotteGuestOrderTracking } from './modules/order-tracking/order-tracking';
import { LotteSharedWishlist } from './modules/shared-wishlist/shared-wishlist';

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
        loadChildren: './modules/login/login.module#LoginModule'
    },
    {
        path: 'benh-nhan',
        loadChildren: './modules/patient/patient.module#PatientModule'
    },
    // Checkout page
    {
        path: 'checkout',
        loadChildren: './modules/checkout/checkout.module#CheckoutModule'
    },

    // Category page
    {
        path: 'category-old',
        loadChildren: './modules/category/category.module#CategoryModule'
    },

    // Product page
    {
        path: 'product',
        // loadChildren: './modules/product/product.module#ProductModule'
        loadChildren: './modules/product-fs/product.module#ProductFSModule'
    },
    // Brand page
    {
        path: 'brand',
        loadChildren: './modules/brand-fs/brand.module#BrandFSModule'
    },

    // Vendor page
    {
        path: 'seller',
        loadChildren: './modules/seller-fs/seller.module#SellerFSModule'
    },

    {
        path: 'campaign',
        loadChildren: './modules/campaign/campaign.module#CampaignModule'
    },
    {
        path: 'promotions',
        loadChildren: './modules/promotions/promotions.module#PromotionsModule'
    },

    // Search page
    {
        path: 'search',
        loadChildren: './modules/search-fs/search.module#SearchFSModule'
    },

    {
        path: 'order/tracking',
        component: LotteGuestOrderTracking
    },
    {
        path: 'account/resetpassword',
        component: LotteAccountResetPassword
    },
    {
        path: 'account/resetpassword-success',
        component: LotteAccountResetPasswordSuccess
    },

    {
        path: 'account/logout-success',
        component: LotteAccountLogoutSuccess
    },
    {
        path: 'account/login',
        component: LotteAccountLogin
    },

    // Account page
    {
        path: 'account',
        component: LotteAccount,
        loadChildren: './modules/account/account.module#AccountModule'
    },

    // Shared wishlist
    {
        path: 'shared-wishlist/:id',
        component: LotteSharedWishlist
    },
    // stylefeed page
    {
        path: 'style-feed',
        loadChildren: './modules/stylefeed/stylefeed.module#StylefeedModule'
    },
    // game page
    {
        path: 'game',
        loadChildren: './modules/game/game.module#GameLTModule'
    },
    // tpo page
    {
        path: 'xu-huong',
        loadChildren: './modules/tpo/tpo.module#TpoModule'
    },
    // recharge page
    {
        path: 'mobilerecharge',
        loadChildren: './modules/recharge/recharge.module#RechargeModule'
    },
    // category-fs page
    {
        path: 'category',
        loadChildren: './modules/category-fs/category-fs.module#CategoryFSModule'
    },
    // game page
    {
        path: 'anniversary',
        loadChildren: './modules/anniversary/anniversary.module#AnniversaryModule'
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
