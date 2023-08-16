import { Model } from 'mongoose';
import { Following } from '../interfaces/following.interface';
import { FollowingManagementDTO } from './following.dto';
export declare class FollowingManagementService {
    private readonly followingModel;
    constructor(followingModel: Model<Following>);
    addFollow(res: any, followingManagementDTO: FollowingManagementDTO): Promise<any>;
    getFollow(res: any, user_id: any): Promise<Following>;
}
