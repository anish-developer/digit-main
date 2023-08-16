import { UserManagementService } from 'src/SellerModule/userManagement/userMangement.service';
import { UserManagementDTO } from 'src/SellerModule/userManagement/userManagement.dto';
export declare class UserManagementController {
    private userManagementService;
    constructor(userManagementService: UserManagementService);
    getUserDetails(res: any, userID: any): Promise<void>;
    editUser(res: any, userID: any, userManagementDTO: UserManagementDTO): Promise<void>;
}
