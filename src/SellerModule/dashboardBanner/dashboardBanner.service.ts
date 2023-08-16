/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/SellerModule/interfaces/user.interface';
import { Plate } from 'src/SellerModule/interfaces/plate.interface';
import { Purchase } from 'src/BuyerModule/interface/prchase.interface';
import { CommonMethods } from 'src/utilities/common-methods';
@Injectable()
export class DashboardBannerService {
  constructor(
    @InjectModel('User') public readonly userModel: Model<User>,
    @InjectModel('Plate') private readonly plateModel: Model<Plate>,
    @InjectModel('Purchase') private readonly purchaseModel: Model<Purchase>,
  ) {}
  // fetch all users
  async getAllUser(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    return users;
  }

  async getAllPlate(): Promise<Plate[]> {
    const plates = await this.plateModel.find().exec();
    return plates;
  }

  getPlateCount(options) {
    return this.plateModel
      .find({ add_by: 'Admin', sell_status: { $ne: '0' } })
      .count(options)
      .exec();
  }

  getSoldCount(options) {
    return this.purchaseModel
      .find({ payment_status: 'true' })
      .count(options)
      .exec();
  }

  getallusercount(options) {
    return this.userModel
      .find({
        $or: [{ user_type: '4' }, { user_type: '5' }],
      })
      .count(options)
      .exec();
  }

  async grossvalue() {
    const total: number = await this.plateModel
      .aggregate([
        { $match: { sell_status: '0', sell_type: 'Sell Now' } },
        {
          $addFields: {
            totalPrice: { $toDouble: '$price' },
          },
        },
        {
          $group: { _id: 'user_id', sum: { $sum: '$totalPrice' } },
        },
      ])
      .then((res) => parseInt(res.map((d) => d.sum).toString()));
    const total1: number = await this.plateModel
      .aggregate([
        { $match: { sell_status: '0', sell_type: 'Place Ask' } },
        {
          $addFields: {
            totalPrice: { $toDouble: '$highest_bid' },
          },
        },
        {
          $group: { _id: 'user_id', sum: { $sum: '$totalPrice' } },
        },
      ])
      .then((res) => parseInt(res.map((d) => d.sum).toString()));
    const difference = total1 + total;
    return difference;

    //Gain and loss Count Rank
    //All Response
    // const response = {
    //   lifeTimeGrossValue: difference,
    // };
  }
}
