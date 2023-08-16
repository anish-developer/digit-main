/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PurchaseSchema } from '../models/purchase.schema';
import { OrderSchema } from 'src/BuyerModule/models/orderDetails.schema';
import { PlateSchema } from 'src/SellerModule/models/plate.schema';
import { PurchaseManagementController } from 'src/BuyerModule/purchaseManagement/purchaseManagement.controller';
import { PurchaseManagementService } from 'src/BuyerModule/purchaseManagement/purchaseManagement.service';
import { SendGridService } from 'src/sendgrid/sendgrid.service';
import { ConfigService } from '@nestjs/config';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Purchase', schema: PurchaseSchema }]),
    MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]),
    MongooseModule.forFeature([{ name: 'Plate', schema: PlateSchema }]),
  ],
  providers: [PurchaseManagementService, SendGridService, ConfigService],
  controllers: [PurchaseManagementController],
  exports: [],
})
export class PurchaseModule {}
