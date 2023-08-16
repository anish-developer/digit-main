/* eslint-disable prettier/prettier */
/* eslint-disable no-var */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Session } from 'src/BuyerModule/interface/session.interface';
import { SessionManagementDTO } from 'src/BuyerModule/sessionManagement/sessionManagement.dto';
import { CommonMethods } from 'src/utilities/common-methods';
import { Response } from 'express';

@Injectable()
export class SessionManagementService {
  constructor(
    @InjectModel('Session') private readonly sessionModel: Model<Session>,
  ) {}

  async addSession(
    res: Response,
    sessionManagementDTO: SessionManagementDTO,
  ): Promise<Session> {
    const ip = sessionManagementDTO.ip;

    const data = await this.sessionModel.findOne({ ip }).exec();

    if (!data) {
      const newSession = await new this.sessionModel(
        sessionManagementDTO,
      ).save();

      return CommonMethods.success(res, 'IP add successfully', newSession);
    } else {
      return CommonMethods.error(res, 'IP not found');
    }
  }
}
