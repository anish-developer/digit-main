import { PayoutInfoService } from 'src/SettingModule/PayoutInfo/PayoutInfo.service';
import { PayoutInfoDTO } from './dto/PayoutInfo.dto';
export declare class PayoutInfoController {
    private PayoutInfoService;
    constructor(PayoutInfoService: PayoutInfoService);
    createBankDetails(res: any, payoutDTO: PayoutInfoDTO): Promise<void>;
    updateBankDetails(res: any, payout_id: any, payoutDTO: PayoutInfoDTO): Promise<void>;
    deleteBankDetails(res: any, payout_id: any): Promise<void>;
    payoutInfoDetails(res: any, payout_id: any): Promise<import("../../SellerModule/interfaces/payout.interface").Payout[]>;
    getPayment(res: any, user_id: any): Promise<void>;
}
