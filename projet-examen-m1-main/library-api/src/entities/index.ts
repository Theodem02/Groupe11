import { Author } from './Author';
import { Book } from './Book';
import { BookGenre } from './BookGenre';
import { Genre } from './Genre';
import { User } from './User';
import { UserBook } from './UserBook';

export * from './Author';
// eslint-disable-next-line import/no-cycle
export * from './Book';
export * from './BookGenre';
export * from './Genre';
export * from './User';
export * from './UserBook';

export const entities = [Author, Book, BookGenre, Genre, User, UserBook];
