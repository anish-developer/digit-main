import { Model } from 'mongoose';
import { Purchase } from 'src/BuyerModule/interface/prchase.interface';
import { User } from 'src/SellerModule/interfaces/user.interface';
import { Plate } from '../interfaces/plate.interface';
export declare class PortfolioManagementService {
    private readonly userModel;
    private readonly purchaseModel;
    private readonly plateModel;
    constructor(userModel: Model<User>, purchaseModel: Model<Purchase>, plateModel: Model<Plate>);
    plateCountRanking(res: any, user_id: any): Promise<any>;
}
