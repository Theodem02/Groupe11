import { PlainBookPresenter } from  'library-api/src/controllers/books/book.presenter'
import { PlainUserPresenter } from 'library-api/src/controllers/users/user.presenter'
import { UserBookId } from 'library-api/src/entities'
import { UserBookModel, PlainUserBookModel } from 'library-api/src/models'

export class PlainUserBookPresenter {
  id: UserBookId

  user: PlainUserPresenter

  book: PlainBookPresenter

  private constructor(data: PlainUserBookPresenter) {
    Object.assign(this, data)
  }

  public static from(data: PlainUserBookModel): PlainUserBookPresenter {
    return new PlainUserBookPresenter({
      id: data.id,
      user: PlainUserPresenter.from(data.user),
      book: PlainBookPresenter.from(data.book),
    })
  }
}