import { authorFixture } from "../fixtures/author.fixture";
import { booksFixture } from "../fixtures";
import { genreFixture } from "../fixtures/genre.fixture";

//test the author fixture properties
describe('authorFixture', () => {
    it('should return an author', () => {
        const author = authorFixture();
        expect(author).toHaveProperty('id');
        expect(author).toHaveProperty('firstName');
        expect(author).toHaveProperty('lastName');
        expect(author).toHaveProperty('photoUrl');
        expect(author).toHaveProperty('books');
    });

    it('should return a book', () => {
        const book = booksFixture();
        expect(book).toHaveProperty('id');
        expect(book).toHaveProperty('name');
        expect(book).toHaveProperty('writtenOn');
        expect(book).toHaveProperty('authorId');
        expect(book).toHaveProperty('author');
        expect(book).toHaveProperty('bookGenres');
    });

    it('should return a genre', () => {
        const genre = genreFixture();
        expect(genre).toHaveProperty('id');
        expect(genre).toHaveProperty('name');
        expect(genre).toHaveProperty('bookGenres');
    });

});