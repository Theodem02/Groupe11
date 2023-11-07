import { Module } from '@nestjs/common';
import { RepositoryModule } from '../repositories/repository.module';
import { AuthorUseCases } from './authors/author.useCases';
import { BookUseCases } from './books/book.useCases';
import { GenreUseCases } from './genres/genre.useCases';
import { UserUseCases } from './users/user.useCases';

const useCases = [AuthorUseCases, BookUseCases, GenreUseCases, UserUseCases];

@Module({
  imports: [RepositoryModule],
  providers: [...useCases],
  exports: [...useCases],
})
export class UseCasesModule {}
