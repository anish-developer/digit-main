"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../auth/user.service");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../models/user.schema");
const otp_schema_1 = require("../models/otp.schema");
const config_1 = require("@nestjs/config");
const sendgrid_service_1 = require("../../sendgrid/sendgrid.service");
const userManagement_controller_1 = require("./userManagement.controller");
const userMangement_service_1 = require("./userMangement.service");
const contact_schema_1 = require("../../BuyerModule/models/contact.schema");
let UserModule = class UserModule {
};
UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'User', schema: user_schema_1.UserSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'Otp', schema: otp_schema_1.OtpSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'Contact', schema: contact_schema_1.ContactSchema }]),
        ],
        providers: [
            user_service_1.UserService,
            userMangement_service_1.UserManagementService,
            sendgrid_service_1.SendGridService,
            config_1.ConfigService,
        ],
        controllers: [userManagement_controller_1.UserManagementController],
        exports: [user_service_1.UserService],
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map