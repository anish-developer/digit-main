/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable, Res } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CommonMethods } from 'src/utilities/common-methods';
import { BuyerInfoDTO } from 'src/SettingModule/BuyerInfo/dto/BuyerInfo.dto';
import { Buyer } from 'src/SellerModule/interfaces/buyer.interface';

@Injectable()
export class BuyerInfoService {
  constructor(
    @InjectModel('Buyer')
    private readonly buyerModel: Model<Buyer>,
  ) {}

  //Add New Address
  async addCardDetails(@Res() res, buyerDTO: BuyerInfoDTO) {
    const newCardDetails = new this.buyerModel(buyerDTO);
    if (newCardDetails) {
      await newCardDetails.save();
      return CommonMethods.success(res, 'Card Details Added Successfully', []);
    } else {
      return CommonMethods.error(res, 'Invalid Card Details');
    }
  }

  //Edit Address
  async updateCardDetails(
    @Res() res,
    card_id,
    buyerDTO: BuyerInfoDTO,
  ): Promise<Buyer> {
    const editCardDetails = await this.buyerModel.findByIdAndUpdate(
      card_id,
      buyerDTO,
      { new: true },
    );
    if (editCardDetails) {
      return CommonMethods.success(
        res,
        'Card Details Update Successfully',
        editCardDetails,
      );
    } else {
      return CommonMethods.error(res, 'Invalid Details');
    }
  }

  //Delete Address
  async deleteCardDetails(@Res() res, card_id): Promise<any> {
    const deleteCardDetails = await this.buyerModel.findByIdAndDelete(card_id);
    if (deleteCardDetails) {
      return CommonMethods.success(
        res,
        'Card Details Deleted successfully',
        [],
      );
    } else {
      return CommonMethods.error(res, 'No Card Details Exists');
    }
  }

  //Fetch User All Payment Details
  async buyingInfoDetails(@Res() res, card_id): Promise<Buyer[]> {
    const cardDetails = await this.buyerModel.findById(card_id).exec();
    if (cardDetails) {
      return CommonMethods.success(
        res,
        'Card Details Fetched Successfully',
        cardDetails,
      );
    } else {
      return CommonMethods.error(res, 'No Card Details Exists');
    }
  }

  async buyingInfo(@Res() res, user_id): Promise<Buyer> {
    const payment = await this.buyerModel.find({ user_id }).exec();
    if (payment) {
      return CommonMethods.success(
        res,
        'Card Details Fetched Successfully',
        payment,
      );
    } else {
      return CommonMethods.error(res, 'No Card Details Exists');
    }
  }
}
