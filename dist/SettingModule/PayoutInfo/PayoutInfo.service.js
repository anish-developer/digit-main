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
exports.PayoutInfoService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const common_methods_1 = require("../../utilities/common-methods");
const PayoutInfo_dto_1 = require("./dto/PayoutInfo.dto");
let PayoutInfoService = class PayoutInfoService {
    constructor(payoutModel) {
        this.payoutModel = payoutModel;
    }
    async createBankDetails(res, payoutDTO) {
        const newBankDetails = new this.payoutModel(payoutDTO);
        if (newBankDetails) {
            await newBankDetails.save();
            return common_methods_1.CommonMethods.success(res, 'Bank Details Added Successfully', newBankDetails);
        }
        else {
            return common_methods_1.CommonMethods.error(res, 'Error Adding Bank Details');
        }
    }
    async updateBankDetails(res, payout_id, payoutDTO) {
        const editBankDetails = await this.payoutModel.findByIdAndUpdate(payout_id, payoutDTO, { new: true });
        if (editBankDetails) {
            return common_methods_1.CommonMethods.success(res, 'Bank Details Edited Successfully', editBankDetails);
        }
        else {
            return common_methods_1.CommonMethods.error(res, 'No Address Present');
        }
    }
    async deleteBankDetails(res, payout_id) {
        const deleteBankDetails = await this.payoutModel.findByIdAndDelete(payout_id);
        if (deleteBankDetails) {
            return common_methods_1.CommonMethods.success(res, 'Bank Details Deleted successfully', []);
        }
        else {
            return common_methods_1.CommonMethods.error(res, 'No Bank Details Exists');
        }
    }
    async payoutInfoDetails(res, payout_id) {
        const bankDetails = await this.payoutModel.findById(payout_id).exec();
        if (bankDetails) {
            return common_methods_1.CommonMethods.success(res, 'Bank Details Fetched Successfully', bankDetails);
        }
        else {
            return common_methods_1.CommonMethods.error(res, 'No Bank Details Exists');
        }
    }
    async payoutInfo(res, user_id) {
        const payout = await this.payoutModel.find({ user_id }).exec();
        if (payout) {
            return common_methods_1.CommonMethods.success(res, 'Bank Details Fetched Successfully', payout);
        }
        else {
            return common_methods_1.CommonMethods.error(res, 'No Bank Details Exists');
        }
    }
};
__decorate([
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, PayoutInfo_dto_1.PayoutInfoDTO]),
    __metadata("design:returntype", Promise)
], PayoutInfoService.prototype, "createBankDetails", null);
__decorate([
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, PayoutInfo_dto_1.PayoutInfoDTO]),
    __metadata("design:returntype", Promise)
], PayoutInfoService.prototype, "updateBankDetails", null);
__decorate([
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PayoutInfoService.prototype, "deleteBankDetails", null);
__decorate([
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PayoutInfoService.prototype, "payoutInfoDetails", null);
__decorate([
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PayoutInfoService.prototype, "payoutInfo", null);
PayoutInfoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('Payout')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], PayoutInfoService);
exports.PayoutInfoService = PayoutInfoService;
//# sourceMappingURL=PayoutInfo.service.js.map