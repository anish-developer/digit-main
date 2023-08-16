"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const session_schema_1 = require("../models/session.schema");
const sessionManagement_controller_1 = require("./sessionManagement.controller");
const sessionManagement_service_1 = require("./sessionManagement.service");
let SessionModule = class SessionModule {
};
SessionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'Session', schema: session_schema_1.SessionSchema }]),
        ],
        providers: [sessionManagement_service_1.SessionManagementService],
        controllers: [sessionManagement_controller_1.SessionManagementController],
        exports: [],
    })
], SessionModule);
exports.SessionModule = SessionModule;
//# sourceMappingURL=sessionManagement.module.js.map