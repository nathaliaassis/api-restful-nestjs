import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserRepository } from '../user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
@ValidatorConstraint({ async: true })
export class ValidateEmailAlreadyExists
  implements ValidatorConstraintInterface
{
  constructor(private userRepository: UserRepository) {}
  async validate(value: any): Promise<boolean> {
    const emailAlreadyExists =
      await this.userRepository.verifyIfUserExistsByEmail(value);

    return !emailAlreadyExists;
  }
}

export const ValidateExistingEmail = (validationOptions: ValidationOptions) => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return (obj: Object, property: string) => {
    registerDecorator({
      target: obj.constructor,
      propertyName: property,
      options: validationOptions,
      constraints: [],
      validator: ValidateEmailAlreadyExists,
    });
  };
};
