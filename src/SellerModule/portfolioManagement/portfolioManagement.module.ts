/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PurchaseSchema } from 'src/BuyerModule/models/purchase.schema';
import { PlateSchema } from 'src/SellerModule/models/plate.schema';
import { UserSchema } from 'src/SellerModule/models/user.schema';
import { PortfolioManagementController } from 'src/SellerModule/portfolioManagement/portfolioManagement.controller';
import { PortfolioManagementService } from 'src/SellerModule/portfolioManagement/portfolioManagement.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Purchase', schema: PurchaseSchema }]),
    MongooseModule.forFeature([{ name: 'Plate', schema: PlateSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  providers: [PortfolioManagementService],
  controllers: [PortfolioManagementController],
  exports: [],
})
export class PortfolioModule {}
