/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FollowingSchema } from '../models/following.schema';
import { FollowingManagementController } from './following.controller';
import { FollowingManagementService } from './following.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Following', schema: FollowingSchema }]),
  ],
  providers: [FollowingManagementService],
  controllers: [FollowingManagementController],
  exports: [],
})
export class FollowingModule {}
