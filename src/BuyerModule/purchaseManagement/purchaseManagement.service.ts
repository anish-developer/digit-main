import { Injectable, Res, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Purchase } from 'src/BuyerModule/interface/prchase.interface';
import { Order } from 'src/BuyerModule/interface/orderDetails.interface';
import { Plate } from 'src/SellerModule/interfaces/plate.interface';
import { PurchaseManagementDTO } from 'src/BuyerModule/purchaseManagement/purchaseManagement.dto';
import { CommonMethods } from 'src/utilities/common-methods';

@Injectable()
export class PurchaseManagementService {
  constructor(
    @InjectModel('Purchase') private readonly purchaseModel: Model<Purchase>,
    @InjectModel('Order') private readonly orderModel: Model<Order>,
    @InjectModel('Plate') private readonly plateModel: Model<Plate>,
  ) {}

  // Get purchase by userId\
  async getPurchase(@Res() res, plate_id): Promise<Purchase> {
    const purchase = await this.purchaseModel.find({ plate_id }).exec();
    if (purchase.length > 0) {
      return CommonMethods.success(res, 'Success', purchase);
    } else {
      return CommonMethods.error(res, 'Purchase does not exists');
    }
  }

  // direct sell now cut 100% payment
  async addPayment(res, purchaseManagementDTO: PurchaseManagementDTO) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const request = require('request');
    const randomOrderId = 'DB' + Date.now().toString();
    const orderID = randomOrderId + Math.floor(Math.random() * 10);
    purchaseManagementDTO.orderID = orderID;

    const newPurchase = await new this.purchaseModel(
      purchaseManagementDTO,
    ).save();

    const newOrder = await new this.orderModel(purchaseManagementDTO).save();
    const purchase = {
      newPurchase,
      newOrder,
    };
    if (purchase) {
      const options = {
        method: 'POST',
        url: 'https://www.billplz-sandbox.com/api/v3/bills',
        headers: {
          Authorization:
            'Basic MGFlZDlkZmMtZDQzZC00NzEyLWI2MjctOTJlM2Q2ODBkZmE4Og==',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        form: {
          collection_id: 'k4ol5uir0',
          email: purchaseManagementDTO.email,
          name: purchaseManagementDTO.name,
          amount: purchaseManagementDTO.Total * 100,
          callback_url: 'http://www.billplz.com/webhook/',
          description: orderID,
          due_at: purchaseManagementDTO.date,
          reference_1_label: 'First Name',
          reference_2_label: 'Last Name',
          reference_1: purchaseManagementDTO.first_name || ' ',
          reference_2: purchaseManagementDTO.last_name || ' ',
          deliver: 'false',
          redirect_url: purchaseManagementDTO.redirect_url + '&o=' + orderID,
          mobile: purchaseManagementDTO.phone,
        },
      };

      request(options, function (error, response) {
        const data = JSON.parse(response.body);

        if (error) {
          // return CommonMethods.error(res, 'Purchase not success');
          return res.status(HttpStatus.OK).json({
            message: 'fail',
            status: false,
            error,
          });
        }

        return res.status(HttpStatus.OK).json({
          message: 'success',
          status: true,
          data,
          orderID,
        });
      });
    } else {
      return CommonMethods.error(res, 'Purchase not success');
    }
  }
  // async addPayment(res, purchaseManagementDTO: PurchaseManagementDTO) {
  //   // eslint-disable-next-line @typescript-eslint/no-var-requires
  //   var request = require('request');
  //   const randomOrderId = 'DG' + Date.now().toString();
  //   const orderID = randomOrderId + Math.floor(Math.random() * 10);
  //   purchaseManagementDTO.orderID = orderID;

  //   const newPurchase = await new this.purchaseModel(
  //     purchaseManagementDTO,
  //   ).save();

  //   const newOrder = await new this.orderModel(purchaseManagementDTO).save();
  //   const purchase = {
  //     newPurchase,
  //     newOrder,
  //   };
  //   // const cutPrice = await this.plateModel.find({ plate_id }).exec();

