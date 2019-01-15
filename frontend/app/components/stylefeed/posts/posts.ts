import { Component, OnInit, ViewChild, AfterViewInit, AfterContentInit  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AngularMasonry, MasonryOptions } from 'angular2-masonry';

import * as fromRoot from '../../../store';
import * as stylefeed from '../../../store/stylefeed/stylefeed.actions';
import * as products from '../../../store/products/products.actions';

declare var $;

@Component({
    selector: 'lt-stylefeed-posts',
    templateUrl: './posts.html',
    styles: [
        `
            .infinity-scroll{ height:1px; }

        `
    ]
})
export class SFPostsComponent implements AfterViewInit {

    @ViewChild(AngularMasonry) masonry: AngularMasonry;
    ngAfterViewInit() {

        if(this.router.url.indexOf('style-feed/category/') !== -1 ){
            this.store.dispatch(new stylefeed.LoadCategory({urlkey:this.category,page:1}));
        }else{
            this.store.dispatch(new stylefeed.LoadMorePosts({page:1}));
        }

        this.masonry.ngOnInit();

        this.masonry.layoutComplete.subscribe(() => {
            this.masonry.ngOnInit();
            //$('body').removeAttr('style');
        });
    }

    public myOptions: MasonryOptions = {
        transitionDuration: '5s'
    };

    postsSub: any;
    posts: any;
    requestBody: any;
    productsSub: any;
    products: any;
    newposts: any;
    route:any;
    category:any;
    page:any;
    categoryUrl : 'style-feed/category/';

    constructor(protected store: Store<fromRoot.AppState>, protected activatedRoute: ActivatedRoute, private router: Router) {

        this.activatedRoute.params.subscribe((params: any) => {
            if (this.category !== params.urlkey) {
                this.category = params.urlkey;
            }
        });
        if(this.router.url.indexOf(this.categoryUrl) !== -1 ){
            this.postsSub = this.store.select(fromRoot.styleFeedGetMorePostsCategory).subscribe(state => this.loadPosts(state));
        }else{
            this.postsSub = this.store.select(fromRoot.styleFeedGetMorePostsHome).subscribe(state => this.loadPosts(state));
        }

    }

    loadPosts(state) {
        this.posts = state.posts;
        this.requestBody = state.requestBody;
        this.newposts = state.newposts;
        if(typeof this.requestBody.page != 'undefined'){
            if(this.newposts.length > 0){
                $('.infinity-scroll').attr('page-old', this.requestBody.page );
                $('.infinity-scroll').attr('page',this.requestBody.page + 1);
            }else{
                $('.infinity-scroll').attr('page-old', this.requestBody.page );
                $('.infinity-scroll').attr('page', this.requestBody.page );
            }
        }
    }

    loadState(params){
        //this.masonry.ngOnDestroy();

        if(this.router.url.indexOf('style-feed/category/') !== -1 ){
            this.store.dispatch(new stylefeed.LoadCategory({urlkey:this.category,page:this.page}));
        }else{
            this.store.dispatch(new stylefeed.LoadMorePosts({ page:this.page }));
        }

        this.masonry.ngOnInit();
    }

    ngOnDestroy() {
        this.postsSub.unsubscribe();
        //this.masonry.ngOnDestroy();
    }

    onScroll(event) {
        this.masonry.ngOnInit();

        let _element = $('.infinity-scroll');
        let _documentTop = $(window).scrollTop();
        let _documentBottom = _documentTop + $(window).height();
        let _elementTop = _element.offset().top - 2500;
        let _elementBottom = _elementTop + $(_element).height();
        let check = ((_elementBottom <= _documentBottom) && (_elementTop >= _documentTop));
        let _page = this.requestBody;
        let _pageNew = parseInt($('.infinity-scroll').attr('page'));
        let _pageOld = parseInt($('.infinity-scroll').attr('page-old'));

        if(check && (_pageNew - _pageOld) == 1){
            //$('body').css('overflow','hidden');
            if(this.router.url.indexOf('style-feed/category/') !== -1 ){
                this.store.dispatch(new stylefeed.LoadCategory({urlkey:this.category,page:_pageNew}));
            }else{
                this.store.dispatch(new stylefeed.LoadMorePosts({ page:_pageNew }));
            }

        }

    }




}
