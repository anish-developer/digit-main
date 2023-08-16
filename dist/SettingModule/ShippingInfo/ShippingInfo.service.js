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
exports.ShippingInfoService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const common_methods_1 = require("../../utilities/common-methods");
const Shippinginfo_dto_1 = require("./dto/Shippinginfo.dto");
let ShippingInfoService = class ShippingInfoService {
    constructor(shippingModel) {
        this.shippingModel = shippingModel;
    }
    async createAddress(res, shippingDTO) {
        const newAddress = await new this.shippingModel(shippingDTO);
        if (newAddress) {
            await newAddress.save();
            return common_methods_1.CommonMethods.success(res, 'Address Successfully Added', []);
        }
        else {
            return common_methods_1.CommonMethods.error(res, 'Error In Creating Address');
        }
    }
    async updateAddress(res, address_id, shippingDTO) {
        const editAddress = await this.shippingModel.findByIdAndUpdate(address_id, shippingDTO, { new: true });
        if (editAddress) {
            return common_methods_1.CommonMethods.success(res, 'Address Edited Successfully', editAddress);
        }
        else {
            return common_methods_1.CommonMethods.error(res, 'No Address Present');
        }
    }
    async deleteAddress(res, address_id) {
        const deleteAddr = await this.shippingModel.findByIdAndDelete(address_id);
        if (deleteAddr) {
            return common_methods_1.CommonMethods.success(res, 'Address Deleted successfully', []);
        }
        else {
            return common_methods_1.CommonMethods.error(res, 'No Address present');
        }
    }
    async getAddressByUserId(res, address_id) {
        const address = await this.shippingModel.findById(address_id).exec();
        if (address) {
            return common_methods_1.CommonMethods.success(res, 'Address List fetched successfully', address);
        }
        else {
            return common_methods_1.CommonMethods.error(res, 'No Address Exists');
        }
    }
    async addressinfo(res, user_id) {
        const payment = await this.shippingModel.find({ user_id }).exec();
        if (payment) {
            return common_methods_1.CommonMethods.success(res, 'Address List fetched successfully', payment);
        }
        else {
            return common_methods_1.CommonMethods.error(res, 'Payment does not exists');
        }
    }
};
__decorate([
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Shippinginfo_dto_1.ShippingInfoDTO]),
    __metadata("design:returntype", Promise)
], ShippingInfoService.prototype, "createAddress", null);
__decorate([
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Shippinginfo_dto_1.ShippingInfoDTO]),
    __metadata("design:returntype", Promise)
], ShippingInfoService.prototype, "updateAddress", null);
__decorate([
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ShippingInfoService.prototype, "deleteAddress", null);
__decorate([
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ShippingInfoService.prototype, "getAddressByUserId", null);
__decorate([
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ShippingInfoService.prototype, "addressinfo", null);
ShippingInfoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('Shipping')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], ShippingInfoService);
exports.ShippingInfoService = ShippingInfoService;
//# sourceMappingURL=ShippingInfo.service.js.map