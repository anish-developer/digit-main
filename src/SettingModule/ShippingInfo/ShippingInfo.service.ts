/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable, Res } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CommonMethods } from 'src/utilities/common-methods';
import { ShippingInfoDTO } from './dto/Shippinginfo.dto';
import { Shipping } from 'src/SellerModule/interfaces/shipping.interface';

@Injectable()
export class ShippingInfoService {
  constructor(
    @InjectModel('Shipping')
    private readonly shippingModel: Model<Shipping>,
  ) {}

  //Add New Address
  async createAddress(@Res() res, shippingDTO: ShippingInfoDTO) {
    const newAddress = await new this.shippingModel(shippingDTO);
    if (newAddress) {
      await newAddress.save();
      return CommonMethods.success(res, 'Address Successfully Added', []);
    } else {
      return CommonMethods.error(res, 'Error In Creating Address');
    }
  }

  //Edit Address
  async updateAddress(
    @Res() res,
    address_id,
    shippingDTO: ShippingInfoDTO,
  ): Promise<Shipping> {
    const editAddress = await this.shippingModel.findByIdAndUpdate(
      address_id,
      shippingDTO,
      { new: true },
    );
    if (editAddress) {
      return CommonMethods.success(
        res,
        'Address Edited Successfully',
        editAddress,
      );
    } else {
      return CommonMethods.error(res, 'No Address Present');
    }
  }

  //Delete Address
  async deleteAddress(@Res() res, address_id): Promise<any> {
    const deleteAddr = await this.shippingModel.findByIdAndDelete(address_id);
    if (deleteAddr) {
      return CommonMethods.success(res, 'Address Deleted successfully', []);
    } else {
      return CommonMethods.error(res, 'No Address present');
    }
  }

  // fetch all address of one user
  async getAddressByUserId(@Res() res, address_id): Promise<Shipping[]> {
    const address = await this.shippingModel.findById(address_id).exec();
    if (address) {
      return CommonMethods.success(
        res,
        'Address List fetched successfully',
        address,
      );
    } else {
      return CommonMethods.error(res, 'No Address Exists');
    }
  }

  async addressinfo(@Res() res, user_id): Promise<Shipping> {
    const payment = await this.shippingModel.find({ user_id }).exec();
    if (payment) {
      return CommonMethods.success(
        res,
        'Address List fetched successfully',
        payment,
      );
    } else {
      return CommonMethods.error(res, 'Payment does not exists');
    }
  }
}
