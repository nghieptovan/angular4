export class AddressTransformer {

    /**
     * @note
     * @remove middlename
     */
    public static transform(data: any) {
        const customer = JSON.parse(localStorage.getItem('userInfo'));
        const resp: any = {
            region: data._city.name,
            regionId: data._city.id,
            regionCode: data._city.code,
            countryId: 'VN',
            street: data.street,
            company: null,
            telephone: data.telephone,
            fax: data.telephone,
            postcode: 700000,
            city: data._city.name,
            firstname: data.firstname,
            lastname: data.lastname,
            middlename: '',
            vatId: 1,
            email: data.extension_attributes.email_address,
            // saveInAddressBook: data.saveInAddressBook ? data.saveInAddressBook : false
        };
        if (customer) {
            resp.customerId = customer.id;
        }
        return resp;
    }
}
