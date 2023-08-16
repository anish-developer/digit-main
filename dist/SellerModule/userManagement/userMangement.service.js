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
exports.UserManagementService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const userManagement_dto_1 = require("./userManagement.dto");
const common_methods_1 = require("../../utilities/common-methods");
let UserManagementService = class UserManagementService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async getUserDetails(res, userID) {
        const user = await this.userModel.findById(userID).exec();
        if (user) {
            return common_methods_1.CommonMethods.success(res, 'Success', user);
        }
        else {
            return common_methods_1.CommonMethods.error(res, 'User does not exists');
        }
    }
    async updateUser(res, userID, userManagementDTO) {
        const { email } = userManagementDTO;
        const checkUser = await this.userModel.findById(userID);
        const checkEmail = await this.userModel.findOne({ email });
        const data = checkEmail ? checkEmail.email : null;
        const data1 = checkUser ? checkUser.email : null;
        if (data1 === data) {
            if (checkUser) {
                const updatedUser = await this.userModel.findByIdAndUpdate(userID, userManagementDTO, {
                    new: true,
                });
                (await updatedUser.save()).$set({ updated_at: Date.now() });
                return common_methods_1.CommonMethods.success(res, 'User edited successfully', updatedUser);
            }
            else {
                return common_methods_1.CommonMethods.error(res, 'User does not exists');
            }
        }
        else if (!checkUser) {
            return common_methods_1.CommonMethods.error(res, 'User does not exists');
        }
        else {
            if (!checkEmail) {
                const updatedUser = await this.userModel.findByIdAndUpdate(userID, userManagementDTO, {
                    new: true,
                });
                await (await updatedUser.save()).$set({ updated_at: Date.now() });
                return common_methods_1.CommonMethods.success(res, 'User edited successfully', updatedUser);
            }
            else {
                return common_methods_1.CommonMethods.error(res, 'Email already exists');
            }
        }
    }
};
__decorate([
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserManagementService.prototype, "getUserDetails", null);
__decorate([
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, userManagement_dto_1.UserManagementDTO]),
    __metadata("design:returntype", Promise)
], UserManagementService.prototype, "updateUser", null);
UserManagementService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], UserManagementService);
exports.UserManagementService = UserManagementService;
//# sourceMappingURL=userMangement.service.js.map