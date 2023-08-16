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
exports.PlateManagementController = void 0;
const common_1 = require("@nestjs/common");
const plateMangement_service_1 = require("./plateMangement.service");
const plateManagement_dto_1 = require("./plateManagement.dto");
let PlateManagementController = class PlateManagementController {
    constructor(plateManagementService) {
        this.plateManagementService = plateManagementService;
    }
    async addPlate(res, plateManagementDTO) {
        await this.plateManagementService.addPlate(res, plateManagementDTO);
    }
    async getAllPlates(res) {
        await this.plateManagementService.getAllPlates(res);
    }
    async getPlate(res, plateID) {
        await this.plateManagementService.getPlate(res, plateID);
    }
    async getPlatesByUserID(res, user_id) {
        await this.plateManagementService.getPlatesByUserID(res, user_id);
    }
    async editAsk(res, plateID, plateManagementDTO) {
        await this.plateManagementService.editAsk(res, plateID, plateManagementDTO);
    }
    async pending(res, userID) {
        await this.plateManagementService.sell_Pending(res, userID);
    }
    async editPlate(res, plateID, plateManagementDTO) {
        await this.plateManagementService.editPlate(res, plateID, plateManagementDTO);
    }
    async deletePlate(res, plateID) {
        await this.plateManagementService.deletePlate(res, plateID);
    }
    async GetAllPlates(res) {
        const users = await this.plateManagementService.GetAllPlates();
        const totalplates = await this.plateManagementService.countallplates(users);
        const onbid = await this.plateManagementService.getallbidcount(users);
        const onsell = await this.plateManagementService.getallsellcount(users);
        return res.status(common_1.HttpStatus.OK).json({ totalplates, onbid, onsell });
    }
    async uploadFile(res, body) {
        await this.plateManagementService.uploadFile(res, body);
    }
    getProfileImage(filename, res) {
        return res.sendFile(filename, { root: 'uploads/plate' });
    }
    async reUploadImage(res, plateID, plateManagementDTO) {
        await this.plateManagementService.reUploadImage(res, plateID, plateManagementDTO);
    }
    async getHighestBid(res, plate_number) {
        await this.plateManagementService.getHighestBid(res, plate_number);
    }
    async staticPages(res) {
        await this.plateManagementService.staticPages(res);
    }
    async getAllPlatess(res) {
        await this.plateManagementService.getAllPlatess(res);
    }
};
__decorate([
    (0, common_1.Post)('/add_plate'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, plateManagement_dto_1.PlateManagementDTO]),
    __metadata("design:returntype", Promise)
], PlateManagementController.prototype, "addPlate", null);
__decorate([
    (0, common_1.Get)('/getAllPlates'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PlateManagementController.prototype, "getAllPlates", null);
__decorate([
    (0, common_1.Get)('plate/:plateID'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('plateID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PlateManagementController.prototype, "getPlate", null);
__decorate([
    (0, common_1.Get)('/getPlatesByUserID/:user_id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PlateManagementController.prototype, "getPlatesByUserID", null);
__decorate([
    (0, common_1.Put)('/editAsk'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('plateID')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, plateManagement_dto_1.PlateManagementDTO]),
    __metadata("design:returntype", Promise)
], PlateManagementController.prototype, "editAsk", null);
__decorate([
    (0, common_1.Get)('/sell_Pending'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('userID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PlateManagementController.prototype, "pending", null);
__decorate([
    (0, common_1.Put)('/editPlate'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('plateID')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, plateManagement_dto_1.PlateManagementDTO]),
    __metadata("design:returntype", Promise)
], PlateManagementController.prototype, "editPlate", null);
__decorate([
    (0, common_1.Delete)('/delete'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('plateID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PlateManagementController.prototype, "deletePlate", null);
__decorate([
    (0, common_1.Get)('/count_list'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PlateManagementController.prototype, "GetAllPlates", null);
__decorate([
    (0, common_1.Post)('upload_image'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PlateManagementController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Get)('uploads/plate/:filename'),
    __param(0, (0, common_1.Param)('filename')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PlateManagementController.prototype, "getProfileImage", null);
__decorate([
    (0, common_1.Post)('reUploadImage/:plateID'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('plateID')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, plateManagement_dto_1.PlateManagementDTO]),
    __metadata("design:returntype", Promise)
], PlateManagementController.prototype, "reUploadImage", null);
__decorate([
    (0, common_1.Get)('/getHighestBid/:plate_number'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('plate_number')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PlateManagementController.prototype, "getHighestBid", null);
__decorate([
    (0, common_1.Get)('/staticPages'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PlateManagementController.prototype, "staticPages", null);
__decorate([
    (0, common_1.Get)('getAllPlatess'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PlateManagementController.prototype, "getAllPlatess", null);
PlateManagementController = __decorate([
    (0, common_1.Controller)('plates'),
    __metadata("design:paramtypes", [plateMangement_service_1.PlateManagementService])
], PlateManagementController);
exports.PlateManagementController = PlateManagementController;
//# sourceMappingURL=plateManagement.controller.js.map