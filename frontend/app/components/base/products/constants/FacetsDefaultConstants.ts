import {FacetTypeConstants} from "./FacetTypeConstants";

export const FacetsDefaultConstants = {
    facets:[
        {
            type: FacetTypeConstants.FACET_TYPE_CATEGORY,
            limit: 20
        },
        {
            type: FacetTypeConstants.FACET_TYPE_BRAND,
            limit: 20
        },
        {
            type: FacetTypeConstants.FACET_TYPE_PRICE,
            limit: 0
        },
        {
            type: FacetTypeConstants.FACET_TYPE_VENDOR,
            limit: 20
        },
    ],
    facetsInfo:[
        {
            attribute_code: FacetTypeConstants.FACET_TYPE_CATEGORY,
            label: 'Ngành hàng',
            searchable: true,
            limit: 20
        },
        {
            attribute_code: FacetTypeConstants.FACET_TYPE_BRAND,
            label: 'Thương hiệu',
            searchable: true,
            limit: 20
        },
        {
            attribute_code: FacetTypeConstants.FACET_TYPE_VENDOR,
            label: 'Nhà cung cấp',
            searchable: true,
            limit: 20
        },
        {
            attribute_code: FacetTypeConstants.FACET_TYPE_PRICE,
            label: 'Giá',
            searchable: false,
            limit: 20
        }
    ],
    orderDefault: '_score'
};

