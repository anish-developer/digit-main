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
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const sendgrid_service_1 = require("../sendgrid/sendgrid.service");
const mail_dto_1 = require("./mail.dto");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const common_methods_1 = require("../utilities/common-methods");
let MailService = class MailService {
    constructor(sendGridService, userModel) {
        this.sendGridService = sendGridService;
        this.userModel = userModel;
    }
    async getResetMail(mailDTO, res) {
        const { email } = mailDTO;
        const user = await this.userModel.findOne({ email });
        const userID = user._id;
        const mailLink = mailDTO.link + '' + userID;
        if (user && (user.user_type == '4' || user.user_type == '5')) {
            const mail = {
                to: mailDTO.email,
                subject: 'Reset Password Link',
                from: 'ankit.k@simbiotiktech.com',
                text: 'Hello',
                html: `<!DOCTYPE html>
                <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
                <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width,initial-scale=1">
                <meta name="x-apple-disable-message-reformatting">
                <title></title>
                <style>
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
                  </style>
                </head>
                <body style="margin:0;padding:0;">
                <div style="width:550px;margin:auto;">
                  <div style="padding:35px 50px 0;background:#ffbc38;">
                    <div style="background:#fff;padding:50px 50px 0;text-align:center;"> <img src="http://${process.env.HOST}:${process.env.PORT}/auth/uploads/seller/img-1649740181432.png" style="width:40%;margin:auto;"> </div>
                  </div>
                  <div style="background:#f4f4f4;padding:0px 50px 0">
                    <div style="background:#fff;padding:20px 50px 50px;text-align: center;">
                      <h2 style="text-align:center;font-family: 'Poppins', sans-serif;margin:0;font-weight: 500;" >Reset Password!</h2>
                      <p style="text-align: center;margin: 0px;font-family: 'Poppins', sans-serif;font-size: 17px;line-height: 22px;margin-top: 10px;">Hey,you're almost ready to reset password. Simply click the big yellow button below to reset password.</p>
                      <a href="${mailLink}" style="font-family: 'Poppins', sans-serif;font-weight: 600;display: inline-block;background:#ffbc38;color: #000;padding: 15px 20px;text-align: center;text-decoration: none;margin-top: 25px;border-radius: 30px;">Reset Password</a> </div>
                  </div>
                </div>
                </body>
                </html>
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
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mail_dto_1.MailDTO, Object]),
    __metadata("design:returntype", Promise)
], MailService.prototype, "getResetMail", null);
MailService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_2.InjectModel)('User')),
    __metadata("design:paramtypes", [sendgrid_service_1.SendGridService,
        mongoose_1.Model])
], MailService);
exports.MailService = MailService;
//# sourceMappingURL=mail.service.js.map