import { Model } from 'mongoose';
import { User } from 'src/SellerModule/interfaces/user.interface';
import { Otp } from 'src/SellerModule/interfaces/otp.interface';
import { RegisterDTO } from '../auth/dto/register.dto';
import { LoginDTO } from 'src/SellerModule/auth/dto/login.dto';
import { Payload } from 'src/SellerModule/interfaces/payload.interface';
import { ChangePasswordDTO } from 'src/SellerModule/auth/dto/changePassword.dto';
import { ForgotPasswordDTO } from 'src/SellerModule/auth/dto/forgotPassword.dto';
import { SendGridService } from 'src/sendgrid/sendgrid.service';
import { Contact } from 'src/BuyerModule/interface/contact.interface';
import { ContactDTO } from './dto/contact.dto';
export declare class UserService {
    private userModel;
    private otpModel;
    private readonly contactModel;
    private sendGridService;
    constructor(userModel: Model<User>, otpModel: Model<Otp>, contactModel: Model<Contact>, sendGridService: SendGridService);
    hashPassword(password: string): Promise<string>;
    create(res: any, registerDTO: RegisterDTO): Promise<any>;
    findByPayload(payload: Payload): Promise<User & {
        _id: any;
    }>;
    findByLogin(res: any, userDTO: LoginDTO): Promise<any>;
    sanitizeUser(user: User): import("mongoose").LeanDocument<User>;
    resendOtp(res: any, userDTO: LoginDTO): Promise<any>;
    verifyOtp(res: any, userDTO: LoginDTO): Promise<any>;
    changePassword(res: any, userID: string, changePasswordDTO: ChangePasswordDTO): Promise<any>;
    forgotPassword(res: any, userID: string, forgotPasswordDTO: ForgotPasswordDTO): Promise<any>;
    al_upload(res: any, body: any, _id: any): Promise<any>;
    uploadFile(res: any, body: any): Promise<any>;
    getResetMail(contactDTO: ContactDTO, res: any): Promise<any>;
}
