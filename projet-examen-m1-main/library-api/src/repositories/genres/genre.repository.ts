import { Injectable } from '@nestjs/common';
import { Genre } from 'library-api/src/entities';
import { DataSource, Repository } from 'typeorm';
import { PlainGenreRepositoryOutput, GenreRepositoryOutput } from 'library-api/src/repositories/genres/genre.repository.type';

@Injectable()
export class GenreRepository extends Repository<Genre> {
  constructor(public readonly dataSource: DataSource) {
    super(Genre, dataSource.createEntityManager());
  }

  public async getAllPlain(): Promise<PlainGenreRepositoryOutput[]> {
    return this.find();
  }
}
