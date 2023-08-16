import { Model } from 'mongoose';
import { Payment } from 'src/SellerModule/interfaces/payment.interface';
import { PaymentManagementDTO } from 'src/SellerModule/paymentManagement/paymentManagement.dto';
export declare class PaymentManagementService {
    private readonly paymentModel;
    constructor(paymentModel: Model<Payment>);
    getPayment(res: any, user_id: any): Promise<Payment>;
    editPayment(res: any, paymentManagementDTO: PaymentManagementDTO): Promise<Payment>;
}
