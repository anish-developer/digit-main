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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("@nestjs/passport/dist/auth.guard");
const register_dto_1 = require("./dto/register.dto");
const user_service_1 = require("./user.service");
const auth_service_1 = require("./auth.service");
const login_dto_1 = require("./dto/login.dto");
const contact_dto_1 = require("./dto/contact.dto");
const changePassword_dto_1 = require("./dto/changePassword.dto");
const forgotPassword_dto_1 = require("./dto/forgotPassword.dto");
const common_methods_1 = require("../../utilities/common-methods");
let AuthController = class AuthController {
    constructor(userService, authService) {
        this.userService = userService;
        this.authService = authService;
    }
    async hiddenInformation() {
        return 'hidden information';
    }
    async publicInformation() {
        return 'this can be seen by anyone';
    }
    async register(res, registerDTO) {
        const user = await this.userService.create(res, registerDTO);
        const payload = {
            email: user.email,
        };
        const token = await this.authService.signPayload(payload);
        return common_methods_1.CommonMethods.auth(res, 'Register successfully', user, token);
    }
    async login(res, loginDTO) {
        const user = await this.userService.findByLogin(res, loginDTO);
        const payload = {
            email: user.email,
        };
        const token = await this.authService.signPayload(payload);
        return common_methods_1.CommonMethods.auth(res, 'Login successful', user, token);
    }
    async resendOtp(res, loginDTO) {
        await this.userService.resendOtp(res, loginDTO);
    }
    async verifyOtp(res, loginDTO) {
        await this.userService.verifyOtp(res, loginDTO);
    }
    async logout(res) {
        return common_methods_1.CommonMethods.success(res, 'Logged out Successfully', []);
    }
    async changePassword(res, userID, changePasswordDTO) {
        return await this.userService.changePassword(res, userID, changePasswordDTO);
    }
    async forgotPassword(res, userID, forgotPasswordDTO) {
        return await this.userService.forgotPassword(res, userID, forgotPasswordDTO);
    }
    async al_upload(res, body, _id) {
        await this.userService.al_upload(res, body, _id);
    }
    async uploadFile(res, body) {
        await this.userService.uploadFile(res, body);
    }
    getProfileImage(filename, res) {
        return res.sendFile(filename, { root: 'uploads/seller' });
    }
    async sendEmail(contactDTO, res) {
        await this.userService.getResetMail(contactDTO, res);
    }
};
__decorate([
    (0, common_1.Get)('/onlyauth'),
    (0, common_1.UseGuards)((0, auth_guard_1.AuthGuard)('jwt')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "hiddenInformation", null);
__decorate([
    (0, common_1.Get)('/anyone'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "publicInformation", null);
__decorate([
    (0, common_1.Post)('register'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, register_dto_1.RegisterDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, login_dto_1.LoginDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('resendOtp'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, login_dto_1.LoginDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resendOtp", null);
__decorate([
    (0, common_1.Post)('verifyOtp'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, login_dto_1.LoginDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyOtp", null);
__decorate([
    (0, common_1.Get)('logout'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Put)('/changePassword'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)('userID')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, changePassword_dto_1.ChangePasswordDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Put)('/forgotpassword'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)('userID')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, forgotPassword_dto_1.ForgotPasswordDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Post)('al_upload_file/:_id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "al_upload", null);
__decorate([
    (0, common_1.Post)('upload_image'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Get)('uploads/seller/:filename'),
    __param(0, (0, common_1.Param)('filename')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getProfileImage", null);
__decorate([
    (0, common_1.Post)('sendContactMail'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contact_dto_1.ContactDTO, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "sendEmail", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map