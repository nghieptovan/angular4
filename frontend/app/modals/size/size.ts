import { Component } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';

@Component({
    selector: 'lt-product-size-modal',
    templateUrl: './size.html',
    styleUrls: ['./size.less']
})
export class ProductSizeModal extends DialogComponent<null, boolean> {

    types: any;
    selectedType: any;
    selectedSub: any;
    slimScrollOptions: any;

    constructor(dialogService: DialogService) {
        super(dialogService);
        document.body.classList.add('body--block-scroll');
        this._initSize();
        this.selectedType = this.types[0];
        this.selectedSub = this.selectedType.children[0];

        this.slimScrollOptions = {
            position: 'right',
            barOpacity: '0.5',
            barWidth: '7',
            gridBackground: 'transparent',
            barBackground: '#6e6e6e',
            alwaysVisible: false
        };
    }

    closeModal() {
        document.body.classList.remove('body--block-scroll');
        this.close();
    }

    confirm() {
        this.result = true;
        document.body.classList.remove('body--block-scroll');
        this.close();
    }

    getKeys(o) {
        return o ? Object.keys(o) : [];
    }

    _initSize() {
        this.types = [
            {
                cat: 'ĐỒ NAM',
                children: [
                    {
                        sub: 'Áo',
                        image: 'https://www.lotte.vn/media/wysiwyg/sizechart/AN_01.jpg',
                        size_headers: {
                            size: 'Internation',
                            high: 'US',
                            weight: 'UK',
                            waist: 'EU',
                            round: 'VN'
                        },
                        sizes: [
                            {
                                size: 'XXS',
                                high: '34',
                                weight: '34',
                                waist: '44',
                                round: 'XS'
                            },
                            {
                                size: 'XS',
                                high: '36',
                                weight: '36',
                                waist: '46',
                                round: 'S'
                            },
                            {
                                size: 'S',
                                high: '38',
                                weight: '38',
                                waist: '48',
                                round: 'M'
                            },
                            {
                                size: 'M',
                                high: '40',
                                weight: '40',
                                waist: '50',
                                round: 'L'
                            },
                            {
                                size: 'L',
                                high: '42',
                                weight: '42',
                                waist: '52',
                                round: 'XL'
                            },
                            {
                                size: 'XL',
                                high: '44',
                                weight: '44',
                                waist: '54',
                                round: 'XXL'
                            },
                            {
                                size: 'XXL',
                                high: '46',
                                weight: '46',
                                waist: '56',
                                round: 'XXXL'
                            }
                        ],
                        note_headers: {
                            size: 'Mã size',
                            high: 'Vòng ngực (cm)',
                            weight: 'Vòng eo (cm)',
                            waist: 'Dài áo (cm)'
                        },
                        notes: [
                            {
                                size: 'XS',
                                high: '73-83',
                                weight: '[Số đo]',
                                waist: '70'
                            },
                            {
                                size: 'S',
                                high: '84-88',
                                weight: '[Số đo]',
                                waist: '71'
                            },
                            {
                                size: 'M',
                                high: '89-95',
                                weight: '[Số đo]',
                                waist: '72'
                            },
                            {
                                size: 'L',
                                high: '96-103',
                                weight: '[Số đo]',
                                waist: '72'
                            },
                            {
                                size: 'XL',
                                high: '104-111',
                                weight: '[Số đo]',
                                waist: '72'
                            },
                            {
                                size: 'XXL',
                                high: '112-120',
                                weight: '[Số đo]',
                                waist: '72'
                            }
                        ]
                    },
                    {
                        sub: 'Quần',
                        image: 'https://www.lotte.vn/media/wysiwyg/sizechart/AN_02.jpg',
                        size_headers: {
                            size: 'Internation',
                            high: 'US',
                            weight: 'UK',
                            waist: 'EU',
                            round: 'VN'
                        },
                        sizes: [
                            {
                                size: 'XXS',
                                high: '24',
                                weight: '24',
                                waist: '34',
                                round: 'XS/ 24'
                            },
                            {
                                size: 'XS',
                                high: '26',
                                weight: '26',
                                waist: '36',
                                round: 'S/ 26'
                            },
                            {
                                size: 'S',
                                high: '28',
                                weight: '28',
                                waist: '38',
                                round: 'M/ 28'
                            },
                            {
                                size: 'M',
                                high: '30',
                                weight: '30',
                                waist: '40',
                                round: 'L/ 30'
                            },
                            {
                                size: 'L',
                                high: '32',
                                weight: '32',
                                waist: '42',
                                round: 'XL/ 32'
                            },
                            {
                                size: 'XL',
                                high: '34',
                                weight: '34',
                                waist: '44',
                                round: 'XXL/ 34'
                            },
                            {
                                size: 'XXL',
                                high: '36',
                                weight: '36',
                                waist: '46',
                                round: 'XXXL/ 36'
                            }
                        ],
                        note_headers: {
                            size: 'Mã size',
                            high: 'Vòng eo (cm)',
                            weight: 'Vòng hông (cm)',
                            waist: 'Trong đùi (cm)'
                        },
                        notes: [
                            {
                                size: 'XS',
                                high: '72-75',
                                weight: '92',
                                waist: '98'
                            },
                            {
                                size: 'S',
                                high: '76-79',
                                weight: '96',
                                waist: '99'
                            },
                            {
                                size: 'M',
                                high: '80-83',
                                weight: '100',
                                waist: '100'
                            },
                            {
                                size: 'L',
                                high: '84-87',
                                weight: '104',
                                waist: '100'
                            },
                            {
                                size: 'XL',
                                high: '88-91',
                                weight: '108',
                                waist: '100'
                            },
                            {
                                size: 'XXL',
                                high: '92-95',
                                weight: '112',
                                waist: '102'
                            },
                            {
                                size: 'XXXL',
                                high: '96-99',
                                weight: '116',
                                waist: '102'
                            }
                        ]
                    },
                    {
                        sub: 'Giày',
                        image: 'https://www.lotte.vn/media/wysiwyg/sizechart/AN_03.jpg',
                        size_headers: {
                            size: 'US',
                            high: 'UK',
                            weight: 'EU',
                            waist: 'VN',
                            round: 'CHIỀU DÀI CHÂN (CM)'
                        },
                        sizes: [
                            {
                                size: '6',
                                high: '5',
                                weight: '38',
                                waist: '38',
                                round: '23.8 - 24.1'
                            },
                            {
                                size: '7',
                                high: '6.5',
                                weight: '39',
                                waist: '39',
                                round: '24.2 - 24.9'
                            },
                            {
                                size: '7.5',
                                high: '7',
                                weight: '40',
                                waist: '40',
                                round: '25.0 - 25.6'
                            },
                            {
                                size: '8',
                                high: '7.5',
                                weight: '41',
                                waist: '41',
                                round: '25.7 - 26.1'
                            },
                            {
                                size: '8.5',
                                high: '8',
                                weight: '42',
                                waist: '42',
                                round: '26.2 - 27.0'
                            },
                            {
                                size: '9.5',
                                high: '9',
                                weight: '43',
                                waist: '43',
                                round: '27.1 - 27.6'
                            },
                            {
                                size: '10.5',
                                high: '10',
                                weight: '44',
                                waist: '44',
                                round: '27.7 - 28.5'
                            },
                            {
                                size: '11',
                                high: '10.5',
                                weight: '45',
                                waist: '45',
                                round: '28.5 - 29.0'
                            }
                        ]
                    },
                    {
                        sub: 'Đồ lót',
                        image: 'https://www.lotte.vn/media/wysiwyg/sizechart/AN_04.jpg',
                        size_headers: {
                            size: 'Internation',
                            high: 'US',
                            weight: 'EU',
                            waist: 'Vòng hông (cm)'
                        },
                        sizes: [
                            {
                                size: 'XS',
                                high: '1',
                                weight: '36-38',
                                waist: '72-76'
                            }, {
                                size: 'S-M',
                                high: '2',
                                weight: '40-42',
                                waist: '80-84'
                            }, {
                                size: 'M-L',
                                high: '3',
                                weight: '40-46',
                                waist: '88-92'
                            }, {
                                size: 'L-XL',
                                high: '4',
                                weight: '48-50',
                                waist: '96-100'
                            }, {
                                size: 'XL',
                                high: '5',
                                weight: '52-54',
                                waist: '104-108'
                            }, {
                                size: 'XXL',
                                high: '6',
                                weight: '56-58',
                                waist: '12-116'
                            }
                        ]
                    }]
            },
            {
                cat: 'ĐỒ NỮ',
                children: [
                    {
                        sub: 'Đầm / Jumpsuit',
                        image: 'https://www.lotte.vn/media/wysiwyg/sizechart/QN_01.jpg',
                        size_headers: {
                            size: 'Internation',
                            high: 'US',
                            weight: 'UK',
                            waist: 'EU',
                            round: 'VN'
                        },
                        sizes: [
                            {
                                size: 'XXS',
                                high: '0',
                                weight: '4',
                                waist: '30',
                                round: 'XS'
                            }, {
                                size: 'XS',
                                high: '2',
                                weight: '6',
                                waist: '32',
                                round: 'S'
                            }, {
                                size: 'S',
                                high: '4',
                                weight: '6',
                                waist: '34',
                                round: 'M'
                            }, {
                                size: 'M',
                                high: '6',
                                weight: '10',
                                waist: '36',
                                round: 'L'
                            }, {
                                size: 'L',
                                high: '8',
                                weight: '12',
                                waist: '38',
                                round: 'XL'
                            }, {
                                size: 'XL',
                                high: '10',
                                weight: '14',
                                waist: '40',
                                round: 'XXL'
                            }
                        ],
                        note_headers: {
                            size: 'Mã size',
                            high: 'Vòng ngực (cm)',
                            weight: 'Vòng eo (cm)',
                            waist: 'Vòng hông'
                        },
                        notes: [
                            {
                                size: 'XXS',
                                high: '76',
                                weight: '64',
                                waist: '86'
                            },
                            {
                                size: 'XS',
                                high: '78',
                                weight: '66',
                                waist: '88'
                            },
                            {
                                size: 'S',
                                high: '82',
                                weight: '70',
                                waist: '90'
                            },
                            {
                                size: 'M',
                                high: '86',
                                weight: '74',
                                waist: '94'
                            },
                            {
                                size: 'L',
                                high: '90',
                                weight: '78',
                                waist: '98'
                            },
                            {
                                size: 'XL',
                                high: '94',
                                weight: '82',
                                waist: '100'
                            },
                        ]
                    },
                    {
                        sub: 'Váy',
                        image: 'https://www.lotte.vn/media/wysiwyg/sizechart/QN_02.jpg',
                        size_headers: {
                            size: 'Internation',
                            high: 'US',
                            weight: 'UK',
                            waist: 'EU',
                            round: 'VN'
                        },
                        sizes: [
                            {
                                size: 'XXS',
                                high: '0',
                                weight: '4',
                                waist: '30',
                                round: 'XS'
                            }, {
                                size: 'XS',
                                high: '2',
                                weight: '6',
                                waist: '32',
                                round: 'S'
                            }, {
                                size: 'S',
                                high: '4',
                                weight: '6',
                                waist: '34',
                                round: 'M'
                            }, {
                                size: 'M',
                                high: '6',
                                weight: '10',
                                waist: '36',
                                round: 'L'
                            }, {
                                size: 'L',
                                high: '8',
                                weight: '12',
                                waist: '38',
                                round: 'XL'
                            }, {
                                size: 'XL',
                                high: '10',
                                weight: '14',
                                waist: '40',
                                round: 'XXL'
                            }
                        ],
                        note_headers: {
                            size: 'Mã size',
                            high: 'Vòng eo (cm)',
                            weight: 'Chiều dài (cm)'
                        },
                        notes: [
                            {
                                size: 'XXS',
                                high: '64',
                                weight: '42'
                            },
                            {
                                size: 'XS',
                                high: '66',
                                weight: '44'
                            },
                            {
                                size: 'S',
                                high: '70',
                                weight: '46'
                            },
                            {
                                size: 'M',
                                high: '74',
                                weight: '48'
                            },
                            {
                                size: 'L',
                                high: '78',
                                weight: '50'
                            },
                            {
                                size: 'XL',
                                high: '82',
                                weight: '52'
                            },
                        ]
                    },
                    {
                        sub: 'Áo',
                        image: 'https://www.lotte.vn/media/wysiwyg/sizechart/QN_03.jpg',
                        size_headers: {
                            size: 'Internation',
                            high: 'US',
                            weight: 'UK',
                            waist: 'EU',
                            round: 'VN'
                        },
                        sizes: [
                            {
                                size: 'XXS',
                                high: '0',
                                weight: '4',
                                waist: '30',
                                round: 'XS /25'
                            }, {
                                size: 'XS',
                                high: '2',
                                weight: '6',
                                waist: '32',
                                round: 'S /26'
                            }, {
                                size: 'S',
                                high: '4',
                                weight: '6',
                                waist: '34',
                                round: 'M /27'
                            }, {
                                size: 'M',
                                high: '6',
                                weight: '10',
                                waist: '36',
                                round: 'L /28'
                            }, {
                                size: 'L',
                                high: '8',
                                weight: '12',
                                waist: '38',
                                round: 'XL /29'
                            }, {
                                size: 'XL',
                                high: '10',
                                weight: '14',
                                waist: '40',
                                round: 'XXL /30'
                            }
                        ],
                        note_headers: {
                            size: 'Mã size',
                            high: 'Vòng ngực (cm)',
                            weight: 'Vòng eo (cm)',
                            waist: 'Dài áo (cm)'
                        },
                        notes: [
                            {
                                size: 'XXS',
                                high: '76',
                                weight: '66',
                                waist: '54'
                            },
                            {
                                size: 'XS',
                                high: '78',
                                weight: '68',
                                waist: '56'
                            },
                            {
                                size: 'S',
                                high: '82',
                                weight: '70',
                                waist: '57'
                            },
                            {
                                size: 'M',
                                high: '86',
                                weight: '72',
                                waist: '58'
                            },
                            {
                                size: 'L',
                                high: '90',
                                weight: '74',
                                waist: '59'
                            },
                            {
                                size: 'XL',
                                high: '94',
                                weight: '76',
                                waist: '60'
                            },
                        ]
                    },
                    {
                        sub: 'Quần',
                        image: 'https://www.lotte.vn/media/wysiwyg/sizechart/QN_04.jpg',
                        size_headers: {
                            size: 'US',
                            high: 'UK',
                            weight: 'EU',
                            waist: 'VN',
                            round: 'Chiều dài chân (cm)'
                        },
                        sizes: [
                            {
                                size: '4',
                                high: '2',
                                weight: '34',
                                waist: '34',
                                round: '21.1 - 21.3'
                            }, {
                                size: '5',
                                high: '2.5',
                                weight: '35',
                                waist: '35',
                                round: '21.4 - 21.8'
                            }, {
                                size: '6',
                                high: '3.5',
                                weight: '36',
                                waist: '36',
                                round: '21.9 - 22.4'
                            }, {
                                size: '6.5',
                                high: '4',
                                weight: '37',
                                waist: '37',
                                round: '22.5 - 23.1'
                            }, {
                                size: '7.5',
                                high: '5',
                                weight: '38',
                                waist: '38',
                                round: '23.2 - 23.8'
                            }, {
                                size: '8.5',
                                high: '6',
                                weight: '39',
                                waist: '39',
                                round: '23.9 - 24.5'
                            }, {
                                size: '9',
                                high: '6.5',
                                weight: '40',
                                waist: '40',
                                round: '24.6 - 25.3'
                            }, {
                                size: '10',
                                high: '7.5',
                                weight: '41',
                                waist: '41',
                                round: '25.4 - 26.3'
                            }
                        ],
                        note_headers: {
                            size: 'Mã size',
                            high: 'Vòng ngực (cm)',
                            weight: 'Vòng hông (cm)',
                            waist: 'Trong đùi (cm)'
                        },
                        notes: [
                            {
                                size: 'XXS',
                                high: '60',
                                weight: '84',
                                waist: '86'
                            },
                            {
                                size: 'XS',
                                high: '66',
                                weight: '88',
                                waist: '88'
                            },
                            {
                                size: 'S',
                                high: '70',
                                weight: '90',
                                waist: '89'
                            },
                            {
                                size: 'M',
                                high: '74',
                                weight: '94',
                                waist: '90'
                            },
                            {
                                size: 'L',
                                high: '78',
                                weight: '98',
                                waist: '90'
                            },
                            {
                                size: 'XL',
                                high: '82',
                                weight: '100',
                                waist: '90'
                            },
                        ]
                    },
                    {
                        sub: 'Đồ bầu',
                        image: 'https://www.lotte.vn/media/wysiwyg/sizechart/QN_05.jpg',
                        size_headers: {
                            size: 'International',
                            high: 'US',
                            weight: 'UK',
                            waist: 'EU',
                            round: 'VN'
                        },
                        sizes: [
                            {
                                size: 'XXS',
                                high: '2',
                                weight: '6',
                                waist: '6',
                                round: 'XS'
                            }, {
                                size: 'XS',
                                high: '4',
                                weight: '8',
                                waist: '8',
                                round: 'S'
                            }, {
                                size: 'S',
                                high: '6',
                                weight: '10',
                                waist: '10',
                                round: 'M'
                            }, {
                                size: 'M',
                                high: '8',
                                weight: '12',
                                waist: '12',
                                round: 'L'
                            }, {
                                size: 'L',
                                high: '10',
                                weight: '14',
                                waist: '14',
                                round: 'XL'
                            }, {
                                size: 'XL',
                                high: '12',
                                weight: '16',
                                waist: '16',
                                round: '2XL'
                            }, {
                                size: '2XL',
                                high: '14',
                                weight: '18',
                                waist: '18',
                                round: '3XL'
                            }, {
                                size: '3XL',
                                high: '16',
                                weight: '20',
                                waist: '20',
                                round: '4XL'
                            }
                        ],
                        note_headers: {
                            size: 'Mã size',
                            high: 'Vòng ngực (cm)',
                            weight: 'Vòng eo (cm)',
                            waist: 'Vòng hông (cm)'
                        },
                        notes: [
                            {
                                size: 'XXS',
                                high: '81-85',
                                weight: '67-72',
                                waist: '85-90'
                            },
                            {
                                size: 'XS',
                                high: '86-90',
                                weight: '73-77',
                                waist: '91-95'
                            },
                            {
                                size: 'S',
                                high: '91-96',
                                weight: '78-83',
                                waist: '96-100'
                            },
                            {
                                size: 'M',
                                high: '97-102',
                                weight: '85-90',
                                waist: '101-106'
                            },
                            {
                                size: 'L',
                                high: '103-107',
                                weight: '91-96',
                                waist: '107-112'
                            },
                            {
                                size: 'XL',
                                high: '108-112',
                                weight: '97-102',
                                waist: '113-118'
                            },
                            {
                                size: '2XL',
                                high: '113-117',
                                weight: '103-108',
                                waist: '119-124'
                            },
                            {
                                size: '3XL',
                                high: '118-125',
                                weight: '109-115',
                                waist: '125-129'
                            },
                        ]
                    },
                    {
                        sub: 'Áo lót',
                        image: 'https://www.lotte.vn/media/wysiwyg/sizechart/QN_06.jpg',
                        size_headers: {
                            size: 'Cup',
                            high: 'EU',
                            weight: 'UK/US/VN',
                            waist: 'Vòng dưới ngực (cm)',
                            round: 'Vòng ngực (cm)'
                        },
                        sizes: [
                            {
                                size: 'A',
                                high: 'A65 - A70',
                                weight: '32',
                                waist: '60 - 70',
                                round: '75 - 80'
                            },
                            {
                                size: 'A',
                                high: 'A75',
                                weight: '34',
                                waist: '71 - 75',
                                round: '81 - 85'
                            },
                            {
                                size: 'A',
                                high: 'A80',
                                weight: '36',
                                waist: '76 - 80',
                                round: '86 - 90'
                            },
                            {
                                size: 'A',
                                high: 'A85',
                                weight: '38',
                                waist: '81 - 85',
                                round: '91 - 95'
                            },
                            {
                                size: 'A',
                                high: 'A90',
                                weight: '40',
                                waist: '86 - 90',
                                round: '96 - 100'
                            },
                            {
                                size: 'B',
                                high: 'B65 - B70',
                                weight: '32',
                                waist: '60 - 70',
                                round: '78 - 83'
                            },
                            {
                                size: 'B',
                                high: 'B75',
                                weight: '34',
                                waist: '71 - 75',
                                round: '84 - 88'
                            },
                            {
                                size: 'B',
                                high: 'B80',
                                weight: '36',
                                waist: '76 - 80',
                                round: '89 - 93'
                            },
                            {
                                size: 'B',
                                high: 'B85',
                                weight: '38',
                                waist: '81 - 85',
                                round: '94 - 98'
                            },
                            {
                                size: 'B',
                                high: 'B90',
                                weight: '40',
                                waist: '86 - 90',
                                round: '99 - 103'
                            },
                            {
                                size: 'C',
                                high: 'C65 - C70',
                                weight: '32',
                                waist: '60 - 70',
                                round: '80 - 85'
                            },
                            {
                                size: 'C',
                                high: 'C75',
                                weight: '34',
                                waist: '71 - 75',
                                round: '86 - 90'
                            },
                            {
                                size: 'C',
                                high: 'C80',
                                weight: '36',
                                waist: '76 - 80',
                                round: '91 - 95'
                            },
                            {
                                size: 'C',
                                high: 'C85',
                                weight: '38',
                                waist: '81 - 85',
                                round: '96 - 100'
                            },
                            {
                                size: 'C',
                                high: 'C90',
                                weight: '40',
                                waist: '86 - 90',
                                round: '101 - 105'
                            },
                            {
                                size: 'D',
                                high: 'D65 - D70',
                                weight: '32',
                                waist: '60 - 70',
                                round: '82 - 87'
                            },
                            {
                                size: 'D',
                                high: 'D75',
                                weight: '34',
                                waist: '71 - 75',
                                round: '88 - 92'
                            },
                            {
                                size: 'D',
                                high: 'D85',
                                weight: '38',
                                waist: '81 - 85',
                                round: '98 - 102'
                            },
                            {
                                size: 'D',
                                high: 'D90',
                                weight: '40',
                                waist: '86 - 90',
                                round: '103 - 107'
                            }
                        ]
                    },
                    {
                        sub: 'Quần lót',
                        image: 'https://www.lotte.vn/media/wysiwyg/sizechart/QN_07.jpg',
                        size_headers: {
                            size: 'International',
                            high: 'US',
                            weight: 'UK',
                            waist: 'EU',
                            round: 'Vòng mông / vòng eo (cm)'
                        },
                        sizes: [
                            {
                                size: 'XS',
                                high: '2',
                                weight: '6',
                                waist: '34',
                                round: '80 - 88/60 - 65'
                            },
                            {
                                size: 'S',
                                high: '4',
                                weight: '8',
                                waist: '36',
                                round: '88 - 93/66 - 70'
                            },
                            {
                                size: 'M',
                                high: '6',
                                weight: '10',
                                waist: '38',
                                round: '93 - 102/71 -74'
                            },
                            {
                                size: 'L',
                                high: '8',
                                weight: '12',
                                waist: '40',
                                round: '99 - 105/75 - 79'
                            },
                            {
                                size: 'XL',
                                high: '10',
                                weight: '14',
                                waist: '42',
                                round: '101 - 110/81 - 84'
                            },
                        ]
                    }
                ]
            }, {
                cat: 'Đồ trẻ em',
                children: [
                    {
                        sub: 'Quần áo trẻ em',
                        image: 'https://www.lotte.vn/media/wysiwyg/sizechart/TE_01.jpg',
                        size_headers: {
                            size: 'UK (year)',
                            high: 'US (year)',
                            weight: 'EU (cm)',
                            waist: 'Vietnam (cm)'
                        },
                        sizes: [
                            {
                                size: '6 tháng',
                                high: '6 tháng',
                                weight: '60-66',
                                waist: '65'
                            },
                            {
                                size: '9 tháng',
                                high: '9 tháng',
                                weight: '68-71',
                                waist: '70'
                            },
                            {
                                size: '12 tháng',
                                high: '12 tháng',
                                weight: '73-76',
                                waist: '80'
                            },
                            {
                                size: '24 tháng',
                                high: '24 tháng',
                                weight: '83-89',
                                waist: '90'
                            },
                            {
                                size: '2~3',
                                high: '2~3',
                                weight: '86-92',
                                waist: '95'
                            },
                            {
                                size: '4~5',
                                high: '4',
                                weight: '98-104',
                                waist: '100'
                            },
                            {
                                size: '6~7',
                                high: '5~6',
                                weight: '110-116',
                                waist: '110'
                            },
                            {
                                size: '8~9',
                                high: '7~8',
                                weight: '122-128',
                                waist: '120'
                            },
                            {
                                size: '10~11',
                                high: '9~10',
                                weight: '134-140',
                                waist: '130'
                            },
                            {
                                size: '12',
                                high: '11~12',
                                weight: '146-152',
                                waist: '140'
                            },
                        ]
                    },
                ]
            }, {
                cat: 'Phụ kiện',
                children: [
                    {
                        sub: 'Túi xách',
                        image: 'https://www.lotte.vn/media/wysiwyg/sizechart/AC_01.jpg',
                        size_headers: {
                            size: 'Chiều dài dây (cm)',
                            high: 'Chiều cao túi (cm)',
                            weight: 'Chiều rộng túi (cm)'
                        },
                        sizes: [
                            {
                                size: '33',
                                high: '24',
                                weight: '14'
                            },
                            {
                                size: '30',
                                high: '24',
                                weight: '12'
                            },
                            {
                                size: '28',
                                high: '22',
                                weight: '10'
                            },
                            {
                                size: '26',
                                high: '21',
                                weight: '10'
                            },
                        ]
                    },
                    {
                        sub: 'Nón',
                        image: 'https://www.lotte.vn/media/wysiwyg/sizechart/AC_02.jpg',
                        size_headers: {
                            size: 'Vòng đầu (cm)'
                        },
                        sizes: [
                            {
                                size: '33',
                            },
                            {
                                size: '30',
                            },
                            {
                                size: '28',
                            },
                            {
                                size: '26',
                            }
                        ]
                    },
                    {
                        sub: 'Đồng hồ',
                        image: 'https://www.lotte.vn/media/wysiwyg/sizechart/AC_03.jpg',
                        size_headers: {
                            size: 'Độ rộng dây (cm)',
                            high: 'Đường kính mặt (cm)'
                        },
                        sizes: [
                            {
                                size: '2',
                                high: '25'
                            },
                            {
                                size: '1.5',
                                high: '15'
                            },
                            {
                                size: '1.5',
                                high: '30'
                            },
                            {
                                size: '2',
                                high: '35'
                            }
                        ]
                    },
                ]
            }
        ];
    }
}
