import { environment } from '../environments/environment';

export const AppConstants = {
    API_ENDPOINT: environment.API_ENDPOINT,
    HOST_NAME: environment.HOST_NAME,
    ENVIRONMENT_DEV: environment.ENVIRONMENT_DEV,
    ASSET_URL: environment.ASSET_URL,
    ELASTIC_API_ENDPOINT: environment.ELASTIC_API_ENDPOINT,
    DISABLED_TRACKING_CODE: false,
    OAUTH: {
        TOKEN: 'b1ja8rrbc5uinw55lmrnxaqb4o9sh8k6',
        ELASTIC_TOKEN: ''
    },
    REGEX: {
        EMAIL: new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
        MULTIPLE_EMAIL: new RegExp(/^(((([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))+)\s*[,]{0,1}\s*)+$/),
        PASSWORD: new RegExp(/(?=.*[a-z])(?=.*[0-9])(?=.{6,20})/),
        TELEPHONE: new RegExp(/^(0|\+84)(1\d{3,4,5,6,7,9}|[2-9]\d{8,9})$/),
        CARD_NUMBER: new RegExp(/^[0-9]{16}$/),
        CVV: new RegExp(/^[0-9]{3,4}$/),
        EXPIRED_DATE: new RegExp(/^(?:0[1-9]|1[0-2])\/[0-9]{2}$/)

    },
    SESSION_STORAGE: {},
    DEFAULT_META_TAGS: null,
    DEFAULT_REGION: {
        CITY_ID: 1086,
        DISTRICT_ID: 711,
        WARD_ID: null
    },

    DEFAULT_STORE_URL_KEY: {
        LOTTE_VN: '',
        LOTTE_DEPARTMENT: 'department-store',
        LOTTE_MART: 'lotte-mart',
        LOTTE_MART_HN: 'lotte-mart-hn',
        LOTTE_DATVIET: 'home-shopping'
    },

    DEFAULT_STORE_COOKIES: {
        LOTTE_VN: 'lotte',
        LOTTE_DEPARTMENT: 'lotte.department_store',
        LOTTE_MART: 'lotte.mart.hcm',
        LOTTE_MART_HN: 'lotte.mart.hn',
        LOTTE_DATVIET: 'lotte.home_shopping'
    },
    DEFAULT_STORE_IDS: {
        LOTTE_VN: 118,
        LOTTE_DEPARTMENT: 110,
        LOTTE_MART: 109,
        LOTTE_DATVIET: 111
    },
    DEFAULT_STORE_BODY_CLASS: {
        LOTTE_VN: 'cms-index-index page-layout-1column page-with-filter page-layout-2columns-left page-products catalog-category-view',
        LOTTE_DEPARTMENT: 'department-theme cms-lottedeptstore page-layout-lotte-lottedeptstore-layout page-with-filter page-layout-2columns-left page-products catalog-category-view',
        LOTTE_MART: 'lottemart-theme page-layout-lotte-mart-layout page-with-filter page-layout-2columns-left page-products catalog-category-view',
        LOTTE_MART_HN: 'lottemart-theme page-layout-lotte-mart-layout page-with-filter page-layout-2columns-left page-products catalog-category-view',
        LOTTE_DATVIET: 'datviet-theme page-layout-home-shopping-layout page-with-filter page-layout-2columns-left page-products catalog-category-view'
    },
    APP_STYLES: (version) => {

    },
    MAX_ITEMS_COUNT_IN_CART: 50,
    DEFAULT_EMPTY_EMAIL: '',
    FACEBOOK: {
        APP_ID: '381884265595343'
    },
    CHECKOUT: {
        INSTALLMENT_MINIMUM_PRICE: 0,
        PAYMENT_COD_MAX_PRICE: 0,
        VIETTIN_GATEWAY_URL: '',
        MOMO_MAX_PRICE:20000000,
    },
    STORE_CONFIG: {
        LINK_URL: '',
        MEDIA_URL: '',
        STATIC_URL: '',
        BASE_URL: '',
        PRODUCT_BASE_URL: '',
        CURRENCY_SYMBOL: '₫',
        REDIRECT_URL: 'https://www.lotte.vn/zendesk/sso/login/return_url/',
        ZENDESK_SUPPORT_URL: 'https://support.lotte.vn/hc/requests/'
    },
    LIMIT_ITEMS_CMS: {
        LT_DAT_VIET_HOT_PRODUCT: 4
    }
};

export const TpoConstants = {
    TPO_COMPONENT_TYPE_PRODUCTS: {
        DETAIL: 1,
        DASHBOARD: 2
    }
};

export const SHIP_TYPE = {
    STANDARD: 1,
    EXPRESS: 2
};

