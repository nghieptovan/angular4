import { AddressTransformer } from './AddressTransformer';
import * as _ from 'lodash';

export class ShippingAddressTransformer {

    public static transform(data: any = null, vendorId: number = null) {


        const postShippingAddress ={};
        // postShippingAddress.saveInAddressBook = !shippingAddress.id && shippingAddress.saveInAddressBook;
        // const postBillingAddress = _.assign(AddressTransformer.transform(billingAddress), {
        //     email: billingAddress.extension_attributes.email_address
        // });
        // postBillingAddress.saveInAddressBook = false;
        // postShippingAddress.saveInAddressBook = false;
        // // Save new address if user is authenticated
        // if (localStorage.getItem('token')) {
        //     postBillingAddress.saveInAddressBook = !billingAddress.id && differentBillingAddress;
        //     postShippingAddress.saveInAddressBook = !shippingAddress.id;
        // }
        return {
            addressInformation: {
                shippingAddress: postShippingAddress,
                /*billingAddress: {
                    saveInAddressBook: false,
                },*/
                // billingAddress: postBillingAddress,
                // extension_attributes: {
                //     is_home: shippingAddress.extension_attributes.is_home,
                //     email_address: shippingAddress.extension_attributes.email_address,
                //     district_id: shippingAddress._district.id,
                //     ward_id: shippingAddress._ward.id,
                //     district: shippingAddress._district.name,
                //     ward: shippingAddress._ward.name,
                //     shipping_comments: shippingComments,
                //     customer_firstname_info: '',
                //     vendors_shipping: '',
                // },
                // shippingMethodCode: shippingMethodCode,
                // shippingCarrierCode: shippingMethodCode
            },

        };
    }
}
