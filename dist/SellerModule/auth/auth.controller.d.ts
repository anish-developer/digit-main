import { RegisterDTO } from 'src/SellerModule/auth/dto/register.dto';
import { UserService } from 'src/SellerModule/auth/user.service';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { ContactDTO } from './dto/contact.dto';
import { ChangePasswordDTO } from 'src/SellerModule/auth/dto/changePassword.dto';
import { ForgotPasswordDTO } from 'src/SellerModule/auth/dto/forgotPassword.dto';
export declare class AuthController {
    private userService;
    private authService;
    constructor(userService: UserService, authService: AuthService);
    hiddenInformation(): Promise<string>;
    publicInformation(): Promise<string>;
    register(res: any, registerDTO: RegisterDTO): Promise<any>;
    login(res: any, loginDTO: LoginDTO): Promise<any>;
    resendOtp(res: any, loginDTO: LoginDTO): Promise<void>;
    verifyOtp(res: any, loginDTO: LoginDTO): Promise<void>;
    logout(res: any): Promise<any>;
    changePassword(res: any, userID: any, changePasswordDTO: ChangePasswordDTO): Promise<any>;
    forgotPassword(res: any, userID: any, forgotPasswordDTO: ForgotPasswordDTO): Promise<any>;
    al_upload(res: any, body: any, _id: any): Promise<void>;
    uploadFile(res: any, body: any): Promise<void>;
    getProfileImage(filename: any, res: any): any;
    sendEmail(contactDTO: ContactDTO, res: any): Promise<void>;
}
