// import { NotFoundException } from "@nestjs/common/exceptions";
import { DataSource } from 'typeorm';
import { authorFixture } from '../fixtures/author.fixture';
import { AuthorRepository } from '../repositories/authors/author.repository';
import { AuthorUseCases } from '../useCases/authors/author.useCases';
import { AuthorController } from '../controllers/authors/author.controller';
import {
  PlainAuthorRepositoryOutput,
  AuthorRepositoryOutput,
} from '../repositories/authors/author.repository.type';

describe('AuthorRepository', () => {
  describe('getAllPlain', () => {
    it('should return all authors', async () => {
      const dataSource = {
        createEntityManager: jest.fn(),
      } as unknown as DataSource;

      const authorRepository = new AuthorRepository(dataSource);
      const authors = [authorFixture(), authorFixture(), authorFixture()];
      const findSpy = jest
        .spyOn(authorRepository, 'find')
        .mockResolvedValue(authors);
      const result = await authorRepository.getAllPlain();

      expect(findSpy).toHaveBeenCalledTimes(1);
      expect(findSpy).toHaveBeenCalledWith();
      expect(result).toEqual(
        authors.map((author) => ({
          id: author.id,
          firstName: author.firstName,
          lastName: author.lastName,
          photoUrl: author.photoUrl,
        })),
      );

      expect(true).toBeTruthy();
      expect(null).toBeNull();
    });
  });
  describe('getById', () => {
    it('should return an author by its id', async () => {
      const dataSource = {
        createEntityManager: jest.fn(),
      } as unknown as DataSource;

      const authorRepository = new AuthorRepository(dataSource);
      const author = authorFixture();
      const findSpy = jest
        .spyOn(authorRepository, 'findOne')
        .mockResolvedValue(author);
      const result = await authorRepository.getById(author.id);

      expect(findSpy).toHaveBeenCalledTimes(1);
      expect(findSpy).toHaveBeenCalledWith({ where: { id: author.id } });
      expect(result).toEqual({
        id: author.id,
        firstName: author.firstName,
        lastName: author.lastName,
        photoUrl: author.photoUrl,
      });
    });
  });
  describe('createAuthor', () => {
    it('should create a new author', async () => {
      const dataSource = {
        createEntityManager: jest.fn(),
      } as unknown as DataSource;

      const authorRepository = new AuthorRepository(dataSource);
      const author = authorFixture();
      const createSpy = jest
        .spyOn(authorRepository, 'create')
        .mockReturnValue(author);
      const saveSpy = jest
        .spyOn(authorRepository, 'save')
        .mockResolvedValue(author);
      const result = await authorRepository.createAuthor(author);

      expect(createSpy).toHaveBeenCalledTimes(1);
      expect(createSpy).toHaveBeenCalledWith(author);
      expect(saveSpy).toHaveBeenCalledTimes(1);
      expect(saveSpy).toHaveBeenCalledWith(author);
      expect(result).toEqual(author);
    });
  });
});

