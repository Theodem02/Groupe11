import { booksFixture } from "../fixtures";
import { BookRepository } from "../repositories/books/book.repository";
import { BookUseCases } from "../useCases/books/book.useCases";
import { Book } from "../entities";
import{adaptBookEntityToPlainBookModel} from "../repositories/books/book.utils";
import { DataSource } from "typeorm";


describe("BookRepository", () => {
    describe("getAllPlain", () => {
        it("should return all books", async () => {
            const dataSource = {
                createEntityManager: jest.fn(),
            } as unknown as DataSource;

            const bookRepository = new BookRepository(dataSource);
            const books = [booksFixture(), booksFixture(), booksFixture()];
            const findSpy = jest.spyOn(bookRepository, "find").mockResolvedValue(books);
            const result = await bookRepository.getAllPlain();

            expect(findSpy).toHaveBeenCalledTimes(1);
            expect(findSpy).toHaveBeenCalledWith({ relations: { bookGenres: { genre: true }, author: true } });
            expect(result).toEqual(books.map((adaptBookEntityToPlainBookModel)));

        });
    });
});
