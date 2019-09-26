import { environment } from '../environments/environment';
console.log(environment.environment);
export const AppConstants = {
    USE_CONFIG_TEXT: true,
    API_ENDPOINT: environment.API_ENDPOINT,    
    ENVIRONMENT_DEV: environment.ENVIRONMENT_DEV,
    ASSET_URL: environment.ASSET_URL,
    HOST_NAME: 'environment.HOST_NAME', 
    MESSAGE_PASSWORD: 'Vui lòng nhập tên mật khẩu',
    MESSAGE_USERNAME: 'Vui lòng nhập tên đăng nhập',
    MESSAGE_PHONENUMBER: 'Vui lòng số điện thoại',
    MESSAGE_ADDRESS: 'Vui lòng nhập địa chỉ',
    MESSAGE_WEIGHT: 'Vui lòng nhập cân nặng',
    MESSAGE_DIAGNOSIS: 'Vui lòng nhập tiền căn',
    MESSAGE_BIRTHDAY: 'Vui lòng nhập ngày sinh',
    MESSAGE_FULLNAME: 'Vui lòng nhập họ tên',
    MESSAGE_ROLE: 'Vui lòng chọn chức vụ',
    LIMIT_ITEMS_CMS: {
        LT_DAT_VIET_HOT_PRODUCT: 4
    }
};
