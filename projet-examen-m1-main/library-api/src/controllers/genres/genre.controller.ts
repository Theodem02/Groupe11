import { Controller, Get, Param } from '@nestjs/common';
import {
  GenrePresenter,
  PlainGenrePresenter,
} from './genre.presenter';
import { GenreUseCases } from '../../useCases';
import {
  GenreModel,
  PlainGenreModel,
} from '../../models/genre.model';

@Controller('genres')
export class GenreController {
  constructor(private readonly genreUseCases: GenreUseCases) {}

  @Get('/')
  public async getAll(): Promise<PlainGenrePresenter[]> {
    const genres = await this.genreUseCases.getAllPlain();
    return genres.map(PlainGenrePresenter.from);
  }
}
