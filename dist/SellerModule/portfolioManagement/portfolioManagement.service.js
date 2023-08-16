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
exports.PortfolioManagementService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const common_methods_1 = require("../../utilities/common-methods");
let PortfolioManagementService = class PortfolioManagementService {
    constructor(userModel, purchaseModel, plateModel) {
        this.userModel = userModel;
        this.purchaseModel = purchaseModel;
        this.plateModel = plateModel;
    }
    async plateCountRanking(res, user_id) {
        const plate = await this.purchaseModel.find({ owner_id: user_id });
        const plateCount = Object.keys(plate).length;
        var totalSales = 0;
        plate.forEach((element) => {
            totalSales =
                Number(totalSales) + Number(element.bid_price || element.sell_price);
        });
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
        const getPlateRank = plateRankArray.find(({ userID }) => userID === user_id);
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
        const getSalesRank = salesRankArray.find(({ userID }) => userID === user_id);
        const total = await this.plateModel
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
        const total1 = await this.plateModel
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
        const response = {
            plateCount,
            plateRank: getPlateRank.rank,
            totalSales,
            totalSalesRank: getSalesRank.rank,
            gainAndLoss: difference,
            gainAndLossRank: getGainRank.rank,
        };
        return common_methods_1.CommonMethods.success(res, 'Success', response);
    }
};
PortfolioManagementService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('User')),
    __param(1, (0, mongoose_2.InjectModel)('Purchase')),
    __param(2, (0, mongoose_2.InjectModel)('Plate')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model])
], PortfolioManagementService);
exports.PortfolioManagementService = PortfolioManagementService;
//# sourceMappingURL=portfolioManagement.service.js.map