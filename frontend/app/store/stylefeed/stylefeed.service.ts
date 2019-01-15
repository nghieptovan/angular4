import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { HttpService } from '../../services/http.service';

@Injectable()
export class StyleFeedService {
    constructor(private httpService: HttpService) {

    }

    getHomepagePosts() {
        return this.httpService.getAnonymous('stylefeed/homepage').map(data => data.json());
    }

    getMenuHomePage() {
        return this.httpService.getAnonymous('stylefeed/menu').map(data => data.json());
    }

    getMorePostsHome(page) {
        return this.httpService.getAnonymous('stylefeed/homepage/posts/' + page).map(data => data.json());
    }

    getPostsHighlightCategory(category) {
        return this.httpService.getAnonymous('stylefeed/category/' + category + '/highlight' ).map(data => data.json());
    }

    getMorePostsCategory(page,category) {
        return this.httpService.getAnonymous('stylefeed/category/' + category + '/page/' + page).map(data => data.json());
    }

    getPostContent(post) {
        return this.httpService.getAnonymous('stylefeed/post/detail/' + post ).map(data => data.json());
    }

    getPostRelated(post){
        return this.httpService.getAnonymous('stylefeed/post/related/' + post ).map(data => data.json());
    }

    postPostSocial(urlkey,method){
        return this.httpService.postAnonymous('stylefeed/post/' + urlkey + '/social', {method: method});
    }

    getPostComments(post,page){
        return this.httpService.getAnonymous('stylefeed/post/comments/' + post + '/page/' + page).map(data => data.json());
    }

    getPostCommentsInfo(post){
        return this.httpService.getAnonymous('stylefeed/post/comments/' + post + '/info').map(data => data.json());
    }

    postPostComment(urlkey,data){
        return this.httpService.post('stylefeed/post/comments/' + urlkey , {data: data});
    }
}
