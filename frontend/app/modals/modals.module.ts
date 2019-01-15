import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SlimScrollModule } from 'ng2-slimscroll';

import { AddressBookModal } from './addressbook/addressbook';
import { CancelOrderModal } from './cancel-order/cancel-order';
import { ConfirmModal } from './confirm/confirm';
import { CvvGuideModal } from './cvvguide/cvvguide';
import { DeliveryAreaModal } from './delivery-area/delivery-area';
import { FreeshippingAreaModal } from './freeshipping-area/freeshipping-area';
import { ForgotPasswordModal } from './forgot-password/forgot-password';
import { IsMilkModal } from './ismilk/ismilk';
import { IsSupplementModal } from './issupplement/issupplement';
import { IsBeerModal } from './isbeer/isbeer';
import { LoginModal } from './login/login';
import { RegisterSuccessModal } from './login/success/success';
import { OutOfStockModal } from './outofstock/outofstock';
import { ProductVideoModal } from './product-video/product-video';
import { ReviewRulesModal } from './review-rules/review-rules';
import { ReviewSuccessModal } from './review-success/review-success';
import { ProductSizeModal } from './size/size';
import {FSQuickViewModal} from "./quick-view/quick-view";
import { WishlistModal } from "./wishlist/wishlist";
import { ShareCartModal } from "./sharecart/sharecart";
import {ProductSizeChartModal} from "./sizechart/sizechart";
import {FSDeliveryAreaModal} from "./delivery-area-fs/delivery-area";
import {FSFreeshippingAreaModal} from "./freeshipping-area-fs/freeshipping-area";
import {CommentModal} from "./comment/comment";
import {LotteriaConfigAddcartModal} from "./lotteria-config-addcart/lotteria-config-addcart";
import {AppPipesModule} from "../pipes/pipes.module";
import {LotteriaNotifyModal} from "./lotteria-notify/lotteria-notify";


import{Bigbangv2LoginModal} from "./game/bigbangv2/login/login";
import{BigbangV2RuleModal} from "./game/bigbangv2/rule/rule";
import{BigbangV2ResultModal} from "./game/bigbangv2/result/result";
import{BigbangV2ShareFBModal} from "./game/bigbangv2/shareFB/shareFB";
import{BigbangV2HistoryModal} from "./game/bigbangv2/history/history";
import {OvertimeExpressModal} from "./overtime-express/overtime-express";
import {RMAExpressModal} from "./rma-express/rma-express";
import {ExpressDeliveryAreaModal} from "./express-delivery-area/delivery-area";
import{PigV1LoginModal} from "./game/pigv1/login/login";
import{PigV1RuleModal} from "./game/pigv1/rule/rule";
import{PigV1ResultModal} from "./game/pigv1/result/result";
import{PigV1ShareFBModal} from "./game/pigv1/shareFB/shareFB";
import{PigV1HistoryModal} from "./game/pigv1/history/history";
import{PigV1LpointMemberModal} from "./game/pigv1/lpoint/member/member";
import{PigV1LpointInfoModal} from "./game/pigv1/lpoint/info/info";
import {EVoucherAreaModal} from "./e-voucher-area/evoucher-area";
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SlimScrollModule,
        AppPipesModule
    ],
    declarations: [
        LoginModal,
        RegisterSuccessModal,
        ConfirmModal,
        ProductSizeModal,
        AddressBookModal,
        OutOfStockModal,
        CvvGuideModal,
        IsMilkModal,
        IsSupplementModal,
        IsBeerModal,
        ReviewRulesModal,
        ReviewSuccessModal,
        CancelOrderModal,
        ForgotPasswordModal,
        ProductVideoModal,
        DeliveryAreaModal,
        FSDeliveryAreaModal,
        FreeshippingAreaModal,
        FSFreeshippingAreaModal,
        FSQuickViewModal,
        WishlistModal,
        ShareCartModal,
        CommentModal,
        ProductSizeChartModal,

        Bigbangv2LoginModal,
        BigbangV2RuleModal,
        BigbangV2ResultModal,
        BigbangV2ShareFBModal,
        BigbangV2HistoryModal,
        LotteriaConfigAddcartModal,
        LotteriaNotifyModal,
        OvertimeExpressModal,
        RMAExpressModal,
        ExpressDeliveryAreaModal,
        PigV1LoginModal,
        PigV1RuleModal,
        PigV1ResultModal,
        PigV1ShareFBModal,
        PigV1HistoryModal,
        PigV1LpointMemberModal,
        PigV1LpointInfoModal,
        EVoucherAreaModal
    ],
    entryComponents: [
        LoginModal,
        RegisterSuccessModal,
        ConfirmModal,
        ProductSizeModal,
        AddressBookModal,
        OutOfStockModal,
        CvvGuideModal,
        IsMilkModal,
        IsSupplementModal,
        IsBeerModal,
        ReviewRulesModal,
        ReviewSuccessModal,
        CancelOrderModal,
        ForgotPasswordModal,
        ProductVideoModal,
        DeliveryAreaModal,
        FSDeliveryAreaModal,
        FreeshippingAreaModal,
        FSFreeshippingAreaModal,
        FSQuickViewModal,
        WishlistModal,
        ShareCartModal,
        CommentModal,
        ProductSizeChartModal,

        Bigbangv2LoginModal,
        BigbangV2RuleModal,
        BigbangV2ResultModal,
        BigbangV2ShareFBModal,
        BigbangV2HistoryModal,
        LotteriaConfigAddcartModal,
        LotteriaNotifyModal,
        OvertimeExpressModal,
        RMAExpressModal,
        ExpressDeliveryAreaModal,
        PigV1LoginModal,
        PigV1RuleModal,
        PigV1ResultModal,
        PigV1ShareFBModal,
        PigV1HistoryModal,
        PigV1LpointMemberModal,
        PigV1LpointInfoModal,
        EVoucherAreaModal
    ],
    exports: [
    ]
})
export class AppModalsModule { }
