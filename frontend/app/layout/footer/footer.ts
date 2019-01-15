import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import { CookieService } from 'ngx-cookie-service';

import * as common from '../../store/common/common.actions';
import * as fromRoot from '../../store/index';
import { AppConstants } from './../../app.constant';
import { Router } from '@angular/router';
import { GlobalService } from '../../services/global.service';

declare var $: any;
@Component({
    selector: 'app-footer',
    templateUrl: './footer.html',
    styleUrls: ['./footer.less']
})
export class AppFooter {
    categorySeo: any;
    footerContent: any;
    newsletterForm: any;
    errorMsg: any;
    successMsg: any;
    emailPattern: any = AppConstants.REGEX.EMAIL;
    constructor(private store: Store<fromRoot.AppState>, private router: Router, private domSanitizer: DomSanitizer, private http: Http,
        private cookieService: CookieService, private globalService: GlobalService) {
        this.store.select(fromRoot.commonGetCmsContents)
            .subscribe((cmsContent) => {
                this.footerContent = _.find(cmsContent, (cms: any) => {
                    return cms.identifier === 'tpo_fashion_home_page_footer';
                });

                if (this.footerContent) {
                    this.footerContent.content = domSanitizer.bypassSecurityTrustHtml(this.footerContent.content);
                }

                setTimeout(() => {
                    this._bindEventsForSubscriptionForm();
                }, 1000);
            });

        this.store.select(fromRoot.commonGetUrlInfo)
            .subscribe((info) => {
                this.categorySeo = null;
                if (info.type === 'category') {
                    if (info.category.cat_seo_area) {
                        this.categorySeo = this.domSanitizer.bypassSecurityTrustHtml(info.category.cat_seo_area);
                    }
                }
            });
    }

    _bindEventsForSubscriptionForm() {
        const self = this;
        const subscriptionForm = $('form.form.subscribe');
        const messageArea = subscriptionForm.find('.control.field.newsletter');
        const addMessage = ((type, message) => {
            const messageElement = $('<div></div>').addClass('mage-' + type).html(message);
            messageArea.append(messageElement);
        });

        subscriptionForm.on('submit', (e) => {
            e.preventDefault();
        });
        subscriptionForm.find('.btn-subscribe').on('click', (e) => {
            e.preventDefault();
            subscriptionForm.find('.mage-error').remove();
            subscriptionForm.find('.mage-success').remove();

            const genderValue = $(e.target).closest('button').data('val');
            const email = subscriptionForm.find('input[name="email"]').val();
            // Check if email is valid
            if (AppConstants.REGEX.EMAIL.test(email)) {
                const postData = {
                    subscriber_gender: genderValue,
                    email: email
                };
                const formData = new FormData();
                formData.append('subscriber_gender', genderValue);
                formData.append('email', email);
                const submitUrl = subscriptionForm.attr('action');

                self.store.dispatch(new common.SetLoadingState(true));
                self.http.post(submitUrl, formData)
                    .map((resp) => {
                        const data = resp.json();
                        if (data.messages && data.messages !== '') {
                            subscriptionForm.find('.mage-error').remove();
                            subscriptionForm.find('.mage-success').remove();
                            if (data.message_type === 'success') {
                                addMessage('success', data.messages);
                            } else {
                                addMessage('error', data.messages);
                            }
                        }
                    }).catch((error) => {
                        addMessage('error', 'Có lỗi xảy ra, vui lòng thử lại.');
                        return Observable.of(error);
                    }).finally(() => {
                        self.store.dispatch(new common.SetLoadingState(false));
                    }).subscribe();
            } else {
                addMessage('error', 'Vui lòng nhập đúng email.');
            }
        });
    }

    submitNewsletterForm(form, gender) {
        this.errorMsg = null;
        this.successMsg = null;
        if (form.valid) {
            const formData = new FormData();
            formData.append('subscriber_gender', gender);
            formData.append('email', _.get(form, 'value.email', ''));
            this.store.dispatch(new common.SetLoadingState(true));
            this.http.post('/newsletter/subscriber/new/', formData)
                .map((resp) => {
                    const data = resp.json();
                    if (data.messages && data.messages !== '') {
                        if (data.message_type === 'success') {
                            this.successMsg = data.messages;
                        } else {
                            this.errorMsg = data.messages;
                        }
                    }
                }).catch((error) => {
                    this.errorMsg = 'Có lỗi xảy ra, vui lòng thử lại.';
                    return Observable.of(error);
                }).finally(() => {
                    this.store.dispatch(new common.SetLoadingState(false));
                }).subscribe();
        }
    }
}
