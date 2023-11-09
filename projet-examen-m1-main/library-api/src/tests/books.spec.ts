import { DataSource } from 'typeorm';
import { booksFixture } from '../fixtures';
import { BookRepository } from '../repositories/books/book.repository';
import { BookUseCases } from '../useCases/books/book.useCases';
import { Book } from '../entities';
import { adaptBookEntityToPlainBookModel } from '../repositories/books/book.utils';


describe('BookRepository', () => {
  const dataSource = {
    createEntityManager: jest.fn(),
  } as unknown as DataSource;
  const book = booksFixture();
  const bookRepository = new BookRepository(dataSource);

  describe('getAllPlain', () => {
    it('should return all books', async () => {
      const books = [booksFixture(), booksFixture(), booksFixture()];
      const findSpy = jest
        .spyOn(bookRepository, 'find')
        .mockResolvedValue(books);
      const result = await bookRepository.getAllPlain();

      expect(findSpy).toHaveBeenCalledTimes(1);
      expect(findSpy).toHaveBeenCalledWith({
        relations: { bookGenres: { genre: true }, author: true },
      });
      expect(result).toEqual(books.map(adaptBookEntityToPlainBookModel));
    });
  });

  describe('getById', () => {
    it('should return all books with a given id', async () => {
      const findSpy = jest
        .spyOn(bookRepository, 'findOne')
        .mockResolvedValue(book);
      const result = await bookRepository.getById(book.id);

      expect(findSpy).toHaveBeenCalledTimes(1);
      expect(findSpy).toHaveBeenCalledWith({
        where: { id: book.id },
        relations: { bookGenres: { genre: true }, author: true },
      });
      expect(result).toEqual(adaptBookEntityToPlainBookModel(book));
    });
  });

  describe('create/delete a book', () => {
    it('should create a new book', async () => {
      const createSpy = jest.spyOn(bookRepository, 'create').mockReturnValue(book);
      const saveSpy = jest.spyOn(bookRepository, 'save').mockResolvedValue(book);
      const bookWithGenres = { ...book, genres: [] }; // add genres property
      const result = await bookRepository.createBook(bookWithGenres);

      expect(createSpy).toHaveBeenCalledTimes(1);
      expect(createSpy).toHaveBeenCalledWith(bookWithGenres);
      expect(saveSpy).toHaveBeenCalledTimes(1);
      expect(saveSpy).toHaveBeenCalledWith(book);
      expect(result).toEqual(adaptBookEntityToPlainBookModel(book));
    });
    /*it('should delete a book', async () => {
      const deleteSpy = jest.spyOn(bookRepository, 'delete').mockResolvedValue(undefined);
      const findOneSpy = jest.spyOn(bookRepository, 'findOne').mockResolvedValue(book); // Mock the findOne method

      const result = await bookRepository.deleteBook(book.id);

      expect(findOneSpy).toHaveBeenCalledTimes(1); // Ensure findOne is called
      expect(findOneSpy).toHaveBeenCalledWith({ where: { id: book.id }, relations: { bookGenres: { genre: true }, author: true } });
      expect(deleteSpy).toHaveBeenCalledTimes(1);
      expect(deleteSpy).toHaveBeenCalledWith(book.id);
      expect(result).toEqual(undefined);

    });*/
  });

  describe('getByAuthorId', () => {
    it('should return all books with a given authorId', async () => {
      const findSpy = jest
        .spyOn(bookRepository, 'find')
        .mockResolvedValue([book]);
      const result = await bookRepository.getBooksByAuthorId(book.authorId);

      expect(findSpy).toHaveBeenCalledTimes(2);
      expect(findSpy).toHaveBeenCalledWith({
        where: { authorId: book.authorId },
        relations: { bookGenres: { genre: true }, author: true },
      });
      expect(result).toEqual([adaptBookEntityToPlainBookModel(book)]);
    });
  });

  describe('create/delete book genre', () => {
    it('should create a new book genre', async () => {

    });
  });
});

describe('BookUseCases', () => {
  // todos
});