describe('AuthorUseCases', () => {
  describe('getAllPlain', () => {
    it('should return all authors', async () => {
      const dataSource = {
        createEntityManager: jest.fn(),
      } as unknown as DataSource;
      const authorRepository = new AuthorRepository(dataSource);
      const authorUseCases = new AuthorUseCases(authorRepository);
      const authors = [authorFixture(), authorFixture(), authorFixture()];

      const getAllPlainSpy = jest
        .spyOn(authorRepository, 'getAllPlain')
        .mockResolvedValue(
          authors.map((author) => ({
            id: author.id,
            firstName: author.firstName,
            lastName: author.lastName,
            photoUrl: author.photoUrl,
          })),
        );

      const result = await authorUseCases.getAllPlain();

      expect(getAllPlainSpy).toHaveBeenCalledTimes(1);
      expect(getAllPlainSpy).toHaveBeenCalledWith();
      expect(result).toEqual(
        authors.map((author) => ({
          id: author.id,
          firstName: author.firstName,
          lastName: author.lastName,
          photoUrl: author.photoUrl,
        })),
      );
    });
    describe('getById', () => {
      // import { NotFoundException } from "@nestjs/common/exceptions";


      describe('AuthorUseCases', () => {
        describe('getAllPlain', () => {
          it('should return all authors', async () => {
            const dataSource = {
              createEntityManager: jest.fn(),
            } as unknown as DataSource;
            const authorRepository = new AuthorRepository(dataSource);
            const authorUseCases = new AuthorUseCases(authorRepository);
            const authors = [authorFixture(), authorFixture(), authorFixture()];

            const getAllPlainSpy = jest
              .spyOn(authorRepository, 'getAllPlain')
              .mockResolvedValue(
                authors.map((author) => ({
                  id: author.id,
                  firstName: author.firstName,
                  lastName: author.lastName,
                  photoUrl: author.photoUrl,
                })),
              );

            const result = await authorUseCases.getAllPlain();

            expect(getAllPlainSpy).toHaveBeenCalledTimes(1);
            expect(getAllPlainSpy).toHaveBeenCalledWith();
            expect(result).toEqual(
              authors.map((author) => ({
                id: author.id,
                firstName: author.firstName,
                lastName: author.lastName,
                photoUrl: author.photoUrl,
              })),
            );
          });
        });

        describe('getById', () => {
          it('should return an author by its id', async () => {
            const dataSource = {
              createEntityManager: jest.fn(),
            } as unknown as DataSource;
            const authorRepository = new AuthorRepository(dataSource);
            const authorUseCases = new AuthorUseCases(authorRepository);
            const author = authorFixture();

            const getByIdSpy = jest
              .spyOn(authorRepository, 'getById')
              .mockResolvedValue({
                id: author.id,
                firstName: author.firstName,
                lastName: author.lastName,
                photoUrl: author.photoUrl,
              });

            const result = await authorUseCases.getById(author.id);

            expect(getByIdSpy).toHaveBeenCalledTimes(1);
            expect(getByIdSpy).toHaveBeenCalledWith(author.id);

            expect(result).toEqual({
              id: author.id,
              firstName: author.firstName,
              lastName: author.lastName,
              photoUrl: author.photoUrl,
            });
          });
        });
      });
    });
  });
});


describe('AuthorController', () => {
  const dataSource = {
    createEntityManager: jest.fn(),
  } as unknown as DataSource;

  const authorRepository = new AuthorRepository(dataSource);
  const authorUseCases = new AuthorUseCases(authorRepository);
  const authorController = new AuthorController(authorUseCases);



  it('should return all authors', async () => {
    const authors = [authorFixture(), authorFixture(), authorFixture()];
    const getAllPlainSpy = jest.spyOn(authorUseCases, 'getAllPlain').mockResolvedValue(
      authors.map((author) => ({
        id: author.id,
        firstName: author.firstName,
        lastName: author.lastName,
        photoUrl: author.photoUrl,
      })),
    );

    const result = await authorController.getAll();

    expect(getAllPlainSpy).toHaveBeenCalledTimes(1);
    expect(getAllPlainSpy).toHaveBeenCalledWith();
    expect(result).toEqual(
      authors.map((author) => ({
        id: author.id,
        firstName: author.firstName,
        lastName: author.lastName,
        photoUrl: author.photoUrl,
      })),
    );
  });
  it("should return an author by its id", async () => {
    const author = authorFixture();
    const getByIdSpy = jest.spyOn(authorUseCases, 'getById').mockResolvedValue({
      id: author.id,
      firstName: author.firstName,
      lastName: author.lastName,
      photoUrl: author.photoUrl,
    });

    const result = await authorController.getById(author.id);

    expect(getByIdSpy).toHaveBeenCalledTimes(1);
    expect(getByIdSpy).toHaveBeenCalledWith(author.id);

    expect(result).toEqual({
      id: author.id,
      firstName: author.firstName,
      lastName: author.lastName,
      photoUrl: author.photoUrl,
    });
  });
  it("should create a new author", async () => {
    const author = authorFixture();
    const createSpy = jest.spyOn(authorUseCases, 'createAuthor').mockResolvedValue(author);

    const result = await authorController.createAuthor(author);

    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(createSpy).toHaveBeenCalledWith(author);

    expect(result).toEqual({
        id: author.id,
        firstName: author.firstName,
        lastName: author.lastName,
        photoUrl: author.photoUrl,
        });
  });
  it("should delete an author by its id", async () => {
    const author = authorFixture();
    const deleteSpy = jest.spyOn(authorUseCases, 'deleteAuthor').mockResolvedValue();

    const result = await authorController.deleteAuthor(author.id);

    expect(deleteSpy).toHaveBeenCalledTimes(1);
    expect(deleteSpy).toHaveBeenCalledWith(author.id);

    expect(result).toEqual(undefined);
  });
});