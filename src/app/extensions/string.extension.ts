import { AppConstants } from './../app.constant';
import * as _ from 'lodash';
import slugify from 'slugify';

declare global {
    interface String {
        toStaticUrl(): string;
        toMediaUrl(): string;
        toBaseUrl(): string;
        toHostName(): string;
        toLinkUrl(): string;
        toProductUrl(): string;
        toSupportUrl(): string;
        toVndCurrency(): string;
        padZero(prefix: number): string;
        removeHtmlTag(tag: string): string;
        toUrlKey(): string;
        toSlugify(): string;
        toSubCateFormat(product_count: number): string;
        toStringTimeFormat(date: Date): string;
    }
}


String.prototype.toVndCurrency = function () {
    if (this) {
        return this.replace(/./g, (c, i, a) => {
            return i && c !== ',' && ((a.length - i) % 3 === 0) ? '.' + c : c;
        }) + ' đ';
    }
    return this;
};

String.prototype.padZero = function (zeroCount) {
    return Array(Math.max(zeroCount - this.length + 1, 0)).join('0') + this;
};

String.prototype.removeHtmlTag = function (tagName) {
    return this.replace(/<script.*?<\/script>/i, '');
};

String.prototype.toUrlKey = function () {
    if (this) {
        const lastValue = _.last(this);
        let self = this;
        if (lastValue === '/') {
            self = self.replace(/.$/, '');
        }

        const lastIdx = _.lastIndexOf(self, '/');
        if (lastIdx > -1) {
            return self.substring(lastIdx + 1);
        }
    }
    return null;
};

String.prototype.toSlugify = function () {
    if (this) {
        let slug = this.toLowerCase();
        
        slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
        slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
        slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
        slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
        slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
        slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
        slug = slug.replace(/đ/gi, 'd');

        slug = slugify(slug);
        return slug;
    }
    return null;
};

String.prototype.toSubCateFormat = function (product_count) {
    if (this) {
        return this + ' (' + product_count + ')';
    }
    return null;
};

String.prototype.toStringTimeFormat = function(date: Date){
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    return hours + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' ' + ampm;
}