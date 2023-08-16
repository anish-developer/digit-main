import { MailService } from './mail.service';
import { MailDTO } from 'src/mail/mail.dto';
export declare class MailController {
    private readonly mailService;
    constructor(mailService: MailService);
    sendEmail(mailDTO: MailDTO, res: any): Promise<void>;
}
