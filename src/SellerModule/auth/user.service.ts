import { Injectable, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/SellerModule/interfaces/user.interface';
import { Otp } from 'src/SellerModule/interfaces/otp.interface';

import { RegisterDTO } from '../auth/dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from 'src/SellerModule/auth/dto/login.dto';
import { Payload } from 'src/SellerModule/interfaces/payload.interface';
import { ChangePasswordDTO } from 'src/SellerModule/auth/dto/changePassword.dto';
import { ForgotPasswordDTO } from 'src/SellerModule/auth/dto/forgotPassword.dto';
import { SendGridService } from 'src/sendgrid/sendgrid.service';
import { CommonMethods } from 'src/utilities/common-methods';
import { Contact } from 'src/BuyerModule/interface/contact.interface';
import { ContactDTO } from './dto/contact.dto';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const base64ToImage = require('base64-to-image');

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    @InjectModel('Otp') private otpModel: Model<Otp>,
    @InjectModel('Contact') private readonly contactModel: Model<Contact>,
    private sendGridService: SendGridService,
  ) {}
  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async create(@Res() res, registerDTO: RegisterDTO) {
    const { email } = registerDTO;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      const createdUser = new this.userModel(registerDTO);
      await createdUser.save();
      return this.sanitizeUser(createdUser);
    } else {
      return CommonMethods.error(res, 'Email already exists');
    }
  }
  async findByPayload(payload: Payload) {
    const { email } = payload;
    return await this.userModel.findOne({ email });
  }

  async findByLogin(@Res() res, userDTO: LoginDTO) {
    const { email, password } = userDTO;
    const user = await this.userModel.findOne({ email });

    if (!user) {
      return CommonMethods.error(res, 'User not registered');
    } else {
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
                from: 'ankit.k@simbiotiktech.com', // Fill it with your validated email on SendGrid account
                text: 'Hello',
                html: `${otp}`,
              });
              return this.sanitizeUser(user);
            } else {
              return this.sanitizeUser(user);
            }
          }
        } else {
          return CommonMethods.error(res, 'Authorisation Letters Not Verify');
        }
      } else {
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
              from: 'ankit.k@simbiotiktech.com', // Fill it with your validated email on SendGrid account
              text: 'Hello',
              html: `${otp}`,
            });
            return this.sanitizeUser(user);
          } else {
            return this.sanitizeUser(user);
          }
        } else {
          return CommonMethods.error(res, 'Invalid Credentials');
        }
      }
    }
  }
  sanitizeUser(user: User) {
    const sanitized = user.toObject();
    delete sanitized['password'];
    return sanitized;
  }

  async resendOtp(@Res() res, userDTO: LoginDTO) {
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
        from: 'ankit.k@simbiotiktech.com', // Fill it with your validated email on SendGrid account
        text: 'Hello',
        html: `${otp}`,
      });
      return CommonMethods.success(res, 'Otp resend successfully', []);
    } else {
      return CommonMethods.error(res, 'Incorrect user detail');
    }
  }

  async verifyOtp(@Res() res, userDTO: LoginDTO) {
    const user_id = userDTO.user_id;
    const getOtp = await this.otpModel
      .findOne({ user_id })
      .sort({ created_at: -1 })
      .exec();

    if (getOtp.otp == userDTO.otp) {
      const user = await this.userModel.findById(user_id);
      return CommonMethods.success(res, 'Login successful', user);
    } else {
      return CommonMethods.error(res, 'Incorrect otp');
    }
  }

  async changePassword(
    @Res() res,
    userID: string,
    changePasswordDTO: ChangePasswordDTO,
  ) {
    const password = changePasswordDTO.old_password;
    const validation =
      /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
    const password1 = await this.hashPassword(changePasswordDTO.new_password);
    const user = await this.userModel.findById(userID);
    if (!user) {
      return CommonMethods.error(res, 'User does not exists');
    } else {
      if (await bcrypt.compare(password, user.password)) {
        if (changePasswordDTO.new_password.match(validation)) {
          const changePassword = await this.userModel.findByIdAndUpdate(
            userID,
            {
              password: password1,
            },
          );
          return CommonMethods.success(
            res,
            'Password Changed successfully',
            changePassword,
          );
        } else {
          return CommonMethods.error(res, 'Weak password');
        }
      } else {
        return CommonMethods.error(res, 'Incorrect old password');
      }
    }
  }

  async forgotPassword(
    @Res() res,
    userID: string,
    forgotPasswordDTO: ForgotPasswordDTO,
  ) {
    const validation =
      /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
    const password = await this.hashPassword(forgotPasswordDTO.password);
    if (forgotPasswordDTO.password.match(validation)) {
      const user = await this.userModel.findByIdAndUpdate(userID, { password });
      if (!user) {
        return CommonMethods.error(res, 'User does not exists');
      } else {
        return CommonMethods.success(
          res,
          'Password Changed successfully',
          user,
        );
      }
    } else {
      return CommonMethods.error(res, 'Weak password');
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
      const newUser = await this.userModel.findByIdAndUpdate(
        _id,
        { al_file: filePath, al_status: 1 },
        {
          new: true,
        },
      );
      // console.log(newUser);
      return CommonMethods.success(res, 'Image uploaded successfully', newUser);
    } else {
      return CommonMethods.error(res, 'Image not uploaded');
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
      return CommonMethods.success(
        res,
        'Image uploaded successfully',
        filePath,
      );
    } else {
      return CommonMethods.error(res, 'Image not uploaded');
    }
  }

  async getResetMail(contactDTO: ContactDTO, @Res() res): Promise<any> {
    const user = new this.contactModel(contactDTO);
    if (user) {
      await user.save();
      const mail = {
        to: 'basheer.azmin@digits.com',
        subject: 'Contact Us',
        from: 'ankit.k@simbiotiktech.com', // Fill it with your validated email on SendGrid account
        text: 'Hello',
        html: `Name: ${user.name}</p>
        <p>Phone Number: ${user.phone}</p>
        <p>Email: ${user.email}</p>
        <p>Message: ${user.message}</p>
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
