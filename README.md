# LOTTE.VN

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.2.6.

## Install dependencies

Run `npm install` to install all packages and dependencies.

## Development server

We need to update the latest css file in global.service.ts / addTempstyles in order to run the project in localhost with latest css.

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `npm run build-shop` to build the project for production. The build artifacts will be stored in the `dist/` directory. 

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Main branches
- **production-checkout** : Phase 1 final production build.
- **developer-phase2**: Phase 2 final production build.
- **developer-fashion**: Phase 1 FASHION-UI lastest codes.

## Pipes
- DiscountPercentagePipe: Calculate discount percentage between final_price and origin_price.
- FilterAttributePipe: Get attribute of products.
- SafeHtmlPipe: Bypass trust html resource (using DomSantinizer).
- OrderTransformerPipe: Calculate *is_in_stock* in checkout cart products.
- SelectedFacetsPipe: Pre-format selected facets in product list.
- ToJsonPipe: Convert string to JSON format. 

## Directives
- EqualValidatorDirective: Validate password equals to confirm_password 
- RunScriptsDirective: Re-run all *script* tags in html

## Transformers
- AddressTransformer: Pre-format the address data model.
- PaymentMethodTransformer: Pre-format payment method model.
- ShippingAddressTransformer: Pre-format the shipping address model.
- UserInfoTransformer: Pre-format the user info model.


## About NgRx/Store
- Git repository: https://github.com/ngrx/store
- Reference docs: 
    + ngRx/store quick start: https://angularfirebase.com/lessons/angular-ngrx-redux-starter-guide/
    + ngrx/Store documentation: https://gist.github.com/btroncone/a6e4347326749f938510
    + NgRx: Patterns and Techniques: https://blog.nrwl.io/ngrx-patterns-and-techniques-f46126e2b1e5

## Directory Structure

```
├───.vscode
├───dist                                            <-- Build folder
│   └───build
│       └───assets
│           ├───i18n
│           ├───images
│           │   └───payments
│           └───less
└───frontend                                        <-- Our app folder
    ├───app
    │   ├───components
    │   │   ├───account                             <-- Components which are used for account page
    │   │   │   └───l-point
    │   │   ├───breadcumb
    │   │   ├───category                            <-- Components which are used for category/brand/seller page
    │   │   │   ├───banner
    │   │   │   ├───products
    │   │   │   │   ├───list
    │   │   │   │   └───pagination
    │   │   │   └───sidebar
    │   │   │       ├───filter
    │   │   │       └───tree
    │   │   ├───checkout                            <-- Components which are used for checkout page
    │   │   │   ├───cart
    │   │   │   ├───failure
    │   │   │   ├───noitem
    │   │   │   ├───payment
    │   │   │   │   ├───atm
    │   │   │   │   ├───card
    │   │   │   │   ├───cash
    │   │   │   │   ├───credit-card
    │   │   │   │   └───installment
    │   │   │   ├───shipping
    │   │   │   │   └───address-form
    │   │   │   ├───sidebar
    │   │   │   └───success
    │   │   ├───home                                <-- Components which are used for home page
    │   │   │   ├───countdown
    │   │   │   └───fashion
    │   │   │       ├───brands
    │   │   │       ├───deal-zone
    │   │   │       ├───highlight-cates
    │   │   │       ├───highlight-products
    │   │   │       ├───main-slider
    │   │   │       └───trending
    │   │   ├───product                             <-- Components which are used for product page
    │   │   │   ├───detail
    │   │   │   ├───gallery
    │   │   │   ├───info
    │   │   │   └───related
    │   │   ├───promotion                           <-- sticky left promotions
    │   │   ├───recent-products                     <-- Recent products
    │   │   ├───search                              <-- Components which are used for search page
    │   │   │   └───noresults
    │   │   └───tpo                                 <-- Components which are used for tpo page
    │   │       ├───cms-block
    │   │       ├───detail-page
    │   │       │   └───top
    │   │       │       ├───top-banner
    │   │       │       └───top-desc
    │   │       ├───product
    │   │       │   ├───alsolike
    │   │       │   ├───detail
    │   │       │   └───info
    │   │       ├───products
    │   │       │   ├───filter
    │   │       │   ├───list
    │   │       │   ├───tpo-dashboard-products
    │   │       │   └───tpo-detail-products
    │   │       └───tpo-group
    │   │           └───tpo-item
    │   ├───directives                              <-- Folder contains all directives
    │   ├───extensions                              <-- Folder contains all extensions (such as stringExtension...)
    │   ├───layout                                  <-- App layouts
    │   │   ├───404
    │   │   ├───content
    │   │   ├───footer
    │   │   ├───header
    │   │   │   └───search
    │   │   └───loader
    │   ├───libs                                    <-- 3rd parties library
    │   │   └───angular4-social-login
    │   │       ├───entities
    │   │       └───providers
    │   ├───modals                                  <-- Contains all modals         
    │   │   ├───addressbook
    │   │   ├───cancel-order
    │   │   ├───confirm
    │   │   ├───cvvguide
    │   │   ├───delivery-area
    │   │   ├───forgot-password
    │   │   ├───ismilk
    │   │   ├───login
    │   │   │   └───success
    │   │   ├───outofstock
    │   │   ├───product-video
    │   │   ├───review-rules
    │   │   ├───review-success
    │   │   └───size
    │   ├───modules                                 <-- Project main modules
    │   │   ├───account
    │   │   │   ├───address
    │   │   │   │   ├───edit
    │   │   │   │   └───new
    │   │   │   ├───comment
    │   │   │   │   └───detail
    │   │   │   ├───edit
    │   │   │   ├───info
    │   │   │   ├───l-point
    │   │   │   ├───login
    │   │   │   ├───logout-success
    │   │   │   ├───myqa
    │   │   │   ├───myseller-rating
    │   │   │   ├───orders
    │   │   │   │   ├───detail
    │   │   │   │   └───tracking
    │   │   │   ├───payment-method
    │   │   │   ├───pending-seller
    │   │   │   ├───resetpassword
    │   │   │   │   └───success
    │   │   │   ├───subscribe
    │   │   │   └───wishlist
    │   │   │       └───share
    │   │   ├───brand
    │   │   ├───campaign
    │   │   ├───category
    │   │   ├───checkout
    │   │   ├───home
    │   │   ├───order-tracking
    │   │   ├───product
    │   │   ├───promotions
    │   │   ├───search
    │   │   ├───seller
    │   │   ├───shared-wishlist
    │   │   └───tpo
    │   │       ├───dashboard-page
    │   │       └───detail-page
    │   ├───pipes                                   <-- Contains all pipes  
    │   ├───services                                <-- Contains all global services/http services
    │   ├───store                                   <-- Using https://github.com/ngrx/store to manage application state in only one store.
    │   │   ├───account
    │   │   ├───auth
    │   │   ├───campaign
    │   │   ├───categories
    │   │   ├───checkout
    │   │   ├───common
    │   │   ├───home
    │   │   ├───products
    │   │   └───tpo
    │   └───transformers                            <-- Contains all transformers 
    ├───assets                                      <-- Project assets
    │   ├───i18n
    │   ├───images
    │   │   └───payments
    │   └───less
    └───environments

```


update: 20/08/2019

    - Set "--extractCss=true" to build command

        --extractCss=true|false	
        Extract css from global styles into css files instead of js ones.

        Default: false
