import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { GenrePresenter, PlainGenrePresenter } from './genre.presenter';
import { GenreUseCases } from '../../useCases';
import { PlainGenreModel } from '../../models/genre.model';

@ApiTags('genres') // Ajoutez des tags Swagger pour le groupe de routes
@Controller('genres')
export class GenreController {
  constructor(private readonly genreUseCases: GenreUseCases) {}

  /**
   * Get all genres
   * @returns Array of plain genres
   */
  @Get('/')
  @ApiResponse({
    status: 200,
    description: 'List of genres',
    type: PlainGenrePresenter,
    isArray: true,
  })
  public async getAll(): Promise<PlainGenrePresenter[]> {
    const genres = await this.genreUseCases.getAllPlain();
    return genres.map(PlainGenrePresenter.from);
  }
}
