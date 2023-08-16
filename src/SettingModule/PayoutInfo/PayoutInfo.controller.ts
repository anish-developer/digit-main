/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Res,
  Post,
  Body,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { PayoutInfoService } from 'src/SettingModule/PayoutInfo/PayoutInfo.service';
import { PayoutInfoDTO } from './dto/PayoutInfo.dto';

@Controller('payoutInfo')
export class PayoutInfoController {
  constructor(private PayoutInfoService: PayoutInfoService) {}

  //Add Address
  @Post('/create_bank_details')
  async createBankDetails(@Res() res, @Body() payoutDTO: PayoutInfoDTO) {
    await this.PayoutInfoService.createBankDetails(res, payoutDTO);
  }

  //Update Address
  @Put('/update_bank_details/:payout_id')
  async updateBankDetails(
    @Res() res,
    @Param('payout_id') payout_id,
    @Body() payoutDTO: PayoutInfoDTO,
  ) {
    await this.PayoutInfoService.updateBankDetails(res, payout_id, payoutDTO);
  }

  //Delete Address
  @Delete('/delete_bank_details/:payout_id')
  async deleteBankDetails(@Res() res, @Param('payout_id') payout_id) {
    await this.PayoutInfoService.deleteBankDetails(res, payout_id);
  }

  //Get All Address
  @Get('/payout_info_details/:payout_id')
  async payoutInfoDetails(@Res() res, @Param('payout_id') payout_id) {
    return await this.PayoutInfoService.payoutInfoDetails(res, payout_id);
  }

  @Get('payout_info/:user_id')
  async getPayment(@Res() res, @Param('user_id') user_id) {
    await this.PayoutInfoService.payoutInfo(res, user_id);
  }
}
