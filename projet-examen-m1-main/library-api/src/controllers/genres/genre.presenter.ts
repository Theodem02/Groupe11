import { GenreId } from 'library-api/src/entities';
import { GenreModel } from 'library-api/src/models';

export class PlainGenrePresenter {
  id: GenreId;

  name: string;

  private constructor(data: PlainGenrePresenter) {
    Object.assign(this, data);
  }

  public static from(data: GenreModel): PlainGenrePresenter {
    return new PlainGenrePresenter({
      id: data.id,
      name: data.name,
    });
  }
}

export class GenrePresenter {
  id: GenreId;

  name: string;

  private constructor(data: GenrePresenter) {
    Object.assign(this, data);
  }

  public static from(data: GenreModel): GenrePresenter {
    return new GenrePresenter({
      id: data.id,
      name: data.name,
    });
  }
}
