import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../../store';
import * as stylefeed from '../../../../store/stylefeed/stylefeed.actions';
import { ProductVideoModal } from '../../../../modals/product-video/product-video';
import { DialogService } from 'ng2-bootstrap-modal';
import { DomSanitizer } from '@angular/platform-browser';

declare var $;

@Component({
    selector: 'lt-stylefeed-video-posts',
    templateUrl: './video.html'
})
export class SFHomeVideoPostsComponent {
    postsSub: any;
    posts: any;
    video: any;

    constructor(private store: Store<fromRoot.AppState>, private activatedRoute: ActivatedRoute,
        private dialogService: DialogService, private domSanitizer: DomSanitizer
    ) {
        this.postsSub = this.store.select(fromRoot.styleFeedGetAllPosts).subscribe(state => {
            this.posts = state.video_post  ;
            //console.log(this.posts);
        });

        //this.store.dispatch(new stylefeed.LoadBlock(null));
    }

    ngOnDestroy() {
        this.postsSub.unsubscribe();
    }

    onDataClick(event) {
        const e = event.currentTarget;
        if (e && e.getAttribute('video-content')) {
            this.video   = {
                url:this.domSanitizer.bypassSecurityTrustResourceUrl(e.getAttribute('video-content')),
                video_title:e.getAttribute('video-title'),
                sub_title:  e.getAttribute('video-subtitle')
            };
            this.dialogService.addDialog(ProductVideoModal, {
                videoContent:  this.video
            });
        }
    }

    ondivclick(event){
        //console.log('img');

    }
    ondivclick1(){
        //console.log('div');
    }
    onClickMore(event){
        $('.video-list-2').removeClass('hidden');
        $('.viewed-footer').remove();
    }

}
