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
exports.PurchaseManagementController = void 0;
const common_1 = require("@nestjs/common");
const purchaseManagement_service_1 = require("./purchaseManagement.service");
const purchaseManagement_dto_1 = require("./purchaseManagement.dto");
let PurchaseManagementController = class PurchaseManagementController {
    constructor(purchaseManagementService) {
        this.purchaseManagementService = purchaseManagementService;
    }
    async getPurchase(res, plate_id) {
        await this.purchaseManagementService.getPurchase(res, plate_id);
    }
    async addPayment(res, purchaseManagementDTO) {
        await this.purchaseManagementService.addPayment(res, purchaseManagementDTO);
    }
    async addBidPayment(res, purchaseManagementDTO) {
        await this.purchaseManagementService.addBidPayment(res, purchaseManagementDTO);
    }
    async remainingPaymenttt(res, purchaseManagementDTO) {
        await this.purchaseManagementService.remainingPayment(res, purchaseManagementDTO);
    }
    async addPurchase(res, purchaseManagementDTO) {
        await this.purchaseManagementService.addPurchase(res, purchaseManagementDTO);
    }
    async addBidPurchase(res, purchaseManagementDTO) {
        await this.purchaseManagementService.addBidPurchase(res, purchaseManagementDTO);
    }
    async getBuyerProfileData(res, user_id) {
        await this.purchaseManagementService.getBuyerProfileData(res, user_id);
    }
    async editPurchase(res, orderID, purchaseManagementDTO) {
        await this.purchaseManagementService.editPurchase(res, orderID, purchaseManagementDTO);
    }
    async getPurchasedPlate(res, user_id, plate_id) {
        await this.purchaseManagementService.getPurchasedPlate(res, user_id, plate_id);
    }
    async deletePurchases(res, orderID) {
        await this.purchaseManagementService.deletePurchases(res, orderID);
    }
    async getsinglePurchases(res, plate_id) {
        await this.purchaseManagementService.getsinglePurchases(res, plate_id);
    }
};
__decorate([
    (0, common_1.Get)('getPurchase/:plate_id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('plate_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PurchaseManagementController.prototype, "getPurchase", null);
__decorate([
    (0, common_1.Post)('/addPayment'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, purchaseManagement_dto_1.PurchaseManagementDTO]),
    __metadata("design:returntype", Promise)
], PurchaseManagementController.prototype, "addPayment", null);
__decorate([
    (0, common_1.Post)('/addBidPayment'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, purchaseManagement_dto_1.PurchaseManagementDTO]),
    __metadata("design:returntype", Promise)
], PurchaseManagementController.prototype, "addBidPayment", null);
__decorate([
    (0, common_1.Post)('/remainingPayment'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, purchaseManagement_dto_1.PurchaseManagementDTO]),
    __metadata("design:returntype", Promise)
], PurchaseManagementController.prototype, "remainingPaymenttt", null);
__decorate([
    (0, common_1.Post)('/addPurchase'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, purchaseManagement_dto_1.PurchaseManagementDTO]),
    __metadata("design:returntype", Promise)
], PurchaseManagementController.prototype, "addPurchase", null);
__decorate([
    (0, common_1.Post)('/addBidPurchase'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, purchaseManagement_dto_1.PurchaseManagementDTO]),
    __metadata("design:returntype", Promise)
], PurchaseManagementController.prototype, "addBidPurchase", null);
__decorate([
    (0, common_1.Get)('/getBuyerProfile/:user_id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PurchaseManagementController.prototype, "getBuyerProfileData", null);
__decorate([
    (0, common_1.Post)('/editPurchase'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)('orderID')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, purchaseManagement_dto_1.PurchaseManagementDTO]),
    __metadata("design:returntype", Promise)
], PurchaseManagementController.prototype, "editPurchase", null);
__decorate([
    (0, common_1.Post)('/getPurchasedPlate/:user_id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('user_id')),
    __param(2, (0, common_1.Body)('plate_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], PurchaseManagementController.prototype, "getPurchasedPlate", null);
__decorate([
    (0, common_1.Delete)('/delete'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)('orderID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PurchaseManagementController.prototype, "deletePurchases", null);
__decorate([
    (0, common_1.Get)('getSinglePurchase/:plate_id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('plate_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PurchaseManagementController.prototype, "getsinglePurchases", null);
PurchaseManagementController = __decorate([
    (0, common_1.Controller)('purchase'),
    __metadata("design:paramtypes", [purchaseManagement_service_1.PurchaseManagementService])
], PurchaseManagementController);
exports.PurchaseManagementController = PurchaseManagementController;
//# sourceMappingURL=purchaseManagement.controller.js.map