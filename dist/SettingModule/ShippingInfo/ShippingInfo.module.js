"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShippingInfoModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const shipping_schema_1 = require("../../SellerModule/models/shipping.schema");
const ShippingInfo_controller_1 = require("./ShippingInfo.controller");
const ShippingInfo_service_1 = require("./ShippingInfo.service");
let ShippingInfoModule = class ShippingInfoModule {
};
ShippingInfoModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'Shipping', schema: shipping_schema_1.ShippingSchema }]),
        ],
        providers: [ShippingInfo_service_1.ShippingInfoService],
        controllers: [ShippingInfo_controller_1.ShippingInfoController],
        exports: [],
    })
], ShippingInfoModule);
exports.ShippingInfoModule = ShippingInfoModule;
//# sourceMappingURL=ShippingInfo.module.js.map