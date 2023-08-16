"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuyerInfoModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const buyer_schema_1 = require("../../SellerModule/models/buyer.schema");
const BuyerInfo_contoller_1 = require("./BuyerInfo.contoller");
const BuyerInfo_service_1 = require("./BuyerInfo.service");
let BuyerInfoModule = class BuyerInfoModule {
};
BuyerInfoModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'Buyer', schema: buyer_schema_1.BuyerSchema }]),
        ],
        providers: [BuyerInfo_service_1.BuyerInfoService],
        controllers: [BuyerInfo_contoller_1.BuyerInfoController],
        exports: [],
    })
], BuyerInfoModule);
exports.BuyerInfoModule = BuyerInfoModule;
//# sourceMappingURL=BuyerInfo.module.js.map