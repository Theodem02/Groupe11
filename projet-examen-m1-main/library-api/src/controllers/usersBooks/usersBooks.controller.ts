import { Controller, Get, Param, Post, Delete } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiParam } from '@nestjs/swagger'; // Importez les décorateurs Swagger nécessaires
import { PlainUserBookPresenter } from 'library-api/src/controllers/usersBooks/usersBooks.presenter';
import { UserBookId } from '../../entities';
import { UserBookModel, PlainUserBookModel } from '../../models';
import { UserBookUseCases } from '../../useCases';

@ApiTags('usersBooks') // Ajoutez le tag Swagger pour ce contrôleur
@Controller('usersBooks')
export class UserBookController {
  constructor(private readonly userBookUseCases: UserBookUseCases) {}

  @Get('/')
  @ApiResponse({
    status: 200,
    description: 'List of user books',
    type: PlainUserBookPresenter,
    isArray: true,
  })
  public async getAll(): Promise<PlainUserBookPresenter[]> {
    const usersBooks = await this.userBookUseCases.getAllPlain();
    return usersBooks.map(PlainUserBookPresenter.from);
  }

  @Delete('/delete/:id') // Changez le décorateur pour correspondre à la méthode HTTP
  @ApiParam({ name: 'id', type: String, description: 'UserBook ID' })
  @ApiResponse({
    status: 200,
    description: 'UserBook deleted successfully',
  })
  public async deleteBook(@Param('id') id: UserBookId): Promise<void> {
    await this.userBookUseCases.deleteBook(id);
  }
}
