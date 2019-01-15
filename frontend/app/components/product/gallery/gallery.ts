import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { DialogService } from 'ng2-bootstrap-modal';
import { DomSanitizer } from '@angular/platform-browser';
import * as _ from 'lodash';
import { NgxGalleryAnimation, NgxGalleryImageSize, NgxGalleryOptions } from 'ngx-gallery';

import * as fromRoot from '../../../store';
import { ProductVideoModal } from '../../../modals/product-video/product-video';
import { GlobalService } from '../../../services/global.service';

declare var $;

@Component({
    selector: 'lt-product-gallery',
    templateUrl: './gallery.html'
})

export class LtProductGallery {
    galleryPhotos: any = [];
    galleryOptions: NgxGalleryOptions[];
    galleryImages: any = [];
    startIndex: any;
    productDetailSub: any;
    constructor(private store: Store<fromRoot.AppState>, private dialogService: DialogService,
        private domSanitizer: DomSanitizer, private globalService: GlobalService) {
        this.productDetailSub = this.store.select(fromRoot.productsGetDetails).subscribe((product) => {
            if (!_.isEmpty(product)) {
                this.galleryPhotos = _.filter(product.media_gallery_entries, (item: any) => {
                    return item.media_type && (item.media_type === 'image' || item.media_type === 'external-video');
                });

                this.galleryImages = _.map(this.galleryPhotos, (photo: any) => {
                    return {
                        small: photo.file.toProductUrl(),
                        medium: photo.file.toProductUrl(),
                        big: photo.file.toProductUrl(),
                        isVideo: photo.media_type === 'external-video',
                        videoContent: (photo.media_type === 'external-video' && photo.extension_attributes) ? photo.extension_attributes.video_content : {}
                    };
                });

                this.getBaseIndexGallery(this.galleryImages, product.extension_attributes.image);
                if (this.galleryImages.length) {
                    this.onGalleryChanged({
                        index: this.startIndex ? this.startIndex : 0,
                        image: this.galleryImages[this.startIndex ? this.startIndex : 0]
                    });
                }

                this.galleryOptions = [
                    {
                        startIndex: this.startIndex,
                        width: '363px',
                        height: '560px',
                        preview: false,
                        imagePercent: 84,
                        imageSize: NgxGalleryImageSize.Contain,
                        thumbnailsColumns: 5,
                        thumbnailsPercent: 16,
                        thumbnailSize: NgxGalleryImageSize.Contain,
                        arrowPrevIcon: 'lt-icon--prev',
                        arrowNextIcon: 'lt-icon--next',
                        thumbnailsMargin: 20,
                        thumbnailMargin: 5,
                        imageAnimation: NgxGalleryAnimation.Slide
                    }
                ];

                // Set default startIndex
                setTimeout(() => {
                    const galleryThumbnails = $('.ngx-gallery-thumbnail');
                    if (galleryThumbnails && galleryThumbnails.length > this.startIndex) {
                        galleryThumbnails[this.startIndex].click();
                    }
                }, 150);
            }
        });
    }
    getBaseIndexGallery(galleryImages, image) {
        if (galleryImages.length) {
            _.forEach(galleryImages, function (value, keyStartIndex) {
                if (image && value.big === image.toProductUrl()) {
                    this.startIndex = keyStartIndex;
                }
            }.bind(this));
        }
    }
    onGalleryChanged(slide) {
        setTimeout(() => {
            // Remove other galleries
            $('.zoomContainer').remove();
            $('.zoomWrapper').remove();
            $('div.ngx-gallery-active').removeClass('ngx-gallery-active--has-video');
            $('div.ngx-gallery-active').removeAttr('video-content');
            $('div.ngx-gallery-active img').remove();

            // Append image lens
            const img = `<img src='` + slide.image.medium +
                `' data-zoom-image='` + slide.image.medium + `'>`;
            $('div.ngx-gallery-active').prepend(img);

            // Check if image has video or not
            if (slide.image.isVideo) {
                $('div.ngx-gallery-active').addClass('ngx-gallery-active--has-video');
                slide.image.videoContent.videoType = this.globalService.parseURL(slide.image.videoContent.video_url);
                $('div.ngx-gallery-active').attr('video-content', JSON.stringify(slide.image.videoContent));
            } else {
                $('div.ngx-gallery-active img').elevateZoom({
                    scrollZoom: false,
                    zoomWindowPosition: 1,
                    zoomWindowOffetx: 60,
                    zoomWindowWidth: 500,
                    zoomWindowHeight: 500,
                    borderSize: 0,
                    imageCrossfade: true,
                });
            }
        }, 100);
    }

    onGalerryLoaded() {
        setTimeout(() => {
            const galleryHtml = $('.ngx-gallery-thumbnail');
            _.each(this.galleryImages, (image: any, idx) => {
                if (image.isVideo) {
                    $(galleryHtml[idx]).addClass('ngx-gallery-thumbnail--has-video');
                }
            });
        }, 500);
    }

    onDataClick(event) {
        if (event.target && event.target.getAttribute('video-content')) {
            const videoContent = JSON.parse(event.target.getAttribute('video-content'));
            const videoType = videoContent.videoType;
            if (videoType.type === 'youtube') {
                videoContent.url = this.domSanitizer.bypassSecurityTrustResourceUrl(`http://www.youtube.com/embed/` + videoType.id + `?autoplay=1&v=` + videoType.id);
            } else {
                videoContent.url = this.domSanitizer.bypassSecurityTrustResourceUrl(`http://player.vimeo.com/video/` + videoType.id + `?autoplay=1`);
            }

            this.dialogService.addDialog(ProductVideoModal, {
                videoContent: videoContent
            });
        }
    }

    ngOnDestroy() {
        // Destroy elevateZoom instance and remove its DOM
        $('.zoomContainer').remove();
        this.productDetailSub.unsubscribe();
    }
}
