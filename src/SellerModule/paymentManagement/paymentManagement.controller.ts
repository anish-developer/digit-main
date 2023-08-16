import { Controller, Get, Res, Body, Put, Param } from '@nestjs/common';
import { PaymentManagementService } from 'src/SellerModule/paymentManagement/paymentManagement.service';
import { PaymentManagementDTO } from 'src/SellerModule/paymentManagement/paymentManagement.dto';

@Controller('payment')
export class PaymentManagementController {
  constructor(private paymentManagementService: PaymentManagementService) {}

  @Get('getPayment/:user_id')
  async getPayment(@Res() res, @Param('user_id') user_id) {
    await this.paymentManagementService.getPayment(res, user_id);
  }
  @Put('/editPayment')
  async editPayment(
    @Res() res,
    @Body() paymentManagementDTO: PaymentManagementDTO,
  ) {
    await this.paymentManagementService.editPayment(res, paymentManagementDTO);
  }
}
