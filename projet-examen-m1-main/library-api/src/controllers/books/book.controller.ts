import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import {
  BookPresenter,
  PlainBookPresenter,
} from 'library-api/src/controllers/books/book.presenter';
import { BookId } from 'library-api/src/entities';
import { BookModel, PlainBookModel } from 'library-api/src/models';
import { BookUseCases } from 'library-api/src/useCases';

@Controller('books')
export class BookController {
  constructor(private readonly bookUseCases: BookUseCases) {}

  @Get('/author/:authorId') // Nouvel endpoint pour récupérer les livres par l'ID de l'auteur
  public async getBooksByAuthorId(@Param('authorId') authorId: string): Promise<PlainBookPresenter[]> {
    const books = await this.bookUseCases.getBooksByAuthorId(authorId);
    return books.map(PlainBookPresenter.from);
  }

  @Get('/:id')
  public async getById(@Param('id') id: BookId): Promise<BookPresenter> {
    const book = await this.bookUseCases.getById(id);
    return BookPresenter.from(book);
  }

  @Post('/')
  public async createBook(@Body() bookData: BookModel): Promise<PlainBookModel> {
    const newBook = await this.bookUseCases.createBook(bookData);

    const plainBook: PlainBookModel = {
      id: newBook.id,
      name: newBook.name,
      writtenOn: newBook.writtenOn,
      author: newBook.author,
      authorId: newBook.authorId,
      genres: newBook.genres.map((genre) => genre.name) || [],
    };

    return plainBook;
  }
}
