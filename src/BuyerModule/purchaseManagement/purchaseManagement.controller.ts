import {
  Controller,
  Get,
  Res,
  Body,
  Post,
  Param,
  Delete,
} from '@nestjs/common';
import { PurchaseManagementService } from 'src/BuyerModule/purchaseManagement/purchaseManagement.service';
import { PurchaseManagementDTO } from 'src/BuyerModule/purchaseManagement/purchaseManagement.dto';

@Controller('purchase')
export class PurchaseManagementController {
  constructor(private purchaseManagementService: PurchaseManagementService) {}

  @Get('getPurchase/:plate_id')
  async getPurchase(@Res() res, @Param('plate_id') plate_id) {
    await this.purchaseManagementService.getPurchase(res, plate_id);
  }

  @Post('/addPayment')
  async addPayment(
    @Res() res,
    @Body() purchaseManagementDTO: PurchaseManagementDTO,
  ) {
    await this.purchaseManagementService.addPayment(res, purchaseManagementDTO);
  }

  @Post('/addBidPayment')
  async addBidPayment(
    @Res() res: any,
    @Body() purchaseManagementDTO: PurchaseManagementDTO,
  ) {
    await this.purchaseManagementService.addBidPayment(
      res,
      purchaseManagementDTO,
    );
  }

  @Post('/remainingPayment')
  async remainingPaymenttt(
    @Res() res,
    @Body() purchaseManagementDTO: PurchaseManagementDTO,
  ) {
    await this.purchaseManagementService.remainingPayment(
      res,
      purchaseManagementDTO,
    );
  }

  @Post('/addPurchase')
  async addPurchase(
    @Res() res,
    @Body() purchaseManagementDTO: PurchaseManagementDTO,
  ) {
    await this.purchaseManagementService.addPurchase(
      res,
      purchaseManagementDTO,
    );
  }

  @Post('/addBidPurchase')
  async addBidPurchase(
    @Res() res,
    @Body() purchaseManagementDTO: PurchaseManagementDTO,
  ) {
    await this.purchaseManagementService.addBidPurchase(
      res,
      purchaseManagementDTO,
    );
  }

  @Get('/getBuyerProfile/:user_id')
  async getBuyerProfileData(@Res() res, @Param('user_id') user_id) {
    await this.purchaseManagementService.getBuyerProfileData(res, user_id);
  }

  @Post('/editPurchase')
  async editPurchase(
    @Res() res,
    @Body('orderID') orderID,
    @Body() purchaseManagementDTO: PurchaseManagementDTO,
  ) {
    await this.purchaseManagementService.editPurchase(
      res,
      orderID,
      purchaseManagementDTO,
    );
  }
  @Post('/getPurchasedPlate/:user_id')
  async getPurchasedPlate(
    @Res() res,
    @Param('user_id') user_id,
    @Body('plate_id') plate_id,
  ) {
    await this.purchaseManagementService.getPurchasedPlate(
      res,
      user_id,
      plate_id,
    );
  }
  @Delete('/delete')
  async deletePurchases(@Res() res, @Body('orderID') orderID) {
    await this.purchaseManagementService.deletePurchases(res, orderID);
  }

  @Get('getSinglePurchase/:plate_id')
  async getsinglePurchases(@Res() res, @Param('plate_id') plate_id) {
    await this.purchaseManagementService.getsinglePurchases(res, plate_id);
  }
}
