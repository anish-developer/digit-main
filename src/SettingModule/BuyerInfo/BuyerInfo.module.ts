/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BuyerSchema } from 'src/SellerModule/models/buyer.schema';
import { BuyerInfoController } from 'src/SettingModule/BuyerInfo/BuyerInfo.contoller';
import { BuyerInfoService } from 'src/SettingModule/BuyerInfo/BuyerInfo.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Buyer', schema: BuyerSchema }]),
  ],
  providers: [BuyerInfoService],
  controllers: [BuyerInfoController],
  exports: [],
})
export class BuyerInfoModule {}
