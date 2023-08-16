import { Model } from 'mongoose';
import { User } from 'src/SellerModule/interfaces/user.interface';
import { UserManagementDTO } from 'src/SellerModule/userManagement/userManagement.dto';
export declare class UserManagementService {
    private readonly userModel;
    constructor(userModel: Model<User>);
    getUserDetails(res: any, userID: any): Promise<any>;
    updateUser(res: any, userID: any, userManagementDTO: UserManagementDTO): Promise<User>;
}
