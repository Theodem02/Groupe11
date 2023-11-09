import { Module } from '@nestjs/common';
import { AuthorRepository } from './authors/author.repository';
import { BookRepository } from './books/book.repository';
import { GenreRepository } from './genres/genre.repository';
import { UserRepository } from './users/user.repository';
import { UserBookRepository } from './usersBooks/userBook.repository';

const repositories = [AuthorRepository, BookRepository, GenreRepository, UserRepository, UserBookRepository];

@Module({
  providers: [...repositories],
  exports: [...repositories],
})
export class RepositoryModule {}
