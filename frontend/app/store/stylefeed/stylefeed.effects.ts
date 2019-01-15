import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Actions } from '@ngrx/effects';
import { Effect } from '@ngrx/effects/src/effects';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '..';
import * as common from '../common/common.actions';
import { GlobalService } from '../../services/global.service';
import * as stylefeedAction from './stylefeed.actions';
import { StyleFeedService } from './stylefeed.service';

declare var $;

@Injectable()
export class StyleFeedEffects {
    page: any;
    storeKey: any;
    constructor(
        private _actions: Actions,
        private http: Http,
        private styleFeedService: StyleFeedService,
        private globalService: GlobalService,
        private store: Store<fromRoot.AppState>
    ) {

    }

    @Effect()
    LoadBlock$ = this._actions.ofType(stylefeedAction.LOAD_BLOCK)
        .withLatestFrom(this.store.select(fromRoot.styleFeedGetAllPosts))
        .switchMap(([action, allPosts]) => {
            if (_.isEmpty(allPosts)) {
                return this.styleFeedService.getHomepagePosts()
                    .map((data) => {
                        //this.store.dispatch(new common.LoadUrlInfo({ type: 'style-feed', id: data.id }));
                        return new stylefeedAction.LoadBlockSucess({ data: data });
                    }).catch((error) => {
                        return Observable.of(new stylefeedAction.LoadBlockFailed(error));
                    });
            }else{
                return Observable.of(new stylefeedAction.LoadBlockSucess(allPosts));
            }

    });

    @Effect()
    LoadMenu$ = this._actions.ofType(stylefeedAction.LOAD_MENU)
        .switchMap((action) => this.styleFeedService.getMenuHomePage()
            .map((data) => {
                return new stylefeedAction.LoadMenuSucess({ data: data.data });
            }).catch((error) => {
                return Observable.of(new stylefeedAction.LoadMenuFailed(error));
            })

    );

    @Effect()
    LoadMorePosts$ = this._actions.ofType(stylefeedAction.LOAD_MORE_POSTS)
        .switchMap((action) => this.styleFeedService.getMorePostsHome(action.payload.page)
            .map((data) => {
                return new stylefeedAction.LoadMorePostsSucess({ data: data.data,  requestBody: action.payload  });
            }).catch((error) => {
                return Observable.of(new stylefeedAction.LoadMorePostsFailed(error));
            })

    );

    @Effect()
    LoadCategoryHighlight$ = this._actions.ofType(stylefeedAction.LOAD_CATEGORY_HIGHLIGHT)
        .switchMap((action) => this.styleFeedService.getPostsHighlightCategory(action.payload.urlkey)
            .map((data) => {
                return new stylefeedAction.LoadCategoryHighlightSucess({ data: data.data  });
            }).catch((error) => {
                return Observable.of(new stylefeedAction.LoadCategoryHighlightFailed(error));
            })

    );

    @Effect()
    LoadCategory$ = this._actions.ofType(stylefeedAction.LOAD_CATEGORY)
        .switchMap((action) => this.styleFeedService.getMorePostsCategory(action.payload.page,action.payload.urlkey)
            .map((data) => {
                //this.store.dispatch(new common.LoadUrlInfo({ type: 'style-feed', id: data.id }));
                return new stylefeedAction.LoadCategorySucess({ data: data.data,  requestBody: action.payload  });
            }).catch((error) => {
                return Observable.of(new stylefeedAction.LoadCategoryFailed(error));
            })

    );

    @Effect()
    LoadPost$ = this._actions.ofType(stylefeedAction.LOAD_POST)
        .switchMap((action) => this.styleFeedService.getPostContent(action.payload.urlkey)
            .map((data) => {
                //this.store.dispatch(new common.LoadTrackingCode({ type: 'style-feed', id: data.id }));
                return new stylefeedAction.LoadPostSucess({ data: data.data,  requestBody: action.payload  });
            }).catch((error) => {
                return Observable.of(new stylefeedAction.LoadPostFailed(error));
            })

    );

    @Effect()
    LoadPostRelated$ = this._actions.ofType(stylefeedAction.LOAD_POST_RELATED)
        .switchMap((action) => this.styleFeedService.getPostRelated(action.payload.urlkey)
            .map((data) => {
                return new stylefeedAction.LoadPostRelatedSucess({ data: data.data  });
            }).catch((error) => {
                return Observable.of(new stylefeedAction.LoadPostRelatedFailed(error));
            })

    );

    @Effect()
    LoadPostSocial$ = this._actions.ofType(stylefeedAction.LOAD_POST_SOCIAL)
        .switchMap((action) => this.styleFeedService.postPostSocial(action.payload.urlkey,  action.payload.method)
            .map((data) => {
                return new stylefeedAction.LoadPostSocialSucess({ data: data  });
            }).catch((error) => {
                return Observable.of(new stylefeedAction.LoadPostSocialFailed(error));
            })

    );

    @Effect()
    LoadPostComments$ = this._actions.ofType(stylefeedAction.LOAD_POST_COMMENTS)
        .switchMap((action) => this.styleFeedService.getPostComments(action.payload.urlkey,action.payload.page)
            .map((data) => {
                return new stylefeedAction.LoadPostCommentsSucess({ data: data.data, requestBody: action.payload });
            }).catch((error) => {
                return Observable.of(new stylefeedAction.LoadPostCommentsFailed(error));
            })

    );

    @Effect()
    LoadPostCommentsInfo$ = this._actions.ofType(stylefeedAction.LOAD_POST_COMMENTS_INFO)
        .switchMap((action) => this.styleFeedService.getPostCommentsInfo(action.payload.urlkey)
            .map((data) => {
                return new stylefeedAction.LoadPostCommentsInfoSucess({ data: data.data });
            }).catch((error) => {
                return Observable.of(new stylefeedAction.LoadPostCommentsInfoFailed(error));
            })

    );

    @Effect()
    LoadPostPostComment$ = this._actions.ofType(stylefeedAction.LOAD_POST_POST_COMMENT)
        .switchMap((action) => this.styleFeedService.postPostComment(action.payload.urlkey, action.payload.data)
            .map((data) => {
                return new stylefeedAction.LoadPostPostCommentSucess({ data: data  });
            }).catch((error) => {
                return Observable.of(new stylefeedAction.LoadPostPostCommentFailed(error));
            })

    );
}
