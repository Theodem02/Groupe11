import { faker } from '@faker-js/faker';
import { Author, AuthorId } from '../entities';

export const authorFixture = (): Author => ({
    id: faker.string.uuid() as AuthorId,
    firstName: faker.string.sample(8),
    lastName: faker.string.sample(8),
    photoUrl: faker.image.url(),
    books: [],
  }) as Author;
