import { Book, User } from 'library-api/src/entities';
import { UserBookId } from 'library-api/src/entities';
import { PlainBookModel } from 'library-api/src/models';
import { PlainUserModel } from 'library-api/src/models';

export type PlainUserBookModel = {
  id: UserBookId;
  user: PlainUserModel;
  book: PlainBookModel;
};

export type UserBookModel = {
  id: UserBookId;
  user: User;
  book: Book;
};