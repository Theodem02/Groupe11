import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { PlainAuthorPresenter } from './author.presenter';
import { AuthorId } from '../../entities';
import { AuthorModel, PlainAuthorModel } from '../../models';
import { AuthorUseCases } from '../../useCases';

@Controller('authors')
export class AuthorController {
  constructor(private readonly authorUseCases: AuthorUseCases) {}

  @Get('/')
  public async getAll(): Promise<PlainAuthorPresenter[]> {
    const authors = await this.authorUseCases.getAllPlain();

    return authors.map(PlainAuthorPresenter.from);
  }

  @Get('/:id')
  public async getById(
    @Param('id') id: AuthorId,
  ): Promise<PlainAuthorPresenter> {
    const author = await this.authorUseCases.getById(id);

    return PlainAuthorPresenter.from(author);
  }

  @Post('/')
  public async createAuthor(@Body() authorData: AuthorModel): Promise<{}> {
    const newAuthor = await this.authorUseCases.createAuthor(authorData);

    const plainAuthor: PlainAuthorModel = {
      id: newAuthor.id,
      firstName: newAuthor.firstName,
      lastName: newAuthor.lastName,
      photoUrl: newAuthor.photoUrl,
    };
    return plainAuthor;
  }

  @Post('/delete/:id')
  public async deleteAuthor(@Param('id') id: AuthorId): Promise<void> {
    await this.authorUseCases.deleteAuthor(id);
  }
}
