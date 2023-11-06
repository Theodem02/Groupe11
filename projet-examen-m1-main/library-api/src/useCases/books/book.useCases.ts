import { Injectable } from '@nestjs/common';
import { BookId } from 'library-api/src/entities';
import { BookRepository } from 'library-api/src/repositories';
import { Genre } from 'library-api/src/entities';
import {
  BookUseCasesOutput,
  PlainBookUseCasesOutput,
} from 'library-api/src/useCases/books/book.useCases.type';
import { PlainBookModel } from '../../models';

@Injectable()
export class BookUseCases {
  constructor(private readonly bookRepository: BookRepository) {}

  /**
   * Get all plain books
   * @returns Array of plain books
   */
  public async getAllPlain(): Promise<PlainBookUseCasesOutput[]> {
    return this.bookRepository.getAllPlain();
  }

  /**
   * Get books by author ID
   * @param authorId Author's ID
   * @returns Array of plain books belonging to the author
   */
  public async getBooksByAuthorId(authorId: string): Promise<PlainBookUseCasesOutput[]> {
    const books: PlainBookModel[] = await this.bookRepository.getBooksByAuthorId(authorId);
    return books;
  }

  /**
   * Get a book by its ID
   * @param id Book's ID
   * @returns Book if found
   * @throws 404: book with this ID was not found
   */
  public async getById(id: BookId): Promise<BookUseCasesOutput> {
    return this.bookRepository.getById(id);
  }

  /**
   * Create a new book
   * @param bookData Book's data
   * @returns Created book
   * @throws 400: invalid data
   */
  public async createBook(bookData: BookUseCasesOutput): Promise<BookUseCasesOutput> {
    return this.bookRepository.createBook(bookData);
  }

  /**
   * Add a genre to a book and save it in the database
   * @param bookId Book's ID
   * @param genreId Genre's ID
   * @returns Updated book
   */
  public async createBookGenres(bookId: BookId, genre: Genre): Promise<BookUseCasesOutput> {
    return this.bookRepository.createBookGenres(bookId, genre);
  }

  /**
   * Delete a book
   * @param id Book's ID
   * @returns Deleted book
   */
  public async deleteBook(id: BookId): Promise<BookUseCasesOutput> {
    return this.bookRepository.deleteBook(id);
  }
}
