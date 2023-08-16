"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayoutInfoModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const payout_schema_1 = require("../../SellerModule/models/payout.schema");
const PayoutInfo_controller_1 = require("./PayoutInfo.controller");
const PayoutInfo_service_1 = require("./PayoutInfo.service");
let PayoutInfoModule = class PayoutInfoModule {
};
PayoutInfoModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'Payout', schema: payout_schema_1.PayoutSchema }]),
        ],
        providers: [PayoutInfo_service_1.PayoutInfoService],
        controllers: [PayoutInfo_controller_1.PayoutInfoController],
        exports: [],
    })
], PayoutInfoModule);
exports.PayoutInfoModule = PayoutInfoModule;
//# sourceMappingURL=PayoutInfo.module.js.map