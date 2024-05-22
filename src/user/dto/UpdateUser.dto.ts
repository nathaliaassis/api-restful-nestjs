import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { ValidateExistingEmail } from '../validate/validateEmailAlreadyExists';

export class UpdateUserDTO {
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsEmail(undefined, { message: 'E-mail is invalid' })
  @ValidateExistingEmail({ message: 'E-mail already exists' })
  @IsOptional()
  email: string;

  @MinLength(6, { message: 'Password must have at least 6 characters' })
  @IsOptional()
  password: string;
}
