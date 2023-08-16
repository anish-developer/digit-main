/* eslint-disable prettier/prettier */
import { Controller, Get, Res, Post, Body, Query, Param } from '@nestjs/common';
import { UserManagementService } from 'src/SellerModule/userManagement/userMangement.service';
import { UserManagementDTO } from 'src/SellerModule/userManagement/userManagement.dto';

@Controller('user')
export class UserManagementController {
  constructor(private userManagementService: UserManagementService) {}

  @Get('/getUserDetails/:userID')
  async getUserDetails(@Res() res, @Param('userID') userID) {
    await this.userManagementService.getUserDetails(res, userID);
  }
  @Post('/editprofile')
  async editUser(
    @Res() res,
    @Query('userID') userID,
    @Body() userManagementDTO: UserManagementDTO,
  ) {
    await this.userManagementService.updateUser(res, userID, userManagementDTO);
  }
}
