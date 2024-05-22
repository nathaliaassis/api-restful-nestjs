import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository {
  private users = [];

  async save(user: UserEntity) {
    this.users.push(user);
  }

  async list() {
    return this.users;
  }

  async getById(id: string) {
    const existingUser = this.users.find((user) => user.id === id);

    if (!existingUser) {
      throw new Error('User not found');
    }

    return existingUser;
  }

  async verifyIfUserExistsByEmail(email: string) {
    const emailExists = this.users.find((user) => user.email === email);

    return emailExists !== undefined;
  }

  async update(id: string, updatedUserData: Partial<UserEntity>) {
    const existingUser = this.getById(id);

    Object.entries(updatedUserData).forEach(([key, value]) => {
      if (key === 'id') return;
      existingUser[key] = value;
    });

    return existingUser;
  }

  async delete(id: string) {
    const userToBeDeleted = this.getById(id);

    this.users = this.users.filter((user) => user.id !== id);

    return userToBeDeleted;
  }
}
