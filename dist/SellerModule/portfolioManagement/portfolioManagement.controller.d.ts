import { PortfolioManagementService } from 'src/SellerModule/portfolioManagement/portfolioManagement.service';
export declare class PortfolioManagementController {
    private portfolioManagementService;
    constructor(portfolioManagementService: PortfolioManagementService);
    plateCountRanking(res: any, user_id: any): Promise<void>;
}
