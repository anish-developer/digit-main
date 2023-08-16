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
exports.NewsManagementservice = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const common_methods_1 = require("../../utilities/common-methods");
const base64ToImage = require('base64-to-image');
const csvtojson = require('csvtojson');
let NewsManagementservice = class NewsManagementservice {
    constructor(NewAndUpdateModel) {
        this.NewAndUpdateModel = NewAndUpdateModel;
    }
    async getAllNews(res) {
        const users = await this.NewAndUpdateModel.find()
            .sort({ created_at: -1 })
            .exec();
        if (users.length) {
            return common_methods_1.CommonMethods.success(res, 'News List fetched successfully', users);
        }
        else {
            return common_methods_1.CommonMethods.error(res, 'No News exists');
        }
    }
    async getNewsbyId(res, newsID) {
        const user = await this.NewAndUpdateModel.findById(newsID).exec();
        if (user) {
            return common_methods_1.CommonMethods.success(res, 'Success', user);
        }
        else {
            return common_methods_1.CommonMethods.error(res, 'News does not exists');
        }
    }
    async createNews(res, NewsManagementDTO) {
        const base64Str = NewsManagementDTO.image;
        const path = './uploads/news/';
        const optionalObj = {
            fileName: '',
            type: base64Str.split(';')[0].split('/')[1],
        };
        const imageInfo = base64ToImage(base64Str, path, optionalObj);
        const filePath = `http://${process.env.HOST}:${process.env.PORT}/newsManagement/uploads/news/${imageInfo.fileName}`;
        const newUser = new this.NewAndUpdateModel(NewsManagementDTO).$set({
            image: filePath,
        });
        if (newUser) {
            await newUser.save();
            return common_methods_1.CommonMethods.success(res, 'News Created', newUser);
        }
        else {
            return common_methods_1.CommonMethods.error(res, 'Already Exists');
        }
    }
    async updateNews(res, newsID, NewsManagementDTO) {
        const editPlate = await this.NewAndUpdateModel.findByIdAndUpdate(newsID, NewsManagementDTO, { new: true });
        if (editPlate) {
            return common_methods_1.CommonMethods.success(res, 'News edited successfully', editPlate);
        }
        else {
            return common_methods_1.CommonMethods.error(res, 'No news present');
        }
    }
    async deleteNews(res, newsID) {
        const deletedUser = await this.NewAndUpdateModel.findOneAndDelete(newsID);
        if (deletedUser) {
            return common_methods_1.CommonMethods.success(res, 'News Deleted successfully', []);
        }
        else {
            return common_methods_1.CommonMethods.error(res, 'No News present');
        }
    }
};
NewsManagementservice = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('News')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], NewsManagementservice);
exports.NewsManagementservice = NewsManagementservice;
//# sourceMappingURL=newsManagement.service.js.map