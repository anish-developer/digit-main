/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Res } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailDTO } from 'src/mail/mail.dto';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  // Here we use query parameter to get the email that we want to send
  @Post('send-email')
  async sendEmail(@Body() mailDTO: MailDTO, @Res() res) {
    await this.mailService.getResetMail(mailDTO, res);
  }
}
