import { Response } from 'express';
import { PlateManagementService } from 'src/SellerModule/plateManagement/plateMangement.service';
export declare class SchedulerService {
    private plateManagementService;
    constructor(plateManagementService: PlateManagementService);
    handleCron(res: Response): Promise<void>;
}
