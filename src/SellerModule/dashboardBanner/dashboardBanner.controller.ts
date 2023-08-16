import { Controller, Get, Res } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DashboardBannerService } from 'src/SellerModule/dashboardBanner/dashboardBanner.service';
import { CommonMethods } from 'src/utilities/common-methods';

@Controller('dashboardBanner')
export class DashboardBannerController {
  constructor(public readonly DashboardBannerService: DashboardBannerService) {}

  @Get('/count_list')
  async GetAllAdminUser(@Res() res) {
    const users = await this.DashboardBannerService.getAllUser();
    const plates = await this.DashboardBannerService.getAllPlate();
    const totalUsers = await this.DashboardBannerService.getallusercount(users);
    const grossvalue = await this.DashboardBannerService.grossvalue();
    const available_plate = await this.DashboardBannerService.getPlateCount(
      plates,
    );

    const data = {
      totalUsers,
      available_plate,
      grossvalue,
    };
    return CommonMethods.success(res, 'Banner Data', data);
  }
}
