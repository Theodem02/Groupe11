import { Injectable } from '@nestjs/common';
import { NotFoundError } from 'library-api/src/common/errors';
import { Book, BookId } from 'library-api/src/entities';
import { BookGenre, BookGenreId } from 'library-api/src/entities';
import { Genre } from 'library-api/src/entities';

import {
  BookRepositoryOutput,
  PlainBookRepositoryOutput,
} from 'library-api/src/repositories/books/book.repository.type';
import {
  adaptBookEntityToBookModel,
  adaptBookEntityToPlainBookModel,
} from 'library-api/src/repositories/books/book.utils';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class BookRepository extends Repository<Book> {
  constructor(public readonly dataSource: DataSource) {
    super(Book, dataSource.createEntityManager());
  }

  /**
   * Get all plain books
   * @returns Array of plain books
   */
  public async getAllPlain(): Promise<PlainBookRepositoryOutput[]> {
    const books = await this.find({
      relations: { bookGenres: { genre: true }, author: true },
    });

    return books.map(adaptBookEntityToPlainBookModel);
  }

  /**
   * Get a book by its ID
   * @param id Book's ID
   * @returns Book if found
   * @throws 404: book with this ID was not found
   */
  public async getById(id: BookId): Promise<BookRepositoryOutput> {
    const book = await this.findOne({ where: { id }, relations: { bookGenres: {genre: true}, author: true} });
    if (!book) {
      throw new NotFoundError(`Book - '${id}'`);
    }

    return adaptBookEntityToBookModel(book);
  }

  /**
   * Create a new book
   * @param bookData Book's data
   * @returns Created book
   * @throws 400: invalid data
   */
  public async createBook(bookData: BookRepositoryOutput): Promise<BookRepositoryOutput> {
    const book = this.create(bookData);
    await this.save(book);

    return adaptBookEntityToBookModel(book);
  }

  /**
   * Get books by author ID
   * @param authorId Author's ID
   * @returns Array of books by the author
   */
  public async getBooksByAuthorId(authorId: string): Promise<PlainBookRepositoryOutput[]> {
    const books = await this.find({
      where: { authorId }, // Assuming the field name in the Book entity is 'authorId'
      relations: { bookGenres: { genre: true }, author: true },
    });

    return books.map(adaptBookEntityToPlainBookModel);
  }

  /**
   * Add a genre to a book and save it in the database
   * @param bookId Book's ID
   * @param genreId Genre's ID
   * @returns Updated book
   */
  public async createBookGenres(bookId: BookId, genre: Genre): Promise<BookRepositoryOutput> {
    const book = await this.findOne({ where: { id: bookId }, relations: { bookGenres: { genre: true }, author: true } });
    if (!book) {
      throw new NotFoundError(`Book - '${bookId}'`);
    }

    const bookGenre = new BookGenre();
    bookGenre.id = genre.id.toString() as BookGenreId;
    bookGenre.book = book;
    bookGenre.genre = genre;

    book.bookGenres.push(bookGenre);
    await bookGenre.save();

    return adaptBookEntityToBookModel(book);
  }

}
