import { Model } from 'mongoose';
import { User } from 'src/SellerModule/interfaces/user.interface';
import { Plate } from 'src/SellerModule/interfaces/plate.interface';
import { Purchase } from 'src/BuyerModule/interface/prchase.interface';
export declare class DashboardBannerService {
    readonly userModel: Model<User>;
    private readonly plateModel;
    private readonly purchaseModel;
    constructor(userModel: Model<User>, plateModel: Model<Plate>, purchaseModel: Model<Purchase>);
    getAllUser(): Promise<User[]>;
    getAllPlate(): Promise<Plate[]>;
    getPlateCount(options: any): Promise<number>;
    getSoldCount(options: any): Promise<number>;
    getallusercount(options: any): Promise<number>;
    grossvalue(): Promise<number>;
}
