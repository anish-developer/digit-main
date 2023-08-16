/* eslint-disable prettier/prettier */
import { IsString, Matches, IsNotEmpty } from 'class-validator';

export class ChangePasswordDTO {
  @IsNotEmpty({ message: 'Password Required' })
  @IsString()
  @Matches(
    /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/,
    { message: 'Weak password' },
  )
  old_password: string;
  @IsNotEmpty({ message: 'Password Required' })
  @IsString()
  new_password: string;
}
