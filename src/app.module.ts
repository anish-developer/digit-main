/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlateModule } from './SellerModule/plateManagement/plate.module';
import { AuthModule } from './SellerModule/auth/auth.module';
import { SendGridService } from './sendgrid/sendgrid.service';
import { MailController } from './mail/mail.controller';
import { ConfigModule } from '@nestjs/config';
import { PaymentModule } from 'src/SellerModule/paymentManagement/paymentManagement.module';
import { PurchaseModule } from 'src/BuyerModule/purchaseManagement/purchaseManagement.module';
import { FollowingModule } from 'src/SellerModule/followingManagement/following.module';
import { DashboardModule } from 'src/SellerModule/dashboardBanner/dashboard.module';
import { UserSchema } from 'src/SellerModule/models/user.schema';
import { PortfolioModule } from 'src/SellerModule/portfolioManagement/portfolioManagement.module';
import { MailService } from './mail/mail.service';
import { ShippingInfoModule } from './SettingModule/ShippingInfo/ShippingInfo.module';
import { BuyerInfoModule } from './SettingModule/BuyerInfo/BuyerInfo.module';
import { PayoutInfoModule } from './SettingModule/PayoutInfo/PayoutInfo.module';
import { SessionModule } from 'src/BuyerModule/sessionManagement/sessionManagement.module';
import { ScheduleModule } from '@nestjs/schedule';
// import { PlateManagementService } from 'src/SellerModule/plateManagement/plateMangement.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    PlateModule,
    AuthModule,
    PaymentModule,
    FollowingModule,
    PurchaseModule,
    DashboardModule,
    PortfolioModule,
    ShippingInfoModule,
    BuyerInfoModule,
    PayoutInfoModule,
    SessionModule,
  ],
  controllers: [AppController, MailController],
  providers: [AppService, SendGridService, MailService],
})
export class AppModule {}
