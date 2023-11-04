import { Injectable } from '@nestjs/common';
import { NotFoundError } from 'library-api/src/common/errors';
import { Author, AuthorId } from 'library-api/src/entities';
import {
  PlainAuthorRepositoryOutput,
  AuthorRepositoryOutput,
} from 'library-api/src/repositories/authors/author.repository.type';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class AuthorRepository extends Repository<Author> {
  constructor(public readonly dataSource: DataSource) {
    super(Author, dataSource.createEntityManager());
  }

  /**
   * Get all plain authors
   * @returns Array of plain authors
   */
  public async getAllPlain(): Promise<PlainAuthorRepositoryOutput[]> {
    const authors = await this.find();
    return authors.map(author => ({
      id: author.id,
      firstName: author.firstName,
      lastName: author.lastName,
      photoUrl: author.photoUrl, // Ajoutez une propriété photoUrl avec une valeur par défaut
    }));
  }

  /**
   * Get an author by their ID
   * @param id Author's ID
   * @returns Author if found
   * @throws 404: author with this ID was not found
   */
  public async getById(id: AuthorId): Promise<PlainAuthorRepositoryOutput> {
    const author = await this.findOne({ where: { id } });

    if (!author) {
      throw new NotFoundError(`Author - '${id}'`);
    }

    return {
      id: author.id,
      firstName: author.firstName,
      lastName: author.lastName,
      photoUrl: author.photoUrl, // Ajoutez une propriété photoUrl avec une valeur par défaut
    };
  }

  /**
   * Create a new author
   * @param authorData Author's data
   * @returns Created author
   * @throws 400: author's data is invalid
   */
  public async createAuthor(authorData: AuthorRepositoryOutput): Promise<AuthorRepositoryOutput> {
    const author = this.create(authorData);
    await this.save(author);

    return author;
  }
}
