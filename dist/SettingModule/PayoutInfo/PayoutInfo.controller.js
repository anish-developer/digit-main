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
exports.PayoutInfoController = void 0;
const common_1 = require("@nestjs/common");
const PayoutInfo_service_1 = require("./PayoutInfo.service");
const PayoutInfo_dto_1 = require("./dto/PayoutInfo.dto");
let PayoutInfoController = class PayoutInfoController {
    constructor(PayoutInfoService) {
        this.PayoutInfoService = PayoutInfoService;
    }
    async createBankDetails(res, payoutDTO) {
        await this.PayoutInfoService.createBankDetails(res, payoutDTO);
    }
    async updateBankDetails(res, payout_id, payoutDTO) {
        await this.PayoutInfoService.updateBankDetails(res, payout_id, payoutDTO);
    }
    async deleteBankDetails(res, payout_id) {
        await this.PayoutInfoService.deleteBankDetails(res, payout_id);
    }
    async payoutInfoDetails(res, payout_id) {
        return await this.PayoutInfoService.payoutInfoDetails(res, payout_id);
    }
    async getPayment(res, user_id) {
        await this.PayoutInfoService.payoutInfo(res, user_id);
    }
};
__decorate([
    (0, common_1.Post)('/create_bank_details'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, PayoutInfo_dto_1.PayoutInfoDTO]),
    __metadata("design:returntype", Promise)
], PayoutInfoController.prototype, "createBankDetails", null);
__decorate([
    (0, common_1.Put)('/update_bank_details/:payout_id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('payout_id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, PayoutInfo_dto_1.PayoutInfoDTO]),
    __metadata("design:returntype", Promise)
], PayoutInfoController.prototype, "updateBankDetails", null);
__decorate([
    (0, common_1.Delete)('/delete_bank_details/:payout_id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('payout_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PayoutInfoController.prototype, "deleteBankDetails", null);
__decorate([
    (0, common_1.Get)('/payout_info_details/:payout_id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('payout_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PayoutInfoController.prototype, "payoutInfoDetails", null);
__decorate([
    (0, common_1.Get)('payout_info/:user_id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PayoutInfoController.prototype, "getPayment", null);
PayoutInfoController = __decorate([
    (0, common_1.Controller)('payoutInfo'),
    __metadata("design:paramtypes", [PayoutInfo_service_1.PayoutInfoService])
], PayoutInfoController);
exports.PayoutInfoController = PayoutInfoController;
//# sourceMappingURL=PayoutInfo.controller.js.map