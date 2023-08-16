import { FollowingManagementDTO } from './following.dto';
import { FollowingManagementService } from './following.service';
export declare class FollowingManagementController {
    private followingManagementService;
    constructor(followingManagementService: FollowingManagementService);
    addFollow(res: any, followingManagementDTO: FollowingManagementDTO): Promise<void>;
    getFollow(res: any, user_id: any): Promise<void>;
}
