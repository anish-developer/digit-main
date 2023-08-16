/* eslint-disable prettier/prettier */
import { Injectable, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommonMethods } from 'src/utilities/common-methods';
import { Following } from '../interfaces/following.interface';
import { FollowingManagementDTO } from './following.dto';

@Injectable()
export class FollowingManagementService {
  constructor(
    @InjectModel('Following') private readonly followingModel: Model<Following>,
  ) {}
  async addFollow(@Res() res, followingManagementDTO: FollowingManagementDTO) {
    const { plate_id } = followingManagementDTO;
    const { user_id } = followingManagementDTO;
    const follow = await this.followingModel.findOne({ plate_id, user_id });

    if (!follow) {
      const newFollow = await new this.followingModel(
        followingManagementDTO,
      ).save();
      return CommonMethods.success(res, 'Plate added to following', newFollow);
    } else {
      const updatedFollowing = await this.followingModel.findByIdAndUpdate(
        follow._id,
        followingManagementDTO,
      );
      return CommonMethods.success(
        res,
        'Following updated successfully',
        updatedFollowing,
      );
    }
  }
  async getFollow(@Res() res, user_id): Promise<Following> {
    const follows = await this.followingModel
      .aggregate([
        { $match: { user_id: user_id, like: true } },
        {
          $addFields: {
            plateID: { $toObjectId: '$plate_id' },
          },
        },
        {
          $lookup: {
            from: 'plates',
            localField: 'plateID',
            foreignField: '_id',
            as: 'plate_number',
          },
        },
        {
          $set: {
            plate_number: { $arrayElemAt: ['$plate_number.plate_number', 0] },
          },
        },
        {
          $unset: ['plateID'],
        },
      ])
      .sort({ created_at: -1 });

    if (follows) {
      return CommonMethods.success(
        res,
        'Following List fetched successfully',
        follows,
      );
    } else {
      return CommonMethods.error(res, 'No following exists');
    }
  }
}
