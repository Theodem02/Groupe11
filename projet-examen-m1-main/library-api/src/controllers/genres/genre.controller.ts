import { Controller, Get, Param } from '@nestjs/common';
import { GenrePresenter, PlainGenrePresenter } from 'library-api/src/controllers/genres/genre.presenter';
import { GenreUseCases } from 'library-api/src/useCases';
import { GenreModel, PlainGenreModel } from 'library-api/src/models/genre.model';

@Controller('genres')
export class GenreController {
    constructor(private readonly genreUseCases: GenreUseCases) {}
    @Get('/')
    public async getAll(): Promise<PlainGenrePresenter[]> {
        const  genres = await this.genreUseCases.getAllPlain();
        return genres.map(PlainGenrePresenter.from);
    }
}

