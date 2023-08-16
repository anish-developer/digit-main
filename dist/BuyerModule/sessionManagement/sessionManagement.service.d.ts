import { Model } from 'mongoose';
import { Session } from 'src/BuyerModule/interface/session.interface';
import { SessionManagementDTO } from 'src/BuyerModule/sessionManagement/sessionManagement.dto';
import { Response } from 'express';
export declare class SessionManagementService {
    private readonly sessionModel;
    constructor(sessionModel: Model<Session>);
    addSession(res: Response, sessionManagementDTO: SessionManagementDTO): Promise<Session>;
}
