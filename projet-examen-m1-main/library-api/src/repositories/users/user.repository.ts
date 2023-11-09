import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { NotFoundError } from '../../common/errors';
import { User, UserId } from '../../entities';
import {
  PlainUserRepositoryOutput,
  UserRepositoryOutput,
} from './user.repository.type';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(public readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  /**
   * Get all plain users
   * @returns Array of plain users
   */
  public async getAllPlain(): Promise<PlainUserRepositoryOutput[]> {
    const users = await this.find();
    return users.map((user) => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
    }));
  }

  /**
   * Get an user by their ID
   * @param id User's ID
   * @returns User if found
   * @throws 404: user with this ID was not found
   */

  public async getById(id: UserId): Promise<PlainUserRepositoryOutput> {
    const user = await this.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundError(`User - '${id}'`);
    }

    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  }

  /**
   * Create a new user
   * @param userData User's data
   * @returns Created user
   * @throws 400: user's data is invalid
   */

  public async deleteUser(id: UserId): Promise<void> {
    const user = await this.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundError(`User - '${id}'`);
    }
    await this.delete(id);
  }
}
