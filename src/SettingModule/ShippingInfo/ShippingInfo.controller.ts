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
import { ShippingInfoService } from 'src/SettingModule/ShippingInfo/ShippingInfo.service';
import { ShippingInfoDTO } from './dto/Shippinginfo.dto';

@Controller('shippingInfo')
export class ShippingInfoController {
  constructor(private ShippingInfoService: ShippingInfoService) {}

  //Add Address
  @Post('/address_create')
  async createNews(@Res() res, @Body() shippingDTO: ShippingInfoDTO) {
    await this.ShippingInfoService.createAddress(res, shippingDTO);
  }

  //Update Address
  @Put('/address_update/:address_id')
  async updateAddress(
    @Res() res,
    @Param('address_id') address_id,
    @Body() shippingDTO: ShippingInfoDTO,
  ) {
    await this.ShippingInfoService.updateAddress(res, address_id, shippingDTO);
  }

  //Delete Address
  @Delete('/delete_address/:address_id')
  async deleteAddress(@Res() res, @Param('address_id') address_id) {
    await this.ShippingInfoService.deleteAddress(res, address_id);
  }

  //Get Address By UserID
  @Get('/user_address_list/:address_id')
  async getAddressByUserId(@Res() res, @Param('address_id') address_id) {
    return await this.ShippingInfoService.getAddressByUserId(res, address_id);
  }

  @Get('/user_address/:user_id')
  async getPayment(@Res() res, @Param('user_id') user_id) {
    await this.ShippingInfoService.addressinfo(res, user_id);
  }
}
