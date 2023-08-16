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
exports.ShippingInfoController = void 0;
const common_1 = require("@nestjs/common");
const ShippingInfo_service_1 = require("./ShippingInfo.service");
const Shippinginfo_dto_1 = require("./dto/Shippinginfo.dto");
let ShippingInfoController = class ShippingInfoController {
    constructor(ShippingInfoService) {
        this.ShippingInfoService = ShippingInfoService;
    }
    async createNews(res, shippingDTO) {
        await this.ShippingInfoService.createAddress(res, shippingDTO);
    }
    async updateAddress(res, address_id, shippingDTO) {
        await this.ShippingInfoService.updateAddress(res, address_id, shippingDTO);
    }
    async deleteAddress(res, address_id) {
        await this.ShippingInfoService.deleteAddress(res, address_id);
    }
    async getAddressByUserId(res, address_id) {
        return await this.ShippingInfoService.getAddressByUserId(res, address_id);
    }
    async getPayment(res, user_id) {
        await this.ShippingInfoService.addressinfo(res, user_id);
    }
};
__decorate([
    (0, common_1.Post)('/address_create'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Shippinginfo_dto_1.ShippingInfoDTO]),
    __metadata("design:returntype", Promise)
], ShippingInfoController.prototype, "createNews", null);
__decorate([
    (0, common_1.Put)('/address_update/:address_id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('address_id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Shippinginfo_dto_1.ShippingInfoDTO]),
    __metadata("design:returntype", Promise)
], ShippingInfoController.prototype, "updateAddress", null);
__decorate([
    (0, common_1.Delete)('/delete_address/:address_id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('address_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ShippingInfoController.prototype, "deleteAddress", null);
__decorate([
    (0, common_1.Get)('/user_address_list/:address_id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('address_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ShippingInfoController.prototype, "getAddressByUserId", null);
__decorate([
    (0, common_1.Get)('/user_address/:user_id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ShippingInfoController.prototype, "getPayment", null);
ShippingInfoController = __decorate([
    (0, common_1.Controller)('shippingInfo'),
    __metadata("design:paramtypes", [ShippingInfo_service_1.ShippingInfoService])
], ShippingInfoController);
exports.ShippingInfoController = ShippingInfoController;
//# sourceMappingURL=ShippingInfo.controller.js.map