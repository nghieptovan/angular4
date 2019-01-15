import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { AppCommonModule } from '../../app.common.module';

import { SFHomepage } from './homepage/homepage';
import { SFHomeBannerComponent } from '../../components/stylefeed/home/banner/banner';
import { SFHomeLastestPostsComponent } from '../../components/stylefeed/home/lastest-posts/lastest-posts';
import { SFHomeMostViewedPostsComponent } from '../../components/stylefeed/home/mostviewed/mostviewed';
import { SFHomeVideoPostsComponent } from '../../components/stylefeed/home/video/video';

import { SFPostsComponent } from '../../components/stylefeed/posts/posts';

import { SFCategory } from './category/category';
import { SFCategoryHighlightComponent } from '../../components/stylefeed/category/highlight/highlight';

import { SFMenuComponent } from '../../components/stylefeed/menu/menu';
import { SFHomePostItemsComponent } from '../../components/stylefeed/posts/scrollable/scrollable';

import { SFDetailPost } from './detail/detail';
import { SFPostContent } from '../../components/stylefeed/detail/content/content';
import { SFProductsListComponent } from '../../components/stylefeed/products/list/list';
import { SFPostRelated } from '../../components/stylefeed/detail/related/related';
import { SFPostComment } from '../../components/stylefeed/detail/comment/comment';

import { SFTrackingComponent } from '../../components/stylefeed/tracking/tracking';

const routes: Routes = [
    {
        path: '',
        component: SFHomepage
    },
    {
        path: 'category/:urlkey',
        component: SFCategory
    },
    {
      path: 'post/:urlkey',
      component: SFDetailPost
    }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    AppCommonModule
  ],
  declarations: [
    SFHomepage,
    SFCategory,
    SFMenuComponent,
    SFHomeBannerComponent,
    SFHomeLastestPostsComponent,
    SFHomeMostViewedPostsComponent,
    SFHomeVideoPostsComponent,
    SFCategoryHighlightComponent,
    SFPostsComponent,
    SFHomePostItemsComponent,
    SFDetailPost,
    SFPostContent,
    SFProductsListComponent,
    SFPostRelated,
    SFPostComment,
    SFTrackingComponent
  ]
})
export class StylefeedModule { }
