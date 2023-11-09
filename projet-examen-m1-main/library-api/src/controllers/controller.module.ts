import { Module } from '@nestjs/common';
import { AuthorController } from 'library-api/src/controllers/authors/author.controller';
import { BookController } from 'library-api/src/controllers/books/book.controller';
import { UserController } from './users/user.controller';
import { GenreController } from 'library-api/src/controllers/genres/genre.controller';
import { UserBookController } from 'library-api/src/controllers/usersBooks/usersBooks.controller';
import { RepositoryModule } from 'library-api/src/repositories/repository.module';
import { UseCasesModule } from 'library-api/src/useCases/useCases.module';

@Module({
  imports: [UseCasesModule, RepositoryModule],
  controllers: [AuthorController, BookController, GenreController, UserController, UserBookController],
})
export class ControllerModule {}
