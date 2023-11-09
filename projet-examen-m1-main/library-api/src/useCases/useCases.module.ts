import { Module } from '@nestjs/common';
import { RepositoryModule } from '../repositories/repository.module';
import { AuthorUseCases } from './authors/author.useCases';
import { BookUseCases } from './books/book.useCases';
import { GenreUseCases } from './genres/genre.useCases';
import { UserUseCases } from './users/user.useCases';
import { UserBookUseCases } from './usersBooks/userBook.useCases';

const useCases = [AuthorUseCases, BookUseCases, GenreUseCases, UserUseCases, UserBookUseCases];

@Module({
  imports: [RepositoryModule],
  providers: [...useCases],
  exports: [...useCases],
})
export class UseCasesModule {}
