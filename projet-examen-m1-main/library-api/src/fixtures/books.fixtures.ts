import { Book,BookId } from "../entities";
import { faker } from '@faker-js/faker';
import { authorFixture } from "./author.fixture";

export const booksFixture = (): Book =>({
    id: faker.string.uuid() as BookId,
    name: faker.string.sample(8),
    writtenOn: faker.date.past(),
    authorId: faker.string.uuid(),
    author: authorFixture(),
    bookGenres: []
}) as Book;
