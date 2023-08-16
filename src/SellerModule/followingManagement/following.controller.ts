/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Res, Param } from '@nestjs/common';
import { FollowingManagementDTO } from './following.dto';
import { FollowingManagementService } from './following.service';

@Controller('following')
export class FollowingManagementController {
  constructor(private followingManagementService: FollowingManagementService) {}

  @Post('/add_follow')
  async addFollow(
    @Res() res,
    @Body() followingManagementDTO: FollowingManagementDTO,
  ) {
    await this.followingManagementService.addFollow(
      res,
      followingManagementDTO,
    );
  }
  @Get('/get_follow/:user_id')
  async getFollow(@Res() res, @Param('user_id') user_id) {
    await this.followingManagementService.getFollow(res, user_id);
  }
}
