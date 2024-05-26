import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { ListUsersDTO } from './dto/ListUser.dto';
import { UpdateUserDTO } from './dto/UpdateUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(user: UserEntity) {
    await this.userRepository.save(user);
  }

  async listUsers() {
    const savedUsers = await this.userRepository.find();
    const usersList = savedUsers.map(
      (user) => new ListUsersDTO(user.id, user.name, user.email),
    );

    return usersList;
  }

  async updateUser(id: string, user: UpdateUserDTO) {
    await this.userRepository.update(id, user);
  }

  async deleteUser(id: string) {
    await this.userRepository.delete(id);
  }
}
