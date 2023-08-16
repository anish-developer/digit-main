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
exports.BuyerInfoController = void 0;
const common_1 = require("@nestjs/common");
const BuyerInfo_service_1 = require("./BuyerInfo.service");
const BuyerInfo_dto_1 = require("./dto/BuyerInfo.dto");
let BuyerInfoController = class BuyerInfoController {
    constructor(BuyerInfoService) {
        this.BuyerInfoService = BuyerInfoService;
    }
    async addCardDetails(res, buyerDTO) {
        await this.BuyerInfoService.addCardDetails(res, buyerDTO);
    }
    async updateCardDetails(res, card_id, buyerDTO) {
        await this.BuyerInfoService.updateCardDetails(res, card_id, buyerDTO);
    }
    async deleteCardDetails(res, card_id) {
        await this.BuyerInfoService.deleteCardDetails(res, card_id);
    }
    async buyingInfoDetails(res, card_id) {
        return await this.BuyerInfoService.buyingInfoDetails(res, card_id);
    }
    async getPayment(res, user_id) {
        await this.BuyerInfoService.buyingInfo(res, user_id);
    }
};
__decorate([
    (0, common_1.Post)('/add_card_details'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, BuyerInfo_dto_1.BuyerInfoDTO]),
    __metadata("design:returntype", Promise)
], BuyerInfoController.prototype, "addCardDetails", null);
__decorate([
    (0, common_1.Put)('/update_card_details/:card_id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('card_id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, BuyerInfo_dto_1.BuyerInfoDTO]),
    __metadata("design:returntype", Promise)
], BuyerInfoController.prototype, "updateCardDetails", null);
__decorate([
    (0, common_1.Delete)('/delete_card_details/:card_id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('card_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BuyerInfoController.prototype, "deleteCardDetails", null);
__decorate([
    (0, common_1.Get)('/buyout_info_details/:card_id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('card_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BuyerInfoController.prototype, "buyingInfoDetails", null);
__decorate([
    (0, common_1.Get)('buyout_info/:user_id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BuyerInfoController.prototype, "getPayment", null);
BuyerInfoController = __decorate([
    (0, common_1.Controller)('buyerInfo'),
    __metadata("design:paramtypes", [BuyerInfo_service_1.BuyerInfoService])
], BuyerInfoController);
exports.BuyerInfoController = BuyerInfoController;
//# sourceMappingURL=BuyerInfo.contoller.js.map