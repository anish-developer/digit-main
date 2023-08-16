import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlateSchema } from '../models/plate.schema';
import { PurchaseSchema } from 'src/BuyerModule/models/purchase.schema';
import { SessionSchema } from 'src/BuyerModule/models/session.schema';
import { OrderSchema } from 'src/SellerModule/models/orderDetails.schema';
import { UserSchema } from 'src/SellerModule/models/user.schema';
import { PlateManagementController } from 'src/SellerModule/plateManagement/plateManagement.controller';
import { PlateManagementService } from 'src/SellerModule/plateManagement/plateMangement.service';
import { SendGridService } from 'src/sendgrid/sendgrid.service';
import { ConfigService } from '@nestjs/config';
import { SchedulerService } from 'src/scheduler/scheduler.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Plate', schema: PlateSchema }]),
    MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]),
    MongooseModule.forFeature([{ name: 'Purchase', schema: PurchaseSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Session', schema: SessionSchema }]),
  ],
  providers: [
    PlateManagementService,
    SendGridService,
    ConfigService,
    SchedulerService,
  ],
  controllers: [PlateManagementController],
  exports: [],
})
export class PlateModule {}
