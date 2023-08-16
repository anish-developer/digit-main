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
exports.PaymentManagementController = void 0;
const common_1 = require("@nestjs/common");
const paymentManagement_service_1 = require("./paymentManagement.service");
const paymentManagement_dto_1 = require("./paymentManagement.dto");
let PaymentManagementController = class PaymentManagementController {
    constructor(paymentManagementService) {
        this.paymentManagementService = paymentManagementService;
    }
    async getPayment(res, user_id) {
        await this.paymentManagementService.getPayment(res, user_id);
    }
    async editPayment(res, paymentManagementDTO) {
        await this.paymentManagementService.editPayment(res, paymentManagementDTO);
    }
};
__decorate([
    (0, common_1.Get)('getPayment/:user_id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PaymentManagementController.prototype, "getPayment", null);
__decorate([
    (0, common_1.Put)('/editPayment'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, paymentManagement_dto_1.PaymentManagementDTO]),
    __metadata("design:returntype", Promise)
], PaymentManagementController.prototype, "editPayment", null);
PaymentManagementController = __decorate([
    (0, common_1.Controller)('payment'),
    __metadata("design:paramtypes", [paymentManagement_service_1.PaymentManagementService])
], PaymentManagementController);
exports.PaymentManagementController = PaymentManagementController;
//# sourceMappingURL=paymentManagement.controller.js.map