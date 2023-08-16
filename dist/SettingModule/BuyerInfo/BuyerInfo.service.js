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
exports.BuyerInfoService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const common_methods_1 = require("../../utilities/common-methods");
const BuyerInfo_dto_1 = require("./dto/BuyerInfo.dto");
let BuyerInfoService = class BuyerInfoService {
    constructor(buyerModel) {
        this.buyerModel = buyerModel;
    }
    async addCardDetails(res, buyerDTO) {
        const newCardDetails = new this.buyerModel(buyerDTO);
        if (newCardDetails) {
            await newCardDetails.save();
            return common_methods_1.CommonMethods.success(res, 'Card Details Added Successfully', []);
        }
        else {
            return common_methods_1.CommonMethods.error(res, 'Invalid Card Details');
        }
    }
    async updateCardDetails(res, card_id, buyerDTO) {
        const editCardDetails = await this.buyerModel.findByIdAndUpdate(card_id, buyerDTO, { new: true });
        if (editCardDetails) {
            return common_methods_1.CommonMethods.success(res, 'Card Details Update Successfully', editCardDetails);
        }
        else {
            return common_methods_1.CommonMethods.error(res, 'Invalid Details');
        }
    }
    async deleteCardDetails(res, card_id) {
        const deleteCardDetails = await this.buyerModel.findByIdAndDelete(card_id);
        if (deleteCardDetails) {
            return common_methods_1.CommonMethods.success(res, 'Card Details Deleted successfully', []);
        }
        else {
            return common_methods_1.CommonMethods.error(res, 'No Card Details Exists');
        }
    }
    async buyingInfoDetails(res, card_id) {
        const cardDetails = await this.buyerModel.findById(card_id).exec();
        if (cardDetails) {
            return common_methods_1.CommonMethods.success(res, 'Card Details Fetched Successfully', cardDetails);
        }
        else {
            return common_methods_1.CommonMethods.error(res, 'No Card Details Exists');
        }
    }
    async buyingInfo(res, user_id) {
        const payment = await this.buyerModel.find({ user_id }).exec();
        if (payment) {
            return common_methods_1.CommonMethods.success(res, 'Card Details Fetched Successfully', payment);
        }
        else {
            return common_methods_1.CommonMethods.error(res, 'No Card Details Exists');
        }
    }
};
__decorate([
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, BuyerInfo_dto_1.BuyerInfoDTO]),
    __metadata("design:returntype", Promise)
], BuyerInfoService.prototype, "addCardDetails", null);
__decorate([
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, BuyerInfo_dto_1.BuyerInfoDTO]),
    __metadata("design:returntype", Promise)
], BuyerInfoService.prototype, "updateCardDetails", null);
__decorate([
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BuyerInfoService.prototype, "deleteCardDetails", null);
__decorate([
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BuyerInfoService.prototype, "buyingInfoDetails", null);
__decorate([
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BuyerInfoService.prototype, "buyingInfo", null);
BuyerInfoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('Buyer')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], BuyerInfoService);
exports.BuyerInfoService = BuyerInfoService;
//# sourceMappingURL=BuyerInfo.service.js.map