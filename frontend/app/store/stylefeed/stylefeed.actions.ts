import { Action } from '@ngrx/store';

/*
 Because the Products collection is asynchronous, there need to be actions to handle
 each of the stages of the request.
 */
export const LOAD_MENU = '[HomeStyleFeed] Load menu';
export const LOAD_MENU_SUCCESS = '[HomeStyleFeed] Load menu successfully';
export const LOAD_MENU_FAILED = '[HomeStyleFeed] Load menu failed';

export const LOAD_BLOCK = '[HomeStyleFeed] Load block posts';
export const LOAD_BLOCK_SUCCESS = '[HomeStyleFeed] Load block posts successfully';
export const LOAD_BLOCK_FAILED = '[HomeStyleFeed] Load block posts failed';

export const LOAD_MORE_VIDEO = '[HomeStyleFeed] Load more videos';
export const LOAD_MORE_VIDEO_SUCCESS = '[HomeStyleFeed] Load more videos sucessfully';
export const LOAD_MORE_VIDEO_FAILED = '[HomeStyleFeed] Load more videos failed';

export const LOAD_MORE_POSTS = '[HomeStyleFeed] Load more posts';
export const LOAD_MORE_POSTS_SUCCESS = '[HomeStyleFeed] Load more posts sucessfully';
export const LOAD_MORE_POSTS_FAILED = '[HomeStyleFeed] Load more posts failed';

export const LOAD_CATEGORY = '[HomeStyleFeed] Load category';
export const LOAD_CATEGORY_SUCCESS = '[HomeStyleFeed] Load category sucessfully';
export const LOAD_CATEGORY_FAILED = '[HomeStyleFeed] Load category failed';

export const LOAD_CATEGORY_HIGHLIGHT = '[HomeStyleFeed] Load category highlight';
export const LOAD_CATEGORY_HIGHLIGHT_SUCCESS = '[HomeStyleFeed] Load category highlight sucessfully';
export const LOAD_CATEGORY_HIGHLIGHT_FAILED = '[HomeStyleFeed] Load category highlight failed';

export const LOAD_POST = '[HomeStyleFeed] Load post';
export const LOAD_POST_SUCCESS = '[HomeStyleFeed] Load post sucessfully';
export const LOAD_POST_FAILED = '[HomeStyleFeed] Load post failed';

export const LOAD_POST_RELATED = '[HomeStyleFeed] Load post related';
export const LOAD_POST_RELATED_SUCCESS = '[HomeStyleFeed] Load post related sucessfully';
export const LOAD_POST_RELATED_FAILED = '[HomeStyleFeed] Load post related failed';

export const LOAD_POST_SOCIAL = '[HomeStyleFeed] Load post social';
export const LOAD_POST_SOCIAL_SUCCESS = '[HomeStyleFeed] Load post social sucessfully';
export const LOAD_POST_SOCIAL_FAILED = '[HomeStyleFeed] Load post social failed';

export const LOAD_POST_COMMENTS = '[HomeStyleFeed] Load post comments';
export const LOAD_POST_COMMENTS_SUCCESS = '[HomeStyleFeed] Load post comments sucessfully';
export const LOAD_POST_COMMENTS_FAILED = '[HomeStyleFeed] Load post comments failed';

export const LOAD_POST_COMMENTS_INFO = '[HomeStyleFeed] Load post comments info';
export const LOAD_POST_COMMENTS_INFO_SUCCESS = '[HomeStyleFeed] Load post comments info sucessfully';
export const LOAD_POST_COMMENTS_INFO_FAILED = '[HomeStyleFeed] Load post comments info failed';

export const LOAD_POST_POST_COMMENT = '[HomeStyleFeed] Load post post comment';
export const LOAD_POST_POST_COMMENT_SUCCESS = '[HomeStyleFeed] Load post post comment sucessfully';
export const LOAD_POST_POST_COMMENT_FAILED = '[HomeStyleFeed] Load post post comment failed';
export class LoadMenu implements Action {
    readonly type = LOAD_MENU;
    constructor(public payload: any) {
    }
}

export class LoadMenuSucess implements Action {
    readonly type = LOAD_MENU_SUCCESS;
    constructor(public payload: any) {
    }
}

export class LoadMenuFailed implements Action {
    readonly type = LOAD_MENU_FAILED;
    constructor(public payload: any) {
    }
}

export class LoadBlock implements Action {
    readonly type = LOAD_BLOCK;
    constructor(public payload: any) {
    }
}

export class LoadBlockSucess implements Action {
    readonly type = LOAD_BLOCK_SUCCESS;
    constructor(public payload: any) {
    }
}

export class LoadBlockFailed implements Action {
    readonly type = LOAD_BLOCK_FAILED;
    constructor(public payload: any) {
    }
}

export class LoadMoreVideo implements Action {
    readonly type = LOAD_MORE_VIDEO;
    constructor(public payload: any) {
    }
}

export class LoadMoreVideoSucess implements Action {
    readonly type = LOAD_MORE_VIDEO_SUCCESS;
    constructor(public payload: any) {
    }
}

export class LoadMoreVideoFailed implements Action {
    readonly type = LOAD_MORE_VIDEO_FAILED;
    constructor(public payload: any) {
    }
}

