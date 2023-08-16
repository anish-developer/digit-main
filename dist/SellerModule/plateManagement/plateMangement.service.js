"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlateManagementService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const plateManagement_dto_1 = require("./plateManagement.dto");
const common_methods_1 = require("../../utilities/common-methods");
const sendgrid_service_1 = require("../../sendgrid/sendgrid.service");
const base64ToImage = require('base64-to-image');
let PlateManagementService = class PlateManagementService {
    constructor(plateModel, userModel, orderModel, purcahseModel, sessionModel, sendGridService) {
        this.plateModel = plateModel;
        this.userModel = userModel;
        this.orderModel = orderModel;
        this.purcahseModel = purcahseModel;
        this.sessionModel = sessionModel;
        this.sendGridService = sendGridService;
    }
    async getAllPlates(res) {
        const plates = await this.plateModel.aggregate([
            { $match: { sell_status: { $ne: '0' }, add_by: 'Admin' } },
            {
                $lookup: {
                    from: 'plates',
                    localField: 'plate_number',
                    foreignField: 'plate_number',
                    as: 'price',
                },
            },
            {
                $set: {
                    price: { $arrayElemAt: ['$price.price', 0] },
                },
            },
        ]);
        if (plates.length) {
            return common_methods_1.CommonMethods.success(res, 'Plates List fetched successfully', plates);
        }
        else {
            return common_methods_1.CommonMethods.error(res, 'No plates exists');
        }
    }
    async GetAllPlates() {
        const plates = await this.plateModel.find().exec();
        return plates;
    }
    countallplates(options) {
        return this.plateModel.count(options).exec();
    }
    getallbidcount(options) {
        return this.plateModel
            .find({
            $or: [{ sell_status: '1' }],
        })
            .count(options)
            .exec();
    }
    getallsellcount(options) {
        return this.plateModel
            .find({
            $or: [{ sell_status: '2' }],
        })
            .count(options)
            .exec();
    }
    async getPlate(res, plateID) {
        const adminPlate = await this.plateModel.findById(plateID).exec();
        const adminNumber = adminPlate.plate_number;
        const soldPlate = await this.plateModel
            .findOne({
            status: '2',
            plate_number: adminNumber,
            sell_status: { $ne: '0' },
        })
            .exec();
        if (soldPlate) {
            var plate = soldPlate;
        }
        else {
            var plate = adminPlate;
        }
        if (adminPlate) {
            const numberData = [];
            const number = adminPlate.plate_number.split(' ');
            for (let i = 0; i < number.length; i++) {
                if (number[i].match(/^[0-9]*$/)) {
                    numberData.push(number[i]);
                }
            }
            const recomendation = await this.plateModel.aggregate([
                {
                    $match: {
                        $and: [
                            { plate_number: { $regex: numberData.toString() } },
                            { plate_number: { $nin: [adminNumber] } },
                        ],
                        add_by: 'Admin',
                    },
                },
                {
                    $lookup: {
                        from: 'plates',
                        localField: 'plate_number',
                        foreignField: 'plate_number',
                        as: 'price',
                    },
                },
                { $limit: 4 },
                {
                    $set: {
                        price: { $arrayElemAt: ['$price.price', 0] },
                    },
                },
            ]);
            if (recomendation.length > 3) {
                if (!soldPlate) {
                    const data = {
                        plate,
                        recomendation,
                    };
                    return common_methods_1.CommonMethods.success(res, 'Success', data);
                }
                else {
                    const data = {
                        plate,
                        recomendation,
                    };
                    return common_methods_1.CommonMethods.success(res, 'Success', data);
                }
            }
            else {
                const recomendation = await this.plateModel.aggregate([
                    {
                        $match: {
                            plate_number: { $nin: [adminNumber] },
                            $or: [
                                { plate_number: { $lte: numberData.toString() } },
                                { plate_number: { $gte: numberData.toString() } },
                            ],
                            add_by: 'Admin',
                        },
                    },
                    {
                        $lookup: {
                            from: 'plates',
                            localField: 'plate_number',
                            foreignField: 'plate_number',
                            as: 'price',
                        },
                    },
                    { $limit: 4 },
                    {
                        $set: {
                            price: { $arrayElemAt: ['$price.price', 0] },
                        },
                    },
                ]);
                if (!soldPlate) {
                    const data = {
                        plate,
                        recomendation,
                    };
                    return common_methods_1.CommonMethods.success(res, 'Success', data);
                }
                else {
                    const data = {
                        plate,
                        recomendation,
                    };
                    return common_methods_1.CommonMethods.success(res, 'Success', data);
                }
            }
        }
        else {
            return common_methods_1.CommonMethods.error(res, 'Plate does not exists');
        }
    }
    async addPlate(res, plateManagementDTO) {
        const { plate_number } = plateManagementDTO;
        const plate = await this.plateModel.findOne({ plate_number });
        const newPlate = await new this.plateModel(plateManagementDTO).$set({
            add_by: 'Seller',
        });
        if (!plate) {
            await newPlate.save();
            return common_methods_1.CommonMethods.success(res, 'Plate added successfully', newPlate);
        }
        else {
            return common_methods_1.CommonMethods.error(res, 'Plate already Exists');
        }
    }
    async editPlate(res, plateID, plateManagementDTO) {
        const { user_id } = plateManagementDTO;
        const checkPlate = await this.plateModel.find({
            $and: [{ _id: plateID }, { user_id: user_id }, { status: '1' }],
        });
        if (checkPlate.length > 0) {
            const updatePlate = await this.plateModel.findByIdAndUpdate(plateID, plateManagementDTO, { new: true });
            if (updatePlate) {
                return common_methods_1.CommonMethods.success(res, 'plate update Successfully', updatePlate);
            }
            else {
                return common_methods_1.CommonMethods.error(res, 'No Plate edit');
            }
        }
        else {
            const randomOrderId = 'DS' + Date.now().toString();
            const orderID = randomOrderId + Math.floor(Math.random() * 10);
            plateManagementDTO.orderID = orderID;
            const addPlate = await new this.plateModel(plateManagementDTO)
                .$set({ add_by: 'Seller' })
                .save();
            if (addPlate) {
                return common_methods_1.CommonMethods.success(res, 'plate added Successfully', addPlate);
            }
            else {
                return common_methods_1.CommonMethods.error(res, 'No Plate add');
            }
        }
    }
    async deletePlate(res, plateID) {
        const deletedPlate = await this.plateModel.findByIdAndDelete(plateID);
        if (deletedPlate) {
            return common_methods_1.CommonMethods.success(res, 'Plate Deleted successfully', []);
        }
        else {
            return common_methods_1.CommonMethods.error(res, 'No Plate present');
        }
    }
    async uploadFile(res, body) {
        if (body.file) {
            const base64Str = body.file;
            const path = './uploads/plate/';
            const optionalObj = {
                fileName: '',
                type: base64Str.split(';')[0].split('/')[1],
            };
            const imageInfo = base64ToImage(base64Str, path, optionalObj);
            const filePath = `http://${process.env.HOST}:${process.env.PORT}/plateManagement/uploads/plate/${imageInfo.fileName}`;
            return common_methods_1.CommonMethods.success(res, 'Image uploaded successfully', filePath);
        }
        else {
            return common_methods_1.CommonMethods.error(res, 'Image not uploaded');
        }
    }
    async editAsk(res, plateID, PlateManagementDTO) {
        const editAsk = await this.plateModel.findOneAndUpdate(plateID, PlateManagementDTO, { new: true });
        if (editAsk) {
            return common_methods_1.CommonMethods.success(res, 'Plate edited successfully', editAsk);
        }
        else {
            return common_methods_1.CommonMethods.error(res, 'No Plate present');
        }
    }
    async sell_Pending(res, userID) {
        const sell_Pending = await this.plateModel.find({
            $and: [
                { user_id: userID },
                { sell_type: 'Sell Now' },
                { status: '2' },
                { add_by: 'Seller' },
            ],
        });
        if (sell_Pending) {
            return common_methods_1.CommonMethods.success(res, 'Success', sell_Pending);
        }
        else {
            return common_methods_1.CommonMethods.error(res, 'User not found');
        }
    }
    async reUploadImage(res, plateID, plateManagementDTO) {
        const editPlate = await this.plateModel.findByIdAndUpdate(plateID, plateManagementDTO, { new: true });
        if (editPlate) {
            return common_methods_1.CommonMethods.success(res, 'Plate edited successfully', editPlate);
        }
        else {
            return common_methods_1.CommonMethods.error(res, 'No Plate present');
        }
    }
    async getHighestBid(res, plate_number) {
        const plates = await this.orderModel
            .findOne({ plate_number })
            .sort({ price: -1 })
            .exec();
        if (plates) {
            return common_methods_1.CommonMethods.success(res, 'Highest Bid Price(Order)', plates);
        }
        else {
            const data = await this.plateModel
                .findOne({ plate_number })
                .sort({ price: -1 })
                .exec();
            return common_methods_1.CommonMethods.success(res, 'Highest Bid Price(Plate)', data);
        }
    }
    async getHighest(plate_number) {
        const plates = await this.purcahseModel
            .find({ plate_number })
            .sort({ bid_price: -1 })
            .limit(1)
            .exec();
        return plates;
    }
    async getLowest(plate_number) {
        const plates = await this.purcahseModel
            .find({ plate_number })
            .sort({ bid_price: 1 })
            .limit(1)
            .exec();
        return plates;
    }
    async getPlatesByUserID(res, user_id) {
        const getPlate = await this.plateModel.find({ user_id });
        getPlate.map(async (plate) => {
            const highestData = await this.getHighest(plate.plate_number);
            console.log(highestData);
            if (plate.plate_number) {
                plate.highest_bid = highestData[0].bid_price;
            }
            const lowestData = await this.getLowest(plate.plate_number);
            console.log(lowestData);
            if (lowestData[0].bid_price) {
                plate.lowest_bid = lowestData[0].bid_price;
            }
        });
        const plates = await this.plateModel.aggregate([
            { $match: { user_id: user_id, add_by: 'Seller' } },
            {
                $lookup: {
                    from: 'purchases',
                    localField: 'plate_number',
                    foreignField: 'plate_number',
                    as: 'orderDetails',
                },
            },
        ]);
        const directSell = await this.plateModel.find({
            $and: [{ sell_type: 'Sell Now' }, { owner_id: user_id }],
        });
        console.log(directSell);
        getPlate.map(async (plate) => {
            const highestData = await this.getHighest(plate.plate_number);
            if (plate.plate_number) {
                plate.highest_bid = highestData[0].bid_price;
            }
            const lowestData = await this.getLowest(plate.plate_number);
            if (plate.plate_number) {
                plate.lowest_bid = lowestData[0].bid_price;
            }
            plate.save();
        });
        if (plates) {
            return common_methods_1.CommonMethods.success(res, 'Success', {
                plates: plates,
                directSell: directSell,
            });
        }
        else {
            return common_methods_1.CommonMethods.error(res, 'Plates does not exists');
        }
    }
    async staticPages(res) {
        const users = await this.userModel.find().count();
        const total = await this.plateModel
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
        const total1 = await this.plateModel
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
        const visitCount = await this.sessionModel.find().count();
        const response = {
            registedUser: users,
            lifeTimeGrossValue: difference,
            monthlyVisitors: visitCount,
        };
        return common_methods_1.CommonMethods.success(res, 'Success', response);
    }
    async getAllPlatess(res) {
        let data;
        var request = require('request');
        const platesIds = await this.plateModel.find();
        const ids = platesIds.map((e) => e._id);
        const plates = await this.plateModel.find({
            _id: {
                $in: ids,
            },
            add_by: 'Seller',
        });
        const date = plates.map((e) => e.created_at);
        const exp = plates.map((e) => e.expires).toString();
        const e_date = date.toLocaleString().slice(0, 1000000000);
        console.log(e_date, 'edat');
        const presentDate = Date.now();
        const p_date = new Date(presentDate).toLocaleString('en-GB', {
            timeZone: 'IST',
        });
        const [day, month, year] = p_date.split('/');
        const result = [month, day, year].join('/');
        const plate = plates.map((e) => e.plate_number);
        const bid = plates.map((e) => e.highest_bid);
        if (result >= e_date) {
            const plates = await this.purcahseModel.find({
                plate_number: {
                    $in: plate,
                },
                bid_price: {
                    $in: bid,
                },
            });
            const buyer = plates.map((e) => e.buyer_id);
            var user = await this.userModel.find({
                _id: {
                    $in: buyer,
                },
            });
            const maill = user.map((e) => e.email);
            new Promise(async (resolve, reject) => {
                const options = {
                    method: 'POST',
                    url: 'https://www.billplz-sandbox.com/api/v3/bills',
                    headers: {
                        Authorization: 'Basic MGFlZDlkZmMtZDQzZC00NzEyLWI2MjctOTJlM2Q2ODBkZmE4Og==',
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    form: {
                        collection_id: 'k4ol5uir0',
                        email: maill,
                        name: 'aaa',
                        amount: 76725 * 100,
                        paid_amount: 100,
                        callback_url: 'http://www.billplz.com/webhook/',
                        description: 'orderID',
                        due_at: '2022-05-20',
                        reference_1_label: 'First Name',
                        reference_2_label: 'Last Name',
                        reference_1: "purchaseManagementDTO.first_name || ' '",
                        reference_2: "purchaseManagementDTO.last_name || ' '",
                        deliver: 'false',
                        redirect_url: "purchaseManagementDTO.redirect_url + '&o=' + orderID",
                        mobile: '1234567890',
                    },
                };
                request(options, function (error, response) {
                    data = JSON.parse(response.body);
                    data.amount = data.amount / 100;
                    if (data.error) {
                        console.log(data.error);
                        return res.json({
                            message: 'fail',
                            error: reject(data.error),
                        });
                    }
                    return resolve(data);
                });
            }).then(async (res) => {
                const link = res['url'];
                const mail = {
                    to: maill,
                    subject: 'Remaining Payment',
                    from: 'ankit.k@simbiotiktech.com',
                    text: 'Payment',
                    html: `<!DOCTYPE html>
          <html lang="en">
          
          <head>
              <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
              <title>Thank you for your purchase!</title>
              <style type="text/css">
                  @media only screen and (max-width: 480px) {
                      body {
                          width: 100% !important;
                          min-width: 100% !important;
                      }
          
                      table[id="emailHeader"],
                      table[id="emailBody"],
                      table[id="emailFooter"],
                      table[class="flexibleContainer"] {
                          width: 100% !important;
                      }
          
                      td[class="flexibleContainerBox"],
                      td[class="flexibleContainerBox"] table {
                          display: block;
                          width: 100%;
                          text-align: left;
                      }
          
                      td[class="imageContent"] img {
                          height: auto !important;
                          width: 100% !important;
                          max-width: 100% !important;
                      }
          
                      img[class="flexibleImage"] {
                          height: auto !important;
                          width: 100% !important;
                          max-width: 100% !important;
                      }
          
                      img[class="flexibleImageSmall"] {
                          height: auto !important;
                          width: auto !important;
                      }
          
                      table[class="flexibleContainerBoxNext"] {
                          padding-top: 10px !important;
                      }
          
                      table[class="emailButton"] {
                          width: 100% !important;
                      }
          
                      td[class="buttonContent"] {
                          padding: 0 !important;
                      }
          
                      td[class="buttonContent"] a {
                          padding: 15px !important;
                      }
          
                      .footer-img-content img {
                          width: 15px !important;
                          margin-right: 5px !important;
                      }
          
                      .footer-img-content div p {
                          font-size: 10px !important;
                      }
          
                      .footer-img-content div p span {
                          font-size: 11px !important;
                      }
          
                      .padding {
                          padding-left: 10px !important;
                          padding-right: 10px !important;
                      }
          
                      .footer-row-1 p .footer-fb-logo {
                          width: 16px !important;
                      }
          
                      .footer-row-1 p,
                      .footer-row-2 p,
                      .footer-row-3 p {
                          font-size: 11px !important;
                      }
          
                      .footer-row-1 p span,
                      .footer-row-2 p span,
                      .footer-row-3 p span {
                          font-size: 12px !important;
                      }
          
                      .footer-row-1 p .footer-insta-logo {
                          width: 16px !important;
                      }
          
                      .footer-row-1 p .footer-youtube-logo {
                          width: 18px !important;
                      }
          
                      .footer-row-2 .footer-mail-logo img {
                          width: 18px !important;
                      }
          
                      .footer-row-2 .footer-call-logo img {
                          width: 16px !important;
                      }
          
                      .footer-row-3 p img {
                          width: 14px !important;
                      }
          
                      .email-heading {
                          font-size: 20px !important;
                          line-height: 30px !important;
                      }
          
                      .email-content-text {
                          font-size: 14px !important;
                      }
          
                      .email-content-text span {
                          font-size: 16px !important;
                      }
          
                      .method-card-details p {
                          font-size: 14px !important;
                      }
          
                      .method-card-total-details-1 p {
                          font-size: 12px !important;
                          width: 30.33% !important;
                      }
          
                      .method-card-total-details-1 .number-plate-para {
                          width: 39.33% !important;
                      }
          
                      .method-card-total-details-2 .card-total-blank {
                          font-size: 12px !important;
                          width: 30.33% !important;
                      }
          
                      .method-card-total-details-2 .card-subtotal {
                          font-size: 12px !important;
                          width: 36.33% !important;
                      }
          
                      .method-card-total-details-2 .card-total-number {
                          font-size: 12px !important;
                          width: 33.33% !important;
                      }
          
                      .method-card-total-details-3 .card-processing-blank {
                          font-size: 12px !important;
                          width: 30.33% !important;
                      }
          
                      .method-card-total-details-3 .card-processing {
                          font-size: 12px !important;
                          width: 36.33% !important;
                      }
          
                      .method-card-total-details-3 .card-processing-number {
                          font-size: 12px !important;
                          width: 33.33% !important;
                      }
          
                      .method-card-total-details-4 .card-grandtotal-blank {
                          font-size: 12px !important;
                          width: 30.33% !important;
                      }
          
                      .method-card-total-details-4 .card-grandtotal {
                          font-size: 12px !important;
                          width: 36.33% !important;
                      }
          
                      .method-card-total-details-4 .card-grandtotal-number {
                          font-size: 12px !important;
                          width: 33.33% !important;
                      }
          
                      .thank-you-for-account-text {
                          font-size: 14px !important;
                          line-height: 22px !important;
                      }
          
                      .thank-you-for-account-text span {
                          font-size: 16px !important;
                      }
          
                      .order-summary-heading {
                          font-size: 16px !important;
                      }
          
                      .customer-info-details {
                          font-size: 16px !important;
                      }
          
                      .shipping-info,
                      .billing-info {
                          font-size: 12px !important;
                      }
          
                      .shipping-info span,
                      .billing-info span {
                          font-size: 14px !important;
                      }
                  }
              </style>
          </head>
          
          <body bgcolor="#fff" leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0" style="font-family: Verdana, Geneva, Tahoma, sans-serif;">
              <center style="background-color:#fff;">
                  <table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTbl" style="font-family: Verdana, Geneva, Tahoma, sans-serif;table-layout: fixed;max-width:100% !important;width: 100% !important;min-width: 100% !important;">
                      <tr>
                          <td align="center" valign="top" id="bodyCell">
                              <table bgcolor="#FFFFFF" border="0" cellpadding="0" cellspacing="0" width="600" id="emailBody" style="border: 3px solid #FFBB38;">
                                  <tr>
                                      <td align="center" valign="top" class="textContent padding" style="padding:30px 20px 0 20px;">
                                          <img src="./emailer-imgs/logo.png" style="margin: 0 auto 10px auto;" alt="brand logo img">
                                          <h2 class="email-heading" style="text-align:center;font-weight:600;font-size: 25px;margin-top:0;margin-bottom: 0;color:#333333;line-height: 38px;">
                                              Thank you for your purchase!</h2>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td align="center" valign="top" width="600" class="flexibleContainerCell">
                                          <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                              <tr>
                                                  <td valign="top" class="imageContent padding" style="padding: 0 20px;">
                                                      <p class="thank-you-for-account-text" style="font-weight: 500 !important;font-size: 16px;line-height: 24px;color: #333333; margin-top: 11px;margin-bottom: 8px;">
                                                          <span style="font-weight: 600 !important;font-size: 18px;line-height: 27px;color: #000;display: block;">Hello Basheer,</span>
                                                          Thank you for shopping with us. We'll send a confirmation once your item has shipped. Your order details are
                                                          indicated below. The payment details of your transaction can be found on the order invoice. If you would like to view
                                                          the status of your order or make any changes to it, please visit Your Orderson digits.com
                                                      </p>
                                                  </td>
                                              </tr>
                                          </table>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td align="left" valign="top" width="600" class="flexibleContainerCell">
                                          <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                              <tr>
                                                  <td align="left" valign="top" style="padding:0 20px 0 20px;" class="padding">
                                                      <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                          <tr>
                                                              <td valign="top" class="textContent " style="padding-top: 0; padding-bottom:0;">
                                                                  <p class="order-summary-heading" style="font-weight: 600 !important;font-size: 18px;line-height: 27px;color: #000;display: block;margin: 10px 0 10px 0;">
                                                                      Order Summary
                                                                  </p>
                                                                  <a href=${link}><a/>
                                                                  <div style="display: block;width: 100%;float: left;" class="method-card-details">
                                                                      <p style="width: 50%;float: left;font-weight: 500;font-size: 16px;line-height: 24px;margin-top: 0;margin-bottom: 5px;">Payment Method:</p>
                                                                      <p style="width: 50%;float: left;text-align: right;font-weight: 600;font-size: 16px;line-height: 24px;color: #333333;margin-top: 0;margin-bottom: 5px;">Debit Card</p>
                                                                  </div>
                                                                  <div style="display: block;width: 100%;float: left;" class="method-card-total-details-1">
                                                                      <p class="number-plate-para" style="width: 33.33%;float: left;font-weight: 500;font-size: 16px;line-height: 24px;margin-top: 0;margin-bottom: 5px;">Number Plate: AA1</p>
                                                                      <p style="width: 33.33%;float: left;text-align: center;font-weight: 600;font-size: 16px;line-height: 24px;color: #333333;margin-top: 0;margin-bottom: 5px;">Order #</p>
                                                                      <p style="width: 33.33%;float: left;text-align: right;font-weight: 600;font-size: 16px;line-height: 24px;color: #333333;margin-top: 0;margin-bottom: 5px;">DG16631407413369</p>
                                                                  </div>
                                                                  <hr style="border-top:1px solid #FFBB38;margin: 10px 0;">
                                                                  <div style="display: block;width: 100%;float: left;" class="method-card-total-details-2">
                                                                      <p class="card-total-blank" style="width: 33.33%;float: left;font-weight: 500;font-size: 16px;line-height: 24px;margin-top: 0;margin-bottom: 10px;"></p>
                                                                      <p class="card-subtotal" style="width: 33.33%;float: left;text-align: center;font-weight: 600;font-size: 16px;line-height: 24px;color: #333333;margin-top: 0;margin-bottom: 0;">Subtotal</p>
                                                                      <p class="card-total-number" style="width: 33.33%;float: left;text-align: right;font-weight: 600;font-size: 16px;line-height: 24px;color: #333333;margin-top: 0;margin-bottom: 0;">RM 900000</p>
                                                                  </div>
                                                                  <div style="display: block;width: 100%;float: left;" class="method-card-total-details-3">
                                                                      <p class="card-processing-blank" style="width: 33.33%;float: left;font-weight: 500;font-size: 16px;line-height: 24px;margin-top: 0;margin-bottom: 10px;"></p>
                                                                      <p class="card-processing" style="width: 33.33%;float: left;text-align: center;;font-weight: 600;font-size: 16px;line-height: 24px;color: #333333;margin-top: 0;margin-bottom: 10px;">Processing Fee</p>
                                                                      <p class="card-processing-number" style="width: 33.33%;float: left;text-align: right;font-weight: 600;font-size: 16px;line-height: 24px;color: #333333;margin-top: 0;margin-bottom: 10px;">RM 250.00</p>
                                                                  </div>
                                                                  <hr style="border-top:1px solid #FFBB38;margin: 10px 0;">
                                                                  <div style="display: block;width: 100%;float: left;" class="method-card-total-details-4">
                                                                      <p class="card-grandtotal-blank" style="width: 33.33%;float: left;font-weight: 500;font-size: 16px;line-height: 24px;margin-top: 0;margin-bottom: 10px;"></p>
                                                                      <p class="card-grandtotal" style="width: 33.33%;float: left;text-align: center;font-weight: 600;font-size: 16px;line-height: 24px;color: #333333;margin-top: 0;margin-bottom: 10px;">Total</p>
                                                                      <p class="card-grandtotal-number" style="width: 33.33%;float: left;text-align: right;font-weight: 600;font-size: 16px;line-height: 24px;color: #333333;margin-top: 0;margin-bottom: 10px;">RM 900250</p>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                  </td>
                                              </tr>
                                          </table>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td align="center" valign="top" width="600" class="flexibleContainerCell">
                                          <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                              <tr>
                                                  <td align="center" valign="top" style="padding:0 20px 20px 20px;" class="padding">
                                                      <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                          <tr>
                                                              <td valign="top" class="textContent" style="padding-top: 0; padding-bottom:0;">
                                                                  <h2 class="customer-info-details" style="font-weight: 600;font-size: 18px;line-height: 27px;color: #333333;margin-top: 5px;margin-bottom: 5px;">Customer information:</h2>
                                                                  <div>
                                                                      <p class="shipping-info" style="width:48%;display: inline-block; font-weight: 500;font-size: 14px;line-height: 21px;color: #333333;margin: 0;"><span style="font-weight: 600;font-size: 16px;line-height: 24px;">Shipping Address:</span> Level 34, Menara Telekom, Jalan Pantai Baru, 59200 Kuala Lumpur.</p>
                                                                      <p class="billing-info" style="width:48%;display: inline-block;font-weight: 500;font-size: 14px;line-height: 21px;color: #333333;margin: 0;"><span style="font-weight: 600;font-size: 16px;line-height: 24px;">Billing Address:</span> Level 34, Menara Telekom, Jalan Pantai Baru, 59200 Kuala Lumpur.</p>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                  </td>
                                              </tr>
                                          </table>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td align="center" valign="top" width="600" class="flexibleContainerCell">
                                          <table border="0" cellpadding="30" cellspacing="0" width="100%">
                                              <tr>
                                                  <td align="center" valign="top" style="padding:0 20px 0 20px;" class="padding">
                                                      <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                          <tr>
                                                              <td valign="top" width="600" class="flexibleContainerCell padding" style="padding:0 20px 30px 20px;">
                                                                  <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%">
                                                                      <tr>
                                                                          <td align="left" valign="top" class="flexibleContainerBox">
                                                                              <table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" class="email-container">
                                                                                  <tr>
                                                                                      <td style="text-align: center;" class="footer-row-1">
                                                                                          <p style="padding:3px 0;margin: 0;font-weight: 500;font-size: 12px;color: #333333;"><img class="footer-fb-logo" src="./emailer-imgs/facebook.png" style="vertical-align: middle;padding-right: 5px;" alt=""><img class="footer-insta-logo" src="./emailer-imgs/instagram.png" style="vertical-align: middle;padding-right: 5px;" alt=""><img class="footer-youtube-logo" src="./emailer-imgs/youtube.png" style="vertical-align: middle;padding-right: 5px;" alt="">Follow us for latest Updates</p>
                                                                                      </td>
                                                                                  </tr>
                                                                                  <tr>
                                                                                      <td style="text-align: center;" class="footer-row-2">
                                                                                          <p class="footer-mail-logo" style="display: inline-block;padding:3px 0;margin: 0;font-weight: 500;font-size: 12px;line-height: 18px;color:#333">
                                                                                              <img style="vertical-align: middle;padding-right: 5px;" src="./emailer-imgs/email.png" alt=""><span style="font-weight: 600;font-size: 14px;line-height: 21px;color:#333">Email:</span> basheer.azmin@digits.com
                                                                                          </p>
                                                                                          <p class="footer-call-logo" style="display: inline-block;padding:3px 0;margin: 0;font-weight: 500;font-size: 12px;line-height: 18px;color:#333">
                                                                                              <img style="vertical-align: middle;padding-right: 5px;" src="./emailer-imgs/call.png" alt=""><span style="font-weight: 600;font-size: 14px;line-height: 21px;color:#333">Contact:</span> +60 31 21 111 00
                                                                                          </p>
                                                                                      </td>
                                                                                  </tr>
                                                                                  <tr>
                                                                                      <td style="text-align: center;" class="footer-row-3">
                                                                                          <p style="padding:3px 0;margin: 0;font-weight: 500;font-size: 12px;line-height: 18px;color:#333">
                                                                                              <img style="vertical-align: middle;padding-right: 5px;" src="./emailer-imgs/location.png" alt=""><span style="font-weight: 600;font-size: 14px;line-height: 21px;color:#333">Address:</span> Level 34, Menara Telekom, Jalan Pantai Baru, 59200 Kuala Lumpur.
                                                                                          </p>
                                                                                      </td>
                                                                                  </tr>
                                                                              </table>
                                                                          </td>
                                                                      </tr>
                                                                  </table>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                  </td>
                                              </tr>
                                          </table>
                                      </td>
                                  </tr>
                              </table>
                          </td>
                      </tr>
                  </table>
              </center>
          </body>
          
          </html>`,
                };
                return common_methods_1.CommonMethods.success(res, 'Mail sent successfully', await this.sendGridService.send(mail));
            });
        }
        else {
            return common_methods_1.CommonMethods.error(res, 'Mail not sent');
        }
    }
};
__decorate([
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PlateManagementService.prototype, "getAllPlates", null);
__decorate([
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PlateManagementService.prototype, "getPlate", null);
__decorate([
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, plateManagement_dto_1.PlateManagementDTO]),
    __metadata("design:returntype", Promise)
], PlateManagementService.prototype, "addPlate", null);
__decorate([
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, plateManagement_dto_1.PlateManagementDTO]),
    __metadata("design:returntype", Promise)
], PlateManagementService.prototype, "editPlate", null);
__decorate([
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PlateManagementService.prototype, "deletePlate", null);
__decorate([
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, plateManagement_dto_1.PlateManagementDTO]),
    __metadata("design:returntype", Promise)
], PlateManagementService.prototype, "editAsk", null);
__decorate([
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PlateManagementService.prototype, "sell_Pending", null);
__decorate([
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, plateManagement_dto_1.PlateManagementDTO]),
    __metadata("design:returntype", Promise)
], PlateManagementService.prototype, "reUploadImage", null);
__decorate([
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PlateManagementService.prototype, "getHighestBid", null);
__decorate([
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PlateManagementService.prototype, "getPlatesByUserID", null);
__decorate([
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PlateManagementService.prototype, "getAllPlatess", null);
PlateManagementService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('Plate')),
    __param(1, (0, mongoose_2.InjectModel)('User')),
    __param(2, (0, mongoose_2.InjectModel)('Order')),
    __param(3, (0, mongoose_2.InjectModel)('Purchase')),
    __param(4, (0, mongoose_2.InjectModel)('Session')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model,
        sendgrid_service_1.SendGridService])
], PlateManagementService);
exports.PlateManagementService = PlateManagementService;
//# sourceMappingURL=plateMangement.service.js.map