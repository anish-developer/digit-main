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
exports.PaymentManagementService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const paymentManagement_dto_1 = require("./paymentManagement.dto");
const common_methods_1 = require("../../utilities/common-methods");
let PaymentManagementService = class PaymentManagementService {
    constructor(paymentModel) {
        this.paymentModel = paymentModel;
    }
    async getPayment(res, user_id) {
        const payment = await this.paymentModel.findOne({ user_id }).exec();
        if (payment) {
            return common_methods_1.CommonMethods.success(res, 'Success', payment);
        }
        else {
            return common_methods_1.CommonMethods.error(res, 'Payment does not exists');
        }
    }
    async editPayment(res, paymentManagementDTO) {
        const { user_id } = paymentManagementDTO;
        const payment = await this.paymentModel.findOne({ user_id });
        if (!payment) {
            const newPayment = await new this.paymentModel(paymentManagementDTO).save();
            return common_methods_1.CommonMethods.success(res, 'Payment details added successfully', newPayment);
        }
        else {
            const editPayment = await this.paymentModel.findOneAndUpdate({ user_id }, paymentManagementDTO, { new: true });
            if (editPayment) {
                return common_methods_1.CommonMethods.success(res, 'Payment details edited successfully', editPayment);
            }
            else {
                return common_methods_1.CommonMethods.error(res, 'No Payment details present');
            }
        }
    }
};
__decorate([
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PaymentManagementService.prototype, "getPayment", null);
__decorate([
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, paymentManagement_dto_1.PaymentManagementDTO]),
    __metadata("design:returntype", Promise)
], PaymentManagementService.prototype, "editPayment", null);
PaymentManagementService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('Payment')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], PaymentManagementService);
exports.PaymentManagementService = PaymentManagementService;
//# sourceMappingURL=paymentManagement.service.js.map