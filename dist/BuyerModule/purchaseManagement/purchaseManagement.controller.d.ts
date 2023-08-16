import { PurchaseManagementService } from 'src/BuyerModule/purchaseManagement/purchaseManagement.service';
import { PurchaseManagementDTO } from 'src/BuyerModule/purchaseManagement/purchaseManagement.dto';
export declare class PurchaseManagementController {
    private purchaseManagementService;
    constructor(purchaseManagementService: PurchaseManagementService);
    getPurchase(res: any, plate_id: any): Promise<void>;
    addPayment(res: any, purchaseManagementDTO: PurchaseManagementDTO): Promise<void>;
    addBidPayment(res: any, purchaseManagementDTO: PurchaseManagementDTO): Promise<void>;
    remainingPaymenttt(res: any, purchaseManagementDTO: PurchaseManagementDTO): Promise<void>;
    addPurchase(res: any, purchaseManagementDTO: PurchaseManagementDTO): Promise<void>;
    addBidPurchase(res: any, purchaseManagementDTO: PurchaseManagementDTO): Promise<void>;
    getBuyerProfileData(res: any, user_id: any): Promise<void>;
    editPurchase(res: any, orderID: any, purchaseManagementDTO: PurchaseManagementDTO): Promise<void>;
    getPurchasedPlate(res: any, user_id: any, plate_id: any): Promise<void>;
    deletePurchases(res: any, orderID: any): Promise<void>;
    getsinglePurchases(res: any, plate_id: any): Promise<void>;
}