  //   if (purchase) {
  //     var options = {
  //       method: 'POST',
  //       url: 'https://www.billplz-sandbox.com/api/v3/bills',
  //       headers: {
  //         Authorization:
  //           'Basic MGFlZDlkZmMtZDQzZC00NzEyLWI2MjctOTJlM2Q2ODBkZmE4Og==',
  //         'Content-Type': 'application/x-www-form-urlencoded',
  //       },
  //       form: {
  //         collection_id: 'k4ol5uir0',
  //         email: purchaseManagementDTO.email,
  //         name: purchaseManagementDTO.name,
  //         amount: parseInt(purchaseManagementDTO.total) * 100,
  //         paid_amount: purchaseManagementDTO.price * 100,
  //         callback_url: 'http://www.billplz.com/webhook/',
  //         description: orderID,
  //         due_at: purchaseManagementDTO.date,
  //         reference_1_label: 'First Name',
  //         reference_2_label: 'Last Name',
  //         reference_1: purchaseManagementDTO.last_name || ' ',
  //         reference_2: purchaseManagementDTO.last_name || ' ',
  //         deliver: 'false',
  //         redirect_url: purchaseManagementDTO.redirect_url + '&o=' + orderID,
  //         mobile: purchaseManagementDTO.phone,
  //       },
  //     };
  //     // data.paid_amount = data.amount * 0.1;

  //     request(options, function (error, response) {
  //       var data = JSON.parse(response.body);
  //       data.amount = data.amount * 0.01;

  //       if (data.error) {
  //         console.log(data.error);

  //         return res.status(HttpStatus.OK).json({
  //           message: 'fail',
  //           status: false,
  //           error: data.error,
  //         });
  //       }

  //       return res.status(HttpStatus.OK).json({
  //         message: 'success',
  //         status: true,
  //         data,
  //         orderID,
  //       });
  //     });
  //   } else {
  //     return CommonMethods.error(res, 'Purchase not success');
  //   }
  // }
  // 123456
  //place a bid cut 10% amount of total bid amount

  async addBidPayment(res, purchaseManagementDTO: PurchaseManagementDTO) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const request = require('request');
    const randomOrderId = 'DB' + Date.now().toString();
    const orderID = randomOrderId + Math.floor(Math.random() * 10);
    purchaseManagementDTO.orderID = orderID;

    const newPurchase = await new this.purchaseModel(
      purchaseManagementDTO,
    ).save();

    const newOrder = await new this.orderModel(purchaseManagementDTO).save();
    const purchase = {
      newPurchase,
      newOrder,
    };
    // const cutPrice = await this.plateModel.find({ plate_id }).exec();

    if (purchase) {
      const options = {
        method: 'POST',
        url: 'https://www.billplz-sandbox.com/api/v3/bills',
        headers: {
          Authorization:
            'Basic MGFlZDlkZmMtZDQzZC00NzEyLWI2MjctOTJlM2Q2ODBkZmE4Og==',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        form: {
          collection_id: 'k4ol5uir0',
          email: purchaseManagementDTO.email,
          name: purchaseManagementDTO.name,
          amount: purchaseManagementDTO.Total * 10,
          paid_amount: purchaseManagementDTO.price * 100,
          callback_url: 'http://www.billplz.com/webhook/',
          description: orderID,
          due_at: purchaseManagementDTO.date,
          reference_1_label: 'First Name',
          reference_2_label: 'Last Name',
          reference_1: purchaseManagementDTO.last_name || ' ',
          reference_2: purchaseManagementDTO.last_name || ' ',
          deliver: 'false',
          redirect_url: purchaseManagementDTO.redirect_url + '&o=' + orderID,
          mobile: purchaseManagementDTO.phone,
        },
      };
      // data.paid_amount = data.amount * 0.1;

      request(options, function (error, response) {
        const data = JSON.parse(response.body);
        // data.amount = data.reference_1 * 0.1;
        data.amount = data.amount / 10;

        if (data.error) {
          console.log(data.error);

          return res.status(HttpStatus.OK).json({
            message: 'fail',
            status: false,
            error: data.error,
          });
        }

        return res.status(HttpStatus.OK).json({
          message: 'success',
          status: true,
          data,
          orderID,
        });
      });
    } else {
      return CommonMethods.error(res, 'Purchase not success');
    }
  }

  //place a bid cut 90% amount of total bid amount

  async remainingPayment(res, purchaseManagementDTO: PurchaseManagementDTO) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires

    // const plate_id = purchaseManagementDTO.plate_id;
    // const data12 = await this.purchaseModel.findOne({ plate_id });
    // console.log(data12);

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const request = require('request');
    const randomOrderId = 'DG' + Date.now().toString();
    const orderID = randomOrderId + Math.floor(Math.random() * 10);
    purchaseManagementDTO.orderID = orderID;

    const newPurchase = await new this.purchaseModel(
      purchaseManagementDTO,
    ).save();

    const newOrder = await new this.orderModel(purchaseManagementDTO).save();
    const purchase = {
      newPurchase,
      newOrder,
    };
    // const cutPrice = await this.plateModel.find({ plate_id }).exec();

