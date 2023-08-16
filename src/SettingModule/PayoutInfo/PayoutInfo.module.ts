/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PayoutSchema } from 'src/SellerModule/models/payout.schema';
import { PayoutInfoController } from 'src/SettingModule/PayoutInfo/PayoutInfo.controller';
import { PayoutInfoService } from 'src/SettingModule/PayoutInfo/PayoutInfo.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Payout', schema: PayoutSchema }]),
  ],
  providers: [PayoutInfoService],
  controllers: [PayoutInfoController],
  exports: [],
})
export class PayoutInfoModule {}
