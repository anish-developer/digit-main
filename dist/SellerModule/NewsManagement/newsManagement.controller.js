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
exports.NewsManagementController = void 0;
const common_1 = require("@nestjs/common");
const newsManagement_service_1 = require("./newsManagement.service");
const newsManagement_dto_1 = require("./newsManagement.dto");
let NewsManagementController = class NewsManagementController {
    constructor(NewsManagementservice) {
        this.NewsManagementservice = NewsManagementservice;
    }
    async createNews(res, NewsManagementDTO) {
        await this.NewsManagementservice.createNews(res, NewsManagementDTO);
    }
    async getAllNews(res) {
        await this.NewsManagementservice.getAllNews(res);
    }
    async getNewsbyId(res, newsID) {
        await this.NewsManagementservice.getNewsbyId(res, newsID);
    }
    async updateNews(res, newsID, NewsManagementDTO) {
        await this.NewsManagementservice.updateNews(res, newsID, NewsManagementDTO);
    }
    async deleteNews(res, newsID) {
        await this.NewsManagementservice.deleteNews(res, newsID);
    }
    getProfileImage(filename, res) {
        return res.sendFile(filename, { root: 'uploads/news' });
    }
};
__decorate([
    (0, common_1.Post)('/news_create'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, newsManagement_dto_1.NewsManagementDTO]),
    __metadata("design:returntype", Promise)
], NewsManagementController.prototype, "createNews", null);
__decorate([
    (0, common_1.Get)('/news_list'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NewsManagementController.prototype, "getAllNews", null);
__decorate([
    (0, common_1.Get)('news/:newsID'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('newsID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], NewsManagementController.prototype, "getNewsbyId", null);
__decorate([
    (0, common_1.Put)('/news_update'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('newsID')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, newsManagement_dto_1.NewsManagementDTO]),
    __metadata("design:returntype", Promise)
], NewsManagementController.prototype, "updateNews", null);
__decorate([
    (0, common_1.Delete)('/news_delete'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('newsID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], NewsManagementController.prototype, "deleteNews", null);
__decorate([
    (0, common_1.Get)('uploads/news/:filename'),
    __param(0, (0, common_1.Param)('filename')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], NewsManagementController.prototype, "getProfileImage", null);
NewsManagementController = __decorate([
    (0, common_1.Controller)('newsManagement'),
    __metadata("design:paramtypes", [newsManagement_service_1.NewsManagementservice])
], NewsManagementController);
exports.NewsManagementController = NewsManagementController;
//# sourceMappingURL=newsManagement.controller.js.map