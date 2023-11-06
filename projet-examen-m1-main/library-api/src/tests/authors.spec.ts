//import { NotFoundException } from "@nestjs/common/exceptions";
import { authorFixture } from "../fixtures/author.fixture";
import { AuthorRepository } from "../repositories/authors/author.repository";
import {PlainAuthorRepositoryOutput,AuthorRepositoryOutput} from "../repositories/authors/author.repository.type";
import { DataSource } from "typeorm";


describe("AuthorRepository", () => {
  describe("getAllPlain", () => {
    it("should return all authors", async () => {
      const dataSource = {
        createEntityManager: jest.fn(),}as unknown as DataSource;

        const authorRepository = new AuthorRepository(dataSource);
        const authors = [authorFixture(), authorFixture(), authorFixture()];
        const findSpy = jest.spyOn(authorRepository, "find").mockResolvedValue(authors);
        const result = await authorRepository.getAllPlain();

        expect(findSpy).toHaveBeenCalledTimes(1);
        expect(findSpy).toHaveBeenCalledWith();
        expect(result).toEqual(authors.map((author) => ({
          id: author.id,
          firstName: author.firstName,
          lastName: author.lastName,
          photoUrl: author.photoUrl,
        })));

        expect(true).toBeTruthy();
        expect(null).toBeNull();
      });
    });
  });

