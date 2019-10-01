
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { RouterModule, UrlSerializer, PreloadAllModules } from '@angular/router';
import { routes, CustomUrlSerializer } from './app.routes';
import { APP_BASE_HREF } from '@angular/common';

// import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';

import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SocialLoginModule, AuthServiceConfig, FacebookLoginProvider } from './libs/angular4-social-login/index';
import { CookieService } from 'ngx-cookie-service';
import { AppConstants } from './app.constant';
import { ClickOutsideModule } from 'ng-click-outside';
// Import layouts components
import { AppComponent } from './app.component';
import { AppHeader } from './layout/header/header';
import { AppFooter } from './layout/footer/footer';
import { LeftSidebar } from './layout/sidebar/left';
import { RightSidebar } from './layout/sidebar/right';
import { AppContent } from './layout/content/content';
import { AppNotFound } from './layout/404/404';

// Import custom components

// Import directives
import { EqualValidatorDirective } from './directives/EqualValidator';
import { ExpiredDateValidatorDirective } from './directives/ExpiredDateValidator';

// Import modules

// Import services
import { GlobalService } from './services/global.service';

// Import extension methods
import './extensions/string.extension';

// Import page modules
import { AppStoreModule } from './store/store.module';
import { AppCommonModule } from './app.common.module';
// import masonry and infinitescroll

const PAGE_MODULES = [
    AppStoreModule,
    AppCommonModule
];


@NgModule({
    declarations: [
        // Import layouts components
        AppComponent,
        AppHeader,
        AppFooter,
        LeftSidebar,
        RightSidebar,
        AppContent,
        AppNotFound,




    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
        ...PAGE_MODULES,
        ToastrModule.forRoot({
            timeOut: 5000,
            positionClass: 'toast-top-right',
            preventDuplicates: true,
        }),
        SocialLoginModule,
        //infinite scroll and masonry
        ClickOutsideModule,

    ],
    exports: [RouterModule],
    providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: UrlSerializer, useClass: CustomUrlSerializer },
        GlobalService,
        CookieService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
