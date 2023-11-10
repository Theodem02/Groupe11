import { genreFixture } from "../fixtures/genre.fixture";
import { GenreRepository } from "../repositories/genres/genre.repository";
import{GenreUseCases} from "../useCases/genres/genre.useCases";
import { GenreController } from "../controllers/genres/genre.controller";
import {PlainGenreRepositoryOutput,GenreRepositoryOutput} from "../repositories/genres/genre.repository.type";
import { DataSource } from "typeorm";
import { PlainGenrePresenter } from "../controllers/genres/genre.presenter";

const dataSource = {
    createEntityManager: jest.fn(),}as unknown as DataSource;
const genreRepository = new GenreRepository(dataSource);
const genreUseCases = new GenreUseCases(genreRepository);
const genres  = [genreFixture(), genreFixture(), genreFixture()];
const genre = genreFixture();
const findSpy = jest.spyOn(genreRepository, 'find').mockResolvedValue(genres);

describe('GenreRepository', () => {
    it('should return all genres', async () => {
        const result = await genreRepository.getAllPlain();
        expect(findSpy).toHaveBeenCalledTimes(1);
        expect(findSpy).toHaveBeenCalledWith();
        expect(result).toEqual(genres.map((genre) => ({
            id: genre.id,
            name: genre.name,
            bookGenres: genre.bookGenres
        })));
    });
});

describe('GenreUseCases', () => {
    it('should return all genres', async () => {
        const result = await genreUseCases.getAllPlain();
        expect(findSpy).toHaveBeenCalledTimes(2);
        expect(findSpy).toHaveBeenCalledWith();
        expect(result).toEqual(genres.map((genre) => ({
            id: genre.id,
            name: genre.name,
            bookGenres: genre.bookGenres
        })));
    });
});

describe('GenreController', () => {
    const genreController = new GenreController(genreUseCases);

    it('should return all genres', async () => {
        const result = await genreController.getAll();

        expect(findSpy).toHaveBeenCalledTimes(3);
        expect(findSpy).toHaveBeenCalledWith();

        // Use map to apply PlainGenrePresenter.from to each element in the result array
        const expectedArray = genres.map(PlainGenrePresenter.from);

        expect(result).toEqual(expectedArray);
    });
});