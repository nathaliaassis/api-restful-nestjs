import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ValidateExistingEmail } from '../validate/validateEmailAlreadyExists';

export class CreateUserDTO {
  @IsNotEmpty()
  name: string;

  @IsEmail(undefined, { message: 'E-mail is required' })
  @ValidateExistingEmail({ message: 'E-mail already exists' })
  email: string;

  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;
}
