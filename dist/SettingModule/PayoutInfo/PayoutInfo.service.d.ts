import { Model } from 'mongoose';
import { Payout } from 'src/SellerModule/interfaces/payout.interface';
import { PayoutInfoDTO } from './dto/PayoutInfo.dto';
export declare class PayoutInfoService {
    private readonly payoutModel;
    constructor(payoutModel: Model<Payout>);
    createBankDetails(res: any, payoutDTO: PayoutInfoDTO): Promise<Payout>;
    updateBankDetails(res: any, payout_id: any, payoutDTO: PayoutInfoDTO): Promise<Payout>;
    deleteBankDetails(res: any, payout_id: any): Promise<any>;
    payoutInfoDetails(res: any, payout_id: any): Promise<Payout[]>;
    payoutInfo(res: any, user_id: any): Promise<Payout>;
}
