import { Injectable } from '@nestjs/common';
import { AuthorId } from '../../entities';
import { AuthorRepository } from '../../repositories';
import {
  AuthorUseCasesOutput,
  PlainAuthorUseCasesOutput,
} from './author.useCases.type';

@Injectable()
export class AuthorUseCases {
  constructor(private readonly authorRepository: AuthorRepository) {}

  /**
   * Get all plain books
   * @returns Array of plain books
   */
  public async getAllPlain(): Promise<PlainAuthorUseCasesOutput[]> {
    return this.authorRepository.getAllPlain();
  }

  /**
   * Get a book by its ID
   * @param id Book's ID
   * @returns Book if found
   * @throws 404: book with this ID was not found
   */
  public async getById(id: AuthorId): Promise<PlainAuthorUseCasesOutput> {
    return this.authorRepository.getById(id);
  }

  /**
   * Create a new author
   * @param authorData Author's data
   * @returns Created author
   * @throws 400: author's data is invalid
   */
  public async createAuthor(
    authorData: AuthorUseCasesOutput,
  ): Promise<AuthorUseCasesOutput> {
    return this.authorRepository.createAuthor(authorData);
  }

  /**
   * Delete an author
   * @param id Author's ID
   * @returns Deleted author
   * @throws 404: author with this ID was not found
   */

  public async deleteAuthor(id: AuthorId): Promise<void> {
    return this.authorRepository.deleteAuthor(id);
  }
}
