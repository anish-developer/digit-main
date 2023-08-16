/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';
export class MailDTO {
  @IsNotEmpty({ message: 'Email Required' })
  @IsString()
  email: string;
  link: string;
}
