import { Injectable } from '@nestjs/common';
import { NotFoundError } from 'library-api/src/common/errors';
import { User, UserId } from 'library-api/src/entities';
import { PlainUserRepositoryOutput, UserRepositoryOutput } from 'library-api/src/repositories/users/user.repository.type';
import { DataSource, Repository } from 'typeorm';

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
        return users.map(user => ({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            bookId: user.bookId,
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
            bookId: user.bookId,
        };
    }
}