/* eslint-disable prettier/prettier */
import { Controller, Res, Body, Post } from '@nestjs/common';
import { SessionManagementService } from 'src/BuyerModule/sessionManagement/sessionManagement.service';
import { SessionManagementDTO } from 'src/BuyerModule/sessionManagement/sessionManagement.dto';
import { Response } from 'express';

@Controller('session')
export class SessionManagementController {
  constructor(private sessionManagementService: SessionManagementService) {}

  @Post('/addSession')
  async addPayment(
    @Res() res: Response,
    @Body() sessionManagementDTO: SessionManagementDTO,
  ) {
    await this.sessionManagementService.addSession(res, sessionManagementDTO);
  }
}
