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
exports.PurchaseManagementService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const common_methods_1 = require("../../utilities/common-methods");
let PurchaseManagementService = class PurchaseManagementService {
    constructor(purchaseModel, orderModel, plateModel) {
        this.purchaseModel = purchaseModel;
        this.orderModel = orderModel;
        this.plateModel = plateModel;
    }
    async getPurchase(res, plate_id) {
        const purchase = await this.purchaseModel.find({ plate_id }).exec();
        if (purchase.length > 0) {
            return common_methods_1.CommonMethods.success(res, 'Success', purchase);
        }
        else {
            return common_methods_1.CommonMethods.error(res, 'Purchase does not exists');
        }
    }
    async addPayment(res, purchaseManagementDTO) {
        const request = require('request');
        const randomOrderId = 'DB' + Date.now().toString();
        const orderID = randomOrderId + Math.floor(Math.random() * 10);
        purchaseManagementDTO.orderID = orderID;
        const newPurchase = await new this.purchaseModel(purchaseManagementDTO).save();
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
                    Authorization: 'Basic MGFlZDlkZmMtZDQzZC00NzEyLWI2MjctOTJlM2Q2ODBkZmE4Og==',
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
                    return res.status(common_1.HttpStatus.OK).json({
                        message: 'fail',
                        status: false,
                        error,
                    });
                }
                return res.status(common_1.HttpStatus.OK).json({
                    message: 'success',
                    status: true,
                    data,
                    orderID,
                });
            });
        }
        else {
            return common_methods_1.CommonMethods.error(res, 'Purchase not success');
        }
    }
    async addBidPayment(res, purchaseManagementDTO) {
        const request = require('request');
        const randomOrderId = 'DB' + Date.now().toString();
        const orderID = randomOrderId + Math.floor(Math.random() * 10);
        purchaseManagementDTO.orderID = orderID;
        const newPurchase = await new this.purchaseModel(purchaseManagementDTO).save();
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
                    Authorization: 'Basic MGFlZDlkZmMtZDQzZC00NzEyLWI2MjctOTJlM2Q2ODBkZmE4Og==',
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
            request(options, function (error, response) {
                const data = JSON.parse(response.body);
                data.amount = data.amount / 10;
                if (data.error) {
                    console.log(data.error);
                    return res.status(common_1.HttpStatus.OK).json({
                        message: 'fail',
                        status: false,
                        error: data.error,
                    });
                }
                return res.status(common_1.HttpStatus.OK).json({
                    message: 'success',
                    status: true,
                    data,
                    orderID,
                });
            });
        }
        else {
            return common_methods_1.CommonMethods.error(res, 'Purchase not success');
        }
    }
    async remainingPayment(res, purchaseManagementDTO) {
        const request = require('request');
        const randomOrderId = 'DG' + Date.now().toString();
        const orderID = randomOrderId + Math.floor(Math.random() * 10);
        purchaseManagementDTO.orderID = orderID;
        const newPurchase = await new this.purchaseModel(purchaseManagementDTO).save();
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
                    Authorization: 'Basic MGFlZDlkZmMtZDQzZC00NzEyLWI2MjctOTJlM2Q2ODBkZmE4Og==',
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
            request(options, function (error, response) {
                const data = JSON.parse(response.body);
                data.amount = data.amount / 100;
                if (data.error) {
                    console.log(data.error);
                    return res.status(common_1.HttpStatus.OK).json({
                        message: 'fail',
                        status: false,
                        error,
                    });
                }
                return res.status(common_1.HttpStatus.OK).json({
                    message: 'success',
                    status: true,
                    data,
                    orderID,
                });
            });
        }
        else {
            return common_methods_1.CommonMethods.error(res, 'Purchase not success');
        }
    }
    async addPurchase(res, purchaseManagementDTO) {
        const orderID = purchaseManagementDTO.orderID;
        const newPurchase = await this.purchaseModel.findOneAndUpdate({ orderID }, purchaseManagementDTO, { new: true });
        if (newPurchase) {
            const newOrder = await this.orderModel.findOneAndUpdate({ orderID }, purchaseManagementDTO, { new: true });
            const plate_number = newPurchase.plate_number;
            const deactivate = await this.plateModel.updateMany({ plate_number }, { $set: { sell_status: '0' } });
            console.log(deactivate);
            const data = {
                newPurchase,
                newOrder,
            };
            return common_methods_1.CommonMethods.success(res, 'Order confirm', data);
        }
        else {
            return common_methods_1.CommonMethods.error(res, 'Purchase not success');
        }
    }
    async addBidPurchase(res, purchaseManagementDTO) {
        const newPurchase = await new this.purchaseModel(purchaseManagementDTO).save();
        if (newPurchase) {
            const newOrder = await new this.orderModel(purchaseManagementDTO).save();
            const data = {
                newPurchase,
                newOrder,
            };
            return common_methods_1.CommonMethods.success(res, 'Purchase successfully', data);
        }
        else {
            return common_methods_1.CommonMethods.error(res, 'Purchase not success');
        }
    }
    async getBuyerProfileData(res, user_id) {
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
            return common_methods_1.CommonMethods.success(res, 'Purchase List fetched successfully', purchases);
        }
        else {
            return common_methods_1.CommonMethods.error(res, 'No Purchase exists');
        }
    }
    async editPurchase(res, orderID, purchaseManagementDTO) {
        const updatePurchase = await this.purchaseModel.findOneAndUpdate({ orderID }, purchaseManagementDTO);
        const updateOrder = await this.orderModel.findOneAndUpdate({ orderID }, purchaseManagementDTO);
        const data = {
            updatePurchase,
            updateOrder,
        };
        if (!data) {
            return common_methods_1.CommonMethods.error(res, 'Purchase not success');
        }
        else {
            return common_methods_1.CommonMethods.success(res, 'Purchase details added successfully', data);
        }
    }
    async getPurchasedPlate(res, user_id, plate_id) {
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
            return common_methods_1.CommonMethods.success(res, 'Purchase List fetched successfully', purchases[0]);
        }
        else {
            return common_methods_1.CommonMethods.error(res, 'No Purchase exists');
        }
    }
    async deletePurchases(res, orderID) {
        const deletePurchase = await this.purchaseModel.findOneAndDelete({
            orderID,
        });
        const deleteOrder = await this.orderModel.findOneAndDelete({ orderID });
        if (deletePurchase == null || deleteOrder == null) {
            return common_methods_1.CommonMethods.error(res, 'Bid not Delete');
        }
        else {
            return common_methods_1.CommonMethods.success(res, 'Bid delete successfully', []);
        }
    }
    async getsinglePurchases(res, plate_id) {
        const getsinglePurchase = await this.purchaseModel
            .find({
            plate_id,
        })
            .sort({ created_at: -1 })
            .limit(1);
        console.log(getsinglePurchase);
        if (getsinglePurchase) {
            return common_methods_1.CommonMethods.success(res, 'Bid get successfully', getsinglePurchase);
        }
        else {
            return common_methods_1.CommonMethods.error(res, 'Bid not get');
        }
    }
};
__decorate([
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PurchaseManagementService.prototype, "getPurchase", null);
__decorate([
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PurchaseManagementService.prototype, "getBuyerProfileData", null);
__decorate([
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], PurchaseManagementService.prototype, "getPurchasedPlate", null);
__decorate([
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PurchaseManagementService.prototype, "deletePurchases", null);
__decorate([
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PurchaseManagementService.prototype, "getsinglePurchases", null);
PurchaseManagementService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('Purchase')),
    __param(1, (0, mongoose_2.InjectModel)('Order')),
    __param(2, (0, mongoose_2.InjectModel)('Plate')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model])
], PurchaseManagementService);
exports.PurchaseManagementService = PurchaseManagementService;
//# sourceMappingURL=purchaseManagement.service.js.map