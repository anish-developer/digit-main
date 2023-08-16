import { SessionManagementService } from 'src/BuyerModule/sessionManagement/sessionManagement.service';
import { SessionManagementDTO } from 'src/BuyerModule/sessionManagement/sessionManagement.dto';
import { Response } from 'express';
export declare class SessionManagementController {
    private sessionManagementService;
    constructor(sessionManagementService: SessionManagementService);
    addPayment(res: Response, sessionManagementDTO: SessionManagementDTO): Promise<void>;
}
