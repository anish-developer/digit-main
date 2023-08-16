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
exports.UserManagementController = void 0;
const common_1 = require("@nestjs/common");
const userMangement_service_1 = require("./userMangement.service");
const userManagement_dto_1 = require("./userManagement.dto");
let UserManagementController = class UserManagementController {
    constructor(userManagementService) {
        this.userManagementService = userManagementService;
    }
    async getUserDetails(res, userID) {
        await this.userManagementService.getUserDetails(res, userID);
    }
    async editUser(res, userID, userManagementDTO) {
        await this.userManagementService.updateUser(res, userID, userManagementDTO);
    }
};
__decorate([
    (0, common_1.Get)('/getUserDetails/:userID'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('userID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserManagementController.prototype, "getUserDetails", null);
__decorate([
    (0, common_1.Post)('/editprofile'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('userID')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, userManagement_dto_1.UserManagementDTO]),
    __metadata("design:returntype", Promise)
], UserManagementController.prototype, "editUser", null);
UserManagementController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [userMangement_service_1.UserManagementService])
], UserManagementController);
exports.UserManagementController = UserManagementController;
//# sourceMappingURL=userManagement.controller.js.map