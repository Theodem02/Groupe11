import { Injectable } from '@nestjs/common';
import { GenreRepository } from '../../repositories';
import { PlainGenreUseCasesOutput } from './genre.useCases.type';

@Injectable()
export class GenreUseCases {
    constructor(private readonly genreRepository: GenreRepository) {}
    public async getAllPlain(): Promise<PlainGenreUseCasesOutput[]> {
        return this.genreRepository.getAllPlain();  }
}