/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ShippingSchema } from 'src/SellerModule/models/shipping.schema';
import { ShippingInfoController } from 'src/SettingModule/ShippingInfo/ShippingInfo.controller';
import { ShippingInfoService } from 'src/SettingModule/ShippingInfo/ShippingInfo.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Shipping', schema: ShippingSchema }]),
  ],
  providers: [ShippingInfoService],
  controllers: [ShippingInfoController],
  exports: [],
})
export class ShippingInfoModule {}
