/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Param,
  UsePipes,
  Put,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { RegisterDTO } from 'src/SellerModule/auth/dto/register.dto';
import { UserService } from 'src/SellerModule/auth/user.service';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { ContactDTO } from './dto/contact.dto';
import { ChangePasswordDTO } from 'src/SellerModule/auth/dto/changePassword.dto';
import { ForgotPasswordDTO } from 'src/SellerModule/auth/dto/forgotPassword.dto';
import { CommonMethods } from 'src/utilities/common-methods';
// import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Get('/onlyauth')
  @UseGuards(AuthGuard('jwt'))
  async hiddenInformation() {
    return 'hidden information';
  }
  @Get('/anyone')
  async publicInformation() {
    return 'this can be seen by anyone';
  }

  @Post('register')
  @UsePipes(ValidationPipe)
  async register(@Res() res, @Body() registerDTO: RegisterDTO) {
    const user = await this.userService.create(res, registerDTO);
    const payload = {
      email: user.email,
    };

    const token = await this.authService.signPayload(payload);
    return CommonMethods.auth(res, 'Register successfully', user, token);
  }
  @Post('login')
  async login(@Res() res, @Body() loginDTO: LoginDTO) {
    const user = await this.userService.findByLogin(res, loginDTO);
    const payload = {
      email: user.email,
    };
    const token = await this.authService.signPayload(payload);
    return CommonMethods.auth(res, 'Login successful', user, token);
  }

  @Post('resendOtp')
  async resendOtp(@Res() res, @Body() loginDTO: LoginDTO) {
    await this.userService.resendOtp(res, loginDTO);
    //const data = { user, token };
  }

  @Post('verifyOtp')
  async verifyOtp(@Res() res, @Body() loginDTO: LoginDTO) {
    await this.userService.verifyOtp(res, loginDTO);
  }
  @Get('logout')
  async logout(@Res() res) {
    return CommonMethods.success(res, 'Logged out Successfully', []);
  }

  @Put('/changePassword')
  @UsePipes(ValidationPipe)
  async changePassword(
    @Res() res,
    @Body('userID') userID,
    @Body() changePasswordDTO: ChangePasswordDTO,
  ) {
    return await this.userService.changePassword(
      res,
      userID,
      changePasswordDTO,
    );
  }

  @Put('/forgotpassword')
  @UsePipes(ValidationPipe)
  async forgotPassword(
    @Res() res,
    @Body('userID') userID,
    @Body() forgotPasswordDTO: ForgotPasswordDTO,
  ) {
    return await this.userService.forgotPassword(
      res,
      userID,
      forgotPasswordDTO,
    );
  }

  @Post('al_upload_file/:_id')
  async al_upload(@Res() res, @Body() body, @Param('_id') _id) {
    await this.userService.al_upload(res, body, _id);
  }

  @Post('upload_image')
  async uploadFile(@Res() res, @Body() body) {
    await this.userService.uploadFile(res, body);
  }

  // get image
  @Get('uploads/seller/:filename')
  getProfileImage(@Param('filename') filename, @Res() res) {
    return res.sendFile(filename, { root: 'uploads/seller' });
  }

  @Post('sendContactMail')
  async sendEmail(@Body() contactDTO: ContactDTO, @Res() res) {
    await this.userService.getResetMail(contactDTO, res);
  }
}
