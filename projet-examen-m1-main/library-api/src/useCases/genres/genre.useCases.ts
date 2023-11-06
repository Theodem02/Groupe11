import { Injectable } from '@nestjs/common';
import { GenreRepository } from 'library-api/src/repositories';
import { PlainGenreUseCasesOutput } from 'library-api/src/useCases/genres/genre.useCases.type';

@Injectable()
export class GenreUseCases {
    constructor(private readonly genreRepository: GenreRepository) {}
    public async getAllPlain(): Promise<PlainGenreUseCasesOutput[]> {
        return this.genreRepository.getAllPlain();  }
}