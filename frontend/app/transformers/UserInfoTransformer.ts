import * as _ from 'lodash';

export class UserInfoTransformer {
    public static transform(data: any) {
        data.addresses = _.map(data.addresses, function(address: any) {
            if (address.id) {
                delete address._city;
                delete address._district;
                delete address._ward;
                delete address.ward;
                delete address.district;
                return address;
            } else {
                const item: any = {
                    region: {
                        region_code: null,
                        region: null,
                        region_id: _.clone(address._city.id)
                    },
                    region_id: address._city.id,
                    country_id: 'VN',
                    street: address.street,
                    telephone: address.telephone,
                    postcode: 70000,
                    city: _.clone(address._city.name),
                    firstname: address.firstname,
                    lastname: address.lastname,
                    extension_attributes: {
                        district_id: _.clone(address._district.id),
                        ward_id: _.clone(address._ward.id),
                        is_home: address.extension_attributes.is_home,
                        email_address: address.extension_attributes.email_address
                    }
                };
                if (address.id) {
                    item.id = address.id;
                }
                if (data.id) {
                    item.customer_id = data.id;
                }
                return item;
            }
        });
        return data;
    }
}

