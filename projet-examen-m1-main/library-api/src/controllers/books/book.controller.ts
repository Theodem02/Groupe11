import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { BookPresenter, PlainBookPresenter } from './book.presenter';
import { BookId, Genre, GenreId } from '../../entities';
import { BookModel, PlainBookModel } from '../../models';
import { BookUseCases } from '../../useCases';

@ApiTags('books')
@Controller('books')
export class BookController {
  constructor(private readonly bookUseCases: BookUseCases) {}

  @Get('/')
  @ApiOperation({ summary: 'Get all books', description: 'Get a list of all books' })
  @ApiResponse({ status: 200, description: 'List of books', type: PlainBookPresenter, isArray: true })
  public async getAll(): Promise<PlainBookPresenter[]> {
    const books = await this.bookUseCases.getAllPlain();
    return books.map(PlainBookPresenter.from);
  }

  @Get('/author/:authorId')
  @ApiOperation({ summary: 'Get books by author ID', description: 'Get a list of books by author ID' })
  @ApiParam({ name: 'authorId', type: String, description: 'Author ID' })
  @ApiResponse({ status: 200, description: 'List of books', type: PlainBookPresenter, isArray: true })
  public async getBooksByAuthorId(
    @Param('authorId') authorId: string,
  ): Promise<PlainBookPresenter[]> {
    const books = await this.bookUseCases.getBooksByAuthorId(authorId);
    return books.map(PlainBookPresenter.from);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get a book by ID', description: 'Get details of a book by its ID' })
  @ApiParam({ name: 'id', type: String, description: 'Book ID' })
  @ApiResponse({ status: 200, description: 'Book details', type: BookPresenter })
  public async getById(@Param('id') id: BookId): Promise<BookPresenter> {
    const book = await this.bookUseCases.getById(id);
    return BookPresenter.from(book);
  }

  @Post('/')
  @ApiOperation({ summary: 'Create a new book', description: 'Create a new book with the provided data' })
  @ApiBody({ description: 'Data to create a new book' })
  @ApiResponse({ status: 201, description: 'Book created successfully'})
  public async createBook(
    @Body() bookData: BookModel,
  ): Promise<PlainBookModel> {
    const newBook = await this.bookUseCases.createBook(bookData);

    const newGenre = new Genre();
    newGenre.id = bookData.genres[0].id as GenreId;
    newGenre.name = bookData.genres[0].name;

    await this.bookUseCases.createBookGenres(newBook.id, newGenre);

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

  @Post('/delete/:id')
  @ApiOperation({ summary: 'Delete a book by ID', description: 'Delete a book by its ID' })
  @ApiParam({ name: 'id', type: String, description: 'Book ID' })
  @ApiResponse({ status: 200, description: 'Book deleted successfully' })
  public async deleteBook(@Param('id') id: BookId): Promise<void> {
    await this.bookUseCases.deleteBook(id);
  }
}
