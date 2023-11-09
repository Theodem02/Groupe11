import { Book, User, UserBookId } from 'library-api/src/entities';

import { PlainBookModel, PlainUserModel } from 'library-api/src/models';

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
