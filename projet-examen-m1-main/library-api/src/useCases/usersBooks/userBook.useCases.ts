import { Injectable } from '@nestjs/common';
import { UserBookId } from '../../entities';
import { UserBookRepository } from '../../repositories';
import { PlainUserBookUseCasesOutput } from '../usersBooks/userBook.useCases.type';
import { PlainUserBookModel } from '../../models';

@Injectable()
export class UserBookUseCases {
  constructor(private readonly userBookRepository: UserBookRepository) {}

  /**
   * Get all plain usersBooks
   * @returns Array of plain usersBooks
   */
  public async getAllPlain(): Promise<PlainUserBookUseCasesOutput[]> {
    return this.userBookRepository.getAllPlain();
  }

  public async deleteBook(id: UserBookId): Promise<void> {
    return this.userBookRepository.deleteBook(id);
  }
}
