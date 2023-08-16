/* eslint-disable prettier/prettier */
import { Injectable, Res } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/SellerModule/interfaces/user.interface';
import { UserManagementDTO } from 'src/SellerModule/userManagement/userManagement.dto';
import { CommonMethods } from 'src/utilities/common-methods';

@Injectable()
export class UserManagementService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}
  // Get user
  async getUserDetails(@Res() res, userID) {
    const user = await this.userModel.findById(userID).exec();
    if (user) {
      return CommonMethods.success(res, 'Success', user);
    } else {
      return CommonMethods.error(res, 'User does not exists');
    }
  }

  // Edit User details
  async updateUser(
    @Res() res,
    userID,
    userManagementDTO: UserManagementDTO,
  ): Promise<User> {
    const { email } = userManagementDTO;
    const checkUser = await this.userModel.findById(userID);
    const checkEmail = await this.userModel.findOne({ email });
    const data = checkEmail ? checkEmail.email : null;
    const data1 = checkUser ? checkUser.email : null;

    if (data1 === data) {
      if (checkUser) {
        const updatedUser = await this.userModel.findByIdAndUpdate(
          userID,
          userManagementDTO,
          {
            new: true,
          },
        );
        (await updatedUser.save()).$set({ updated_at: Date.now() });

        return CommonMethods.success(
          res,
          'User edited successfully',
          updatedUser,
        );
      } else {
        return CommonMethods.error(res, 'User does not exists');
      }
    } else if (!checkUser) {
      return CommonMethods.error(res, 'User does not exists');
    } else {
      if (!checkEmail) {
        const updatedUser = await this.userModel.findByIdAndUpdate(
          userID,
          userManagementDTO,
          {
            new: true,
          },
        );
        await (await updatedUser.save()).$set({ updated_at: Date.now() });
        return CommonMethods.success(
          res,
          'User edited successfully',
          updatedUser,
        );
      } else {
        return CommonMethods.error(res, 'Email already exists');
      }
    }
  }
}
