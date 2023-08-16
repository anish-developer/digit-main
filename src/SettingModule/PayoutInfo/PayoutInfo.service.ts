/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable, Res } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CommonMethods } from 'src/utilities/common-methods';
import { Payout } from 'src/SellerModule/interfaces/payout.interface';
import { PayoutInfoDTO } from './dto/PayoutInfo.dto';

@Injectable()
export class PayoutInfoService {
  constructor(
    @InjectModel('Payout')
    private readonly payoutModel: Model<Payout>,
  ) {}

  //Add New Address
  async createBankDetails(
    @Res() res,
    payoutDTO: PayoutInfoDTO,
  ): Promise<Payout> {
    const newBankDetails = new this.payoutModel(payoutDTO);
    if (newBankDetails) {
      await newBankDetails.save();
      return CommonMethods.success(
        res,
        'Bank Details Added Successfully',
        newBankDetails,
      );
    } else {
      return CommonMethods.error(res, 'Error Adding Bank Details');
    }
  }

  //Edit Address
  async updateBankDetails(
    @Res() res,
    payout_id,
    payoutDTO: PayoutInfoDTO,
  ): Promise<Payout> {
    const editBankDetails = await this.payoutModel.findByIdAndUpdate(
      payout_id,
      payoutDTO,
      { new: true },
    );
    if (editBankDetails) {
      return CommonMethods.success(
        res,
        'Bank Details Edited Successfully',
        editBankDetails,
      );
    } else {
      return CommonMethods.error(res, 'No Address Present');
    }
  }

  //Delete Address
  async deleteBankDetails(@Res() res, payout_id): Promise<any> {
    const deleteBankDetails = await this.payoutModel.findByIdAndDelete(
      payout_id,
    );
    if (deleteBankDetails) {
      return CommonMethods.success(
        res,
        'Bank Details Deleted successfully',
        [],
      );
    } else {
      return CommonMethods.error(res, 'No Bank Details Exists');
    }
  }

  // fetch all users
  async payoutInfoDetails(@Res() res, payout_id): Promise<Payout[]> {
    const bankDetails = await this.payoutModel.findById(payout_id).exec();
    if (bankDetails) {
      return CommonMethods.success(
        res,
        'Bank Details Fetched Successfully',
        bankDetails,
      );
    } else {
      return CommonMethods.error(res, 'No Bank Details Exists');
    }
  }

  async payoutInfo(@Res() res, user_id): Promise<Payout> {
    const payout = await this.payoutModel.find({ user_id }).exec();
    if (payout) {
      return CommonMethods.success(
        res,
        'Bank Details Fetched Successfully',
        payout,
      );
    } else {
      return CommonMethods.error(res, 'No Bank Details Exists');
    }
  }
}
