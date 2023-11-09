import { Author } from '../entities/Author';
import { Book } from '../entities/Book';
import { BookGenre } from '../entities/BookGenre';
import { Genre } from '../entities/Genre';
import { User } from '../entities/User';
import { UserBook } from '../entities/UserBook';

export * from './Author';
// eslint-disable-next-line import/no-cycle
export * from './Book';
export * from './BookGenre';
export * from './Genre';
export * from './User';
export * from './UserBook';

export const entities = [Author, Book, BookGenre, Genre, User, UserBook];
