import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { DomSanitizer } from '@angular/platform-browser';

import * as fromRoot from '../../../../store';
import * as stylefeed from '../../../../store/stylefeed/stylefeed.actions';

declare var $;
@Component({
    selector: 'lt-stylefeed-post-content',
    templateUrl: './content.html'
})
export class SFPostContent {
    postSub: any;
    posts: any;
    urlkey:any;
    currentUrl:any;
    content:any;
    imageUrls: any;
    constructor(private store: Store<fromRoot.AppState>, private activatedRoute: ActivatedRoute, private domSanitizer: DomSanitizer) {
        this.activatedRoute.params.subscribe((params: any) => {
            if (this.urlkey !== params.urlkey) {
                this.urlkey = params.urlkey;
            }
        });

        this.postSub = this.store.select(fromRoot.styleFeedGetPostContent).subscribe(state => {
            this.posts = state.data;    
            if(this.posts && this.posts.length > 0){
                let  imageUrls = [];
                $(this.posts[0].content).find('img').map(function() {
                    imageUrls = [...imageUrls, this.src];
                });
                this.imageUrls = imageUrls;
            }
            //this.loadFacebookShare(this.posts);
        });

        this.store.dispatch(new stylefeed.LoadPost({urlkey:this.urlkey}));

        this.updatePostSocial(this.urlkey, 'view');
        this.currentUrl = window.location.href;
    }

    ngOnDestroy() {
        this.postSub.unsubscribe();
    }

    updatePostSocial(urlkey, method) {
        const actionPayload = {
            urlkey: urlkey,
            method: method
        };
        this.store.dispatch(new stylefeed.LoadPostSocial(actionPayload) );
    }

    loadFacebookShare(post){
        if(typeof post[0] !== 'undefined'){
            var post = post[0];
            var image = post.images.full != 'undefined' ? post.images.full : 'https://d1710i1dsqwesz.cloudfront.net/media/logo/default/lotte-logo-2_1.png' ;
            $("meta[property='og:image']").attr('content',image);
            $("meta[property='og:description']").attr('content',post.description_split);
            $("meta[property='og:title']").attr('content',post.name);
        }
    }

    scrollToTop() {
        //window.scrollTo(0, 0);
        $('html,body').animate({scrollTop: 0}, 700);
    }

    onScroll(event){
        if ($(window).scrollTop()>200){
            $('.btn-btt-lt').show();
        }
        else{
            $('.btn-btt-lt').hide();
        }
    }

}
