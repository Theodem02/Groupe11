//impoort the things for user.spec.ts

import {DataSource} from 'typeorm';
import {userFixture} from '../fixtures/user.fixture';
import {UserRepository} from '../repositories/users/user.repository';
import {UserUseCases} from '../useCases/users/user.useCases';
import {PlainUserRepositoryOutput, UserRepositoryOutput} from '../repositories/users/user.repository.type';

describe('UserRepository', () => {
    describe('getAllPlain', () => {
        it('should return all users', async () => {
            const dataSource = {
                createEntityManager: jest.fn(),
            } as unknown as DataSource;

            const userRepository = new UserRepository(dataSource);
            const users = [userFixture(), userFixture(), userFixture()];
            const findSpy = jest
                .spyOn(userRepository, 'find')
                .mockResolvedValue(users);
            const result = await userRepository.getAllPlain();

            expect(findSpy).toHaveBeenCalledTimes(1);
            expect(findSpy).toHaveBeenCalledWith();
            expect(result).toEqual(
                users.map((user) => ({
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                })),
            );

            expect(true).toBeTruthy();
            expect(null).toBeNull();
        });
    });
    describe('getById', () => {
        it('should return an user by its id', async () => {
            const dataSource = {
                createEntityManager: jest.fn(),
            } as unknown as DataSource;

            const userRepository = new UserRepository(dataSource);
            const user = userFixture();
            const findSpy = jest
                .spyOn(userRepository, 'findOne')
                .mockResolvedValue(user);
            const result = await userRepository.getById(user.id);

            expect(findSpy).toHaveBeenCalledTimes(1);
            expect(findSpy).toHaveBeenCalledWith({where: {id: user.id}});
            expect(result).toEqual({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
            });
        });
    });
    /*describe('create', () => {
        it('should create an user', async () => {
            const dataSource = {
                createEntityManager: jest.fn(),
            } as unknown as DataSource;

            const userRepository = new UserRepository(dataSource);
            const user = userFixture();
            const saveSpy = jest
                .spyOn(userRepository, 'save')
                .mockResolvedValue(user);
            const result = await userRepository.create(user);

            expect(saveSpy).toHaveBeenCalledTimes(1);
            expect(saveSpy).toHaveBeenCalledWith(user);
            expect(result).toEqual({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                user: user.user,
            });
        });
    });*/
});