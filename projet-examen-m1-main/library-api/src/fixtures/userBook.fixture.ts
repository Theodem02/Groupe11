import {faker} from '@faker-js/faker';
import {UserBook, UserBookId} from '../entities';

export const userBookFixture = (): UserBook => ({
    id: faker.string.uuid() as UserBookId,
    userId: faker.string.uuid(),
    bookId: faker.string.uuid(),
    user: null,
    book: null,
    }) as UserBook;

