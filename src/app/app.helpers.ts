import * as _ from 'lodash';

export class AppHelpers {

    public static getErrorMessage(payload: any) {
        switch (typeof payload) {
            case 'string':
                return payload;
            default:
                try {
                    if (!payload.message) {
                        if (payload && payload.json() && payload.json().message && payload.json().parameters) {
                            payload = payload.json();
                            let message: string = payload.message;
                            const vars: Array<string> = Object.keys(payload.parameters);
                            _.each(vars, (variable) => {
                                message = message.replace('%' + variable, payload.parameters[variable]);
                            });
                            return message;
                        } else if (payload.json() && payload.json().message) {
                            return payload.json().message;
                        } else if (payload.text()) {
                            return payload.text();
                        }
                    } else {
                        return payload.message;
                    }
                } catch (err) {
                    return 'Có lỗi trong quá trình thực thi, vui lòng thử lại.';
                }
        }
    }

    public static isLocalhost() {
        return window.location.hostname.includes('localhost');
    }
}
