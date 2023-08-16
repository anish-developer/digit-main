"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const news_schema_1 = require("../models/news.schema");
const newsManagement_controller_1 = require("../NewsManagement/newsManagement.controller");
const newsManagement_service_1 = require("../NewsManagement/newsManagement.service");
let NewsModule = class NewsModule {
};
NewsModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: 'News', schema: news_schema_1.NewsScheema }])],
        providers: [newsManagement_service_1.NewsManagementservice],
        controllers: [newsManagement_controller_1.NewsManagementController],
        exports: [],
    })
], NewsModule);
exports.NewsModule = NewsModule;
//# sourceMappingURL=newsManagement.module.js.map