/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentSchema } from '../models/payment.schema';
import { PaymentManagementController } from 'src/SellerModule/paymentManagement/paymentManagement.controller';
import { PaymentManagementService } from 'src/SellerModule/paymentManagement/paymentManagement.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Payment', schema: PaymentSchema }]),
  ],
  providers: [PaymentManagementService],
  controllers: [PaymentManagementController],
  exports: [],
})
export class PaymentModule {}
