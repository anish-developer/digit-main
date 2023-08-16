import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
export class UserManagementDTO {
  name: string;
  @IsNotEmpty({ message: 'Email Required' })
  @IsString()
  email: string;
  @IsNotEmpty({ message: 'Password Required' })
  @IsString()
  @MinLength(8, { message: 'Password is too short (8 characters min)' })
  @MaxLength(20, { message: 'Password is too long (20 characters max)' })
  password: string;
  authentication: string;
  company_name: string;
  company_register_number: string;
  PIC_fullname: string;
  phone: string;
  last_login: Date;
  updated_at: Date;
  created_at: Date;
  user_type: string;
  file: string;
  al_file: string;
  al_status: string;
  passport_number: string;
}
