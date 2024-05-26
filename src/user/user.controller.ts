import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDTO } from './dto/CreateUser.dto';
import { UserEntity } from './user.entity';
import { v4 as uuid } from 'uuid';
import { ListUsersDTO } from './dto/ListUser.dto';
import { UpdateUserDTO } from './dto/UpdateUser.dto';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {
  constructor(
    private userRepository: UserRepository,
    private userService: UserService,
  ) {}

  @Post()
  async createUser(@Body() userData: CreateUserDTO) {
    const userEntity = new UserEntity();
    userEntity.name = userData.name;
    userEntity.email = userData.email;
    userEntity.password = userData.password;
    userEntity.id = uuid();

    this.userService.createUser(userEntity);

    return {
      user: new ListUsersDTO(userEntity.id, userEntity.name, userEntity.email),
      message: 'User created successfully',
    };
  }

  @Get()
  async listUsers() {
    return this.userService.listUsers();
  }

  @Put('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() userUpdatedata: UpdateUserDTO,
  ) {
    const updatedUser = await this.userService.updateUser(id, userUpdatedata);

    return {
      user: updatedUser,
      message: 'User updated successfully',
    };
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    await this.userService.deleteUser(id);

    return {
      message: `User deleted successfully`,
    };
  }
}
