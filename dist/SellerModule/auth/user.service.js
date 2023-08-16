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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const register_dto_1 = require("../auth/dto/register.dto");
const bcrypt = require("bcrypt");
const login_dto_1 = require("./dto/login.dto");
const changePassword_dto_1 = require("./dto/changePassword.dto");
const forgotPassword_dto_1 = require("./dto/forgotPassword.dto");
const sendgrid_service_1 = require("../../sendgrid/sendgrid.service");
const common_methods_1 = require("../../utilities/common-methods");
const contact_dto_1 = require("./dto/contact.dto");
const base64ToImage = require('base64-to-image');
let UserService = class UserService {
    constructor(userModel, otpModel, contactModel, sendGridService) {
        this.userModel = userModel;
        this.otpModel = otpModel;
        this.contactModel = contactModel;
        this.sendGridService = sendGridService;
    }
    async hashPassword(password) {
        return await bcrypt.hash(password, 10);
    }
    async create(res, registerDTO) {
        const { email } = registerDTO;
        const user = await this.userModel.findOne({ email });
        if (!user) {
            const createdUser = new this.userModel(registerDTO);
            await createdUser.save();
            return this.sanitizeUser(createdUser);
        }
        else {
            return common_methods_1.CommonMethods.error(res, 'Email already exists');
        }
    }
    async findByPayload(payload) {
        const { email } = payload;
        return await this.userModel.findOne({ email });
    }
    async findByLogin(res, userDTO) {
        const { email, password } = userDTO;
        const user = await this.userModel.findOne({ email });
        if (!user) {
            return common_methods_1.CommonMethods.error(res, 'User not registered');
        }
        else {
            if (user.account_type === '2') {
                const users = await this.userModel.findOne({ email });
                if (users.al_status == '2') {
                    if (await bcrypt.compare(password, user.password)) {
                        await user.$set({ last_login: Date.now() }).save();
                        if (user.authentication == '1') {
                            const otp = Math.floor(100000 + Math.random() * 900000);
                            userDTO.user_id = user._id;
                            userDTO.otp = otp;
                            await new this.otpModel(userDTO).save();
                            await this.sendGridService.send({
                                to: userDTO.email,
                                subject: 'Login otp',
                                from: 'ankit.k@simbiotiktech.com',
                                text: 'Hello',
                                html: `${otp}`,
                            });
                            return this.sanitizeUser(user);
                        }
                        else {
                            return this.sanitizeUser(user);
                        }
                    }
                }
                else {
                    return common_methods_1.CommonMethods.error(res, 'Authorisation Letters Not Verify');
                }
            }
            else {
                if (await bcrypt.compare(password, user.password)) {
                    await user.$set({ last_login: Date.now() }).save();
                    if (user.authentication == '1') {
                        const otp = Math.floor(100000 + Math.random() * 900000);
                        userDTO.user_id = user._id;
                        userDTO.otp = otp;
                        await new this.otpModel(userDTO).save();
                        await this.sendGridService.send({
                            to: userDTO.email,
                            subject: 'Login otp',
                            from: 'ankit.k@simbiotiktech.com',
                            text: 'Hello',
                            html: `${otp}`,
                        });
                        return this.sanitizeUser(user);
                    }
                    else {
                        return this.sanitizeUser(user);
                    }
                }
                else {
                    return common_methods_1.CommonMethods.error(res, 'Invalid Credentials');
                }
            }
        }
    }
    sanitizeUser(user) {
        const sanitized = user.toObject();
        delete sanitized['password'];
        return sanitized;
    }
    async resendOtp(res, userDTO) {
        const user_id = userDTO.user_id;
        const getEmail = await this.userModel.findById(user_id).exec();
        if (getEmail) {
            const otp = Math.floor(100000 + Math.random() * 900000);
            userDTO.user_id = getEmail._id;
            userDTO.otp = otp;
            await new this.otpModel(userDTO).save();
            await this.sendGridService.send({
                to: getEmail.email,
                subject: 'Login otp',
                from: 'ankit.k@simbiotiktech.com',
                text: 'Hello',
                html: `${otp}`,
            });
            return common_methods_1.CommonMethods.success(res, 'Otp resend successfully', []);
        }
        else {
            return common_methods_1.CommonMethods.error(res, 'Incorrect user detail');
        }
    }
    async verifyOtp(res, userDTO) {
        const user_id = userDTO.user_id;
        const getOtp = await this.otpModel
            .findOne({ user_id })
            .sort({ created_at: -1 })
            .exec();
        if (getOtp.otp == userDTO.otp) {
            const user = await this.userModel.findById(user_id);
            return common_methods_1.CommonMethods.success(res, 'Login successful', user);
        }
        else {
            return common_methods_1.CommonMethods.error(res, 'Incorrect otp');
        }
    }
    async changePassword(res, userID, changePasswordDTO) {
        const password = changePasswordDTO.old_password;
        const validation = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
        const password1 = await this.hashPassword(changePasswordDTO.new_password);
        const user = await this.userModel.findById(userID);
        if (!user) {
            return common_methods_1.CommonMethods.error(res, 'User does not exists');
        }
        else {
            if (await bcrypt.compare(password, user.password)) {
                if (changePasswordDTO.new_password.match(validation)) {
                    const changePassword = await this.userModel.findByIdAndUpdate(userID, {
                        password: password1,
                    });
                    return common_methods_1.CommonMethods.success(res, 'Password Changed successfully', changePassword);
                }
                else {
                    return common_methods_1.CommonMethods.error(res, 'Weak password');
                }
            }
            else {
                return common_methods_1.CommonMethods.error(res, 'Incorrect old password');
            }
        }
    }
    async forgotPassword(res, userID, forgotPasswordDTO) {
        const validation = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
        const password = await this.hashPassword(forgotPasswordDTO.password);
        if (forgotPasswordDTO.password.match(validation)) {
            const user = await this.userModel.findByIdAndUpdate(userID, { password });
            if (!user) {
                return common_methods_1.CommonMethods.error(res, 'User does not exists');
            }
            else {
                return common_methods_1.CommonMethods.success(res, 'Password Changed successfully', user);
            }
        }
        else {
            return common_methods_1.CommonMethods.error(res, 'Weak password');
        }
    }
    async al_upload(res, body, _id) {
        if (body.file) {
            const base64Str = body.file;
            const path = './uploads/seller/';
            const optionalObj = {
                fileName: '',
                type: base64Str.split(';')[0].split('/')[1],
            };
            const imageInfo = base64ToImage(base64Str, path, optionalObj);
            const filePath = `http://${process.env.HOST}:${process.env.PORT}/auth/uploads/seller/${imageInfo.fileName}`;
            const newUser = await this.userModel.findByIdAndUpdate(_id, { al_file: filePath, al_status: 1 }, {
                new: true,
            });
            return common_methods_1.CommonMethods.success(res, 'Image uploaded successfully', newUser);
        }
        else {
            return common_methods_1.CommonMethods.error(res, 'Image not uploaded');
        }
    }
    async uploadFile(res, body) {
        if (body.file) {
            const base64Str = body.file;
            const path = './uploads/seller/';
            const optionalObj = {
                fileName: '',
                type: base64Str.split(';')[0].split('/')[1],
            };
            const imageInfo = base64ToImage(base64Str, path, optionalObj);
            const filePath = `http://${process.env.HOST}:${process.env.PORT}/auth/uploads/seller/${imageInfo.fileName}`;
            return common_methods_1.CommonMethods.success(res, 'Image uploaded successfully', filePath);
        }
        else {
            return common_methods_1.CommonMethods.error(res, 'Image not uploaded');
        }
    }
    async getResetMail(contactDTO, res) {
        const user = new this.contactModel(contactDTO);
        if (user) {
            await user.save();
            const mail = {
                to: 'basheer.azmin@digits.com',
                subject: 'Contact Us',
                from: 'ankit.k@simbiotiktech.com',
                text: 'Hello',
                html: `Name: ${user.name}</p>
        <p>Phone Number: ${user.phone}</p>
        <p>Email: ${user.email}</p>
        <p>Message: ${user.message}</p>
        `,
            };
            return common_methods_1.CommonMethods.success(res, 'Mail sent successfully', await this.sendGridService.send(mail));
        }
        else {
            return common_methods_1.CommonMethods.error(res, 'Invalid Email');
        }
    }
};
__decorate([
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, register_dto_1.RegisterDTO]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "create", null);
__decorate([
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, login_dto_1.LoginDTO]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "findByLogin", null);
__decorate([
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, login_dto_1.LoginDTO]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "resendOtp", null);
__decorate([
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, login_dto_1.LoginDTO]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "verifyOtp", null);
__decorate([
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, changePassword_dto_1.ChangePasswordDTO]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "changePassword", null);
__decorate([
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, forgotPassword_dto_1.ForgotPasswordDTO]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "forgotPassword", null);
__decorate([
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contact_dto_1.ContactDTO, Object]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "getResetMail", null);
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __param(1, (0, mongoose_1.InjectModel)('Otp')),
    __param(2, (0, mongoose_1.InjectModel)('Contact')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        sendgrid_service_1.SendGridService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map