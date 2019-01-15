import { AddressTransformer } from './AddressTransformer';
import * as _ from 'lodash';
import {LocalStorageManagement} from "../components/base/LocalStorageManagement";
import {ICartInfoStorage} from "../components/base/payment/ICartInfoStorage";

export class PaymentMethodTransformer {

    public static transform(paymentAdditionalData: any, vendorId: number = null) {
        let cartInfo: ICartInfoStorage = {
            cartId: null,
            paymentMethod: null,//not yet
            shipping_duration: null,
            orderSuccess: null,
            differentBillingAddress: null,
            billingAddress: null,
            shippingAddress: null,
            shipping_comments: null,
            vatInfo: null,
            shippingRules: null,
            cart: null,
            selectedPaymentType: null,
            shipping_method_code: null
        };

        if(vendorId){
            cartInfo = LocalStorageManagement.getInstance().getVendorCartInfo(vendorId);
            LocalStorageManagement.getInstance().storeStorageVendorCartInfo(vendorId, {
                paymentMethod: JSON.stringify(paymentAdditionalData)
            });
        } else {
            cartInfo.vatInfo = localStorage.getItem('vatInfo');
            cartInfo.billingAddress = localStorage.getItem('billingAddress');
            cartInfo.differentBillingAddress = localStorage.getItem('differentBillingAddress');
            localStorage.setItem('paymentMethod', JSON.stringify(paymentAdditionalData));
        }

        const vatInfo = JSON.parse(cartInfo.vatInfo);
        const billingAddress = JSON.parse(cartInfo.billingAddress);
        const differentBillingAddress = JSON.parse(cartInfo.differentBillingAddress);
        const postAddress = _.assign(AddressTransformer.transform(billingAddress), {
            email: billingAddress.extension_attributes.email_address,
            extension_attributes: {
                vat_required: vatInfo.vat_required,
                vat_company_name: vatInfo.vat_company_name,
                vat_company_address: vatInfo.vat_company_address,
                vat_company_taxcode: vatInfo.vat_company_taxcode,
                email_address: billingAddress.extension_attributes.email_address,
                is_home: billingAddress.extension_attributes.is_home,
                district_id: billingAddress._district.id,
                ward_id: billingAddress._ward.id,
                district: billingAddress._district.name,
                ward: billingAddress._ward.name,
            }
        });
        if (localStorage.getItem('token')) {
            postAddress.saveInAddressBook = !billingAddress.id && differentBillingAddress;
        }
        const resp: any = {
            paymentMethod: paymentAdditionalData.paymentMethod || paymentAdditionalData,
            billingAddress: postAddress
        };
        resp.email = billingAddress.extension_attributes.email_address;
        return resp;
    }
}
