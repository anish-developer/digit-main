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
import { BuyerInfoService } from 'src/SettingModule/BuyerInfo/BuyerInfo.service';
import { BuyerInfoDTO } from './dto/BuyerInfo.dto';

@Controller('buyerInfo')
export class BuyerInfoController {
  constructor(private BuyerInfoService: BuyerInfoService) {}

  //Add Address
  @Post('/add_card_details')
  async addCardDetails(@Res() res, @Body() buyerDTO: BuyerInfoDTO) {
    await this.BuyerInfoService.addCardDetails(res, buyerDTO);
  }

  //Update Address
  @Put('/update_card_details/:card_id')
  async updateCardDetails(
    @Res() res,
    @Param('card_id') card_id,
    @Body() buyerDTO: BuyerInfoDTO,
  ) {
    await this.BuyerInfoService.updateCardDetails(res, card_id, buyerDTO);
  }

  //Delete Address
  @Delete('/delete_card_details/:card_id')
  async deleteCardDetails(@Res() res, @Param('card_id') card_id) {
    await this.BuyerInfoService.deleteCardDetails(res, card_id);
  }

  //Get All Address
  @Get('/buyout_info_details/:card_id')
  async buyingInfoDetails(@Res() res, @Param('card_id') card_id) {
    return await this.BuyerInfoService.buyingInfoDetails(res, card_id);
  }

  @Get('buyout_info/:user_id')
  async getPayment(@Res() res, @Param('user_id') user_id) {
    await this.BuyerInfoService.buyingInfo(res, user_id);
  }
}
