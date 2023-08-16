/* eslint-disable prettier/prettier */
import { Controller, Get, Res, Param } from '@nestjs/common';
import { PortfolioManagementService } from 'src/SellerModule/portfolioManagement/portfolioManagement.service';

@Controller('portfolio')
export class PortfolioManagementController {
  constructor(private portfolioManagementService: PortfolioManagementService) {}

  @Get('getPortfolio/:user_id')
  async plateCountRanking(@Res() res, @Param('user_id') user_id) {
    await this.portfolioManagementService.plateCountRanking(res, user_id);
  }
}
