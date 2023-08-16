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
exports.FollowingManagementService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const common_methods_1 = require("../../utilities/common-methods");
const following_dto_1 = require("./following.dto");
let FollowingManagementService = class FollowingManagementService {
    constructor(followingModel) {
        this.followingModel = followingModel;
    }
    async addFollow(res, followingManagementDTO) {
        const { plate_id } = followingManagementDTO;
        const { user_id } = followingManagementDTO;
        const follow = await this.followingModel.findOne({ plate_id, user_id });
        if (!follow) {
            const newFollow = await new this.followingModel(followingManagementDTO).save();
            return common_methods_1.CommonMethods.success(res, 'Plate added to following', newFollow);
        }
        else {
            const updatedFollowing = await this.followingModel.findByIdAndUpdate(follow._id, followingManagementDTO);
            return common_methods_1.CommonMethods.success(res, 'Following updated successfully', updatedFollowing);
        }
    }
    async getFollow(res, user_id) {
        const follows = await this.followingModel
            .aggregate([
            { $match: { user_id: user_id, like: true } },
            {
                $addFields: {
                    plateID: { $toObjectId: '$plate_id' },
                },
            },
            {
                $lookup: {
                    from: 'plates',
                    localField: 'plateID',
                    foreignField: '_id',
                    as: 'plate_number',
                },
            },
            {
                $set: {
                    plate_number: { $arrayElemAt: ['$plate_number.plate_number', 0] },
                },
            },
            {
                $unset: ['plateID'],
            },
        ])
            .sort({ created_at: -1 });
        if (follows) {
            return common_methods_1.CommonMethods.success(res, 'Following List fetched successfully', follows);
        }
        else {
            return common_methods_1.CommonMethods.error(res, 'No following exists');
        }
    }
};
__decorate([
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, following_dto_1.FollowingManagementDTO]),
    __metadata("design:returntype", Promise)
], FollowingManagementService.prototype, "addFollow", null);
__decorate([
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FollowingManagementService.prototype, "getFollow", null);
FollowingManagementService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Following')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], FollowingManagementService);
exports.FollowingManagementService = FollowingManagementService;
//# sourceMappingURL=following.service.js.map