/* eslint-disable prettier/prettier */
/* eslint-disable no-var */
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Purchase } from 'src/BuyerModule/interface/prchase.interface';
import { User } from 'src/SellerModule/interfaces/user.interface';
import { Plate } from '../interfaces/plate.interface';
import { CommonMethods } from 'src/utilities/common-methods';

@Injectable()
export class PortfolioManagementService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Purchase') private readonly purchaseModel: Model<Purchase>,
    @InjectModel('Plate') private readonly plateModel: Model<Plate>,
  ) {}

  //Get ranking by plate count
  async plateCountRanking(res, user_id) {
    //Get All Plate By User Id
    const plate = await this.purchaseModel.find({ owner_id: user_id });

    //Get Plate Count
    const plateCount = Object.keys(plate).length;

    //Get Total Sales
    var totalSales = 0;
    plate.forEach((element) => {
      totalSales =
        Number(totalSales) + Number(element.bid_price || element.sell_price);
    });

    //Get Plate Count Rank
    const descPlateList = await this.userModel
      .find({ user_type: '5' })
      .sort({ plate_count: -1 });
    const plateRankArray = [];
    for (let i = 0; i < descPlateList.length; i++) {
      plateRankArray.push({
        rank: i + 1,
        userID: JSON.stringify(descPlateList[i]._id).split('"').join(''),
      });
    }
    const getPlateRank = plateRankArray.find(
      ({ userID }) => userID === user_id,
    );

    //Get Total Sales Count Rank
    const descTotalPrice = await this.userModel
      .find({ user_type: '5' })
      .sort({ total_sales: -1 });
    const salesRankArray = [];
    for (let i = 0; i < descTotalPrice.length; i++) {
      salesRankArray.push({
        rank: i + 1,
        userID: JSON.stringify(descTotalPrice[i]._id).split('"').join(''),
      });
    }
    const getSalesRank = salesRankArray.find(
      ({ userID }) => userID === user_id,
    );

    //Get Gain and loss Sales Count Rank

    const total: number = await this.plateModel
      .aggregate([
        { $match: { user_id, sell_status: '0' } },
        {
          $addFields: {
            totalPrice: { $toDouble: '$price' },
          },
        },
        {
          $group: { _id: user_id, sum: { $sum: '$totalPrice' } },
        },
      ])
      .then((res) => parseInt(res.map((d) => d.sum).toString()));

    const total1: number = await this.plateModel
      .aggregate([
        { $match: { user_id, sell_status: '0' } },
        {
          $addFields: {
            totalPrice: { $toDouble: '$highest_bid' },
          },
        },
        {
          $group: { _id: user_id, sum: { $sum: '$totalPrice' } },
        },
      ])
      .then((res) => parseInt(res.map((d) => d.sum).toString()));
    const difference = total1 - total;

    //Gain and loss Count Rank
    const descGainList = await this.userModel
      .find({ user_type: '5' })
      .sort({ plate_count: -1 });
    const gainRankArray = [];
    for (let i = 0; i < descGainList.length; i++) {
      gainRankArray.push({
        rank: i + 1,
        userID: JSON.stringify(descGainList[i]._id).split('"').join(''),
      });
    }
    const getGainRank = gainRankArray.find(({ userID }) => userID === user_id);

    //All Response
    const response = {
      plateCount,
      plateRank: getPlateRank.rank,
      totalSales,
      totalSalesRank: getSalesRank.rank,
      gainAndLoss: difference,
      gainAndLossRank: getGainRank.rank,
    };

    return CommonMethods.success(res, 'Success', response);
  }
}