    if (purchase) {
      const options = {
        method: 'POST',
        url: 'https://www.billplz-sandbox.com/api/v3/bills',
        headers: {
          Authorization:
            'Basic MGFlZDlkZmMtZDQzZC00NzEyLWI2MjctOTJlM2Q2ODBkZmE4Og==',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        form: {
          collection_id: 'k4ol5uir0',
          email: purchaseManagementDTO.email,
          name: purchaseManagementDTO.name,
          amount: purchaseManagementDTO.Total * 90,
          paid_amount: purchaseManagementDTO.price * 100,
          callback_url: 'http://www.billplz.com/webhook/',
          description: orderID,
          due_at: purchaseManagementDTO.date,
          reference_1_label: 'First Name',
          reference_2_label: 'Last Name',
          reference_1: purchaseManagementDTO.first_name || ' ',
          reference_2: purchaseManagementDTO.last_name || ' ',
          deliver: 'false',
          redirect_url: purchaseManagementDTO.redirect_url + '&o=' + orderID,
          mobile: purchaseManagementDTO.phone,
        },
      };
      // data.paid_amount = data.amount * 0.1;

      request(options, function (error, response) {
        const data = JSON.parse(response.body);
        // data.amount = data.reference_1 * 0.1;
        // data.paid_amount = parseInt(purchaseManagementDTO.total) / 10;
        data.amount = data.amount / 100;

        if (data.error) {
          console.log(data.error);

          return res.status(HttpStatus.OK).json({
            message: 'fail',
            status: false,
            error,
          });
        }

        return res.status(HttpStatus.OK).json({
          message: 'success',
          status: true,
          data,
          orderID,
        });
      });
    } else {
      return CommonMethods.error(res, 'Purchase not success');
    }
  }

  // async addPayment(res, purchaseManagementDTO: PurchaseManagementDTO) {
  //   // eslint-disable-next-line @typescript-eslint/no-var-requires
  //   var request = require('request');
  //   const randomOrderId = 'DG' + Date.now().toString();
  //   const orderID = randomOrderId + Math.floor(Math.random() * 10);
  //   purchaseManagementDTO.orderID = orderID;

  //   const newPurchase = await new this.purchaseModel(
  //     purchaseManagementDTO,
  //   ).save();

  //   const newOrder = await new this.orderModel(purchaseManagementDTO).save();
  //   const purchase = {
  //     newPurchase,
  //     newOrder,
  //   };
  //   // const cutPrice = await this.plateModel.find({ plate_id }).exec();

  //   if (purchase) {
  //     var options = {
  //       method: 'POST',
  //       url: 'https://www.billplz.com/api/v3/bills',
  //       headers: {
  //         Authorization:
  //           'Basic MGFlZDlkZmMtZDQzZC00NzEyLWI2MjctOTJlM2Q2ODBkZmE4Og==',
  //         'Content-Type': 'application/x-www-form-urlencoded',
  //       },
  //       form: {
  //         collection_id: 'k4ol5uir0',
  //         email: purchaseManagementDTO.email,
  //         name: purchaseManagementDTO.name,
  //         amount: purchaseManagementDTO.total * 100,
  //         paid_amount: purchaseManagementDTO.price * 100,
  //         callback_url: 'http://www.billplz.com/webhook/',
  //         description: orderID,
  //         due_at: purchaseManagementDTO.date,
  //         reference_1_label: 'First Name',
  //         reference_2_label: 'Last Name',
  //         reference_1: purchaseManagementDTO.first_name || ' ',
  //         reference_2: purchaseManagementDTO.last_name || ' ',
  //         deliver: 'false',
  //         redirect_url: purchaseManagementDTO.redirect_url + '&o=' + orderID,
  //         mobile: purchaseManagementDTO.phone,
  //       },
  //     };

  //     request(options, function (error, response) {
  //       var data = JSON.parse(response.body);
  //       data.paid_amount = data.amount * 0.1;

  //       if (data.error) {
  //         console.log(data.error);

  //         return res.status(HttpStatus.OK).json({
  //           message: 'fail',
  //           status: false,
  //           error,
  //         });
  //       }

  //       return res.status(HttpStatus.OK).json({
  //         message: 'success',
  //         status: true,
  //         data,
  //         orderID,
  //       });
  //     });
  //   } else {
  //     return CommonMethods.error(res, 'Purchase not success');
  //   }
  // }

