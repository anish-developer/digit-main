/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class RegisterDTO {
  account_type: string;
  first_name: string;
  last_name: string;
  passport_number: number;
  category: string;
  name: string;
  @IsNotEmpty({ message: 'Email Required' })
  @IsString()
  email: string;
  PIC_fullname: string;
  phone: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;
  user_type: string;
  @IsNotEmpty({ message: 'Password Required' })
  @IsString()
  @Matches(
    /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/,
    { message: 'Weak password' },
  )
  password: string;
  status: string;
}
