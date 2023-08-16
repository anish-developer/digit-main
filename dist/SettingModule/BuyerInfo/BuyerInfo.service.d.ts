import { Model } from 'mongoose';
import { BuyerInfoDTO } from 'src/SettingModule/BuyerInfo/dto/BuyerInfo.dto';
import { Buyer } from 'src/SellerModule/interfaces/buyer.interface';
export declare class BuyerInfoService {
    private readonly buyerModel;
    constructor(buyerModel: Model<Buyer>);
    addCardDetails(res: any, buyerDTO: BuyerInfoDTO): Promise<any>;
    updateCardDetails(res: any, card_id: any, buyerDTO: BuyerInfoDTO): Promise<Buyer>;
    deleteCardDetails(res: any, card_id: any): Promise<any>;
    buyingInfoDetails(res: any, card_id: any): Promise<Buyer[]>;
    buyingInfo(res: any, user_id: any): Promise<Buyer>;
}