  async addPurchase(
    res,
    purchaseManagementDTO: PurchaseManagementDTO,
  ): Promise<Purchase> {
    const orderID = purchaseManagementDTO.orderID;
    const newPurchase = await this.purchaseModel.findOneAndUpdate(
      { orderID },
      purchaseManagementDTO,
      { new: true },
    );

    if (newPurchase) {
      const newOrder = await this.orderModel.findOneAndUpdate(
        { orderID },
        purchaseManagementDTO,
        { new: true },
      );
      const plate_number = newPurchase.plate_number;
      const deactivate = await this.plateModel.updateMany(
        { plate_number },
        { $set: { sell_status: '0' } },
      );
      console.log(deactivate);

      const data = {
        newPurchase,
        newOrder,
      };
      return CommonMethods.success(res, 'Order confirm', data);
    } else {
      return CommonMethods.error(res, 'Purchase not success');
    }
  }

  async addBidPurchase(
    res,
    purchaseManagementDTO: PurchaseManagementDTO,
  ): Promise<Purchase> {
    // const randomOrderId = 'DG' + Date.now().toString();
    // const NewRandomOrderId = randomOrderId + Math.floor(Math.random() * 10);
    // purchaseManagementDTO.orderID = NewRandomOrderId;

    const newPurchase = await new this.purchaseModel(
      purchaseManagementDTO,
    ).save();

    if (newPurchase) {
      const newOrder = await new this.orderModel(purchaseManagementDTO).save();
      const data = {
        newPurchase,
        newOrder,
      };
      return CommonMethods.success(res, 'Purchase successfully', data);
    } else {
      return CommonMethods.error(res, 'Purchase not success');
    }
  }

  async getBuyerProfileData(@Res() res, user_id) {
    const purchases = await this.purchaseModel
      .aggregate([
        { $match: { buyer_id: user_id } },
        {
          $lookup: {
            from: 'orders',
            localField: 'orderID',
            foreignField: 'orderID',
            as: 'purchases_data',
          },
        },
      ])
      .sort({ created_at: -1 });

    if (purchases.length > 0) {
      return CommonMethods.success(
        res,
        'Purchase List fetched successfully',
        purchases,
      );
    } else {
      return CommonMethods.error(res, 'No Purchase exists');
    }
  }

  async editPurchase(
    res,
    orderID,
    purchaseManagementDTO: PurchaseManagementDTO,
  ): Promise<Purchase> {
    const updatePurchase = await this.purchaseModel.findOneAndUpdate(
      { orderID },
      purchaseManagementDTO,
    );
    const updateOrder = await this.orderModel.findOneAndUpdate(
      { orderID },
      purchaseManagementDTO,
    );

    const data = {
      updatePurchase,
      updateOrder,
    };

    if (!data) {
      return CommonMethods.error(res, 'Purchase not success');
    } else {
      return CommonMethods.success(
        res,
        'Purchase details added successfully',
        data,
      );
    }
  }

  async getPurchasedPlate(@Res() res, user_id, plate_id) {
    const purchases = await this.purchaseModel.aggregate([
      { $match: { plate_id: plate_id, buyer_id: user_id } },
      {
        $lookup: {
          from: 'orders',
          localField: 'orderID',
          foreignField: 'orderID',
          as: 'purchased_data',
        },
      },
      { $unwind: '$purchased_data' },
    ]);

    if (purchases.length > 0) {
      return CommonMethods.success(
        res,
        'Purchase List fetched successfully',
        purchases[0],
      );
    } else {
      return CommonMethods.error(res, 'No Purchase exists');
    }
  }

  async deletePurchases(@Res() res, orderID): Promise<Purchase> {
    const deletePurchase = await this.purchaseModel.findOneAndDelete({
      orderID,
    });

    const deleteOrder = await this.orderModel.findOneAndDelete({ orderID });

    if (deletePurchase == null || deleteOrder == null) {
      return CommonMethods.error(res, 'Bid not Delete');
    } else {
      return CommonMethods.success(res, 'Bid delete successfully', []);
    }
  }

  async getsinglePurchases(@Res() res, plate_id): Promise<Purchase> {
    const getsinglePurchase = await this.purchaseModel
      .find({
        plate_id,
      })
      .sort({ created_at: -1 })
      .limit(1);
    console.log(getsinglePurchase);

    // const deleteOrder = await this.orderModel.findOneAndDelete({ orderID });

    if (getsinglePurchase) {
      return CommonMethods.success(
        res,
        'Bid get successfully',
        getsinglePurchase,
      );
    } else {
      return CommonMethods.error(res, 'Bid not get');
    }
  }
}
