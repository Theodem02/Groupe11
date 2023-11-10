import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { PlainAuthorPresenter } from './author.presenter';
import { AuthorId } from '../../entities';
import { AuthorModel, PlainAuthorModel } from '../../models';
import { AuthorUseCases } from '../../useCases';

@ApiTags('authors')
@Controller('authors')
export class AuthorController {
  constructor(private readonly authorUseCases: AuthorUseCases) {}

  @Get('/')
  @ApiResponse({
    status: 200,
    description: 'List of authors',
    type: PlainAuthorPresenter,
    isArray: true,
  })
  public async getAll(): Promise<PlainAuthorPresenter[]> {
    const authors = await this.authorUseCases.getAllPlain();
    return authors.map(PlainAuthorPresenter.from);
  }

  @Get('/:id')
  @ApiParam({ name: 'id', type: String, description: 'Author ID' })
  @ApiResponse({
    status: 200,
    description: 'Author details',
    type: PlainAuthorPresenter,
  })
  public async getById(@Param('id') id: AuthorId): Promise<PlainAuthorPresenter> {
    const author = await this.authorUseCases.getById(id);
    return PlainAuthorPresenter.from(author);
  }

  @Post('/')
  @ApiBody({
    description: 'Data to create a new author',
    schema: {
      example: {
        firstName: 'John',
        lastName: 'Doe',
        photoUrl: 'https://example.com/photo.jpg',
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Author created successfully',
  })
  public async createAuthor(@Body() authorData: AuthorModel): Promise<PlainAuthorModel> {
    const newAuthor = await this.authorUseCases.createAuthor(authorData);

    const plainAuthor: PlainAuthorModel = {
      id: newAuthor.id,
      firstName: newAuthor.firstName,
      lastName: newAuthor.lastName,
      photoUrl: newAuthor.photoUrl,
    };
    return plainAuthor;
  }

  @Delete('/:id')
  @ApiParam({ name: 'id', type: String, description: 'Author ID' })
  @ApiResponse({
    status: 200,
    description: 'Author deleted successfully',
  })
  public async deleteAuthor(@Param('id') id: AuthorId): Promise<void> {
    await this.authorUseCases.deleteAuthor(id);
  }
}
