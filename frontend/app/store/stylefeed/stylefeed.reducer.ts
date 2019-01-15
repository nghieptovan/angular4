import * as _ from 'lodash';
import * as stylefeed from './stylefeed.actions';

declare var $;
export interface State {
    loaded: boolean;
    loading: boolean;
    requestBody: any;
    allPosts:any;
    menuItems:Array<any>;
    posts:any;
    newposts:any;
    highlight:any;
    data:any;
    related:any;
    message: any;
    error:any;
    comments:any;
    commentsInfo:any;
}

const initialState: State = {
    loaded: false,
    loading: false,
    requestBody: {},
    allPosts:[],
    menuItems:[],
    posts:[],
    newposts:[],
    highlight:[],
    data:[],
    related:[],
    message:[],
    error:[],
    comments:[],
    commentsInfo:[]
};

export function reducer(state = initialState, action: stylefeed.StyleFeedActions): State {
    switch (action.type) {

        case stylefeed.LOAD_BLOCK: {
            return Object.assign({}, state, {
                loading: true,
                loaded:false
            });
        }
        case stylefeed.LOAD_BLOCK_SUCCESS: {
            return Object.assign({}, state, {
                loading: false,
                loaded: true,
                allPosts: action.payload.data
            });
        }
        case stylefeed.LOAD_BLOCK_FAILED: {
            return Object.assign({}, state, {
                loading: false,
                loaded: true
            });
        }

        case stylefeed.LOAD_MENU: {
            return Object.assign({}, state, {
                loading: true,
                loaded:false
            });
        }
        case stylefeed.LOAD_MENU_SUCCESS: {
            return Object.assign({}, state, {
                loading: false,
                loaded:true,
                menuItems:action.payload.data
            });
        }
        case stylefeed.LOAD_MENU_FAILED: {
            return Object.assign({}, state, {
                loading: false,
                loaded:true
            });
        }

        case stylefeed.LOAD_MORE_POSTS:{
            return Object.assign({}, state, {
                loading: true,
                loaded:false
            });
        }
        case stylefeed.LOAD_MORE_POSTS_SUCCESS:{
            const posts = state.posts;
            return Object.assign({}, state, {
                loading: true,
                loaded:false,
                posts:posts.concat(action.payload.data),
                requestBody: action.payload.requestBody,
                newposts:action.payload.data
            });
        }
        case stylefeed.LOAD_MORE_POSTS_FAILED:{
            return Object.assign({}, state, {
                loading: false,
                loaded:true
            });
        }

        case stylefeed.LOAD_CATEGORY:{
            return Object.assign({}, state, {
                loading: true,
                loaded:false
            });
        }
        case stylefeed.LOAD_CATEGORY_SUCCESS:{
            const posts = state.posts;
            return Object.assign({}, state, {
                loading: true,
                loaded:false,
                posts:posts.concat(action.payload.data),
                requestBody: action.payload.requestBody,
                newposts:action.payload.data
            });
        }
        case stylefeed.LOAD_CATEGORY_FAILED:{
            return Object.assign({}, state, {
                loading: false,
                loaded:true
            });
        }

        case stylefeed.LOAD_CATEGORY_HIGHLIGHT:{
            return Object.assign({}, state, {
                loading: true,
                loaded:false
            });
        }
        case stylefeed.LOAD_CATEGORY_HIGHLIGHT_SUCCESS:{
            return Object.assign({}, state, {
                loading: true,
                loaded:false,
                highlight:action.payload.data
            });
        }
        case stylefeed.LOAD_CATEGORY_HIGHLIGHT_FAILED:{
            return Object.assign({}, state, {
                loading: false,
                loaded:true
            });
        }

        case stylefeed.LOAD_POST:{
            return Object.assign({}, state, {
                loading: true,
                loaded:false
            });
        }
        case stylefeed.LOAD_POST_SUCCESS:{
            return Object.assign({}, state, {
                loading: true,
                loaded:false,
                data:action.payload.data,
                requestBody: action.payload.requestBody
            });
        }
        case stylefeed.LOAD_POST_FAILED:{
            return Object.assign({}, state, {
                loading: false,
                loaded:true
            });
        }

        case stylefeed.LOAD_POST_RELATED:{
            return Object.assign({}, state, {
                loading: true,
                loaded:false
            });
        }
        case stylefeed.LOAD_POST_RELATED_SUCCESS:{
            return Object.assign({}, state, {
                loading: true,
                loaded:false,
                related:action.payload.data
            });
        }
        case stylefeed.LOAD_POST_RELATED_FAILED:{
            return Object.assign({}, state, {
                loading: false,
                loaded:true
            });
        }

        case stylefeed.LOAD_POST_SOCIAL :{
            return Object.assign({}, state, {
                loading: true,
                loaded:false
            });
        }
        case stylefeed.LOAD_POST_SOCIAL_SUCCESS:{
            return Object.assign({}, state, {
                loading: true,
                loaded:false,
                message:action.payload.message,
                error:action.payload.error
            });
        }
        case stylefeed.LOAD_POST_SOCIAL_FAILED:{
            return Object.assign({}, state, {
                loading: false,
                loaded:true
            });
        }

        case stylefeed.LOAD_POST_COMMENTS:{
            return Object.assign({}, state, {
                loading: true,
                loaded:false
            });
        }
        case stylefeed.LOAD_POST_COMMENTS_SUCCESS:{
            return Object.assign({}, state, {
                loading: true,
                loaded:false,
                comments:action.payload.data,
                requestBody: action.payload.requestBody
            });
        }
        case stylefeed.LOAD_POST_COMMENTS_FAILED:{
            return Object.assign({}, state, {
                loading: false,
                loaded:true
            });
        }

        case stylefeed.LOAD_POST_COMMENTS_INFO:{
            return Object.assign({}, state, {
                loading: true,
                loaded:false
            });
        }
        case stylefeed.LOAD_POST_COMMENTS_INFO_SUCCESS:{
            return Object.assign({}, state, {
                loading: true,
                loaded:false,
                commentsInfo:action.payload.data
            });
        }
        case stylefeed.LOAD_POST_COMMENTS_INFO_FAILED:{
            return Object.assign({}, state, {
                loading: false,
                loaded:true
            });
        }

        case stylefeed.LOAD_POST_POST_COMMENT :{
            return Object.assign({}, state, {
                loading: true,
                loaded:false
            });
        }
        case stylefeed.LOAD_POST_POST_COMMENT_SUCCESS:{
            return Object.assign({}, state, {
                loading: true,
                loaded:false,
                message:action.payload.message,
                error:action.payload.error
            });
        }
        case stylefeed.LOAD_POST_POST_COMMENT_FAILED:{
            return Object.assign({}, state, {
                loading: false,
                loaded:true
            });
        }


        default:
            return state;
    }
}

export const getMenu = (state: State) => state.menuItems;
export const getAllPosts = (state: State) => state.allPosts;
export const getMorePostsHome = (state: State) => state;
export const getMorePostsCategory = (state: State) => state;
export const getPostsHighlightCategory = (state: State) => state.highlight;
export const getPostContent = (state: State) => state;
export const getPostRelated = (state: State) => state.related;
export const getPostComments = (state: State) => state.comments;
export const getPostCommentsInfo = (state: State) => state.commentsInfo;
export const getRequestBody = (state: State) => state.requestBody;
export const getIsLoadingState = (state: State) => state.loading;
export const getIsLoadedState = (state: State) => state.loaded;
export const postPostSocial = (state: State) => state;
export const postPostComment = (state: State) => state.message;
