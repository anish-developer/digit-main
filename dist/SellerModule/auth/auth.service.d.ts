import { Payload } from 'src/SellerModule/interfaces/payload.interface';
import { UserService } from 'src/SellerModule/auth/user.service';
export declare class AuthService {
    private userService;
    constructor(userService: UserService);
    signPayload(payload: Payload): Promise<string>;
    validateUser(payload: Payload): Promise<import("../interfaces/user.interface").User & {
        _id: any;
    }>;
}