export class LoadMorePosts implements Action {
    readonly type = LOAD_MORE_POSTS;
    constructor(public payload: any) {
    }
}

export class LoadMorePostsSucess implements Action {
    readonly type = LOAD_MORE_POSTS_SUCCESS;
    constructor(public payload: any) {
    }
}

export class LoadMorePostsFailed implements Action {
    readonly type = LOAD_MORE_POSTS_FAILED;
    constructor(public payload: any) {
    }
}

export class LoadCategory implements Action {
    readonly type = LOAD_CATEGORY;
    constructor(public payload: any) {
    }
}

export class LoadCategorySucess implements Action {
    readonly type = LOAD_CATEGORY_SUCCESS;
    constructor(public payload: any) {
    }
}

export class LoadCategoryFailed implements Action {
    readonly type = LOAD_CATEGORY_FAILED;
    constructor(public payload: any) {
    }
}

export class LoadCategoryHighlight implements Action {
    readonly type = LOAD_CATEGORY_HIGHLIGHT;
    constructor(public payload: any) {
    }
}

export class LoadCategoryHighlightSucess implements Action {
    readonly type = LOAD_CATEGORY_HIGHLIGHT_SUCCESS;
    constructor(public payload: any) {
    }
}

export class LoadCategoryHighlightFailed implements Action {
    readonly type = LOAD_CATEGORY_HIGHLIGHT_FAILED;
    constructor(public payload: any) {
    }
}

export class LoadPost implements Action {
    readonly type = LOAD_POST;
    constructor(public payload: any) {
    }
}

export class LoadPostSucess implements Action {
    readonly type = LOAD_POST_SUCCESS;
    constructor(public payload: any) {
    }
}

export class LoadPostFailed implements Action {
    readonly type = LOAD_POST_FAILED;
    constructor(public payload: any) {
    }
}

export class LoadPostRelated implements Action {
    readonly type = LOAD_POST_RELATED;
    constructor(public payload: any) {
    }
}

export class LoadPostRelatedSucess implements Action {
    readonly type = LOAD_POST_RELATED_SUCCESS;
    constructor(public payload: any) {
    }
}

export class LoadPostRelatedFailed implements Action {
    readonly type = LOAD_POST_RELATED_FAILED;
    constructor(public payload: any) {
    }
}

export class LoadPostSocial implements Action {
    readonly type = LOAD_POST_SOCIAL;
    constructor(public payload: any) {
    }
}

export class LoadPostSocialSucess implements Action {
    readonly type = LOAD_POST_SOCIAL_SUCCESS;
    constructor(public payload: any) {
    }
}

export class LoadPostSocialFailed implements Action {
    readonly type = LOAD_POST_SOCIAL_FAILED;
    constructor(public payload: any) {
    }
}

export class LoadPostComments implements Action {
    readonly type = LOAD_POST_COMMENTS;
    constructor(public payload: any) {
    }
}

export class LoadPostCommentsSucess implements Action {
    readonly type = LOAD_POST_COMMENTS_SUCCESS;
    constructor(public payload: any) {
    }
}

export class LoadPostCommentsFailed implements Action {
    readonly type = LOAD_POST_COMMENTS_FAILED;
    constructor(public payload: any) {
    }
}

export class LoadPostCommentsInfo implements Action {
    readonly type = LOAD_POST_COMMENTS_INFO;
    constructor(public payload: any) {
    }
}

export class LoadPostCommentsInfoSucess implements Action {
    readonly type = LOAD_POST_COMMENTS_INFO_SUCCESS;
    constructor(public payload: any) {
    }
}

export class LoadPostCommentsInfoFailed implements Action {
    readonly type = LOAD_POST_COMMENTS_INFO_FAILED;
    constructor(public payload: any) {
    }
}

export class LoadPostPostComment implements Action {
    readonly type = LOAD_POST_POST_COMMENT;
    constructor(public payload: any) {
    }
}

export class LoadPostPostCommentSucess implements Action {
    readonly type = LOAD_POST_POST_COMMENT_SUCCESS;
    constructor(public payload: any) {
    }
}

export class LoadPostPostCommentFailed implements Action {
    readonly type = LOAD_POST_POST_COMMENT_FAILED;
    constructor(public payload: any) {
    }
}
export type StyleFeedActions =
    LoadBlock | LoadBlockSucess | LoadBlockFailed |
    LoadMoreVideo | LoadMoreVideoSucess | LoadMoreVideoFailed |
    LoadMorePosts | LoadMorePostsSucess | LoadMorePostsFailed |
    LoadMenu | LoadMenuSucess | LoadMenuFailed |
    LoadCategory | LoadCategorySucess | LoadCategoryFailed |
    LoadCategoryHighlight | LoadCategoryHighlightSucess | LoadCategoryHighlightFailed |
    LoadPost | LoadPostSucess | LoadPostFailed |
    LoadPostRelated | LoadPostRelatedSucess | LoadPostRelatedFailed |
    LoadPostSocial | LoadPostSocialSucess | LoadPostSocialFailed |
    LoadPostComments | LoadPostCommentsSucess | LoadPostCommentsFailed |
    LoadPostCommentsInfo | LoadPostCommentsInfoSucess | LoadPostCommentsInfoFailed |
    LoadPostPostComment | LoadPostPostCommentSucess | LoadPostPostCommentFailed

;
