import { Component, EventEmitter, Input, Output, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dispatcher, Store } from '@ngrx/store';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { NgForm } from '@angular/forms';
import { DialogService } from 'ng2-bootstrap-modal/dist/dialog.service';
import { LoginModal } from './../../../../modals/login/login';
import { CommentModal } from './../../../../modals/comment/comment';
import { DatePipe } from '@angular/common';

import * as fromRoot from '../../../../store';
import * as stylefeed from '../../../../store/stylefeed/stylefeed.actions';
import { getRequestBody } from '../../../../store/tpo/tpo.reducer';

@Component({
    selector: 'lt-stylefeed-post-comment',
    templateUrl: './comment.html',
    styleUrls: ['./comment.less']
})
export class SFPostComment {

    @ViewChild('commentForm') commentForm: NgForm;
    subscriber: Subscription;
    commentsSub: any;
    comments: any;
    commentsInfoSub: any;
    commentsInfo: any;
    commentsPostSub: any;
    commentsPost: any = {
        error: -1,
        message:''
    };

    urlkey:any;
    total:any;
    pages:any;

    currentPage:any = 1;
    perPage:any = 10;
    content:any = '';

    userInfo:any;
    newComment: any = {
        nickname: null,
        email: null,
        phone: null,
        content: null
    };
    focus:any = false;
    passRequired:any = false;

    constructor(
        private store: Store<fromRoot.AppState>,
        private activatedRoute: ActivatedRoute,
        private domSanitizer: DomSanitizer,
        private dialogService: DialogService,
        private dispatcher: Dispatcher
    ) {

        this.activatedRoute.params.subscribe((params: any) => {
            if (this.urlkey !== params.urlkey) {
                this.urlkey = params.urlkey;
            }
        });

        this.commentsSub = this.store.select(fromRoot.styleFeedGetPostComments).subscribe(state => {
            this.comments = state;
        });

        this.commentsInfoSub = this.store.select(fromRoot.styleFeedGetPostCommentsInfo).subscribe(state => {
            this.commentsInfo = state;
            if(this.commentsInfo.length > 0){
                this.total = this.commentsInfo[0].total;
                this.pages = this.commentsInfo[0].pages;
            }
        });

        this.store.dispatch(new stylefeed.LoadPostCommentsInfo({urlkey:this.urlkey}));
        this.store.dispatch(new stylefeed.LoadPostComments({urlkey:this.urlkey,page:this.currentPage }));

    }

    ngOnDestroy() {
        this.commentsSub.unsubscribe();
        this.commentsInfoSub.unsubscribe();
    }

    login() {
        this.dialogService.addDialog(LoginModal);
    }

    isAuth(){
        const token = localStorage.getItem('token');
        if(token) return true;
        return false;
    }

    formatDate(date){
        return new DatePipe('vi-VN').transform(date, 'H:s dd/MM/yyyy');
    }

    getPages(): number[] {
        const c = Math.ceil(this.total / this.perPage);
        const p = this.currentPage;
        const pagesToShow = 10;
        const pages: number[] = [];
        pages.push(p);
        const times = pagesToShow - 1;
        for (let i = 0; i < times; i++) {
            if (pages.length < pagesToShow) {
                if (Math.min.apply(null, pages) > 1) {
                    pages.push(Math.min.apply(null, pages) - 1);
                }
            }
            if (pages.length < pagesToShow) {
                if (Math.max.apply(null, pages) < c) {
                    pages.push(Math.max.apply(null, pages) + 1);
                }
            }
        }
        pages.sort((a, b) => a - b);
        return pages;
    }

    getMax(): number {
        let max = this.perPage * this.currentPage;
        if (max > this.total) { max = this.total; }
        return max;
    }

    onPage(number: number): void {
        this.currentPage = number;
        this.store.dispatch(new stylefeed.LoadPostComments({urlkey:this.urlkey,page:this.currentPage }));
    }

    lastPage(): boolean {
        return this.perPage * this.currentPage > this.total;
    }

    submitPost(){
        if(this.isAuth()){
            if (this.content != '' ) {
                this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
                this.newComment.nickname = this.userInfo.firstname;
                this.newComment.email = this.userInfo.email;
                this.newComment.phone = this.userInfo.phone_number;
                this.newComment.content = this.content;
                this.store.dispatch(new stylefeed.LoadPostPostComment({urlkey:this.urlkey,data:this.newComment}));
                this.commentsPost.error   = 0;
                this.commentsPost.message = "Cám ơn bạn đã bình luận tại LOTTE.vn";
            }else{
                this.passRequired = true;
            }
        }else{
            this.login();
        }

    }

    clickContent(){
        if(!this.isAuth()){
            this.login();
        }else{
            this.focus = true;
        }

    }

    displayRule() {
        this.dialogService.addDialog(CommentModal);
    }

    ngAfterViewInit(){

        //LOAD_POST_POST_COMMENT_SUCCESS
        this.subscriber = this.dispatcher.subscribe((action) => {
            switch (action.type) {
                case stylefeed.LOAD_POST_POST_COMMENT_SUCCESS:
                        this.store.dispatch(new stylefeed.LoadPostCommentsInfo({urlkey:this.urlkey}));
                        this.store.dispatch(new stylefeed.LoadPostComments({urlkey:this.urlkey,page:this.currentPage }));
                    break;
                case stylefeed.LOAD_POST_POST_COMMENT_FAILED:
                    this.commentsPost.error   = 1;
                    this.commentsPost.message = "Đã có lỗi xảy ra, vui lòng thử lại. ";
                    break;
                default:
                    break;
            }
        });

    }
}

