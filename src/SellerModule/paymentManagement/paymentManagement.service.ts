import { Injectable, Res } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Payment } from 'src/SellerModule/interfaces/payment.interface';
import { PaymentManagementDTO } from 'src/SellerModule/paymentManagement/paymentManagement.dto';
import { CommonMethods } from 'src/utilities/common-methods';

@Injectable()
export class PaymentManagementService {
  constructor(
    @InjectModel('Payment') private readonly paymentModel: Model<Payment>,
  ) {}

  // Get payment by userId\
  async getPayment(@Res() res, user_id): Promise<Payment> {
    const payment = await this.paymentModel.findOne({ user_id }).exec();
    if (payment) {
      return CommonMethods.success(res, 'Success', payment);
    } else {
      return CommonMethods.error(res, 'Payment does not exists');
    }
  }

  async editPayment(
    @Res() res,
    paymentManagementDTO: PaymentManagementDTO,
  ): Promise<Payment> {
    const { user_id } = paymentManagementDTO;
    const payment = await this.paymentModel.findOne({ user_id });

    if (!payment) {
      const newPayment = await new this.paymentModel(
        paymentManagementDTO,
      ).save();

      return CommonMethods.success(
        res,
        'Payment details added successfully',
        newPayment,
      );
    } else {
      const editPayment = await this.paymentModel.findOneAndUpdate(
        { user_id },
        paymentManagementDTO,
        { new: true },
      );

      if (editPayment) {
        return CommonMethods.success(
          res,
          'Payment details edited successfully',
          editPayment,
        );
      } else {
        return CommonMethods.error(res, 'No Payment details present');
      }
    }
  }
}
