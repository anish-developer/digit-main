/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty } from 'class-validator';

export class ForgotPasswordDTO {
  @IsNotEmpty({ message: 'Password Required' })
  @IsString()
  password: string;
}
