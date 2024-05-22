import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { ValidateEmailAlreadyExists } from './validate/validateEmailAlreadyExists';

@Module({
  controllers: [UserController],
  providers: [UserRepository, ValidateEmailAlreadyExists],
})
export class UserModule {}
