/* eslint-disable prettier/prettier */
import { Injectable, Res } from '@nestjs/common';
import { SendGridService } from 'src/sendgrid/sendgrid.service';
import { MailDTO } from './mail.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/SellerModule/interfaces/user.interface';
import { CommonMethods } from 'src/utilities/common-methods';

@Injectable()
export class MailService {
  constructor(
    private readonly sendGridService: SendGridService,

    @InjectModel('User') private readonly userModel: Model<User>, // @InjectModel('Plate') private readonly plateModel: Model<User>,
  ) {}
  async getResetMail(mailDTO: MailDTO, @Res() res): Promise<any> {
    const { email } = mailDTO;
    const user = await this.userModel.findOne({ email });
    const userID = user._id;
    const mailLink = mailDTO.link + '' + userID;
    if (user && (user.user_type == '4' || user.user_type == '5')) {
      const mail = {
        to: mailDTO.email,
        subject: 'Reset Password Link',
        from: 'ankit.k@simbiotiktech.com', // Fill it with your validated email on SendGrid account
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

      return CommonMethods.success(
        res,
        'Mail sent successfully',
        await this.sendGridService.send(mail),
      );
    } else {
      return CommonMethods.error(res, 'Invalid Email');
    }
  }
}
