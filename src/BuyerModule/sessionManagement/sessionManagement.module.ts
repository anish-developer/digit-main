/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionSchema } from '../models/session.schema';
import { SessionManagementController } from 'src/BuyerModule/sessionManagement/sessionManagement.controller';
import { SessionManagementService } from 'src/BuyerModule/sessionManagement/sessionManagement.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Session', schema: SessionSchema }]),
  ],
  providers: [SessionManagementService],
  controllers: [SessionManagementController],
  exports: [],
})
export class SessionModule {}
