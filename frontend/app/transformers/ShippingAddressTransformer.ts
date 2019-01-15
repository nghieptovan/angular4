import { AddressTransformer } from './AddressTransformer';
import * as _ from 'lodash';
import {LocalStorageManagement} from "../components/base/LocalStorageManagement";
import {ICartInfoStorage} from "../components/base/payment/ICartInfoStorage";

export class ShippingAddressTransformer {

    public static transform(data: any = null, vendorId: number = null) {
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
        } else {
            cartInfo.differentBillingAddress = localStorage.getItem('differentBillingAddress');
            cartInfo.shipping_method_code = localStorage.getItem('shipping_method_code');
            cartInfo.shipping_comments = localStorage.getItem('shipping_comments');
            cartInfo.billingAddress = localStorage.getItem('billingAddress');
            cartInfo.shippingAddress = localStorage.getItem('shippingAddress');
        }

        const differentBillingAddress = cartInfo.differentBillingAddress;
        const shippingMethodCode = cartInfo.shipping_method_code;
        const shippingComments = cartInfo.shipping_comments ? cartInfo.shipping_comments : '';
        const billingAddress = JSON.parse(cartInfo.billingAddress);
        const shippingAddress = JSON.parse(cartInfo.shippingAddress);
        const postShippingAddress = _.assign(AddressTransformer.transform(shippingAddress), {
            prefix: 'pre',
            suffix: 'suf',
            email: shippingAddress.extension_attributes.email_address,
            sameAsBilling: !differentBillingAddress
        });
        // postShippingAddress.saveInAddressBook = !shippingAddress.id && shippingAddress.saveInAddressBook;
        const postBillingAddress = _.assign(AddressTransformer.transform(billingAddress), {
            email: billingAddress.extension_attributes.email_address
        });
        postBillingAddress.saveInAddressBook = false;
        postShippingAddress.saveInAddressBook = false;
        // Save new address if user is authenticated
        if (localStorage.getItem('token')) {
            postBillingAddress.saveInAddressBook = !billingAddress.id && differentBillingAddress;
            postShippingAddress.saveInAddressBook = !shippingAddress.id;
        }
        return {
            addressInformation: {
                shippingAddress: postShippingAddress,
                /*billingAddress: {
                    saveInAddressBook: false,
                },*/
                billingAddress: postBillingAddress,
                extension_attributes: {
                    is_home: shippingAddress.extension_attributes.is_home,
                    email_address: shippingAddress.extension_attributes.email_address,
                    district_id: shippingAddress._district.id,
                    ward_id: shippingAddress._ward.id,
                    district: shippingAddress._district.name,
                    ward: shippingAddress._ward.name,
                    shipping_comments: shippingComments,
                    customer_firstname_info: '',
                    vendors_shipping: '',
                },
                shippingMethodCode: shippingMethodCode,
                shippingCarrierCode: shippingMethodCode
            },

        };
    }
}
