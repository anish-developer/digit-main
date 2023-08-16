"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowingModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const following_schema_1 = require("../models/following.schema");
const following_controller_1 = require("./following.controller");
const following_service_1 = require("./following.service");
let FollowingModule = class FollowingModule {
};
FollowingModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'Following', schema: following_schema_1.FollowingSchema }]),
        ],
        providers: [following_service_1.FollowingManagementService],
        controllers: [following_controller_1.FollowingManagementController],
        exports: [],
    })
], FollowingModule);
exports.FollowingModule = FollowingModule;
//# sourceMappingURL=following.module.js.map