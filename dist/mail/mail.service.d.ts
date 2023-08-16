import { SendGridService } from 'src/sendgrid/sendgrid.service';
import { MailDTO } from './mail.dto';
import { Model } from 'mongoose';
import { User } from 'src/SellerModule/interfaces/user.interface';
export declare class MailService {
    private readonly sendGridService;
    private readonly userModel;
    constructor(sendGridService: SendGridService, userModel: Model<User>);
    getResetMail(mailDTO: MailDTO, res: any): Promise<any>;
}
