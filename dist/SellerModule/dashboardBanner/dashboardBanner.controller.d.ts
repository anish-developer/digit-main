import { DashboardBannerService } from 'src/SellerModule/dashboardBanner/dashboardBanner.service';
export declare class DashboardBannerController {
    readonly DashboardBannerService: DashboardBannerService;
    constructor(DashboardBannerService: DashboardBannerService);
    GetAllAdminUser(res: any): Promise<any>;
}
