import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Genre } from '../../entities';
import {
  PlainGenreRepositoryOutput,
  GenreRepositoryOutput,
} from './genre.repository.type';

@Injectable()
export class GenreRepository extends Repository<Genre> {
  constructor(public readonly dataSource: DataSource) {
    super(Genre, dataSource.createEntityManager());
  }

  public async getAllPlain(): Promise<PlainGenreRepositoryOutput[]> {
    return this.find();
  }
}
