import { Controller, Get, Param } from '@nestjs/common';
import { PlainUserBookPresenter } from 'library-api/src/controllers/usersBooks/usersBooks.presenter';
import { UserBookId } from '../../entities';
import { UserBookModel, PlainUserBookModel } from '../../models';
import { UserBookUseCases } from '../../useCases';

@Controller('usersBooks')
export class UserBookController {
  constructor(private readonly userBookUseCases: UserBookUseCases) {}

  @Get('/')
  public async getAll(): Promise<PlainUserBookPresenter[]> {
    const usersBooks = await this.userBookUseCases.getAllPlain();
    return usersBooks.map(PlainUserBookPresenter.from);
  }
}
