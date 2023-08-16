/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserService } from '../auth/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../models/user.schema';
import { OtpSchema } from '../models/otp.schema';
import { ConfigService } from '@nestjs/config';
import { SendGridService } from 'src/sendgrid/sendgrid.service';
import { UserManagementController } from 'src/SellerModule/userManagement/userManagement.controller';
import { UserManagementService } from 'src/SellerModule/userManagement/userMangement.service';
import { ContactSchema } from 'src/BuyerModule/models/contact.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Otp', schema: OtpSchema }]),
    MongooseModule.forFeature([{ name: 'Contact', schema: ContactSchema }]),
  ],

  providers: [
    UserService,
    UserManagementService,
    SendGridService,
    ConfigService,
  ],
  controllers: [UserManagementController],
  exports: [UserService],
})
export class UserModule {}
