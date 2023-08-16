import { PaymentManagementService } from 'src/SellerModule/paymentManagement/paymentManagement.service';
import { PaymentManagementDTO } from 'src/SellerModule/paymentManagement/paymentManagement.dto';
export declare class PaymentManagementController {
    private paymentManagementService;
    constructor(paymentManagementService: PaymentManagementService);
    getPayment(res: any, user_id: any): Promise<void>;
    editPayment(res: any, paymentManagementDTO: PaymentManagementDTO): Promise<void>;
}
