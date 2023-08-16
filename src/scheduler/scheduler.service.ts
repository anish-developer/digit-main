import { Injectable, Res } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Response } from 'express';
import { PlateManagementService } from 'src/SellerModule/plateManagement/plateMangement.service';
@Injectable()
export class SchedulerService {
  constructor(private plateManagementService: PlateManagementService) {}

  //@Cron(CronExpression. EVERY_DAY_AT_MIDNIGHT)
  @Cron(CronExpression.EVERY_YEAR)
  async handleCron(@Res() res: Response) {
    await this.plateManagementService.getAllPlatess(res);
  }
}
