"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../models/user.schema");
const plate_schema_1 = require("../models/plate.schema");
const purchase_schema_1 = require("../../BuyerModule/models/purchase.schema");
const dashboardBanner_controller_1 = require("./dashboardBanner.controller");
const dashboardBanner_service_1 = require("./dashboardBanner.service");
let DashboardModule = class DashboardModule {
};
DashboardModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'User', schema: user_schema_1.UserSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'Plate', schema: plate_schema_1.PlateSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'Purchase', schema: purchase_schema_1.PurchaseSchema }]),
        ],
        providers: [dashboardBanner_service_1.DashboardBannerService],
        controllers: [dashboardBanner_controller_1.DashboardBannerController],
        exports: [],
    })
], DashboardModule);
exports.DashboardModule = DashboardModule;
//# sourceMappingURL=dashboard.module.js.map