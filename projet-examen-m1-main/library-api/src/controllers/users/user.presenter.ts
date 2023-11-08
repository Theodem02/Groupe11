import { UserId } from 'library-api/src/entities';
import { PlainUserModel } from 'library-api/src/models';

export class PlainUserPresenter {
  id: UserId;

  firstName: string;

  lastName: string;

  private constructor(data: PlainUserPresenter) {
    Object.assign(this, data);
  }

  public static from(data: PlainUserModel): PlainUserPresenter {
    return new PlainUserPresenter({
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
    });
  }
}