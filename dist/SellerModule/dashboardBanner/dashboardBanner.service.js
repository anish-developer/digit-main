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
exports.DashboardBannerService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let DashboardBannerService = class DashboardBannerService {
    constructor(userModel, plateModel, purchaseModel) {
        this.userModel = userModel;
        this.plateModel = plateModel;
        this.purchaseModel = purchaseModel;
    }
    async getAllUser() {
        const users = await this.userModel.find().exec();
        return users;
    }
    async getAllPlate() {
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
        return difference;
    }
};
DashboardBannerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('User')),
    __param(1, (0, mongoose_2.InjectModel)('Plate')),
    __param(2, (0, mongoose_2.InjectModel)('Purchase')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model])
], DashboardBannerService);
exports.DashboardBannerService = DashboardBannerService;
//# sourceMappingURL=dashboardBanner.service.js.map