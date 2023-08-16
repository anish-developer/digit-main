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
exports.DashboardBannerController = void 0;
const common_1 = require("@nestjs/common");
const dashboardBanner_service_1 = require("./dashboardBanner.service");
const common_methods_1 = require("../../utilities/common-methods");
let DashboardBannerController = class DashboardBannerController {
    constructor(DashboardBannerService) {
        this.DashboardBannerService = DashboardBannerService;
    }
    async GetAllAdminUser(res) {
        const users = await this.DashboardBannerService.getAllUser();
        const plates = await this.DashboardBannerService.getAllPlate();
        const totalUsers = await this.DashboardBannerService.getallusercount(users);
        const grossvalue = await this.DashboardBannerService.grossvalue();
        const available_plate = await this.DashboardBannerService.getPlateCount(plates);
        const data = {
            totalUsers,
            available_plate,
            grossvalue,
        };
        return common_methods_1.CommonMethods.success(res, 'Banner Data', data);
    }
};
__decorate([
    (0, common_1.Get)('/count_list'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DashboardBannerController.prototype, "GetAllAdminUser", null);
DashboardBannerController = __decorate([
    (0, common_1.Controller)('dashboardBanner'),
    __metadata("design:paramtypes", [dashboardBanner_service_1.DashboardBannerService])
], DashboardBannerController);
exports.DashboardBannerController = DashboardBannerController;
//# sourceMappingURL=dashboardBanner.controller.js.map