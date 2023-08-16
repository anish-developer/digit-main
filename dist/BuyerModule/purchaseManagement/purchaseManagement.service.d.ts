import { Model } from 'mongoose';
import { Purchase } from 'src/BuyerModule/interface/prchase.interface';
import { Order } from 'src/BuyerModule/interface/orderDetails.interface';
import { Plate } from 'src/SellerModule/interfaces/plate.interface';
import { PurchaseManagementDTO } from 'src/BuyerModule/purchaseManagement/purchaseManagement.dto';
export declare class PurchaseManagementService {
    private readonly purchaseModel;
    private readonly orderModel;
    private readonly plateModel;
    constructor(purchaseModel: Model<Purchase>, orderModel: Model<Order>, plateModel: Model<Plate>);
    getPurchase(res: any, plate_id: any): Promise<Purchase>;
    addPayment(res: any, purchaseManagementDTO: PurchaseManagementDTO): Promise<any>;
    addBidPayment(res: any, purchaseManagementDTO: PurchaseManagementDTO): Promise<any>;
    remainingPayment(res: any, purchaseManagementDTO: PurchaseManagementDTO): Promise<any>;
    addPurchase(res: any, purchaseManagementDTO: PurchaseManagementDTO): Promise<Purchase>;
    addBidPurchase(res: any, purchaseManagementDTO: PurchaseManagementDTO): Promise<Purchase>;
    getBuyerProfileData(res: any, user_id: any): Promise<any>;
    editPurchase(res: any, orderID: any, purchaseManagementDTO: PurchaseManagementDTO): Promise<Purchase>;
    getPurchasedPlate(res: any, user_id: any, plate_id: any): Promise<any>;
    deletePurchases(res: any, orderID: any): Promise<Purchase>;
    getsinglePurchases(res: any, plate_id: any): Promise<Purchase>;
}
