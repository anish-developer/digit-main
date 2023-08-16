import { BuyerInfoService } from 'src/SettingModule/BuyerInfo/BuyerInfo.service';
import { BuyerInfoDTO } from './dto/BuyerInfo.dto';
export declare class BuyerInfoController {
    private BuyerInfoService;
    constructor(BuyerInfoService: BuyerInfoService);
    addCardDetails(res: any, buyerDTO: BuyerInfoDTO): Promise<void>;
    updateCardDetails(res: any, card_id: any, buyerDTO: BuyerInfoDTO): Promise<void>;
    deleteCardDetails(res: any, card_id: any): Promise<void>;
    buyingInfoDetails(res: any, card_id: any): Promise<import("../../SellerModule/interfaces/buyer.interface").Buyer[]>;
    getPayment(res: any, user_id: any): Promise<void>;
}
