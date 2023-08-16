/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../models/user.schema';
import { PlateSchema } from '../models/plate.schema';
import { PurchaseSchema } from 'src/BuyerModule/models/purchase.schema';
import { DashboardBannerController } from 'src/SellerModule/dashboardBanner/dashboardBanner.controller';
import { DashboardBannerService } from 'src/SellerModule/dashboardBanner/dashboardBanner.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Plate', schema: PlateSchema }]),
    MongooseModule.forFeature([{ name: 'Purchase', schema: PurchaseSchema }]),
  ],
  providers: [DashboardBannerService],
  controllers: [DashboardBannerController],
  exports: [],
})
export class DashboardModule {}
